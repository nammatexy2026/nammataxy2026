import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, CheckCircle, AlertCircle, User } from 'lucide-react';
import api from '../../../lib/api';

const SmartDispatchPicker = ({ booking, onAssign }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [conflicts, setConflicts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            const [recRes, conRes] = await Promise.all([
                api.get(`/bookings/${booking._id}/recommendations`),
                api.get(`/bookings/${booking._id}/conflicts`)
            ]);
            if (recRes && recRes.data) setRecommendations(recRes.data);
            if (conRes && conRes.data) setConflicts(conRes.data);
        } catch (error) {
            console.error('Failed to fetch dispatch intelligence', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchRecommendations();
        }
    }, [isOpen, booking._id]);

    return (
        <div className="relative font-outfit">
            {/* Conflict Warnings */}
            {conflicts.length > 0 && (
                <div className="absolute -top-6 right-0 flex gap-1">
                    {conflicts.map((c, i) => (
                        <div key={i} className={`p-1 rounded-full ${c.severity === 'high' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white shadow-sm'}`} title={c.message}>
                            <AlertCircle size={10} />
                        </div>
                    ))}
                </div>
            )}

            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl border transition-all ${
                    isOpen ? 'border-[#F7DC9D] bg-white shadow-lg' : 'border-black/5 bg-gray-50/50 hover:bg-white hover:border-black/10'
                }`}
            >
                <div className="flex items-center gap-2">
                    <User size={14} className={booking.assignedDriver ? 'text-black' : 'text-gray-300'} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${booking.assignedDriver ? 'text-black' : 'text-gray-400'}`}>
                        {booking.assignedDriver ? booking.assignedDriver.name : 'Assign Driver'}
                    </span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-black/5 shadow-2xl rounded-[1.5rem] z-[100] overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    <div className="p-4 bg-black text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-[#F7DC9D]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Smart Recommendations</span>
                        </div>
                        {loading && <div className="w-3 h-3 border-2 border-[#F7DC9D] border-t-transparent rounded-full animate-spin" />}
                    </div>

                    <div className="max-h-64 overflow-y-auto p-2 space-y-1 scrollbar-hide">
                        {recommendations.length === 0 && !loading ? (
                            <div className="py-8 text-center">
                                <span className="text-[10px] font-bold text-gray-300 uppercase italic">No active drivers found</span>
                            </div>
                        ) : recommendations.map((rec) => (
                            <button
                                key={rec.driver._id}
                                onClick={() => {
                                    onAssign(rec.driver._id);
                                    setIsOpen(false);
                                }}
                                className="w-full p-3 rounded-xl hover:bg-gray-50 text-left transition-all group border border-transparent hover:border-black/5"
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-black text-black uppercase">{rec.driver.name}</span>
                                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                                        rec.score > 70 ? 'bg-emerald-50 text-emerald-600' : 
                                        rec.score > 40 ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        {rec.score}% Match
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {rec.reasons.slice(0, 3).map((r, i) => (
                                        <span key={i} className={`text-[7px] font-bold uppercase tracking-tight px-1.5 py-0.5 rounded-sm ${
                                            r.includes('Mismatch') || r.includes('conflict') ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>

                    {conflicts.length > 0 && (
                        <div className="p-4 bg-amber-50 border-t border-amber-100">
                            <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-2 block">Operational Warnings</span>
                            <div className="space-y-1">
                                {conflicts.map((c, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <AlertCircle size={10} className="text-amber-500" />
                                        <span className="text-[9px] font-bold text-amber-700 leading-tight">{c.message}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SmartDispatchPicker;
