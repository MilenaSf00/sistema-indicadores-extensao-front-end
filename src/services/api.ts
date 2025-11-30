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
    acoes_por_modalidade: { modalidade: string; quantidade: number }[];
    acoes_por_area_tematica: { area_tematica: string; quantidade: number }[];
    eventos_academicos: number;
    acoes_em_execucao: number;
    acoes_executadas: number;
    percentual_discentes: number;
    total_matriculas_graduacao: number;
    numero_discentes_envolvidos: number;
    numero_discentes_bolsistas: number;
    numero_docentes_envolvidos: number;
    total_docentes: number;
    numero_coordenadores_docentes: number;
    percentual_coordenadores_docentes: number;
    percentual_docentes: number;
    total_taes: number;
    total_tecnicos_envolvidos: number;
    numero_coordenadores_taes: number;
    percentual_coordenadores_taes: number;
    percentual_taes: number;
    total_pessoas_envolvidas: number;
    pessoas_comunidade_externa: number;
    [key: string]: any;
}

// Função para pegar todos os indicadores
export const getIndicators = async (filters: any = {}): Promise<IndicatorsResponse> => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (Array.isArray(value)) {
            value.forEach(val => params.append(key, val));
        } else if (value) {
            params.append(key, value);
        }
    });
    const response = await axios.get(`${API_URL}/indicators`, { params });
    return response.data;
};

export interface FilterOptions {
    campus: string[];
    modalidade: string[];
    area_tematica: string[];
    linha_tematica: string[];
    situacao: string[];
    ano: number[];
    area_conhecimento: string[];
}

export const getFilterOptions = async (): Promise<FilterOptions> => {
    const response = await axios.get(`${API_URL}/filters-options`);
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



export interface ActionDetail {
    titulo_projeto: string;
    campus: string;
    modalidade: string;
    area_conhecimento: string;
    area_tematica: string;
    linha_tematica: string;
    situacao: string;
    ano: number;
    resumo: string;
    numero_discentes_envolvidos?: number;
    numero_docentes_envolvidos?: number;
    total_tecnicos_envolvidos?: number;
    numero_coordenadores_docentes?: number;
    numero_coordenadores_taes?: number;
    pessoas_comunidade_externa?: number;
    [key: string]: any;
}

export const getActionsDetails = async (filters: any = {}): Promise<ActionDetail[]> => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (Array.isArray(value)) {
            value.forEach(val => params.append(key, val));
        } else if (value) {
            params.append(key, value);
        }
    });
    const response = await axios.get(`${API_URL}/indicators/actions-details`, { params });
    return response.data;
};
