// src/App.jsx
import React from 'react';
import Home from '../src/components/Home'; // caminho relativo para o seu Home.jsx
import Upload from '../src/components/Upload';
import Navbar from '../src/components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
