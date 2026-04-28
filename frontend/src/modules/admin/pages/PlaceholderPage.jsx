import React from 'react';
import { useLocation } from 'react-router-dom';

const PlaceholderPage = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-2xl font-black text-[#1E1E1E] uppercase tracking-tight mb-2">Page Under Construction</h2>
            <p className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                Route: <span className="text-primary font-bold">{location.pathname}</span>
            </p>
            <p className="text-xs text-gray-400 mt-4 max-w-md">
                This page has been linked in the sidebar but the actual component file hasn't been created yet. You can build it in the future.
            </p>
        </div>
    );
};

export default PlaceholderPage;
