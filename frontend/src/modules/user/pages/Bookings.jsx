import React, { useState } from 'react';

const Bookings = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);

    const history = [
        { 
            id: 'BK-9921', 
            status: 'Live', 
            date: '24 Apr, 2026', 
            time: '02:30 PM',
            cab: 'Innova Crysta',
            price: '₹1200',
            pickup: 'MG Road, Bengaluru',
            drop: 'Kempegowda Int. Airport',
            driver: 'Rajesh Kumar',
            rating: 4.8
        },
        { 
            id: 'BK-8842', 
            status: 'Completed', 
            date: '22 Apr, 2026', 
            time: '10:00 AM',
            cab: 'Swift Dzire',
            price: '₹450',
            pickup: 'Indiranagar, Bengaluru',
            drop: 'Railway Station',
            driver: 'Suresh Raina',
            rating: 5.0
        },
        { 
            id: 'BK-7712', 
            status: 'Cancelled', 
            date: '20 Apr, 2026', 
            time: '09:15 AM',
            cab: 'Toyota Sedan',
            price: '₹750',
            pickup: 'Koramangala, Bengaluru',
            drop: 'Electronic City',
            driver: 'Amit Shah',
            rating: 4.5
        }
    ];

    if (selectedBooking) {
        return (
            <div className="animate-slide-up px-6 pt-6">
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => setSelectedBooking(null)} 
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-2xl font-black">Trip Details</h1>
                </div>

                <div className="bg-white rounded-[32px] p-8 shadow-sm space-y-6 mb-32">
                    <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking ID</p>
                            <h2 className="text-lg font-black text-obsidian">{selectedBooking.id}</h2>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                            selectedBooking.status === 'Live' ? 'bg-green-100 text-green-600' : 
                            selectedBooking.status === 'Completed' ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-400'
                        }`}>
                            {selectedBooking.status}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-[9px] font-black text-gray-400 uppercase">Pickup Location</p>
                                <p className="text-sm font-bold text-obsidian">{selectedBooking.pickup}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-obsidian/5 flex items-center justify-center text-obsidian flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-[9px] font-black text-gray-400 uppercase">Drop-off Destination</p>
                                <p className="text-sm font-bold text-obsidian">{selectedBooking.drop}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-50">
                        <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase">Vehicle Assigned</p>
                            <p className="text-sm font-black text-obsidian">{selectedBooking.cab}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-gray-400 uppercase">Total Fare</p>
                            <p className="text-xl font-black text-primary">{selectedBooking.price}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shadow-inner">
                            <img src={`https://ui-avatars.com/api/?name=${selectedBooking.driver}&background=random`} alt="driver" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-sm">{selectedBooking.driver}</h4>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <span className="text-[10px] font-black">{selectedBooking.rating}</span>
                            </div>
                        </div>
                        <button className="bg-obsidian text-white p-3.5 rounded-2xl shadow-xl active:scale-95 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-slide-up px-6 pt-6">
            <h1 className="text-2xl font-black mb-8">My Bookings</h1>
            
            <div className="space-y-4 mb-32">
                {history.map(item => (
                    <div 
                        key={item.id} 
                        onClick={() => setSelectedBooking(item)}
                        className="bg-white p-6 rounded-[32px] shadow-sm border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer group active:scale-[0.98]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">{item.date} • {item.time}</span>
                                <h3 className="font-black text-base group-hover:text-primary transition-colors">{item.cab}</h3>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${
                                item.status === 'Live' ? 'bg-green-100 text-green-600' : 
                                item.status === 'Completed' ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-400'
                            }`}>
                                {item.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 text-[11px] font-medium">
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                <span className="truncate">{item.pickup}</span>
                            </div>
                            <svg className="w-3 h-3 flex-shrink-0 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-obsidian flex-shrink-0"></div>
                                <span className="truncate">{item.drop}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookings;
