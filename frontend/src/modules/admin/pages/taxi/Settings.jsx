import React, { useState, useEffect } from 'react';
import api from '../../../../lib/api';
import { Loader2, Save, CheckCircle } from 'lucide-react';

const Settings = () => {
    const [config, setConfig] = useState({
        nammaTaxi: { phone1: '', phone2: '', whatsapp: '', email: '' },
        bangaloreAirportTaxi: { phone1: '', phone2: '', whatsapp: '', email: '' }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(null); // 'nammaTaxi' or 'bangaloreAirportTaxi'

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await api.get('/settings');
            if (res && res.data) {
                const dbConfig = res.data;
                setConfig({
                    nammaTaxi: {
                        phone1: dbConfig.nammaTaxi?.phone1 || '80 4112 4112',
                        phone2: dbConfig.nammaTaxi?.phone2 || '88 8441 8188',
                        whatsapp: dbConfig.nammaTaxi?.whatsapp || '8884418188',
                        email: dbConfig.nammaTaxi?.email || 'support@nammataxi.com'
                    },
                    bangaloreAirportTaxi: {
                        phone1: dbConfig.bangaloreAirportTaxi?.phone1 || '88 8441 1167',
                        phone2: dbConfig.bangaloreAirportTaxi?.phone2 || '88 8441 1994',
                        whatsapp: dbConfig.bangaloreAirportTaxi?.whatsapp || '8884411994',
                        email: dbConfig.bangaloreAirportTaxi?.email || 'support@bangaloreairporttaxi.com'
                    }
                });
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async (section) => {
        try {
            setSaving(section);
            await api.patch('/settings', {
                key: section,
                value: config[section],
                description: `Global contact settings for ${section}`
            });
            alert(`${section.toUpperCase()} configuration deployed.`);
        } catch (error) {
            alert('Failed to deploy configuration.');
        } finally {
            setSaving(null);
        }
    };

    const renderInput = (section, field, label) => (
        <div className="flex-1 min-w-[140px]">
            <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-0.5">{label}</label>
            <input 
                type="text" 
                value={config[section][field]}
                onChange={(e) => setConfig({
                    ...config,
                    [section]: { ...config[section], [field]: e.target.value }
                })}
                className="w-full px-2.5 py-1.5 border border-gray-100 rounded-none text-[11px] font-bold text-black focus:outline-none focus:border-black bg-gray-50/20 transition-all uppercase tracking-tight"
                placeholder="NOT_SET"
            />
        </div>
    );

    if (loading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center gap-2">
                <Loader2 className="animate-spin text-black" size={32} />
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Polling Global Config...</p>
            </div>
        );
    }

    return (
        <div className="p-0.5 md:p-1.5 bg-[#F8F9FA] min-h-screen font-inter animate-in fade-in duration-300 text-left relative selection:bg-black selection:text-white">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                `}
            </style>

            {/* Header Command Bar */}
            <div className="bg-white border border-gray-200 px-3 py-2.5 mb-1.5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-2 text-left">
                    <div className="w-1.5 h-6 bg-black"></div>
                    <div>
                        <h1 className="text-[14px] font-black text-black uppercase tracking-tighter font-roboto leading-none">GLOBAL_CONFIG</h1>
                        <p className="text-[7px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none mt-1">Operational Infrastructure</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100">
                    <CheckCircle size={10} className="text-emerald-500" />
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-left">SYSTEM_STABLE_v3.0</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-1.5 px-0.5">
                {/* NAMMATXI Section */}
                <div className="bg-white border border-gray-200 p-4 relative group shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-black"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-left">
                            <span className="text-[10px] font-black text-white bg-black px-1.5 py-0.5">01</span>
                            <h2 className="text-[14px] font-black text-black uppercase tracking-tight font-roboto">NAMMA_TAXI BRAND INTERFACE</h2>
                        </div>
                        <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest italic hidden sm:block">Primary_Fleet_Control</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        {renderInput('nammaTaxi', 'phone1', 'Phone Line 1')}
                        {renderInput('nammaTaxi', 'phone2', 'Phone Line 2')}
                        {renderInput('nammaTaxi', 'whatsapp', 'WhatsApp Hub')}
                        {renderInput('nammaTaxi', 'email', 'Support Email')}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end text-left">
                        <button 
                            disabled={saving === 'nammaTaxi'}
                            onClick={() => handleSave('nammaTaxi')}
                            className="bg-black hover:bg-zinc-800 text-[#F7DC9D] px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 text-left"
                        >
                            {saving === 'nammaTaxi' ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />}
                            COMMIT_NAMMA_CONFIG
                        </button>
                    </div>
                </div>

                {/* Bangalore Airport Taxi Section */}
                <div className="bg-white border border-gray-200 p-4 relative group shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-[#00CCE5]"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-left">
                            <span className="text-[10px] font-black text-white bg-[#00CCE5] px-1.5 py-0.5">02</span>
                            <h2 className="text-[14px] font-black text-black uppercase tracking-tight font-roboto">AIRPORT_TAXI BRAND INTERFACE</h2>
                        </div>
                        <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest italic hidden sm:block">Specialized_Airport_Division</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        {renderInput('bangaloreAirportTaxi', 'phone1', 'Phone Line 1')}
                        {renderInput('bangaloreAirportTaxi', 'phone2', 'Phone Line 2')}
                        {renderInput('bangaloreAirportTaxi', 'whatsapp', 'WhatsApp Hub')}
                        {renderInput('bangaloreAirportTaxi', 'email', 'Support Email')}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end text-left">
                        <button 
                            disabled={saving === 'bangaloreAirportTaxi'}
                            onClick={() => handleSave('bangaloreAirportTaxi')}
                            className="bg-[#00CCE5] hover:bg-cyan-500 text-black px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 text-left"
                        >
                            {saving === 'bangaloreAirportTaxi' ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />}
                            COMMIT_AIRPORT_CONFIG
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-6 text-center text-[7px] font-black text-gray-300 py-6 uppercase tracking-[0.5em] border-t border-gray-100">
                NAMMA_TAXI // INFRASTRUCTURE_DEPT // 2026
            </div>
        </div>
    );
};

export default Settings;
