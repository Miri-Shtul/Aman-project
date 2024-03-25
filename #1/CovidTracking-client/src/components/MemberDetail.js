import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemberService from '../services/memberService';
import VaccinationService from '../services/vaccinationService';
import CovidDetailService from '../services/covidDetailService';
import './MemberDetail.css';

function MemberDetail() {
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    identityNumber: '',
    phone: '',
    mobilePhone: '',
    address: {
      city: '',
      street: '',
      buildingNumber: ''
    },
    imageFile: null
  });
  const [vaccinations, setVaccinations] = useState([]);
  const [covidDetails, setCovidDetails] = useState([]);
  const { memberId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const memberData = await MemberService.getById(memberId);
      setMember({ ...memberData, imageFile: null }); // Reset imageFile on fetch

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

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setMember({ ...member, imageFile: e.target.files[0] });
    }
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
    const formData = new FormData();

    Object.keys(member).forEach(key => {
      if (key === 'imageFile' && member[key]) {
        formData.append('ImageFile', member[key]);
      } else if (key === 'address') {
        Object.keys(member[key]).forEach(subKey => {
          formData.append(`address.${subKey}`, member[key][subKey]);
        });
      } else {
        formData.append(key, member[key]);
      }
    });

    try {
      const response = await MemberService.update(memberId, formData);
      if (!response.ok) {
        console.error('Failed to update member');
        return;
      }

      for (const vaccination of vaccinations) {
        await VaccinationService.update(vaccination.id, vaccination);
      }

      for (const covidDetail of covidDetails) {
        await CovidDetailService.update(covidDetail.id, covidDetail);
      }

      navigate('/');
    } catch (error) {
      console.error('Error saving member details:', error);
    }
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
        <label>Image:</label>
        <img src={`https://localhost:7022/api/Images/${member.imagePath}`} alt="Profile" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
        <input type="file" onChange={handleImageChange} />
        <label>Identity Number:</label>
        <input type="text" value={member.identityNumber} onChange={(e) => handleInputChange(e, 'identityNumber')} />
        <label>Phone:</label>
        <input type="text" value={member.phone} onChange={(e) => handleInputChange(e, 'phone')} />
        <label>Mobile Phone:</label>
        <input type="text" value={member.mobilePhone} onChange={(e) => handleInputChange(e, 'mobilePhone')} />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" value={member.dateOfBirth ? new Date(member.dateOfBirth).toISOString().substring(0, 10) : ''} onChange={(e) => handleInputChange(e, 'dateOfBirth')} />
      </div>
      <h3>Address:</h3>
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
      <h2>Vaccinations</h2>
      {vaccinations.map((vaccine, index) => (
        <div key={index}>
          <label>Date:</label>
          <input
            type="date"
            value={new Date(vaccine.receiveTime).toISOString().substring(0, 10)}
            onChange={(e) => handleVaccinationChange(index, 'receiveTime', e.target.value)}
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

