import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemberService from '../services/memberService';
import VaccinationService from '../services/vaccinationService';
import CovidDetailService from '../services/covidDetailService';
import './MemberDetail.css';

function MemberDetail() {
  const [member, setMember] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);
  const [covidDetails, setCovidDetails] = useState([]);
  const { memberId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const memberData = await MemberService.getById(memberId);
      setMember(memberData);

      const vaccinationData = await VaccinationService.getVaccinationsByMemberId(memberId);
      setVaccinations(vaccinationData);

      const covidDetailData = await CovidDetailService.getCovidDetailsByMemberId(memberId);
      setCovidDetails(covidDetailData);
    }

    fetchData();
  }, [memberId]);

  const handleInputChange = (e, field) => {
    setMember({ ...member, [field]: e.target.value });
  };

  const handleAddressChange = (e, field) => {
    setMember({ ...member, address: { ...member.address, [field]: e.target.value } });
  };

  const handleVaccinationChange = (index, field, value) => {
    const updatedVaccinations = [...vaccinations];
    updatedVaccinations[index][field] = value;
    setVaccinations(updatedVaccinations);
  };

  const handleCovidDetailChange = (index, field, value) => {
    const updatedCovidDetails = [...covidDetails];
    updatedCovidDetails[index][field] = value;
    setCovidDetails(updatedCovidDetails);
  };

  const handleSave = async () => {
    await MemberService.update(memberId, member);
      
    for (const vaccination of vaccinations) {
        await VaccinationService.update(vaccination.id, vaccination);
    }

    for (const covidDetail of covidDetails) {
        await CovidDetailService.update(covidDetail.id, covidDetail);
    }

    navigate('/');
  };

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div className="member-detail-container">
    <h1 className="member-detail-title">Member Details</h1>
    <div className="member-detail-form">
        <label>Name:</label>
        <input type="text" value={member.firstName} onChange={(e) => handleInputChange(e, 'firstName')} />
        <input type="text" value={member.lastName} onChange={(e) => handleInputChange(e, 'lastName')} />
      </div>
      <div>
        <label>Identity Number:</label>
        <input type="text" value={member.identityNumber} onChange={(e) => handleInputChange(e, 'identityNumber')} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={member.phone} onChange={(e) => handleInputChange(e, 'phone')} />
      </div>
      <div>
        <label>Mobile Phone:</label>
        <input type="text" value={member.mobilePhone} onChange={(e) => handleInputChange(e, 'mobilePhone')} />
      </div>
      <h5>Address:</h5>
      <div>
        <label>City:</label>
        <input type="text" value={member.address.city} onChange={(e) => handleAddressChange(e, 'city')} />
      </div>
      <div>
        <label>Street:</label>
        <input type="text" value={member.address.street} onChange={(e) => handleAddressChange(e, 'street')} />
      </div>
      <div>
        <label>Building Number:</label>
        <input type="text" value={member.address.buildingNumber} onChange={(e) => handleAddressChange(e, 'buildingNumber')} />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" value={new Date(member.dateOfBirth).toISOString().substring(0, 10)} onChange={(e) => handleInputChange(e, 'dateOfBirth')} />
      </div>
      <h2>Vaccinations</h2>
      {vaccinations.map((vaccine, index) => (
        <div key={index}>
          <label>Date:</label>
          <input
            type="date"
            value={new Date(vaccine.reciveTime).toISOString().substring(0, 10)}
            onChange={(e) => handleVaccinationChange(index, 'reciveTime', e.target.value)}
          />
          <label>Manufacturer:</label>
          <input
            type="text"
            value={vaccine.manufacturer}
            onChange={(e) => handleVaccinationChange(index, 'manufacturer', e.target.value)}
          />
        </div>
      ))}

      <h2>COVID-19 Details</h2>
      {covidDetails.map((detail, index) => (
        <div key={index}>
          <label>Positive Result Date:</label>
          <input
            type="date"
            value={new Date(detail.positiveResultDate).toISOString().substring(0, 10)}
            onChange={(e) => handleCovidDetailChange(index, 'positiveResultDate', e.target.value)}
          />
          <label>Recovery Date:</label>
          <input
            type="date"
            value={detail.recoveryDate ? new Date(detail.recoveryDate).toISOString().substring(0, 10) : ''}
            onChange={(e) => handleCovidDetailChange(index, 'recoveryDate', e.target.value)}
          />
        </div>
      ))}
      <button className="save-button" onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default MemberDetail;
