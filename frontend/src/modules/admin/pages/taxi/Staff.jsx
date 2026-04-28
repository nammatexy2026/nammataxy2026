import React, { useState } from 'react';
import { PlusCircle, Pencil, ListFilter } from 'lucide-react';

const Staff = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const staffData = [
        { id: 1, name: 'ARUNA', email: 'aruna@nammataxi.com', phone: '9731770275', address: 'E-CITY', role: 'Staff', status: 'Enable', created: 'Created by karthik raj 16-04-2026 10:29:30 AM', updated: 'Updated by karthik raj 16-04-2026 10:29:30 AM' },
        { id: 2, name: 'NAGARAJ', email: 'NAGARAJ@NAMMATAXI.COM', phone: '7829770928', address: 'JP NAGER', role: 'Admin', status: 'Enable', created: 'Created by karthik raj 29-03-2026 10:09:35 AM', updated: 'Updated by karthik raj 29-03-2026 10:09:35 AM' },
        { id: 3, name: 'praveen', email: 'praveen@nammataxi.com', phone: '9003320148', address: 'Munnekollal,', role: 'Admin', status: 'Enable', created: 'Created by karthik raj 01-10-2025 02:07:23 PM', updated: 'Updated by karthik raj 01-10-2025 02:07:23 PM' },
        { id: 4, name: 'manthraa', email: 'manthraa@nammataxi.com', phone: '8884411167', address: 'btm', role: 'Admin', status: 'Enable', created: 'Created by karthik raj 17-04-2025 07:27:03 PM', updated: 'Updated by karthik raj 17-04-2025 07:27:03 PM' },
        { id: 5, name: 'kaushik', email: 'kaushik@nammataxi.com', phone: '7975559874', address: 'btm', role: 'Admin', status: 'Disable', created: 'Created by karthik raj 29-03-2025 06:42:42 PM', updated: 'Updated by karthik raj 29-03-2025 06:42:42 PM' },
        { id: 6, name: 'shwetha', email: 'shwetha2597@gmail.com', phone: '8867601130', address: 'bommanahalli', role: 'Admin', status: 'Disable', created: 'Created by karthik raj 27-02-2025 10:03:56 AM', updated: 'Updated by karthik raj 27-02-2025 10:03:56 AM' },
        { id: 7, name: 'vasantha', email: 'vassu.kn@gmail.com', phone: '8892005634', address: 'kr puram', role: 'Admin', status: 'Enable', created: 'Created by karthik raj 06-02-2025 01:27:38 PM', updated: 'Updated by karthik raj 06-02-2025 01:27:38 PM' },
        { id: 8, name: 'shankar', email: 'shankar@nammataxi.com', phone: '9886655009', address: 'btm', role: 'Admin', status: 'Enable', created: 'Created by karthik raj 02-01-2025 10:13:20 PM', updated: 'Updated by karthik raj 02-01-2025 10:13:20 PM' },
        { id: 9, name: 'kumar', email: '123@nammataxi.com', phone: '9343733353', address: 'btm', role: 'Staff', status: 'Enable', created: 'Created by karthik raj 31-12-2024 08:28:19 PM', updated: 'Updated by karthik raj 31-12-2024 08:28:19 PM' },
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
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">STAFF LISTS</h1>
            </div>

            {/* Action Bar */}
            <div className="mb-4 flex items-center justify-end gap-4 px-1">
                <button className="hover:scale-110 transition-transform active:scale-95 flex-shrink-0 mr-1">
                    <div className="w-9 h-9 bg-gradient-to-b from-[#A6D96A] to-[#88C54D] rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)] border border-white/30">
                        <PlusCircle size={32} className="text-white fill-[#88C54D] stroke-[1px]" />
                    </div>
                </button>
            </div>

            {/* Staff Table - High Density & Production Parity */}
            <div className="border border-gray-200 rounded-none overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full border-collapse min-w-[1100px]">
                    <thead>
                        <tr className="bg-white border-b border-gray-200">
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[60px]">Sr No.</th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">Name</th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">Email</th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">Phone</th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">Address</th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">Role</th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">Status</th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">Created/Updated</th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {staffData.map((item, index) => (
                            <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'} hover:bg-gray-50 transition-colors`}>
                                <td className="px-3 py-4 text-[13px] text-gray-700 border-r border-gray-100">{index + 1}</td>
                                <td className="px-3 py-4 text-[13px] text-black font-medium border-r border-gray-100 uppercase">{item.name}</td>
                                <td className="px-3 py-4 text-[12px] text-gray-600 border-r border-gray-100">{item.email}</td>
                                <td className="px-3 py-4 text-[13px] text-gray-700 border-r border-gray-100">{item.phone}</td>
                                <td className="px-3 py-4 text-[13px] text-gray-600 border-r border-gray-100 uppercase">{item.address}</td>
                                <td className="px-3 py-4 text-[13px] text-gray-700 border-r border-gray-100">{item.role}</td>
                                <td className="px-3 py-4 border-r border-gray-100">
                                    <span className={`px-3 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-tight text-white
                                        ${item.status === 'Enable' ? 'bg-[#88C54D]' : 'bg-[#FF4B55]'}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-3 py-4 border-r border-gray-100 min-w-[200px]">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-[#88C54D]">Created by karthik raj</span>
                                            <span className="text-[10px] text-cyan-600 font-medium">{item.created.split('raj ')[1]}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-[#88C54D]">Updated by karthik raj</span>
                                            <span className="text-[10px] text-cyan-600 font-medium">{item.updated.split('raj ')[1]}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-4">
                                    <div className="flex items-center gap-3">
                                        <button className="text-[#F9A825] hover:opacity-70 transition-opacity">
                                            <Pencil size={18} fill="currentColor" stroke="none" />
                                        </button>
                                        {/* Production Toggle */}
                                        <div className={`w-11 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center
                                            ${item.status === 'Enable' ? 'bg-[#88C54D]' : 'bg-[#D1D5DB]'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform
                                                ${item.status === 'Enable' ? 'translate-x-6' : 'translate-x-0'}`}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Copyright */}
            <div className="mt-8 text-center text-[12px] text-gray-400 py-4 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default Staff;
