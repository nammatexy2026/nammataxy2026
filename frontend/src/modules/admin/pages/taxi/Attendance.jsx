import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

const Attendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const attendanceData = [
        { id: 1, employee: 'Vikash Yadav', checkIn: '11/12/2025 07:08:01', checkOut: '', workHours: '' },
        { id: 2, employee: 'Vikash Yadav', checkIn: '28/10/2025 04:37:29', checkOut: '28/10/2025 04:37:42', workHours: '00:00:13' },
        { id: 3, employee: 'Vikash Yadav', checkIn: '25/10/2025 11:54:48', checkOut: '', workHours: '' },
        { id: 4, employee: 'Vikash Yadav', checkIn: '11/10/2025 03:27:27', checkOut: '11/10/2025 03:27:33', workHours: '00:00:06' },
        { id: 5, employee: 'Vikash Yadav', checkIn: '06/10/2025 11:34:19', checkOut: '', workHours: '' },
        { id: 6, employee: 'Vikash Yadav', checkIn: '01/10/2025 02:12:24', checkOut: '', workHours: '' },
        { id: 7, employee: 'Vikash Yadav', checkIn: '30/09/2025 07:43:09', checkOut: '', workHours: '' },
        { id: 8, employee: 'Vikash Yadav', checkIn: '21/09/2025 05:54:27', checkOut: '21/09/2025 05:54:52', workHours: '00:00:25' },
        { id: 9, employee: 'Vikash Yadav', checkIn: '12/03/2025 02:52:04', checkOut: '12/03/2025 02:53:03', workHours: '00:00:59' },
        { id: 10, employee: 'Vikash Yadav', checkIn: '27/02/2025 05:12:03', checkOut: '27/02/2025 05:12:10', workHours: '00:00:07' },
        { id: 11, employee: 'Vikash Yadav', checkIn: '23/02/2025 11:35:55', checkOut: '', workHours: '' },
        { id: 12, employee: 'Vikash Yadav', checkIn: '20/02/2025 01:30:29', checkOut: '', workHours: '' },
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
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">ATTENDANCE</h1>
            </div>

            {/* Controls Section - Production Style */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                    Show 
                    <select className="px-2 py-1 border border-gray-300 rounded-none focus:outline-none bg-white">
                        <option>10</option>
                        <option>25</option>
                        <option selected>50</option>
                        <option>100</option>
                    </select>
                    entries
                </div>
                
                <div className="flex items-center gap-2">
                    <label className="text-[13px] text-gray-600">Search:</label>
                    <input 
                        type="text" 
                        className="px-2 py-1 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-[13px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Attendance Table - High Density & Production Parity */}
            <div className="border border-gray-200 rounded-none overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-white border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[250px]">
                                <div className="flex items-center gap-1">Employee <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                            <th className="px-4 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">
                                <div className="flex items-center gap-1">Check In <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                            <th className="px-4 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">
                                <div className="flex items-center gap-1">Check out <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                            <th className="px-4 py-3 text-left text-[13px] font-bold text-black w-[150px]">
                                <div className="flex items-center gap-1">Work hours <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {attendanceData.map((item, index) => (
                            <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'} hover:bg-gray-50 transition-colors`}>
                                <td className="px-4 py-3 text-[13px] text-black border-r border-gray-100 font-medium">{item.employee}</td>
                                <td className="px-4 py-3 text-[13px] text-gray-700 border-r border-gray-100">{item.checkIn}</td>
                                <td className="px-4 py-3 text-[13px] text-gray-700 border-r border-gray-100">{item.checkOut || '-'}</td>
                                <td className="px-4 py-3 text-[13px] text-black font-medium">{item.workHours || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer Info */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                <div className="text-[12px] text-gray-500 font-medium">
                    Showing 1 to 12 of 29 entries
                </div>
                <div className="flex items-center border border-gray-200 rounded-none overflow-hidden">
                    <button className="px-3 py-1.5 text-gray-400 hover:bg-gray-50 border-r border-gray-200 transition-colors text-[13px]">Prev</button>
                    <button className="px-4 py-1.5 bg-[#007BFF] text-white text-[13px] border-r border-gray-200 font-bold">1</button>
                    <button className="px-3 py-1.5 text-gray-400 hover:bg-gray-50 transition-colors text-[13px]">Next</button>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-8 text-center text-[12px] text-gray-400 py-4 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default Attendance;
