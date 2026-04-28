import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

const VehicleAttachments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const attachmentsData = [
        { id: 1, type: 'SEDAN', name: 'Muhammed Ashiq Kijekkar', email: 'mashiksadath@gmail.com', phone: '8714525286', address: 'Sri Suryodhaya Garden, Cheemasandra, Bengaluru, Karnataka, 560049' },
        { id: 2, type: 'SEDAN', name: 'TG GOPINATH', email: 'aradhyavid25@gmail.com', phone: '8546886607', address: 'RR nagar Bengaluru 560098' },
        { id: 3, type: 'Toyota Innova Crysta', name: 'Harish H V', email: 'hariklr92@gmail.com', phone: '9886167288', address: 'Aralimarada Hosahalli (v)Nayakarahalli (po) Kolar (T&D)' },
        { id: 4, type: 'SEDAN', name: 'Chethan Kumar VJ', email: 'ckumarvj@gmail.com', phone: '8123273539', address: '65 is 1st cross 1st main road H M Nayak Road Jai Maruti Nagar NANDIN' },
        { id: 5, type: 'Toyota Innova Crysta', name: 'VENKATESWAR RAO KARUMURI', email: 'venkat_kk2@yahoo.co.in', phone: '7532973076', address: 'CORONA GRACIEUX, TOWER C, flat 204' },
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
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">VEHICLE ATTACHMENTS</h1>
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

            {/* Table Section - High Density & Production Colors */}
            <div className="border border-gray-200 rounded-none overflow-hidden overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-white border-b border-gray-200">
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[50px]">
                                <div className="flex items-center gap-1"># <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[140px]">
                                <div className="flex items-center gap-1">Type <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[200px]">
                                <div className="flex items-center gap-1">Name <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[200px]">
                                <div className="flex items-center gap-1">Email <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[120px]">
                                <div className="flex items-center gap-1">Phone <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                            <th className="px-3 py-3 text-left text-[13px] font-bold text-black">
                                <div className="flex items-center gap-1">Address <ListFilter size={12} className="text-gray-300" /></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {attachmentsData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-3 py-4 text-[13px] text-gray-700 border-r border-gray-100">{item.id}</td>
                                <td className="px-3 py-4 text-[12px] font-medium text-black border-r border-gray-100 uppercase">{item.type}</td>
                                <td className="px-3 py-4 text-[13px] text-black border-r border-gray-100">{item.name}</td>
                                <td className="px-3 py-4 text-[12px] text-gray-600 border-r border-gray-100">{item.email}</td>
                                <td className="px-3 py-4 text-[13px] text-gray-700 border-r border-gray-100">{item.phone}</td>
                                <td className="px-3 py-4 text-[12px] text-gray-600 leading-tight">{item.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer Style Section */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                <div className="text-[12px] text-gray-500 font-medium">
                    Showing 1 to 5 of 5 entries
                </div>
                <div className="flex items-center border border-gray-200 rounded-none overflow-hidden">
                    <button className="px-3 py-1.5 text-gray-400 hover:bg-gray-50 border-r border-gray-200 transition-colors text-[13px]">Previous</button>
                    <button className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[13px] border-r border-gray-200 font-medium">1</button>
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

export default VehicleAttachments;
