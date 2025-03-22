const API_BASE_URL = 'http://localhost:3000'

export const login = async(email: string, password: string) => {
    try {
        const response  = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
            const errorData  = await response.json();
            console.error('API Error:', response.status, errorData);
            throw new Error(errorData.message || 'Login failed');
        }
        
        return response.json();
        
    } catch (error) {
        console.error('Register error:', error);
        throw error
    }
    
};

export const register = async(email: string, password: string) => {
    try{
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Register failed');
        }
        return response.json();
    } catch (error) {
        console.error('Register error:', error);
        throw error
    }
    
};

export const getTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();

};