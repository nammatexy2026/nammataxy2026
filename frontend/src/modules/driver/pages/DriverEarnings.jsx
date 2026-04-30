import React, { useState, useEffect } from 'react';
import { Wallet, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import api from '../../../lib/api';

const DriverEarnings = () => {
    const [earnings, setEarnings] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchEarnings = async () => {
        try {
            setLoading(true);
            const res = await api.get('/driver/earnings');
            if (res && res.data) {
                setEarnings(res.data.earnings);
                setSummary(res.data.summary);
            }
        } catch (error) {
            console.error('Failed to fetch earnings', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEarnings();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 font-outfit">
            <div className="w-8 h-8 border-4 border-[#F7DC9D] border-t-black rounded-full animate-spin mb-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Updating Ledger...</span>
        </div>
    );

    return (
        <div className="space-y-8 font-outfit">
            <header className="flex flex-col gap-1 mb-2">
                <h2 className="text-2xl font-serif font-black uppercase text-black">Earnings</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Your settlement summary</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black p-6 rounded-[2.5rem] text-[#F7DC9D]">
                    <div className="flex items-center justify-between mb-4">
                        <Wallet size={18} />
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Pending</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-serif font-black tracking-tight">₹{summary?.pending?.amount.toLocaleString() || 0}</span>
                        <span className="text-[8px] font-bold uppercase opacity-50">{summary?.pending?.count || 0} Trips</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-4 text-emerald-600">
                        <CheckCircle size={18} />
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50 text-gray-400">Settled</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-serif font-black text-black tracking-tight">₹{summary?.settled?.amount.toLocaleString() || 0}</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{summary?.settled?.count || 0} Trips</span>
                    </div>
                </div>
            </div>

            {/* Recent Earnings List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">Trip History</h3>
                </div>

                {earnings.length === 0 ? (
                    <div className="bg-white p-12 rounded-[2.5rem] border border-black/5 text-center">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No trip earnings yet</span>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {earnings.map((item) => (
                            <div key={item._id} className="bg-white p-5 rounded-[2rem] border border-black/5 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${item.settlementStatus === 'settled' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
                                        <ArrowUpRight size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-black uppercase tracking-tight">{item.bookingRef}</span>
                                        <span className="text-[9px] font-bold text-gray-400">{(new Date(item.createdAt)).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-black text-black">₹{item.earningAmount}</span>
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${item.settlementStatus === 'settled' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {item.settlementStatus}
                                    </span>
                                    {item.payoutBatchId && (
                                        <span className="text-[7px] font-bold text-gray-400 uppercase mt-1">Paid in: {item.payoutBatchId.batchRef}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverEarnings;
