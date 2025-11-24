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
