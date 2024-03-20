import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import MemberList from './components/MemberList';
import MemberDetail from './components/MemberDetail';
import MemberForm from './components/MemberForm';
import Statistics from './components/Statistics';

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
