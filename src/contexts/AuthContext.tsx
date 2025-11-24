import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login as apiLogin } from '../services/api';
import { saveToken, removeToken, isAuthenticated } from '../services/auth';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const authenticated = isAuthenticated();
        setIsLoggedIn(authenticated);
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response = await apiLogin(username, password);
            saveToken(response.access_token);
            setIsLoggedIn(true);
        } catch (error) {
            throw error;
        }
    };

    const logout = (): void => {
        removeToken();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
