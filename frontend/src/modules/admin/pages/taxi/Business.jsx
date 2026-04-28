import React, { useState } from 'react';

const Business = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-[24px] font-black text-black uppercase tracking-tight font-roboto">Business</h1>
            </div>

            {/* Filter Section - Production Style */}
            <div className="bg-white border border-gray-100 p-6 shadow-sm mb-8 rounded-none">
                <div className="flex flex-col md:flex-row items-end gap-4">
                    <div className="flex-1 w-full space-y-1">
                        <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Filter</label>
                        <input 
                            type="text" 
                            placeholder="From"
                            className="w-full px-4 py-2 border border-gray-200 rounded-none text-[14px] focus:outline-none focus:border-cyan-500 transition-colors"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <input 
                            type="text" 
                            placeholder="To"
                            className="w-full px-4 py-2 border border-gray-200 rounded-none text-[14px] focus:outline-none focus:border-cyan-500 transition-colors"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                    <button className="w-full md:w-auto px-16 py-2.5 bg-[#00CCE5] hover:bg-cyan-500 text-white font-bold text-[15px] rounded-none transition-all uppercase tracking-tight">
                        Get Business
                    </button>
                </div>
            </div>

            {/* Business Display Card */}
            <div className="flex justify-center mt-12">
                <div className="w-full max-w-[600px] bg-[#22CD33] p-12 rounded-[15px] shadow-lg text-center transform hover:scale-[1.02] transition-transform">
                    <h2 className="text-white text-[42px] font-black tracking-tight font-roboto mb-2">
                        Today Business
                    </h2>
                    <div className="text-white text-[48px] font-bold">
                        ₹ 0.00
                    </div>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-20 text-center text-[12px] text-gray-400 py-4 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default Business;
