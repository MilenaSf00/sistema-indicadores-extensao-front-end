import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signup } from '../services/api';
import '../css/Signup.css';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        if (username.trim().length < 3) {
            setError('Nome de usuário deve ter no mínimo 3 caracteres');
            return false;
        }

        if (password.length < 6) {
            setError('Senha deve ter no mínimo 6 caracteres');
            return false;
        }



        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await signup(username, password);

            await login(username, password);

            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page-container">
            <div className="signup-header-wrapper">
                <div className="signup-header-background"></div>
                <div className="signup-header-green"></div>
                <h1 className="signup-header-text">CADASTRO</h1>
                <p className="signup-subtitle">Crie sua conta para acessar o sistema</p>
            </div>

            <div className="signup-icon"></div>

            <form className="signup-card" onSubmit={handleSubmit}>
                <h2 className="signup-title">Usuário</h2>
                <input
                    type="text"
                    placeholder="Digite seu usuário"
                    className="signup-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <h2 className="signup-title">Senha</h2>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    className="signup-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />



                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="signup-button" disabled={loading}>
                    {loading ? 'Criando conta...' : 'Cadastrar'}
                </button>

                <p className="login-link">
                    Já possui uma conta? <Link to="/login">Faça login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
