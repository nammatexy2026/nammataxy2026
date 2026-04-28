import React, { useState } from 'react';
import { PlusCircle, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';

const CarCategories = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const categories = [
        { id: 1, name: 'TATA ACE', image: null, seats: 2, status: 'Disable', createdOn: '2024-06-29 13:07:28' },
        { id: 2, name: 'BUS 49', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 49, status: 'Enable', createdOn: '2022-03-22 21:52:15' },
        { id: 3, name: 'BUS 33', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 33, status: 'Enable', createdOn: '2022-03-22 21:51:36' },
        { id: 4, name: 'MINI BUS 28', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 28, status: 'Enable', createdOn: '2022-03-22 21:48:01' },
        { id: 5, name: 'MINI BUS 25', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 25, status: 'Enable', createdOn: '2022-03-22 21:47:32' },
        { id: 6, name: 'Mini Bus', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 21, status: 'Enable', createdOn: '2021-09-15 15:00:09' },
        { id: 7, name: 'Tempo Traveller', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 12, status: 'Enable', createdOn: '2021-09-15 14:57:46' },
        { id: 8, name: 'Toyota Innova Crysta', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 7, status: 'Enable', createdOn: '2021-09-12 14:16:55' },
        { id: 9, name: 'SUV 7', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 7, status: 'Enable', createdOn: '2021-09-10 13:43:32' },
        { id: 10, name: 'SUV 6', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', seats: 6, status: 'Enable', createdOn: '2021-09-10 13:43:19' },
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
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">CAR CATEGORY</h1>
            </div>

            {/* Filter Section - Reverting to Production Colors */}
            <div className="mb-4 flex items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2 flex-1">
                    <input 
                        type="text" 
                        placeholder="Search Name .." 
                        className="w-full max-w-[240px] px-3 py-1.5 border border-gray-300 rounded-none text-[13px] focus:outline-none focus:border-gray-500 transition-colors placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="px-10 py-1.5 bg-black hover:bg-zinc-800 text-white font-bold text-[14px] rounded-none transition-all uppercase tracking-tight">
                        Search
                    </button>
                </div>
                
                <button className="hover:scale-110 transition-transform active:scale-95 flex-shrink-0">
                    <div className="w-9 h-9 bg-gradient-to-b from-[#A6D96A] to-[#88C54D] rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)] border border-white/30 mr-1">
                        <PlusCircle size={32} className="text-white fill-[#88C54D] stroke-[1px]" />
                    </div>
                </button>
            </div>

            {/* Table Section - Production Theme with High Density */}
            <div className="border border-gray-200 rounded-none overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#FDFDFD] border-b border-gray-200">
                            <th className="px-3 py-2.5 text-left text-[13px] font-bold text-[#1a1a1a] border-r border-gray-200 w-[70px]">Sr No.</th>
                            <th className="px-3 py-2.5 text-left text-[13px] font-bold text-[#1a1a1a] border-r border-gray-200">Name</th>
                            <th className="px-3 py-2.5 text-center text-[13px] font-bold text-[#1a1a1a] border-r border-gray-200">Image</th>
                            <th className="px-3 py-2.5 text-left text-[13px] font-bold text-[#1a1a1a] border-r border-gray-200 w-[80px]">Seats</th>
                            <th className="px-3 py-2.5 text-left text-[13px] font-bold text-[#1a1a1a] border-r border-gray-200 w-[100px]">Status</th>
                            <th className="px-3 py-2.5 text-left text-[13px] font-bold text-[#1a1a1a] border-r border-gray-200">Created On</th>
                            <th className="px-3 py-2.5 text-left text-[13px] font-bold text-[#1a1a1a] w-[100px]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {categories.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-3 py-2 text-[13px] text-[#333] border-r border-gray-200">{index + 1}</td>
                                <td className="px-3 py-2 text-[13px] font-medium text-[#1a1a1a] border-r border-gray-200">{item.name}</td>
                                <td className="px-3 py-2 border-r border-gray-200">
                                    <div className="flex justify-center h-10">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="h-full w-auto object-contain" />
                                        ) : (
                                            <img src="https://via.placeholder.com/40" className="opacity-0 grayscale" alt="Missing" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-3 py-2 text-[13px] text-[#333] border-r border-gray-200">{item.seats}</td>
                                <td className="px-3 py-2 border-r border-gray-200">
                                    <span className={`px-3 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-tight
                                        ${item.status === 'Enable' 
                                            ? 'bg-[#88C54D] text-white' 
                                            : 'bg-[#FF4B55] text-white'}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-[12px] text-[#555] border-r border-gray-200">{item.createdOn}</td>
                                <td className="px-3 py-2">
                                    <div className="flex items-center gap-3">
                                        {/* Production Style Toggle */}
                                        <div className={`w-11 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center
                                            ${item.status === 'Enable' ? 'bg-[#88C54D]' : 'bg-[#D1D5DB]'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform
                                                ${item.status === 'Enable' ? 'translate-x-6' : 'translate-x-0'}`}
                                            ></div>
                                        </div>
                                        <button className="text-[#F9A825] hover:opacity-70 transition-opacity">
                                            <Pencil size={18} fill="currentColor" stroke="none" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section - Production Blue Theme */}
            <div className="mt-4 flex justify-end">
                <div className="flex items-center border border-gray-200 rounded-none overflow-hidden">
                    <button className="px-2 py-1 text-gray-400 hover:bg-gray-50 border-r border-gray-200 transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="px-3 py-1 bg-[#007BFF] text-white text-[13px] font-bold border-r border-gray-200">1</button>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-[13px] border-r border-gray-200 transition-colors">2</button>
                    <button className="px-2 py-1 text-[#007BFF] hover:bg-gray-50 transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-6 text-center text-[12px] text-[#8a8a8a] py-4 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default CarCategories;
