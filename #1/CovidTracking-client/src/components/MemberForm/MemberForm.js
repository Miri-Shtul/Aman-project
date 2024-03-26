import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MemberService from '../../services/memberService';
import './MemberForm.css';

function MemberForm() {
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
    });
    const navigate = useNavigate();
    const { memberId } = useParams();

    const handleFileChange = (e) => {
        setMember({ ...member, imageFile: e.target.files[0] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setMember(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(member).forEach(key => {
            if (key === 'imageFile') {
                formData.append(key, member[key]);
            } else if (key === 'address') {
                Object.keys(member.address).forEach(subKey => {
                    formData.append(`${key}.${subKey}`, member.address[subKey]);
                });
            } else {
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
                navigate('/');
            } else {
                console.error('Submit failed:', response);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        if (memberId) {
            MemberService.getById(memberId).then(data => {
                if (data) {
                    setMember({
                        ...data,
                        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().substring(0, 10) : '',
                        address: data.address || { city: '', street: '', buildingNumber: '' },
                        imageFile: null // Reset photo on edit
                    });
                }
            });
        }
    }, [memberId]);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={member.firstName} onChange={handleChange} />
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
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={member.dateOfBirth || ''}
                        onChange={handleChange}
                    />
                </div>
                <h3>Address:</h3>
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
                    <input type="text" name="buildingNumber"
                        value={member.address.buildingNumber} onChange={handleAddressChange} />
                </div>
                <div>
                    <label>Photo:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">{memberId ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default MemberForm;

