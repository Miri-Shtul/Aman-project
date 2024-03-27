import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MemberService from '../../services/memberService';
import VaccinationService from '../../services/vaccinationService';
import CovidDetailService from '../../services/covidDetailService';
import './MemberForm.css';

function MemberForm() {
    const [deletedVaccinations, setDeletedVaccinations] = useState([]);
    const [deletedCovidDetails, setDeletedCovidDetails] = useState([]);
    const [member, setMember] = useState({
        firstName: '',
        lastName: '',
        identityNumber: '',
        phone: '',
        mobilePhone: '',
        dateOfBirth: '',
        address: {
            city: '',
            street: '',
            buildingNumber: ''
        },
        imageFile: null,
        vaccinations: [],
        covidDetails: []
    });
    const navigate = useNavigate();
    const { memberId } = useParams();
    const [imageLoaded, setImageLoaded] = useState(true);
    const handleImageLoaded = () => setImageLoaded(true);
    const handleImageError = () => setImageLoaded(false);
    const handleDateConversion = (dateString) => {
        return dateString ? new Date(dateString).toISOString().substring(0, 10) : null;
    };


    useEffect(() => {
        if (memberId) {
            MemberService.getById(memberId).then(async data => {
                if (data) {
                    let vaccination = await VaccinationService.getVaccinationsByMemberId(memberId) || [];
                    let covidDetails = await CovidDetailService.getCovidDetailsByMemberId(memberId) || [];

                    setMember({
                        ...data,
                        dateOfBirth: handleDateConversion(data.dateOfBirth),
                        address: data.address || { city: '', street: '', buildingNumber: '' },
                        imageFile: null, // Reset image on edit, 
                        vaccinations: vaccination?.map(vaccination => ({
                            ...vaccination,
                            reciveTime: handleDateConversion(vaccination?.reciveTime)
                        })),
                        covidDetails: covidDetails.map(covidDetail => ({
                            ...covidDetail,
                            positiveResultDate: handleDateConversion(covidDetail?.positiveResultDate),
                            recoveryDate: handleDateConversion(covidDetail?.recoveryDate)
                        })),
                    });
                }


            });
        }
    }, [memberId]);

    const handleChange = (e) => {
        console.log('--->memberrr   ', member);
        const { name, value } = e.target;
        setMember(prevMember => ({ ...prevMember, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setMember(prevMember => ({
            ...prevMember,
            address: {
                ...prevMember.address,
                [name]: value
            }
        }));
    };

    const handleFileChange = (e) => {
        setMember(prevMember => ({ ...prevMember, imageFile: e.target.files[0] }));
    };

    const handleVaccinationChange = (index, field, value) => {
        const updatedVaccinations = [...member.vaccinations];
        updatedVaccinations[index][field] = value;
        setMember(prevMember => ({ ...prevMember, vaccinations: updatedVaccinations }));
    };

    const handleAddVaccination = () => {
        setMember(prevMember => ({
            ...prevMember,
            vaccinations: [...prevMember.vaccinations, { reciveTime: '', manufacturer: '' }]
        }));
    };

    const handleDeleteVaccination = (index) => {
        setMember(prevMember => {
            const updatedVaccinations = prevMember.vaccinations.filter((_, i) => i !== index);
            const deleted = prevMember.vaccinations[index];
            if (deleted && deleted.id) {
                setDeletedVaccinations(prev => [...prev, deleted]);
            }
            return { ...prevMember, vaccinations: updatedVaccinations };
        });
    };

    const handleCovidDetailChange = (index, field, value) => {
        const updatedCovidDetails = [...member.covidDetails];
        updatedCovidDetails[index][field] = value;
        setMember(prevMember => ({ ...prevMember, covidDetails: updatedCovidDetails }));
    };

    const handleAddCovidDetail = () => {
        setMember(prevMember => ({
            ...prevMember,
            covidDetails: [...prevMember.covidDetails, { positiveResultDate: '', recoveryDate: '' }]
        }));
    };

    const handleDeleteCovidDetail = (index) => {
        setMember(prevMember => {
            const updatedCovidDetails = prevMember.covidDetails.filter((_, i) => i !== index);
            const deleted = prevMember.covidDetails[index];
            if (deleted && deleted.id) {
                setDeletedCovidDetails(prev => [...prev, deleted]);
            }
            return { ...prevMember, covidDetails: updatedCovidDetails };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(member).forEach(key => {
            if (key === 'imageFile' && member[key]) {
                formData.append(key, member[key]);
            } else if (key === 'address') {
                Object.keys(member.address).forEach(subKey => {
                    formData.append(`${key}.${subKey}`, member.address[subKey]);
                });
            } else if (key !== 'vaccinations' && key !== 'covidDetails') {
                formData.append(key, member[key]);
            }
        });

        try {
            let response;
            if (memberId) {
                response = await MemberService.update(memberId, formData);
            } else {
                response = await MemberService.create(formData);
            }
            if (response.ok) {
                let savedMemberId = memberId;
                if (response.status !== 204) {
                    const savedMember = await response.json();
                    savedMemberId = savedMember.id;
                }
                const vaccinationPromises = member.vaccinations.map(vaccination =>
                    vaccination.id
                        ? VaccinationService.update(vaccination)
                        : VaccinationService.create({ ...vaccination, memberId: savedMemberId })
                );

                const covidDetailPromises = member.covidDetails.map(covidDetail =>
                    covidDetail.id
                        ? CovidDetailService.update(covidDetail)
                        : CovidDetailService.create({ ...covidDetail, memberId: savedMemberId })
                );
                const deleteVaccinationPromises = deletedVaccinations.map(vaccination =>
                    VaccinationService.delete(vaccination.id)
                );
                const deleteCovidDetailPromises = deletedCovidDetails.map(covidDetail =>
                    CovidDetailService.delete(covidDetail.id)
                );

                await Promise.all([...vaccinationPromises, ...covidDetailPromises,
                ...deleteVaccinationPromises, ...deleteCovidDetailPromises]);

                navigate('/');
            } else {
                console.error('Submit failed:', response);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={member.firstName} onChange={handleChange
                    } />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={member.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label>Identity Number:</label>
                    <input type="text" name="identityNumber" value={member.identityNumber} onChange={handleChange} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={member.phone} onChange={handleChange} />
                </div>
                <div>
                    <label>Mobile Phone:</label>
                    <input type="text" name="mobilePhone" value={member.mobilePhone} onChange={handleChange} />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name="dateOfBirth" value={member.dateOfBirth || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>City:</label>
                    <input type="text" name="city" value={member.address.city} onChange={handleAddressChange} />
                </div>
                <div>
                    <label>Street:</label>
                    <input type="text" name="street" value={member.address.street} onChange={handleAddressChange} />
                </div>
                <div>
                    <label>Building Number:</label>
                    <input type="text" name="buildingNumber" value={member.address.buildingNumber} onChange={handleAddressChange} />
                </div>
                <div>
                    <label>Photo:</label>
                    {imageLoaded && member.imagePath ? (
                        <img
                            src={`https://localhost:7022/api/Images/${member.imagePath}`}
                            alt="Profile"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            onLoad={handleImageLoaded}
                            onError={handleImageError}
                        />
                    ) : (
                        <div>No image available</div>
                    )}
                    <input type="file" onChange={handleFileChange} />
                </div>
                {member.vaccinations.map((vaccination, index) => (
                    <div key={index}>
                        <h3>Vaccination #{index + 1}</h3>
                        <label>Date:</label>
                        <input type="date" value={vaccination.reciveTime || ''} onChange={(e) => handleVaccinationChange(index, 'reciveTime', e.target.value)} />
                        <label>Manufacturer:</label>
                        <input type="text" value={vaccination.manufacturer || ''} onChange={(e) => handleVaccinationChange(index, 'manufacturer', e.target.value)} />
                        <button type="button" onClick={() => handleDeleteVaccination(index)}>Delete Vaccination</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddVaccination}>Add Vaccination</button>
                {member.covidDetails.map((covidDetail, index) => (
                    <div key={index}>
                        <h3>COVID-19 Detail #{index + 1}</h3>
                        <label>Positive Result Date:</label>
                        <input type="date" value={covidDetail.positiveResultDate || ''} onChange={(e) => handleCovidDetailChange(index, 'positiveResultDate', e.target.value)} />
                        <label>Recovery Date:</label>
                        <input type="date" value={covidDetail.recoveryDate || ''} onChange={(e) => handleCovidDetailChange(index, 'recoveryDate', e.target.value)} />
                        <button type="button" onClick={() => handleDeleteCovidDetail(index)}>Delete COVID-19 Detail</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddCovidDetail}>Add COVID-19 Detail</button>
                <button type="submit">{memberId ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default MemberForm;



