import React, { useState } from 'react';
import { Pencil, ListFilter } from 'lucide-react';

const Keywords = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const keywordData = [
        { 
            id: 1, 
            page: 'Outstation Cabs', 
            title: 'Outstation Taxi in Bangalore | Innova Cabs in Bangalore for Outstation', 
            keywords: 'outstation cabs in bangalore, book outstation taxi from bangalore, One way drop taxi service, outstation tempo traveller in bangalore, innova rent per km in bangalore.', 
            description: 'Hire Outstation Cab in Bangalore for One-Way & Round Trip Taxi from NammaTaxi. Providing best cab service at the lowest fare, enjoy your trip with safe and happy journey. outstation tempo traveller in bangalore, innova rent per km in bangalore.', 
            updatedDate: '2024-07-27 20:40:41' 
        },
        { 
            id: 2, 
            page: 'Aiport Transfer', 
            title: 'Book Airport Taxi Bangalore Pickup Rs.299 and Drop Rs.349 | NammaTaxi', 
            keywords: 'airport taxi bangalore, book airport taxi bangalore, airport cabs bangalore, airport pickup bangalore, airport drop bangalore.', 
            description: 'Hire Taxi for airport pickup and drop bangalore from NammaTaxi. Cheapest Airport taxi Bangalore At Affordable Prices with On time Pick up and drop.', 
            updatedDate: '2021-12-25 12:01:38' 
        },
        { 
            id: 3, 
            page: 'Bangalore Airport Taxi', 
            title: 'Air port Taxi Bangalore | Bangalore City to Airport Cab | Taxi from Bangalore Airport to City', 
            keywords: 'airport taxi bangalore, book airport taxi bangalore, airport cabs bangalore, Airport pickup bangalore, airport drop bangalore.', 
            description: 'Book Taxi for airport pickup and drop Bangalore from NammaTaxi. Cheapest Airport taxi Bangalore At Affordable Prices with On-time Pick up and drop. Air port Taxi Bangalore | Bangalore City to Airport Cab | Taxi from Bangalore Airport to City.', 
            updatedDate: '2024-07-27 20:44:55' 
        },
        { 
            id: 4, 
            page: 'Personal Information', 
            title: 'Bangalore Outstation Cabs at Best Fares - NammaTaxi.com', 
            keywords: 'Bangalore Outstation Cabs', 
            description: 'Namma taxi Service in Bangalore For your Smooth Ride. Hassle Free Booking On our Airport Cab Service & OutStation Cab Service /Affordable Prices Starts @₹399', 
            updatedDate: '2021-12-25 12:30:26' 
        },
    ];

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                
                /* Custom Industrial Scrollbar */
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 0px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 0px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #000;
                }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-4">
                <h1 className="text-[20px] font-black text-black uppercase tracking-tight font-roboto">KEYWORD LIST</h1>
            </div>

            {/* Keyword Table - High Density & Slider Integration */}
            <div className="border border-gray-200 rounded-none shadow-sm overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-[#FDFDFD] border-b border-gray-200">
                                <th className="px-2 py-2.5 text-left text-[12px] font-bold text-black border-r border-gray-100 w-[50px]">Sr No.</th>
                                <th className="px-2 py-2.5 text-left text-[12px] font-bold text-black border-r border-gray-100 w-[140px]">Page</th>
                                <th className="px-2 py-2.5 text-left text-[12px] font-bold text-black border-r border-gray-100 w-[220px]">Title</th>
                                <th className="px-2 py-2.5 text-left text-[12px] font-bold text-black border-r border-gray-100">Keywords</th>
                                <th className="px-2 py-2.5 text-left text-[12px] font-bold text-black border-r border-gray-100">description</th>
                                <th className="px-2 py-2.5 text-left text-[12px] font-bold text-black border-r border-gray-100 w-[140px]">Updated Date</th>
                                <th className="px-2 py-2.5 text-left text-[12px] font-bold text-black w-[70px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {keywordData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors align-top">
                                    <td className="px-2 py-3 text-[12px] text-gray-700 border-r border-gray-100">{index + 1}</td>
                                    <td className="px-2 py-3 text-[12px] text-black font-bold border-r border-gray-100">{item.page}</td>
                                    <td className="px-2 py-3 text-[11px] text-gray-700 border-r border-gray-100 leading-snug">{item.title}</td>
                                    <td className="px-2 py-3 text-[11px] text-gray-500 border-r border-gray-100 leading-snug italic font-medium">{item.keywords}</td>
                                    <td className="px-2 py-3 text-[11px] text-gray-500 border-r border-gray-100 leading-snug">{item.description}</td>
                                    <td className="px-2 py-3 text-[10.5px] text-gray-400 border-r border-gray-100">{item.updatedDate}</td>
                                    <td className="px-2 py-3 text-center">
                                        <button className="text-[#F9A825] hover:opacity-70 transition-opacity">
                                            <Pencil size={16} fill="currentColor" stroke="none" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-8 text-center text-[12px] text-gray-400 py-4 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default Keywords;
