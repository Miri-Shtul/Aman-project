import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MemberService from '../../services/memberService';
import './MemberList.css';
import { useSelector, useDispatch } from "react-redux";
import { setMembers } from '../../redux/actions/actions';

function MemberList() {
    const dispatch = useDispatch()
    const members = useSelector(state => state.members);
    const [filteredMembers, setFilteredMembers] = useState(members);

    const filter = (value) => {
        if (value) {
            const filteredMembersArray = members.filter(member =>
                member.firstName.toLowerCase().includes(value.toLowerCase())
                || member.lastName.toLowerCase().includes(value.toLowerCase()));
            setFilteredMembers(filteredMembersArray);
        } else {
            setFilteredMembers(members);
        }
    };
    useEffect(() => {
        MemberService.getAll().then(members => {
            dispatch(setMembers(members));
            setFilteredMembers(members);
        });
    }, []);
    const handleDelete = async (id) => {
        if (await MemberService.delete(id)) {
            const updatedMembers = await MemberService.getAll();

            dispatch(setMembers(updatedMembers));
        }
    };

    return (
        <div className="container">
            <div className="membersContainer">
                <div className="topBar">
                    <h1>Members</h1>
                    <input
                        type="text"
                        className="filterInput"
                        onChange={(e) => filter(e.target.value)}
                        placeholder="Filter members"
                    />
                </div>
                <ul className="membersList">
                    {filteredMembers?.map(member => (
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
