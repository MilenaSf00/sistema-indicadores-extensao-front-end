import React from 'react';
import '../css/Login.css';

const Login: React.FC = () => {
  return (
    <div className="login-page-container">
      
    
      <div className="login-header-wrapper">
        <div className="login-header-background"></div>
        <div className="login-header-green"></div>
        <h1 className="login-header-text">LOGIN</h1>
      </div>

    
      <div className="login-icon"></div>

   
      <div className="login-card">
        <h2 className="login-title">Usuário</h2>
        <input type="text" placeholder="Digite seu usuário" className="login-input" />

        <h2 className="login-title">Senha</h2>
        <input type="password" placeholder="Digite sua senha" className="login-input" />

        <p className="forgot-password">Esqueceu a senha?</p>

        <button className="login-button">Entrar</button>
      </div>
      
    </div>
  );
};

export default Login;
