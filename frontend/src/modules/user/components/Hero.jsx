import React from 'react';

const Hero = ({ heroTaxi }) => {
    return (
        <>
            <div className="px-6 pt-2 pb-2 relative overflow-hidden">
                <div className="relative z-10 w-3/4">
                    <h1 className="text-xl font-black leading-[1.1] mb-1">
                        Premium <span className="text-primary italic">Namma</span> taxi only here
                    </h1>
                    <p className="text-gray-400 text-[9px] font-medium leading-relaxed">
                        Book luxury airport transfer in seconds.
                    </p>
                </div>
                <img src={heroTaxi} className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-[160px] opacity-80 pointer-events-none" alt="luxury car" />
            </div>
            <div className="px-6 mb-4 mt-2">
                <div className="glass-panel rounded-2xl flex items-center px-4 py-2.5 gap-3 shadow-sm border-white">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="Search destinations..." className="bg-transparent border-none outline-none text-xs font-medium w-full" />
                </div>
            </div>
        </>
    );
};

export default Hero;
