import React, { useState } from 'react';

const Settings = () => {
    const [config, setConfig] = useState({
        nammaTaxi: { phone1: '80 4112 4112', phone2: '88 8441 8188', whatsapp: '8884418188' },
        bangaloreAirportTaxi: { phone1: '88 8441 1167', phone2: '88 8441 1994', whatsapp: '8884411994' }
    });

    const handleSave = (section) => {
        console.log(`Saving ${section} configuration...`);
    };

    const renderInput = (section, field, label) => (
        <div className="flex-1 min-w-[200px]">
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">{label}</label>
            <input 
                type="text" 
                value={config[section][field]}
                onChange={(e) => setConfig({
                    ...config,
                    [section]: { ...config[section], [field]: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-none text-[14px] text-gray-800 focus:outline-none focus:border-cyan-500 bg-white transition-colors"
            />
        </div>
    );

    return (
        <div className="p-2 md:p-6 bg-white min-h-screen font-inter animate-in fade-in duration-500">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                `}
            </style>

            {/* NAMMATXI Section */}
            <div className="mb-12">
                <h2 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto mb-6">NAMMATXI</h2>
                <div className="flex flex-col md:flex-row items-end gap-4 max-w-6xl">
                    {renderInput('nammaTaxi', 'phone1', 'Phone 1')}
                    {renderInput('nammaTaxi', 'phone2', 'Phone 2')}
                    {renderInput('nammaTaxi', 'whatsapp', 'Whatsapp')}
                    <button 
                        onClick={() => handleSave('NAMMATXI')}
                        className="w-full md:w-auto px-16 py-2.5 bg-[#00CCE5] hover:bg-cyan-500 text-white font-bold text-[15px] rounded-none transition-all uppercase tracking-tight shadow-sm"
                    >
                        Save
                    </button>
                </div>
            </div>

            {/* Bangalore Airport Taxi Section */}
            <div className="mb-12">
                <h2 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto mb-6">Bangalore Airport Taxi</h2>
                <div className="flex flex-col md:flex-row items-end gap-4 max-w-6xl">
                    {renderInput('bangaloreAirportTaxi', 'phone1', 'Phone 1')}
                    {renderInput('bangaloreAirportTaxi', 'phone2', 'Phone 2')}
                    {renderInput('bangaloreAirportTaxi', 'whatsapp', 'Whatsapp')}
                    <button 
                        onClick={() => handleSave('Bangalore Airport Taxi')}
                        className="w-full md:w-auto px-16 py-2.5 bg-[#00CCE5] hover:bg-cyan-500 text-white font-bold text-[15px] rounded-none transition-all uppercase tracking-tight shadow-sm"
                    >
                        Save
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-20 text-center text-[11px] text-gray-400 py-6 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default Settings;
