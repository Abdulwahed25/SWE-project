import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import MissingPASS from './MissingPass';
import Profile from './profile';
import Todo from './Todo';
import Timer from './Timer';
import StudyRoomChat from './StudyRoomChat';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* All the  pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/MissingPASS" element={<MissingPASS />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/chat" element={<StudyRoomChat />} />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;