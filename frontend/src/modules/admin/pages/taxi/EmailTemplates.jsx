import React, { useState } from 'react';

const EmailTemplates = () => {
    const templates = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=300&auto=format&fit=crop',
            package: 'Airport Taxi',
            tripType: 'Airport Drop',
            title: 'Airport Drop upto 20% off.',
            description: 'Namma taxi offers the best taxi service in bangalore for your airport drop journey.Get your taxi at 20% off. Book in advance.Book a fixed-price taxi in Bangalore Airport taxi.'
        }
    ];

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                
                /* High-Visibility Industrial Slider */
                .industrial-slider::-webkit-scrollbar {
                    height: 8px;
                    display: block !important;
                }
                .industrial-slider::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .industrial-slider::-webkit-scrollbar-thumb {
                    background: #333;
                }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">Email Templates</h1>
                <button className="bg-[#28A745] hover:bg-[#218838] text-white px-4 py-1.5 text-[12px] font-bold rounded-none transition-colors flex items-center gap-2 uppercase">
                    + Add New Template
                </button>
            </div>

            {/* Template Table - High Density & Compact */}
            <div className="border border-gray-200 rounded-none shadow-sm overflow-hidden">
                <div className="overflow-x-auto industrial-slider">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-[#FDFDFD] border-b border-gray-200">
                                <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[60px]">S No.</th>
                                <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[120px]">Image</th>
                                <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[140px]">Package</th>
                                <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[140px]">Trip Type</th>
                                <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100 w-[180px]">Title</th>
                                <th className="px-3 py-3 text-left text-[13px] font-bold text-black border-r border-gray-100">Description</th>
                                <th className="px-3 py-3 text-center text-[13px] font-bold text-black w-[100px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {templates.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors align-top">
                                    <td className="px-3 py-4 text-[13px] text-gray-700 border-r border-gray-100">{index + 1}</td>
                                    <td className="px-3 py-4 border-r border-gray-100">
                                        <div className="w-[100px] h-[60px] overflow-hidden rounded-none border border-gray-200 shadow-sm bg-gray-50">
                                            <img src={item.image} alt="Template" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 text-[13px] text-gray-700 border-r border-gray-100 font-bold">{item.package}</td>
                                    <td className="px-3 py-4 text-[13px] text-gray-700 border-r border-gray-100 font-bold">{item.tripType}</td>
                                    <td className="px-3 py-4 text-[13px] text-black font-bold border-r border-gray-100 leading-snug">{item.title}</td>
                                    <td className="px-3 py-4 text-[11.5px] text-gray-500 border-r border-gray-100 leading-relaxed italic">
                                        {item.description}
                                    </td>
                                    <td className="px-3 py-4">
                                        <div className="flex flex-col gap-2">
                                            <button className="bg-[#007BFF] hover:bg-[#0069D9] text-white py-1.5 px-3 text-[11px] font-bold rounded-none transition-colors uppercase tracking-wider">
                                                Edit
                                            </button>
                                            <button className="bg-[#DC3545] hover:bg-[#C82333] text-white py-1.5 px-3 text-[11px] font-bold rounded-none transition-colors uppercase tracking-wider">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-12 text-center text-[11px] text-gray-400 py-6 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default EmailTemplates;
