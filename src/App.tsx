import './App.css';
import Home from '../src/components/Home';
import Upload from '../src/components/Upload';
import Navbar from '../src/components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Sobre from './components/Sobre';
import Ajuda from '../src/components/Ajuda';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/ajuda" element={<Ajuda />} />

          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

