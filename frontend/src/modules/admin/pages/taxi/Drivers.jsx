import React, { useState } from 'react';
import { Search, PlusCircle, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

const Drivers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const driversData = [
        { id: 1, nid: 'NT-1', name: 'Kumar', email: 'manjukumar504@gmail.com', phone: '9343733353', vehicle: 'SEDAN', vNo: 'Ka01ad5992', location: 'Btm', wallet: '679.00', rides: 45, commission: '8%', status: 'Enable', date: '2021-09-24 23:53:41' },
        { id: 2, nid: 'NT-2', name: 'Saravana', email: 'support@nammataxi.com', phone: '8940832927', vehicle: 'SEDAN', vNo: 'KA01 AE 0695', location: 'madiwala', wallet: '3,976.00', rides: 152, commission: '0%', status: 'Disable', date: '2021-09-25 11:41:10' },
        { id: 3, nid: 'NT-3', name: 'Pawan', email: 'support@nammataxi.com', phone: '7337762821', vehicle: 'SEDAN', vNo: 'KA01 AE 9504', location: 'madiwala', wallet: '26.00', rides: 117, commission: '0%', status: 'Disable', date: '2021-09-25 11:42:43' },
        { id: 4, nid: 'NT-4', name: 'Rinku banerjee', email: 'support@nammataxi.com', phone: '6362555650', vehicle: 'SEDAN', vNo: 'KA01 AE 0694', location: 'madiwala', wallet: '1,343.00', rides: 200, commission: '0%', status: 'Disable', date: '2021-09-25 11:44:42' },
        { id: 5, nid: 'NT-5', name: 'Mahindra', email: 'support@nammataxi.com', phone: '9663321833', vehicle: 'SEDAN', vNo: 'KA03 AC 4788', location: 'madiwala', wallet: '4,774.00', rides: 111, commission: '0%', status: 'Disable', date: '2021-09-25 11:46:49' },
        { id: 6, nid: 'NT-6', name: 'JAGADISH', email: 'support@nammataxi.com', phone: '9901448880', vehicle: 'SEDAN', vNo: 'KA01 AD 3112', location: 'Koramangala', wallet: '5,555.00', rides: 54, commission: '0%', status: 'Disable', date: '2021-09-25 11:48:08' },
        { id: 7, nid: 'NT-7', name: 'ABHISHEK', email: 'support@nammataxi.com', phone: '8861444922', vehicle: 'SEDAN', vNo: 'KA01 AC 0366', location: 'AIRPORT', wallet: '822.00', rides: 6, commission: '0%', status: 'Disable', date: '2021-09-25 11:49:51' },
        { id: 8, nid: 'NT-8', name: 'DEEPU', email: 'support@nammataxi.com', phone: '7899402860', vehicle: 'SEDAN', vNo: 'KA01 AD 4147', location: 'kormangala', wallet: '268.00', rides: 4, commission: '0%', status: 'Disable', date: '2021-09-25 11:52:09' },
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
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">DRIVER LIST</h1>
            </div>

            {/* Action Bar - Production Cyan Theme */}
            <div className="mb-4 flex items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2 flex-1">
                    <input 
                        type="text" 
                        placeholder="Name/Email/Phone/Vehicle" 
                        className="w-full max-w-[320px] px-3 py-1.5 border border-gray-200 rounded-none text-[13px] focus:outline-none focus:border-gray-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="px-14 py-1.5 bg-black hover:bg-zinc-800 text-white font-bold text-[15px] rounded-none transition-all tracking-tight uppercase">
                        Search
                    </button>
                </div>
                
                <button className="hover:scale-110 transition-transform active:scale-95 flex-shrink-0">
                    <div className="w-9 h-9 bg-gradient-to-b from-[#A6D96A] to-[#88C54D] rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)] border border-white/30 mr-1">
                        <PlusCircle size={32} className="text-white fill-[#88C54D] stroke-[1px]" />
                    </div>
                </button>
            </div>

            {/* Driver Table - High Density & Production Parity */}
            <div className="border border-gray-200 rounded-none overflow-hidden overflow-x-auto">
                <table className="w-full border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-[#FDFDFD] border-b border-gray-200">
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200 w-[60px]">Sr No.</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">ID/NAME</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Email</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Phone</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Vehicle Number</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Location</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Wallet</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Number Of Rides</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Commission</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Status</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black">Join Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {driversData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-2 py-3 text-[12px] text-gray-700 border-r border-gray-200">{index + 1}</td>
                                <td className="px-2 py-3 border-r border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-[#E53935]">{item.nid}</span>
                                        <span className="text-[12px] text-black font-medium">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-2 py-3 text-[11px] text-gray-600 border-r border-gray-200">{item.email}</td>
                                <td className="px-2 py-3 text-[12px] text-gray-700 border-r border-gray-200">{item.phone}</td>
                                <td className="px-2 py-3 border-r border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold text-[#E53935]">{item.vehicle}</span>
                                        <span className="text-[11px] text-black font-medium">{item.vNo}</span>
                                    </div>
                                </td>
                                <td className="px-2 py-3 text-[12px] text-gray-700 border-r border-gray-200">{item.location}</td>
                                <td className="px-2 py-3 border-r border-gray-200">
                                    <span className="text-[12px] font-medium text-black">{item.wallet} ₹</span>
                                </td>
                                <td className="px-2 py-3 text-[12px] text-center text-black border-r border-gray-200">{item.rides}</td>
                                <td className="px-2 py-3 text-[12px] text-black border-r border-gray-200">{item.commission}</td>
                                <td className="px-2 py-3 border-r border-gray-200">
                                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-tight text-white
                                        ${item.status === 'Enable' ? 'bg-[#88C54D]' : 'bg-[#FF4B55]'}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-2 py-3 text-[11px] text-gray-600">{item.date}</td>
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

export default Drivers;
