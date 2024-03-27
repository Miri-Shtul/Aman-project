import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MemberList from './components/MemberList/MemberList';
import MemberForm from './components/MemberForm/MemberForm';
import MemberDetail from './components/MemberDetails/MemberDetail';
import Statistics from './components/Statistics/Statistics';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <Router>

      <Nav className="navbar navbar-expand-sm bg-light" >
        <Link to="/" style={{ color: "black" }} className="navbar-brand"> Members </Link><br />
        <Link to="/member/new" style={{ color: "black" }} className="navbar-brand">Add new Member</Link><br />
        <Link to="/statistics" style={{ color: "black" }} className="navbar-brand">Statistic</Link><br />
      </Nav>

      <Routes >
        <Route path="/" element={<MemberList />} />
        <Route path="/member/new" element={<MemberForm />} />
        <Route path="/member/:memberId" element={<MemberForm />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes >
    </Router>
  );
}

export default App;
