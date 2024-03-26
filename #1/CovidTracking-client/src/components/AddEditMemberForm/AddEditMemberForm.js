import React, { useState } from 'react';
import MemberService from './MemberService';
import './AddEditMemberForm.css';

function AddEditMemberForm({ member, onSave }) {
  const [formData, setFormData] = useState(member || {});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.id) {
      await MemberService.updateMember(formData.id, formData);
    } else {
      await MemberService.addMember(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
      </div>
      {/* Add other fields */}
      <button type="submit">Save</button>
    </form>
  );
}

export default AddEditMemberForm;
