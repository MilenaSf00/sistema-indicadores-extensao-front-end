import axios from 'axios';

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
// Função para enviar arquivos CSV
export const uploadProjects = async (files: File[]): Promise<any> => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('files', file);
    });

    const response = await axios.post(
        `${API_URL}/upload-data`,
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
    );

    return response.data;
};

export interface AcaoPorCampus {
    campus: string;
    quantidade: number;
}

export interface IndicatorsResponse {
    acoes_por_campus: AcaoPorCampus[];
    eventos_academicos: number;
    acoes_em_execucao: number;
    acoes_executadas: number;
    [key: string]: any;
}

// Função para pegar todos os indicadores
export const getIndicators = async (): Promise<IndicatorsResponse> => {
    const response = await axios.get(`${API_URL}/indicators`);
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


