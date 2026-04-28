import React from 'react';

const CheckoutForm = ({ 
    selectedCab, 
    setView, 
    userName, 
    setUserName, 
    userEmail, 
    setUserEmail, 
    phoneNumber, 
    userAddress, 
    setUserAddress, 
    handleBookClick, 
    isCheckingAvailability 
}) => {
    return (
        <div className="animate-slide-up px-6 pt-10">
            <button 
                onClick={() => setView('details')} 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-6"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-2xl font-black">User Details</h2>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Booking Total</p>
                    <p className="text-lg font-black text-primary">{selectedCab?.price}</p>
                </div>
            </div>
            <div className="checkout-box space-y-4">
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Full Name" 
                    value={userName} 
                    onChange={e => setUserName(e.target.value)} 
                />
                <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Email Address" 
                    value={userEmail} 
                    onChange={e => setUserEmail(e.target.value)} 
                />
                <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    readOnly 
                />
                <textarea 
                    className="form-input min-h-[100px]" 
                    placeholder="Complete Address" 
                    value={userAddress} 
                    onChange={e => setUserAddress(e.target.value)} 
                />
                <button 
                    onClick={handleBookClick} 
                    disabled={isCheckingAvailability} 
                    className={`primary-btn ${isCheckingAvailability ? 'opacity-50' : ''}`}
                >
                    {isCheckingAvailability ? 'Checking Availability...' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
};

export default CheckoutForm;
