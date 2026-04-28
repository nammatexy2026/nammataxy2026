import React, { useState } from 'react';
import { Search, ListFilter } from 'lucide-react';

const StaffReports = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const reportData = [
        { name: 'ARUNA', data: Array(11).fill({ top: 0, bottom: 0 }), totals: { top: 0, bottom: 0 } },
        { name: 'Kumar', data: Array(11).fill({ top: 0, bottom: 0 }), totals: { top: 0, bottom: 0 } },
        { name: 'Manju', data: Array(11).fill({ top: 0, bottom: 0 }), totals: { top: 0, bottom: 0 } },
        { name: 'Manthraa', data: Array(11).fill({ top: 0, bottom: 0 }), totals: { top: 0, bottom: 0 } },
        { name: 'NAGARAJ', data: Array(11).fill({ top: 0, bottom: 0 }), totals: { top: 0, bottom: 0 } },
        { name: 'praveen', data: Array(11).fill({ top: 0, bottom: 0 }), totals: { top: 0, bottom: 0 } },
        { name: 'shwetha', data: Array(11).fill({ top: 0, bottom: 0 }), totals: { top: 0, bottom: 0 } },
        { name: 'Vikash Yadav', data: [
            { top: 0, bottom: 0 }, { top: 0, bottom: 0 }, { top: 0, bottom: 0 }, { top: 0, bottom: 0 }, 
            { top: 0, bottom: 0 }, { top: 0, bottom: 0 }, { top: 0, bottom: 2 }, { top: 0, bottom: 0 }, 
            { top: 0, bottom: 0 }, { top: 0, bottom: 1 }, { top: 0, bottom: 0 }
        ], totals: { top: 0, bottom: 3 } },
    ];

    const columns = [
        'BUS 33', 'BUS 49', 'HATCHBACK', 'Mini Bus', 'MINI BUS 25', 'MINI BUS 28', 
        'SEDAN', 'SUV 6', 'SUV 7', 'Tempo Traveller', 'Toyota Innova Crysta'
    ];

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                
                /* High-Visibility Industrial Slider */
                .industrial-slider::-webkit-scrollbar {
                    height: 12px;
                    display: block !important;
                }
                .industrial-slider::-webkit-scrollbar-track {
                    background: #EEEEEE;
                    border: 1px solid #DDDDDD;
                }
                .industrial-slider::-webkit-scrollbar-thumb {
                    background: #444444;
                    border: 2px solid #EEEEEE;
                }
                .industrial-slider::-webkit-scrollbar-thumb:hover {
                    background: #000000;
                }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-4">
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">Staff's Reports</h1>
            </div>

            {/* Date Filter & Table Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                <div className="border border-gray-200 p-1.5 rounded-none max-w-xs bg-white">
                    <input type="text" value="23-04-2026" readOnly className="w-full px-3 py-1 border border-gray-100 rounded-none text-[12px] text-gray-600 bg-gray-50" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[12px] text-gray-500">
                        Show <select className="px-1 py-0.5 border border-gray-300 rounded-none bg-white"><option>50</option></select> entries
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-[12px] text-gray-500">Search:</label>
                        <input type="text" className="px-2 py-0.5 border border-gray-300 rounded-none text-[12px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Report Table - Fixed Identity & Definitive Slider */}
            <div className="relative border border-gray-200 rounded-none shadow-sm overflow-hidden">
                <div className="overflow-x-auto industrial-slider" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table className="w-max border-collapse">
                        <thead>
                            <tr className="bg-[#FDFDFD] border-b border-gray-200">
                                {/* Sticky Header */}
                                <th className="sticky left-0 z-30 bg-white px-4 py-3 text-left text-[13px] font-bold text-black border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] min-w-[150px]">
                                    <div className="flex items-center gap-1">Staff's <ListFilter size={12} className="text-gray-300" /></div>
                                </th>
                                {columns.map(col => (
                                    <th key={col} className="px-6 py-3 text-left text-[11px] font-bold text-black border-r border-gray-100 whitespace-nowrap min-w-[140px]">
                                        <div className="flex items-center gap-1">{col} <ListFilter size={12} className="text-gray-300" /></div>
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-left text-[12px] font-bold text-black border-r border-gray-100 min-w-[140px]">Totals</th>
                                <th className="px-6 py-3 text-left text-[12px] font-bold text-black border-r border-gray-100 min-w-[140px]">Checkin</th>
                                <th className="px-6 py-3 text-left text-[12px] font-bold text-black min-w-[140px]">Check out</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reportData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                    {/* Sticky Row Identity */}
                                    <td className="sticky left-0 z-20 bg-white group-hover:bg-gray-50 px-4 py-4 text-[13px] text-gray-700 border-r border-gray-200 font-bold shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-colors">
                                        {item.name}
                                    </td>
                                    {item.data.map((box, bIdx) => (
                                        <td key={bIdx} className="px-4 py-2 border-r border-gray-100">
                                            <div className="flex flex-col gap-1">
                                                <div className="bg-[#FFF9C4] text-[#827717] px-3 py-1.5 text-[11px] font-bold rounded-sm text-center shadow-sm">
                                                    {box.top}
                                                </div>
                                                <div className="bg-[#DCEDC8] text-[#33691E] px-3 py-1.5 text-[11px] font-bold rounded-sm text-center shadow-sm">
                                                    {box.bottom}
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                    <td className="px-4 py-2 border-r border-gray-100">
                                        <div className="flex flex-col gap-1">
                                            <div className="bg-[#FFF9C4] text-[#827717] px-3 py-1.5 text-[11px] font-bold rounded-sm text-center shadow-sm">
                                                {item.totals.top}
                                            </div>
                                            <div className="bg-[#DCEDC8] text-[#33691E] px-3 py-1.5 text-[11px] font-bold rounded-sm text-center shadow-sm">
                                                {item.totals.bottom}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-r border-gray-100"></td>
                                    <td className="px-6 py-4"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination / Info */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                <div className="text-[12px] text-gray-400 font-medium italic">
                    Showing 1 to {reportData.length} of {reportData.length} entries
                </div>
                <div className="flex items-center border border-gray-200 rounded-none text-[12px] overflow-hidden">
                    <button className="px-3 py-1 text-gray-400 hover:bg-gray-50 border-r border-gray-200">Prev</button>
                    <button className="px-3 py-1 bg-[#007BFF] text-white font-bold border-r border-gray-200">1</button>
                    <button className="px-3 py-1 text-gray-400 hover:bg-gray-50">Next</button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-[11px] text-gray-400 py-6 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default StaffReports;
