import React from 'react';

const ToursForm = ({ 
    selectedPackage, 
    setSelectedPackage, 
    location, 
    setLocation, 
    pickupDate, 
    setPickupDate, 
    pickupTime, 
    setPickupTime, 
    phoneNumber, 
    setPhoneNumber, 
    setView 
}) => {
    const packages = [
        "1 DAY TRIP ARUNACHALAM/TIRUVANNAMALAI PACKAGE 450 KM",
        "1 DAY TRIP HOGENAKKAL FALLS PACKAGE 300 KM",
        "1 DAY TRIP LEPAKSHI & ISHA/ADIYOGI PACKAGE 300 KM",
        "3 DAY TRIP MYSORE & COORG/MADIKERI PACKAGE KM",
        "4 Hours 40 KM",
        "8 Hours 8 hrs Isha Foundation Chikkaballapura 160 km KM",
        "8 Hours 8 hrs Nandi Hills Roundtrip 160 km KM",
        "8 Hours 80 KM",
        "10 Hours 10 HRS Nandi Hills + Isha Foundation 200 KM",
        "10 Hours KOTILINGESHWARA+ 200KM PACKAGE KM",
        "12 Hours KOTILINGESHWARA + ISHA FOUNDATION 300KM PACKAGE KM",
        "24 Hours DAY TRIP MYSORE PACKAGE KM"
    ];

    return (
        <div className="animate-slide-up space-y-3">
            <div className="relative">
                <select 
                    className="form-input appearance-none pr-8" 
                    value={selectedPackage} 
                    onChange={(e) => setSelectedPackage(e.target.value)}
                >
                    <option value="">Select Package</option>
                    {packages.map((pkg, index) => (
                        <option key={index} value={pkg}>{pkg}</option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1">Tours Package</span>
            </div>
            
            <div className="relative">
                <input 
                    type="text" 
                    className="form-input" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Pickup Location"
                />
                <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1">Live Pickup</span>
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
                <span>Check Packages</span>
            </button>
        </div>
    );
};

export default ToursForm;
