const TOKEN_KEY = 'userId';

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}