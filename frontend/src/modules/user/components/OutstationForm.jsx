import React from 'react';

const OutstationForm = ({ 
    outstationMode, 
    setOutstationMode, 
    location, 
    setLocation, 
    dropLocation, 
    setDropLocation, 
    pickupDate, 
    setPickupDate, 
    pickupTime, 
    setPickupTime, 
    returnDate,
    setReturnDate,
    phoneNumber, 
    setPhoneNumber, 
    setView 
}) => {
    return (
        <div className="animate-slide-up">
            <div className="flex gap-2 mb-4">
                {['oneway', 'roundtrip'].map(mode => (
                    <button 
                        key={mode} 
                        onClick={() => setOutstationMode(mode)} 
                        className={`flex-1 py-2.5 text-[9px] font-black uppercase rounded-2xl transition-all ${outstationMode === mode ? 'bg-obsidian text-white' : 'bg-gray-100 text-gray-400'}`}
                    >
                        {mode === 'oneway' ? 'One Way' : 'Round Trip'}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                <div className="relative">
                    <input 
                        type="text" 
                        className="form-input" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                    />
                    <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1">Pickup Location</span>
                </div>
                
                <div className="relative">
                    <input 
                        type="text" 
                        className="form-input" 
                        value={dropLocation} 
                        onChange={(e) => setDropLocation(e.target.value)} 
                        placeholder="Drop Location" 
                    />
                    <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1">Drop Destination</span>
                </div>

                <div className="flex gap-2">
                    <div className="custom-date-wrapper">
                        <input type="date" className="form-input" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
                        {!pickupDate && <div className="custom-date-placeholder"><span>Date</span></div>}
                    </div>
                    <div className="custom-date-wrapper">
                        <input type="time" className="form-input" value={pickupTime} onChange={e => setPickupTime(e.target.value)} />
                        {!pickupTime && <div className="custom-date-placeholder"><span>Time</span></div>}
                    </div>
                </div>

                {outstationMode === 'roundtrip' && (
                    <div className="relative">
                        <div className="custom-date-wrapper">
                            <input type="date" className="form-input" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
                            {!returnDate && <div className="custom-date-placeholder"><span>Return Date</span></div>}
                        </div>
                        <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1">Return Date</span>
                    </div>
                )}

                <input 
                    type="tel" 
                    className="form-input" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    placeholder="+91 Phone number" 
                />

                <button 
                    onClick={() => setView('results')} 
                    className="primary-btn flex items-center justify-center gap-3"
                >
                    <span>Check Fare</span>
                </button>
            </div>
        </div>
    );
};

export default OutstationForm;
