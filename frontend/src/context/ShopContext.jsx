import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
    // Mock shop state returning the structure expected by DashboardPage
    const [orders, setOrders] = useState({});
    const [products, setProducts] = useState([]);
    const [returns, setReturns] = useState({});
    const [users, setUsers] = useState([]);

    return (
        <ShopContext.Provider value={{ orders, setOrders, products, setProducts, returns, setReturns, users, setUsers }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (context === null) {
        // Return dummy values if provider is missing to avoid crashing
        return { orders: {}, products: [], returns: {}, users: [] };
    }
    return context;
};
