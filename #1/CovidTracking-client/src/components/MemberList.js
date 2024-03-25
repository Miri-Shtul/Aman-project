import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MemberService from '../services/memberService';
import './MemberList.css'; 

function MemberList() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        MemberService.getAll().then(data => {
            setMembers(data);
        });
    }, []);

    const handleDelete = async (id) => {
        if (await MemberService.delete(id)) {
            setMembers(members.filter(member => member.id !== id));
        }
    };

    return (
        <div className="container">
            <div className="addButton">
                <Link to="/member" className="addLink">
                    Add Member
                </Link>
                <Link to="/statistics" className="addLink">
                    Statistic
                </Link>
            </div>
            <div className="membersContainer">
                <h1>Members</h1>
                <ul className="membersList">
                    {members?.map(member => (
                        <li key={member.id} className="memberItem">
                            <span>{member.firstName} {member.lastName}</span>
                            <div className="memberActions">
                                <Link to={`/member/${member.id}`} className="editLink">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(member.id)} className="deleteButton">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MemberList;
