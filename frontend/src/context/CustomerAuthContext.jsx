import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const CustomerAuthContext = createContext(null);

export const CustomerAuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('customer_token');
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    if (res && res.data) {
                        setCustomer(res.data);
                    } else {
                        logoutCustomer();
                    }
                } catch (err) {
                    console.error('Customer session verification failed:', err);
                    logoutCustomer();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const loginCustomer = (userData, token) => {
        localStorage.setItem('customer_token', token);
        setCustomer(userData);
    };

    const logoutCustomer = () => {
        localStorage.removeItem('customer_token');
        setCustomer(null);
    };

    return (
        <CustomerAuthContext.Provider value={{ customer, setCustomer, loading, loginCustomer, logoutCustomer }}>
            {children}
        </CustomerAuthContext.Provider>
    );
};

export const useCustomerAuth = () => useContext(CustomerAuthContext);
