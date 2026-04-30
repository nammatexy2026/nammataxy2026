import React, { useState, useEffect } from 'react';
import api from '../../../../lib/api';
import { Loader2, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const Business = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [businessData, setBusinessData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBusiness = async (params = {}) => {
        try {
            setLoading(true);
            const res = await api.get('/finance/summary', { params });
            if (res && res.data) {
                setBusinessData(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch business data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch today's business by default
        fetchBusiness({ range: 'today' });
    }, []);

    const handleGetBusiness = () => {
        fetchBusiness({ fromDate, toDate });
    };

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500 text-left">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-[24px] font-black text-black uppercase tracking-tight font-roboto">Business Analytics</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Monitor platform revenue and financial health</p>
            </div>

            {/* Filter Section */}
            <div className="bg-white border border-gray-100 p-6 shadow-sm mb-8 rounded-none relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00CCE5]"></div>
                <div className="flex flex-col md:flex-row items-end gap-4">
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input 
                                type="date" 
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-none text-[13px] focus:outline-none focus:border-[#00CCE5] transition-colors bg-gray-50/30 font-bold"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input 
                                type="date" 
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-none text-[13px] focus:outline-none focus:border-[#00CCE5] transition-colors bg-gray-50/30 font-bold"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={handleGetBusiness}
                        disabled={loading}
                        className="w-full md:w-auto px-12 py-2.5 bg-black hover:bg-zinc-800 text-white font-black text-[12px] rounded-none transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : 'Calculate Business'}
                    </button>
                </div>
            </div>

            {/* Business Display Card */}
            <div className="flex flex-col items-center mt-12 gap-8">
                <div className="w-full max-w-[600px] bg-black p-1 bg-gradient-to-br from-emerald-400 to-cyan-400">
                    <div className="bg-white p-12 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp size={120} />
                        </div>
                        <h2 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.3em] font-roboto mb-4 italic">
                            Revenue Snapshot
                        </h2>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-[32px] font-black text-black">₹</span>
                            <div className="text-black text-[64px] font-black tracking-tighter tabular-nums leading-none">
                                {loading ? '---' : (businessData?.grossInflow || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6">
                            {fromDate && toDate ? `Range: ${fromDate} to ${toDate}` : "Today's Live Performance"}
                        </p>
                    </div>
                </div>

                {/* Secondary Stats */}
                {!loading && businessData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[600px]">
                        <div className="bg-gray-50 p-6 border border-gray-100">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Net Profit</p>
                            <p className="text-xl font-black text-emerald-600">₹{businessData.netProfit.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-gray-50 p-6 border border-gray-100">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Driver Payouts</p>
                            <p className="text-xl font-black text-blue-600">₹{businessData.driverPayouts.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Copyright */}
            <div className="mt-20 text-center text-[10px] font-bold text-gray-400 py-8 border-t border-gray-100 uppercase tracking-[0.4em]">
                NAMMA TAXI • BUSINESS INTELLIGENCE
            </div>
        </div>
    );
};

export default Business;
