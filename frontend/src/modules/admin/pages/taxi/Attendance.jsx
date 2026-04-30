import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ListFilter, User, Clock, Calendar, Loader2 } from 'lucide-react';
import api from '../../../../lib/api';

const Attendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const res = await api.get('/attendance');
            if (res && res.data) {
                setAttendanceData(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const filteredData = attendanceData.filter(item => 
        item.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDateTime = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleString('en-GB', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
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
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">ATTENDANCE LOGS</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Real-time workforce duty tracking</p>
                </div>
                <button 
                    onClick={fetchAttendance}
                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-none font-bold text-[11px] uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-md active:scale-95"
                >
                    Refresh Logs
                </button>
            </div>

            {/* Controls Section */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Search Employee:</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input 
                            type="text" 
                            className="pl-9 pr-4 py-2 border border-black/10 rounded-none focus:outline-none focus:border-black text-[13px] bg-gray-50/50 min-w-[250px] transition-colors"
                            placeholder="Type name .."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="text-[11px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 border border-emerald-100 rounded-lg">
                    System Time: {new Date().toLocaleTimeString()}
                </div>
            </div>

            {/* Attendance Table */}
            <div className="border border-gray-200 rounded-none overflow-hidden overflow-x-auto shadow-sm bg-white">
                <table className="w-full border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-[#FDFDFD] border-b border-gray-200">
                            <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-200">Employee Identity</th>
                            <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-200">Duty Check-In</th>
                            <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-200">Duty Check-Out</th>
                            <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest">Work Duration</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-4 py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="animate-spin text-black" size={32} />
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fetching Workforce Logs...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredData.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-4 py-20 text-center text-gray-400 italic font-medium">No attendance records found.</td>
                            </tr>
                        ) : filteredData.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50/80 transition-colors group">
                                <td className="px-4 py-4 border-r border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white text-[11px] font-black uppercase tracking-tighter shrink-0">
                                            {item.userId?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-black text-black uppercase tracking-tight">{item.userId?.name || 'Unknown'}</p>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className="text-[9px] font-bold text-[#F7DC9D] bg-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest">
                                                    {item.userModel}
                                                </span>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">ID: {item.userId?._id?.substring(20)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-[12px] font-medium text-gray-700 border-r border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-300" />
                                        {formatDateTime(item.checkIn)}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-[12px] font-medium text-gray-700 border-r border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-gray-300" />
                                        {formatDateTime(item.checkOut)}
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[12px] font-black uppercase tracking-widest ${item.checkOut ? 'text-black' : 'text-emerald-500 animate-pulse'}`}>
                                            {item.workHours || 'ON DUTY'}
                                        </span>
                                        {item.checkOut && (
                                            <div className="h-1.5 w-1.5 bg-gray-200 rounded-full" />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Copyright */}
            <div className="mt-12 text-center text-[10px] font-bold text-gray-400 py-6 border-t border-gray-100 uppercase tracking-[0.4em]">
                NAMMA TAXI • WORKFORCE INFRASTRUCTURE
            </div>
        </div>
    );
};

export default Attendance;
