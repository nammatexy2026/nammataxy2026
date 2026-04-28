import React from 'react';

const Success = ({ selectedCab, setView }) => {
    return (
        <div className="animate-slide-up flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
            <div className="success-ring">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="text-3xl font-black mb-2 text-obsidian font-manrope">Booking Verified!</h1>
            <p className="text-gray-400 text-sm mb-10 leading-relaxed font-semibold">
                Your {selectedCab?.brand} {selectedCab?.name} has been reserved successfully.
            </p>
            <button 
                onClick={() => setView('home')} 
                className="primary-btn w-[220px]"
            >
                Return to Home
            </button>
        </div>
    );
};

export default Success;
