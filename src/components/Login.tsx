import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-header-wrapper">
        <div className="login-header-background"></div>
        <div className="login-header-green"></div>
        <h1 className="login-header-text">LOGIN</h1>
        <p className="login-subtitle">Somente administradores podem realizar login</p>
      </div>

      <div className="login-icon"></div>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Usuário</h2>
        <input
          type="text"
          placeholder="Digite seu usuário"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <h2 className="login-title">Senha</h2>
        <input
          type="password"
          placeholder="Digite sua senha"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p className="forgot-password">Esqueceu a senha?</p>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="signup-link">
          Não possui uma conta? <Link to="/signup">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

