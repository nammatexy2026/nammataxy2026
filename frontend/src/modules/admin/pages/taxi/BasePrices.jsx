import React from 'react';
import { IndianRupee, MapPin, Navigation, Info, Edit, ArrowRight } from 'lucide-react';

const BasePrices = () => {
    const prices = [
        { id: 1, route: 'Airport Transfer', type: 'Pickup', vehicle: 'Sedan Premium', price: '₹750', extraKm: '₹15/km', extraTime: '₹2/min' },
        { id: 2, route: 'Airport Transfer', type: 'Drop', vehicle: 'SUV Luxury', price: '₹1200', extraKm: '₹22/km', extraTime: '₹3/min' },
        { id: 3, route: 'Outstation', type: 'Round Trip', vehicle: 'Sedan Premium', price: '₹14/km', minKm: '250km/day', driverAllowance: '₹300' },
        { id: 4, route: 'Local Rental', type: '4hr / 40km', vehicle: 'Compact Hatch', price: '₹800', extraKm: '₹12/km', extraTime: '₹2/min' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left font-outfit">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                <div>
                    <h1 className="text-2xl font-serif font-black text-black tracking-tight uppercase">Base Pricing</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Configure standard fares and additional charges</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-lg active:scale-95">
                    Update All Fares
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prices.map((price) => (
                    <div key={price.id} className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-xl transition-all group relative">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-black/5 group-hover:bg-gold/10 transition-colors">
                                <IndianRupee size={20} className="text-black group-hover:text-gold transition-colors" />
                            </div>
                            <div>
                                <h3 className="font-black text-black uppercase tracking-tight">{price.route}</h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{price.type}</span>
                                    <span className="text-gray-200 text-[8px]">•</span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{price.vehicle}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 mb-6 grid grid-cols-2 gap-4 border border-black/5">
                            <div>
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Standard Fare</p>
                                <p className="text-2xl font-serif font-black text-black">{price.price}</p>
                            </div>
                            <div className="flex flex-col justify-end text-right">
                                <div className="flex items-center justify-end gap-1 text-emerald-500">
                                    <Info size={10} />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">Verified Rate</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Extra Distance</span>
                                <span className="text-[10px] font-black text-black">{price.extraKm || price.minKm}</span>
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Extra Time / Allowance</span>
                                <span className="text-[10px] font-black text-black">{price.extraTime || price.driverAllowance}</span>
                            </div>
                        </div>

                        <button className="absolute top-8 right-8 p-3 text-gray-300 hover:text-gold transition-all">
                            <Edit size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BasePrices;
