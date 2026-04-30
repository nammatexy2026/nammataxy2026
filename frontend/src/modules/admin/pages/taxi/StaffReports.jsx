import React, { useState, useEffect } from 'react';
import { Search, ListFilter, Calendar, Loader2, Clock } from 'lucide-react';
import api from '../../../../lib/api';

const StaffReports = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const columns = [
        'BUS 33', 'BUS 49', 'HATCHBACK', 'Mini Bus', 'MINI BUS 25', 'MINI BUS 28', 
        'SEDAN', 'SUV 6', 'SUV 7', 'Tempo Traveller', 'Toyota Innova Crysta'
    ];

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/staff/reports?date=${selectedDate}`);
            if (res && res.data) {
                setReportData(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch staff reports:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [selectedDate]);

    const formatTime = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleTimeString('en-GB', {
            hour: '2-digit', minute: '2-digit'
        });
    };

    const getCountsForCategory = (activity, categoryName) => {
        const item = activity.find(a => a._id === categoryName);
        return item ? { assigned: item.assigned, completed: item.completed } : { assigned: 0, completed: 0 };
    };

    const calculateTotals = (activity) => {
        return activity.reduce((acc, curr) => ({
            assigned: acc.assigned + curr.assigned,
            completed: acc.completed + curr.completed
        }), { assigned: 0, completed: 0 });
    };

    const filteredData = reportData.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500 text-left">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                
                .industrial-slider::-webkit-scrollbar {
                    height: 10px;
                    display: block !important;
                }
                .industrial-slider::-webkit-scrollbar-track {
                    background: #F4F4F4;
                }
                .industrial-slider::-webkit-scrollbar-thumb {
                    background: #CCCCCC;
                    border-radius: 5px;
                }
                .industrial-slider::-webkit-scrollbar-thumb:hover {
                    background: #999999;
                }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">STAFF ACTIVITY REPORTS</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic italic">Performance tracking & workflow audit</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-2 border border-gray-100 rounded-lg">
                    <Calendar size={16} className="text-gray-400" />
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-transparent border-none text-[13px] font-bold focus:outline-none text-gray-700"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Filter Staff:</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input 
                            type="text" 
                            className="pl-9 pr-4 py-2 border border-black/10 rounded-none focus:outline-none focus:border-black text-[13px] bg-gray-50/50 min-w-[250px] transition-colors"
                            placeholder="Type staff name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#FFF9C4] border border-[#FBC02D] rounded-sm"></div>
                        <span>Assigned</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#DCEDC8] border border-[#689F38] rounded-sm"></div>
                        <span>Completed</span>
                    </div>
                </div>
            </div>

            {/* Report Table */}
            <div className="relative border border-gray-200 rounded-none shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto industrial-slider">
                    <table className="w-max border-collapse min-w-full">
                        <thead>
                            <tr className="bg-[#FDFDFD] border-b border-gray-200">
                                <th className="sticky left-0 z-30 bg-white px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-200 shadow-md min-w-[180px]">
                                    Staff Identity
                                </th>
                                {columns.map(col => (
                                    <th key={col} className="px-4 py-4 text-center text-[10px] font-black text-black uppercase tracking-widest border-r border-gray-100 min-w-[120px]">
                                        {col}
                                    </th>
                                ))}
                                <th className="px-6 py-4 text-center text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-200 min-w-[120px] bg-gray-50">
                                    GRAND TOTALS
                                </th>
                                <th className="px-6 py-4 text-center text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-100 min-w-[120px]">
                                    Check-In
                                </th>
                                <th className="px-6 py-4 text-center text-[11px] font-black text-black uppercase tracking-widest min-w-[120px]">
                                    Check-Out
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length + 4} className="px-4 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="animate-spin text-black" size={32} />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compiling Data Reports...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 4} className="px-4 py-20 text-center text-gray-400 italic font-medium">No activity data for this date.</td>
                                </tr>
                            ) : filteredData.map((item, index) => {
                                const totals = calculateTotals(item.activity);
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="sticky left-0 z-20 bg-white group-hover:bg-gray-50 px-4 py-4 border-r border-gray-200 shadow-md transition-colors">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-[#F7DC9D] text-[10px] font-black">
                                                    {item.name?.charAt(0)}
                                                </div>
                                                <p className="text-[13px] font-black text-black uppercase tracking-tight">{item.name}</p>
                                            </div>
                                        </td>
                                        {columns.map(col => {
                                            const counts = getCountsForCategory(item.activity, col);
                                            return (
                                                <td key={col} className="px-3 py-2 border-r border-gray-50">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="bg-[#FFF9C4]/40 text-[#827717] px-2 py-1 text-[11px] font-black rounded-sm text-center border border-[#FFF9C4]">
                                                            {counts.assigned}
                                                        </div>
                                                        <div className="bg-[#DCEDC8]/40 text-[#33691E] px-2 py-1 text-[11px] font-black rounded-sm text-center border border-[#DCEDC8]">
                                                            {counts.completed}
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                        <td className="px-3 py-2 border-r border-gray-200 bg-gray-50/50">
                                            <div className="flex flex-col gap-1">
                                                <div className="bg-[#FFF9C4] text-[#827717] px-2 py-1 text-[11px] font-black rounded-sm text-center shadow-sm border border-[#FBC02D]/20">
                                                    {totals.assigned}
                                                </div>
                                                <div className="bg-[#DCEDC8] text-[#33691E] px-2 py-1 text-[11px] font-black rounded-sm text-center shadow-sm border border-[#689F38]/20">
                                                    {totals.completed}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center border-r border-gray-100 font-bold text-[12px] text-gray-700">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Clock size={12} className="text-gray-300" />
                                                {formatTime(item.checkIn)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center font-bold text-[12px] text-gray-700">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Clock size={12} className="text-gray-300" />
                                                {formatTime(item.checkOut)}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination / Info */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    Reporting Interval: Daily Activity Logs
                </div>
                <div className="flex items-center border border-gray-200 rounded-none overflow-hidden">
                    <button onClick={fetchReports} className="px-6 py-2 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                        Refresh Report
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-[10px] font-bold text-gray-400 py-6 border-t border-gray-100 uppercase tracking-[0.4em]">
                NAMMA TAXI • OPERATIONAL REPORTING SYSTEM
            </div>
        </div>
    );
};

export default StaffReports;
