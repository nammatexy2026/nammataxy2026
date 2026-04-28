import React from 'react';
import { Search, Filter, Download, MoreVertical, Eye, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

const AllBookings = ({ title = "All Bookings", filterStatus = null }) => {
    const allBookings = [
        { id: 'NT-8679', customer: 'Vikash Yadav', phone: '9876543210', car: 'Sedan Premium', date: '2026-04-22', time: '14:30', status: 'Completed', amount: '₹750' },
        { id: 'NT-8678', customer: 'Amit Kumar', phone: '9988776655', car: 'SUV Luxury', date: '2026-04-22', time: '16:00', status: 'Running', amount: '₹1200' },
        { id: 'NT-8677', customer: 'Neha Singh', phone: '9122334455', car: 'Compact Hatch', date: '2026-04-21', time: '10:00', status: 'Cancelled', amount: '₹450' },
        { id: 'NT-8676', customer: 'Rajesh Gupta', phone: '9001122334', car: 'Sedan Premium', date: '2026-04-21', time: '12:00', status: 'Completed', amount: '₹750' },
    ];

    const bookings = filterStatus 
        ? allBookings.filter(b => b.status === filterStatus)
        : allBookings;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Running': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <CheckCircle size={12} />;
            case 'Running': return <Clock size={12} className="animate-pulse" />;
            case 'Cancelled': return <XCircle size={12} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left font-outfit">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                <div>
                    <h1 className="text-2xl font-serif font-black text-black tracking-tight uppercase">{title}</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Master log of all ride requests</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-lg active:scale-95">
                        <Download size={14} />
                        Export Log
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-[2rem] border border-black/5 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by ID, Customer or Phone..." 
                        className="w-full bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-xs font-bold outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-gold transition-colors border border-transparent hover:border-gold/10">
                        <Filter size={18} />
                    </button>
                    <select className="bg-gray-50 border border-transparent focus:border-gold/30 rounded-2xl py-3 px-4 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer pr-10 relative">
                        <option>Sort By: Newest</option>
                        <option>Sort By: Oldest</option>
                        <option>Sort By: Amount</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2rem] border border-black/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-black/5">Booking Details</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-black/5">Customer Info</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-black/5 text-center">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-black/5 text-center">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-black/5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-black uppercase tracking-wider">{booking.id}</span>
                                            <span className="text-[10px] font-bold text-gold italic mt-0.5">{booking.car}</span>
                                            <span className="text-[9px] font-bold text-gray-400 mt-1">{booking.date} • {booking.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-black uppercase tracking-wider">{booking.customer}</span>
                                            <span className="text-[10px] font-bold text-gray-400 mt-0.5">{booking.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className="text-sm font-serif font-black text-black">{booking.amount}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex justify-center">
                                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                                                {getStatusIcon(booking.status)}
                                                {booking.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-lg transition-all">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-black rounded-lg transition-all">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Placeholder */}
                <div className="px-8 py-5 bg-gray-50/50 border-t border-black/5 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing 1-4 of 8,679 bookings</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-black/5 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-black transition-all">Prev</button>
                        <button className="px-4 py-2 bg-black text-white border border-black/5 rounded-xl text-[10px] font-black uppercase shadow-lg active:scale-95">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllBookings;
