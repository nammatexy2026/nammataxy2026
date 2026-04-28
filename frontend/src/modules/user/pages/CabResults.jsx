import React from 'react';

const CabResults = ({ cabs, setView, setSelectedCab }) => {
    return (
        <div className="animate-slide-up px-4 pt-8">
            <div className="flex items-center gap-4 mb-6 px-2">
                <button 
                    onClick={() => setView('home')} 
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="font-extrabold text-lg">Available Cabs</h2>
            </div>
            <div className="space-y-3">
                {cabs.map(cab => (
                    <div 
                        key={cab.id} 
                        onClick={() => { setSelectedCab(cab); setView('details'); }} 
                        className="cab-result-card cursor-pointer"
                    >
                        <div className="cab-img-box">
                            <img src={cab.img} className="w-full h-auto max-h-[60px] object-contain" alt={cab.name} />
                        </div>
                        <div className="cab-info">
                            <span className="text-[8px] font-black text-primary uppercase mb-0.5">{cab.brand}</span>
                            <h3 className="font-extrabold text-sm text-gray-800 leading-tight">{cab.name}</h3>
                            <div className="flex gap-2 mt-1">
                                <span className="text-[9px] font-bold text-gray-400 uppercase">{cab.seats} Seater</span>
                                <span className={`text-[9px] font-bold uppercase ${cab.ac ? 'text-green-500' : 'text-red-500'}`}>
                                    • {cab.ac ? 'AC' : 'Non-AC'}
                                </span>
                            </div>
                        </div>
                        <div className="cab-price-box">
                            <div className="font-black text-base text-obsidian">{cab.price}</div>
                            <span className="text-[8px] font-bold text-gray-400 underline">Select</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CabResults;
