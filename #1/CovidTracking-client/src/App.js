import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import MemberList from './components/MemberList/MemberList';
import MemberForm from './components/MemberForm/MemberForm';
import MemberDetail from './components/MemberDetails/MemberDetail';
import Statistics from './components/Statistics/Statistics';

function App() {
  return (
    <Router>
      <div>
        <Routes >
        <Route path="/" element={<MemberList />} />
        <Route path="/member" element={<MemberForm />} />
        <Route path="/member/:memberId" element={<MemberDetail />} />
        <Route path="/statistics" element={<Statistics />} /> 
        </Routes >
      </div>
    </Router>
  );
}

export default App;
