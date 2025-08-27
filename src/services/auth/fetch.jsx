import axios from 'axios';

const API_URL = import.meta.env.VITE_BACK_URL +'api/auth/'; // Replace with your API URL

class AuthService {

    async verify(token) {
        try {
            const response = await axios.get(`${API_URL}verify`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
            );
            return response.data;
        }
        catch (error) {
            console.error('Token verification error:', error);
            throw error;
        }
    }

    async Login(email, password) {
        const data = {
            email,
            password
        };
        try {
            const response = await axios.post(`${API_URL}login`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // if (response.data) {
            //     localStorage.setItem('user', JSON.stringify(response.data));
            // }
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async Register(name, email, password) {
        const data = {
            name,
            email,
            password
        };
        try {
            const response = await axios.post(`${API_URL}register`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async Logout() {
        try {
            const response = await axios.post(`${API_URL}logout`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

}

export default AuthService;
