import axios from 'axios';


const API_BASE_URL = 'http://127.0.0.1:8000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface SignupRequest {
    username: string;
    password: string;
}

export interface SignupResponse {
    id?: number;
    username: string;
    message?: string;
}

/**
 * Login user 

 */
export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await apiClient.post<LoginResponse>(
            '/login',
            formData,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || 'Erro ao fazer login');
        }
        throw new Error('Erro ao fazer login');
    }
};

/**
 * Registro de novo user
 */
export const signup = async (username: string, password: string): Promise<SignupResponse> => {
    try {
        const response = await apiClient.post<SignupResponse>('/register', {
            username,
            password,
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || 'Erro ao criar conta');
        }
        throw new Error('Erro ao criar conta');
    }
};

export default apiClient;
