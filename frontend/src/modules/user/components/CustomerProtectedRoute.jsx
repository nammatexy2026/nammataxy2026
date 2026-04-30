import React from 'react';
import { useCustomerAuth } from '../../../context/CustomerAuthContext';
import CustomerLogin from './CustomerLogin';

const CustomerProtectedRoute = ({ children }) => {
    const { customer, loading } = useCustomerAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!customer) {
        return <CustomerLogin />;
    }

    return children;
};

export default CustomerProtectedRoute;
