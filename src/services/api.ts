import axios from 'axios';
import type { ChartData } from '../components/ChartComponents';

const API_URL = 'http://127.0.0.1:8000';


export const signup = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
};


export const login = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post(`${API_URL}/login`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};




// Função para enviar arquivo CSV
export const uploadProjects = async (file: File): Promise<ChartData[]> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<ChartData[]>(
        `${API_URL}/upload-projects`,
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
    );

    return response.data;
};

// Função para pegar o indicador
export const getActionsByCampus = async (): Promise<ChartData[]> => {
    const response = await axios.get<ChartData[]>(`${API_URL}/indicators/actions-by-campus`);
    return response.data;
};

/**
 * autenticacao  JWT tokens
 */

const TOKEN_KEY = 'access_token';

/**
 * Salva JWT token no localStorage
 */
export const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Pega JWT token do localStorage
 */
export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove JWT token do localStorage
 */
export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

/**
 * Verifica se o usuario esta autenticado
 */
export const isAuthenticated = (): boolean => {
    const token = getToken();
    return token !== null && token !== '';
};


