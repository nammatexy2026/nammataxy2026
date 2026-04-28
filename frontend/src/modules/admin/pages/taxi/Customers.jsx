import React, { useState } from 'react';
import { Search, PlusCircle, Mail, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const customersData = [
        { id: 1, name: 'Sunil rd', email: 'sunil@gmail.com', phone: '9108151505', rides: 0, status: 'Old Site', date: '2022-04-18 11:21:49' },
        { id: 2, name: 'aswin', email: 'aswin@gmail.com', phone: '9946440628', rides: 0, status: 'Old Site', date: '2022-04-16 11:39:13' },
        { id: 3, name: 'Prajith p', email: 'prajithp@gmail.com', phone: '8157973053', rides: 0, status: 'Old Site', date: '2022-04-16 00:07:08' },
        { id: 4, name: 'Nitheesh n', email: 'nitheeshn@gmail.com', phone: '9562725832', rides: 0, status: 'Old Site', date: '2022-04-15 15:37:11' },
        { id: 5, name: 'Tijo jojo', email: 'tijojojo@gmail.com', phone: '9496338575', rides: 0, status: 'Old Site', date: '2022-04-14 20:01:21' },
        { id: 6, name: 'Kiran p', email: 'kiranp@gmail.com', phone: '9048386345', rides: 0, status: 'Old Site', date: '2022-04-14 17:09:47' },
        { id: 7, name: 'Sujith s', email: 'sujith@gmail.com', phone: '9400262070', rides: 0, status: 'Old Site', date: '2022-04-14 01:28:43' },
        { id: 8, name: 'test', email: 'test@gmail.com', phone: '8281313467', rides: 0, status: 'Old Site', date: '2022-04-13 18:29:41' },
        { id: 9, name: 'Najeeb n', email: 'najeeb@gmail.com', phone: '9446401662', rides: 0, status: 'Old Site', date: '2022-04-13 14:14:10' },
        { id: 10, name: 'Asif m', email: 'asif@gmail.com', phone: '9495744223', rides: 0, status: 'Old Site', date: '2022-04-13 14:10:48' },
    ];

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">CUSTOMER LIST</h1>
            </div>

            {/* Action Bar - Reverting to Production Style */}
            <div className="mb-4 flex items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2 flex-1">
                    <input 
                        type="text" 
                        placeholder="Search Name Email Number .." 
                        className="w-full max-w-[280px] px-3 py-1.5 border border-black/10 rounded-none text-[13px] focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="px-10 py-1.5 bg-black hover:bg-zinc-800 text-white font-bold text-[14px] rounded-none transition-all uppercase tracking-tight">
                        Search
                    </button>
                </div>
                
                <div className="flex items-center gap-3 flex-shrink-0 mr-1">
                    <button className="text-[#F9A825] hover:scale-110 transition-transform active:scale-95">
                        <div className="bg-white border border-gray-200 p-1.5 rounded-sm shadow-sm">
                            <Mail size={18} fill="#F9A825" className="text-white" />
                        </div>
                    </button>
                    <button className="hover:scale-110 transition-transform active:scale-95">
                        <div className="w-9 h-9 bg-gradient-to-b from-[#A6D96A] to-[#88C54D] rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)] border border-white/30">
                            <PlusCircle size={32} className="text-white fill-[#88C54D] stroke-[1px]" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Customer Table - High Density & Production Parity */}
            <div className="border border-gray-200 rounded-none overflow-hidden overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-[#FDFDFD] border-b border-gray-200">
                            <th className="px-3 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200 w-[60px]">Sr No.</th>
                            <th className="px-3 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Name</th>
                            <th className="px-3 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Email</th>
                            <th className="px-3 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Phone Number</th>
                            <th className="px-3 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Number Of Rides</th>
                            <th className="px-3 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Status</th>
                            <th className="px-3 py-3 text-left text-[12px] font-bold text-black">Join Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {customersData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-3 py-3 text-[12px] text-gray-700 border-r border-gray-200">{index + 1}</td>
                                <td className="px-3 py-3 text-[12px] font-medium text-black border-r border-gray-200 uppercase">{item.name}</td>
                                <td className="px-3 py-3 text-[11px] text-gray-600 border-r border-gray-200">{item.email}</td>
                                <td className="px-3 py-3 text-[12px] text-gray-700 border-r border-gray-200">{item.phone}</td>
                                <td className="px-3 py-3 text-[12px] text-center text-black border-r border-gray-200">{item.rides}</td>
                                <td className="px-3 py-3 border-r border-gray-200">
                                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-tight text-white
                                        ${item.status === 'Old Site' ? 'bg-[#88C54D]' : 'bg-[#FF4B55]'}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-[11px] text-gray-600">{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Copyright */}
            <div className="mt-8 text-center text-[11px] text-gray-400 py-4 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default Customers;
