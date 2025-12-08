import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import Footer from '../components/Footer';
import '../css/Login.css';

// Reusing the exact logic requested: Header is a sibling to the login form container.
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      // Security Best Practice: Generic Error Message
      setError('E-mail ou senha incorretos. Por favor, tente novamente.');
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset shake after animation
    }
  };

  return (
    // MAIN CONTAINER (PAI) - Defines page margins/structure
    <div className="login-page-container">

      {/* CHILD 1: HEADER (Full Width Sibling) */}
      <div className="login-header-container">
        <div className="login-header-bg">
          <svg width="100%" height="100%" viewBox="0 0 1440 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M180 0 V 100 Q 180 150 130 150 H 100 Q 80 150 80 130 Q 80 110 100 110 H 130 Q 150 110 150 80 V 0" fill="#E74B23" transform="translate(-50, 20)" />
            <path d="M1260 0 V 120 Q 1260 180 1200 180 H 1150 Q 1120 180 1120 150 Q 1120 120 1150 120 H 1200 Q 1230 120 1230 90 V 0" fill="#FFC107" transform="translate(50, 0)" />
            <path d="M0 250 Q 50 250 80 280 L 150 300 H 0 V 250" fill="#155BD8" transform="translate(0, 20)" />
            <path d="M1440 280 Q 1400 280 1380 300 H 1440 V 280" fill="#2E3192" />
          </svg>
        </div>
        <div className="login-header-box">
          <h1 className="login-header-title">Login</h1>
          <div className="corner-dec-top-right">
            <div className="bar-blue-tr"></div>
            <div className="bar-yellow-tr"></div>
            <div className="bar-red-tr"></div>
          </div>
          <div className="corner-dec-bottom-left">
            <div className="bar-red-bl"></div>
            <div className="bar-yellow-bl"></div>
            <div className="bar-blue-bl"></div>
          </div>
        </div>
        <p className="sobre-subtitle">
          Login para administradores do sistema.
        </p>
      </div>

      {/* CHILD 2: CONTENT AREA (Sibling) */}
      <div className="login-content-wrapper">

        <form className={`login-card ${shake ? 'shake' : ''}`} onSubmit={handleSubmit}>
          <div className="login-notice-container">
            <div className="login-notice-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <p className="login-notice-text">
              <strong>Acesso Restrito:</strong> Este login é exclusivo para administradores.
              <span className="login-notice-sub">Usuários gerais podem acessar os indicadores livremente sem autenticação.</span>
            </p>
          </div>

          <div className="input-group">
            <label className="login-title-label">Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              className={`login-input ${error ? 'error' : ''}`}
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              required
              disabled={loading || loginSuccess}
            />
          </div>

          <div className="input-group">
            <label className="login-title-label">Senha</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className={`login-input has-icon ${error ? 'error' : ''}`}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                required
                disabled={loading || loginSuccess}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                title={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Inline error removed in favor of Toast */}

          <button
            type="submit"
            className={`login-button ${loading ? 'loading' : ''} ${loginSuccess ? 'success' : ''}`}
            disabled={loading || loginSuccess}
          >
            {loginSuccess ? (
              <svg className="user-avatar-appear" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            ) : loading ? (
              <>
                <div className="spinner"></div>
                Verificando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>

      {loginSuccess && (
        <div className="glass-toast-overlay">
          <div className="glass-toast">
            <span className="glass-toast-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            Bem-vindo, Administrador!
          </div>
        </div>
      )}

      {error && !loginSuccess && (
        <div className="error-toast-overlay">
          <div className="error-toast">
            <span className="error-toast-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </span>
            {error}
          </div>
        </div>
      )}
      <Footer />
    </div>

  );
};

export default Login;
