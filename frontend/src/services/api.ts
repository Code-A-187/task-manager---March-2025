const API_BASE_URL = 'http://localhost:3000'

export const login = async(email: string, password: string) => {
    const response  = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json
}

export const register = async(email:string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify( {email, password }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json
}