import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const pathname = window.location.pathname;
            let tokenKey = 'customer_token';
            if (pathname.startsWith('/admin')) tokenKey = 'admin_token';
            else if (pathname.startsWith('/driver')) tokenKey = 'driver_token';

            const token = localStorage.getItem(tokenKey);
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    if (res && res.data) {
                        setUser(res.data);
                    } else {
                        logout(tokenKey);
                    }
                } catch (err) {
                    console.error('Session verification failed:', err);
                    logout(tokenKey);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = (userData, token) => {
        const role = userData.role;
        let tokenKey = 'customer_token';
        if (role === 'admin' || role === 'staff') tokenKey = 'admin_token';
        else if (role === 'driver') tokenKey = 'driver_token';

        localStorage.setItem(tokenKey, token);
        setUser(userData);
    };

    const logout = (key) => {
        if (key && typeof key === 'string') {
            localStorage.removeItem(key);
        } else {
            // Default: clear based on current user role or all
            const role = user?.role;
            if (role === 'admin' || role === 'staff') localStorage.removeItem('admin_token');
            else if (role === 'driver') localStorage.removeItem('driver_token');
            else localStorage.removeItem('customer_token');
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
