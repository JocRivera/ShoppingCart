import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/auth/fetch.jsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import { use } from 'react';

export const authService = new AuthService();
export const AuthContext = createContext();

axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            console.log("verifying token")
            const cookies = Cookies.get();
            if (cookies.token) {
                try {
                    const response = await authService.verify(cookies.token);
                    setUser(response.user);
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    console.log("Token verified", response);
                } catch (error) {
                    console.error('Token verification error:', error);
                    setIsAuthenticated(false);
                    setUser(null);
                    setIsLoading(false);
                }
            }
            else {
                console.log("No token found")
                setIsAuthenticated(false);
                setUser(null);
                setIsLoading(false);
            }
        }
        verifyToken();
    }, []);
    const signin = async (user) => {
        try {
            const response = await authService.Login(user.email, user.password);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            Cookies.set('token', response.token, { expires: 1 });
            setUser(response.user);
            setIsAuthenticated(true);
            setErrors([]);
            console.log("User logged in", response.token);
            return response;
        } catch (error) {
            console.error('Login error:', error);
            setErrors([error.message]);
            setIsAuthenticated(false);
            setUser(null);
            return error;
        }
    }

    const signup = async (user) => {
        try {
            const response = await authService.Register(user.name, user.email, user.password);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            Cookies.set('token', response.token, { expires: 1 });
            setUser(response.user);
            setIsAuthenticated(true);
            setErrors([]);
            console.log("User registered", response.token);
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            setErrors([error.message]);
            return error;
        }
    }

    const logout = async () => {
        try {
            await authService.Logout();
            Cookies.remove('token');
            setUser(null);
            setIsAuthenticated(false);
            console.log("User logged out");
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signin, errors, loading, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );

}

