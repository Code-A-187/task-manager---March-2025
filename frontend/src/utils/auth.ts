export const storeToke = (token: string) => {
    localStorage.setItem("jwtToken", token);
};

export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export const clearToken = () => {
    return localStorage.removeItem("jwtToken");
};