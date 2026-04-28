import React, { useState } from 'react';
import { Search, TrendingUp, Users, Car, ClipboardList, Globe, WifiOff, Calendar, Clock, XCircle, CheckCircle, ZoomIn, ZoomOut, Bell, ChevronDown, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchHistoryChart = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [zoom, setZoom] = useState(1);
    
    const data = [
        { date: '20 Apr 2026', local: 18, airport: 50, outstation: 42 },
        { date: '21 Apr 2026', local: 26, airport: 53, outstation: 46 },
        { date: '22 Apr 2026', local: 41, airport: 51, outstation: 76 },
        { date: '23 Apr 2026', local: 5, airport: 23, outstation: 20 },
    ];
    
    const maxValue = 80;
    const yTicks = [80, 70, 60, 50, 40, 30, 20, 10, 0];

    return (
        <div className="bg-white border border-gray-100 rounded-none p-6 shadow-sm w-full relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[12px] font-black text-black uppercase tracking-[0.25em]">Search Histories (Current Week)</h3>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                        <button onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-400 hover:text-black">
                            <ZoomOut size={14} />
                        </button>
                        <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                        <button onClick={() => setZoom(prev => Math.min(3, prev + 0.2))} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-400 hover:text-black">
                            <ZoomIn size={14} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 border-l border-slate-100 pl-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-black rounded-none"></div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Local</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-slate-600 rounded-none"></div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Airport</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-slate-300 rounded-none"></div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Outstation</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative h-[320px] w-full flex">
                <div className="flex flex-col justify-between h-[260px] pr-5 text-[10px] font-black text-slate-300 z-20 bg-white">
                    {yTicks.map(tick => <span key={tick}>{tick}</span>)}
                </div>

                <div className="flex-1 overflow-x-auto custom-scrollbar relative">
                    <div 
                        className="h-[260px] flex items-end justify-around relative px-10 transition-all duration-300"
                        style={{ width: `${Math.max(100, 100 * zoom)}%`, minWidth: '100%' }}
                    >
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                            {yTicks.map((_, i) => (
                                <div key={i} className="w-full border-t border-slate-50 h-0"></div>
                            ))}
                        </div>

                        {data.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center relative z-10" style={{ width: `${60 * zoom}px` }}>
                                <div className="flex items-end h-[260px] relative" style={{ gap: `${6 * zoom}px` }}>
                                    <div 
                                        className="bg-black rounded-none cursor-pointer hover:brightness-125 transition-all"
                                        style={{ width: `${20 * zoom}px`, height: `${(item.local / maxValue) * 100}%` }}
                                        onMouseEnter={() => setHoveredBar({ ...item, type: 'Local', value: item.local })}
                                        onMouseLeave={() => setHoveredBar(null)}
                                    />
                                    <div 
                                        className="bg-slate-600 rounded-none cursor-pointer hover:brightness-125 transition-all"
                                        style={{ width: `${20 * zoom}px`, height: `${(item.airport / maxValue) * 100}%` }}
                                        onMouseEnter={() => setHoveredBar({ ...item, type: 'Airport', value: item.airport })}
                                        onMouseLeave={() => setHoveredBar(null)}
                                    />
                                    <div 
                                        className="bg-slate-300 rounded-none cursor-pointer hover:brightness-125 transition-all"
                                        style={{ width: `${20 * zoom}px`, height: `${(item.outstation / maxValue) * 100}%` }}
                                        onMouseEnter={() => setHoveredBar({ ...item, type: 'Outstation', value: item.outstation })}
                                        onMouseLeave={() => setHoveredBar(null)}
                                    />

                                    <AnimatePresence>
                                        {hoveredBar && hoveredBar.date === item.date && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1.5 text-[10px] rounded-none z-30 shadow-2xl whitespace-nowrap uppercase font-black"
                                            >
                                                {hoveredBar.type}: {hoveredBar.value}
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="absolute -bottom-8 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{item.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-center gap-10 mt-10 pb-2">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-black"></div><span className="text-[10px] font-black text-slate-400 uppercase">Local</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-600"></div><span className="text-[10px] font-black text-slate-400 uppercase">Airport</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-300"></div><span className="text-[10px] font-black text-slate-400 uppercase">Outstation</span></div>
            </div>
        </div>
    );
};

const BusinessReportChart = () => {
    const [hoveredPoint, setHoveredPoint] = useState(null);

    const data = [
        { date: 'Jan 05', value: 18000 }, { date: 'Jan 12', value: 46000 }, { date: 'Jan 13', value: 18000 }, 
        { date: 'Jan 14', value: 22000 }, { date: 'Jan 19', value: 74000 }, { date: 'Jan 20', value: 32000 }, 
        { date: 'Jan 21', value: 28000 }, { date: 'Jan 26', value: 68000 }, { date: 'Jan 27', value: 34000 }, 
        { date: 'Jan 28', value: 124000 }, { date: 'Feb 02', value: 24000 }, { date: 'Feb 03', value: 14000 }, 
        { date: 'Feb 04', value: 26000 }, { date: 'Feb 09', value: 18000 },
        { date: 'Feb 16, 2026', value: 11457 },
        { date: 'Feb 23', value: 48000 }, { date: 'Mar 02', value: 44000 }, { date: 'Mar 09', value: 32000 },
        { date: 'Mar 16', value: 44000 }, { date: 'Mar 23', value: 58000 },
        { date: 'Mar 30', value: 38000 }, { date: 'Apr 06', value: 52000 }, { date: 'Apr 13', value: 41000 },
    ];

    const maxValue = 140000;
    const yTicks = [140000, 120000, 100000, 80000, 60000, 40000, 20000, 0];

    return (
        <div className="bg-white border border-gray-100 rounded-none p-6 shadow-sm w-full relative overflow-hidden">
            <style>
                {`
                .chart-scroller::-webkit-scrollbar {
                    height: 8px;
                }
                .chart-scroller::-webkit-scrollbar-track {
                    background: #f8f9fa;
                    border: 1px solid #eee;
                }
                .chart-scroller::-webkit-scrollbar-thumb {
                    background: #333;
                }
                `}
            </style>
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[12px] font-black text-black uppercase tracking-[0.25em]">Business Report (Current Year)</h3>
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <MoreHorizontal size={14} />
                </div>
            </div>

            {/* Visual Indicator / Scroller Instructions */}
            <div className="w-full h-8 bg-slate-50 rounded-none mb-6 relative flex items-center px-4 border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black">Slide graph below to explore</span>
                </div>
                <div className="absolute left-[10%] right-[10%] h-[2px] bg-slate-300"></div>
                <div className="absolute left-[10%] w-4 h-6 bg-white border border-black shadow-sm flex items-center justify-center">
                    <div className="w-[1px] h-3 bg-black"></div>
                </div>
                <div className="absolute right-[10%] w-4 h-6 bg-white border border-black shadow-sm flex items-center justify-center">
                    <div className="w-[1px] h-3 bg-black"></div>
                </div>
            </div>

            <div className="relative h-[320px] w-full flex">
                <div className="flex flex-col justify-between h-[260px] pr-6 text-[10px] font-black text-slate-400 bg-white z-20">
                    {yTicks.map(tick => <span key={tick}>{tick.toLocaleString()}</span>)}
                </div>

                <div className="flex-1 relative h-[260px] overflow-x-auto chart-scroller industrial-slider">
                    <div className="w-max min-w-full flex flex-col h-full relative" style={{ width: '1200px' }}>
                        {/* Darker Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                            {yTicks.map((_, i) => <div key={i} className="w-full border-t border-slate-200/60 h-0"></div>)}
                        </div>

                        <div className="absolute inset-0 flex justify-between items-end px-10 z-10">
                            {data.map((item, idx) => (
                                <div key={idx} className="relative h-full flex flex-col justify-end group min-w-[40px]">
                                    {/* Vertical Shade */}
                                    <div 
                                        className="absolute bottom-0 w-[14px] bg-slate-100 group-hover:bg-black/10 transition-colors left-1/2 -translate-x-1/2"
                                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                                    ></div>
                                    
                                    {/* Data Dash - Industrial Black */}
                                    <div 
                                        className="absolute w-6 h-[3px] bg-black z-10 cursor-pointer shadow-md group-hover:scale-125 transition-transform left-1/2 -translate-x-1/2"
                                        style={{ bottom: `${(item.value / maxValue) * 100}%` }}
                                        onMouseEnter={() => setHoveredPoint(item)}
                                        onMouseLeave={() => setHoveredPoint(null)}
                                    />

                                    {hoveredPoint === item && (
                                        <>
                                            <div className="absolute h-full w-[1.5px] border-l border-dashed border-black/60 left-1/2 -translate-x-1/2 z-0"></div>
                                            <div className="absolute w-[3000px] border-t border-dashed border-black/30 pointer-events-none" style={{ bottom: `${(item.value / maxValue) * 100}%`, left: '-1500px' }}></div>
                                            <div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ bottom: `${(item.value / maxValue) * 100 + 5}%` }}>
                                                <div className="bg-black text-white px-4 py-2 text-[11px] font-black shadow-2xl border border-white/20 whitespace-nowrap uppercase tracking-wider">₹{item.value.toLocaleString()}</div>
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black rotate-45"></div>
                                            </div>
                                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1.5 text-[10px] font-black whitespace-nowrap z-30 shadow-xl">{item.date}</div>
                                        </>
                                    )}
                                    
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9.5px] font-black text-slate-500 uppercase tracking-tighter whitespace-nowrap">{item.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const stats = [
        { title: 'Customers', value: '7,353', color: '#F7DC9D', icon: <Users size={12} />, trend: '+17%' },
        { title: 'Bookings', value: '8,683', color: '#C5D2C1', icon: <ClipboardList size={12} />, trend: '+23%' },
        { title: 'Running Bks', value: '126', color: '#9DA3F7', icon: <Clock size={12} />, trend: '+5%' },
        { title: 'Cancelled Bks', value: '4,133', color: '#E1BEE7', icon: <XCircle size={12} />, trend: '-2%' },
        { title: 'Completed Bks', value: '4,405', color: '#B2EBF2', icon: <CheckCircle size={12} />, trend: '+12%' },
        { title: 'Online Bks', value: '8,546', color: '#FFCCBC', icon: <Globe size={12} />, trend: '+19%' },
        { title: 'Offline Bks', value: '137', color: '#F8BBD0', icon: <WifiOff size={12} />, trend: '+0%' },
        { title: 'Vehicles', value: '40', color: '#D1C4E9', icon: <Car size={12} />, trend: 'Stable' },
        { title: 'Today Bks', value: '3', color: '#DCEDC8', icon: <Calendar size={12} />, trend: 'Live' },
        { title: 'Today Cancelled', value: '0', color: '#FFECB3', icon: <XCircle size={12} />, trend: '0%' },
        { title: 'Today Completed', value: '0', color: '#B3E5FC', icon: <CheckCircle size={12} />, trend: '0%' },
        { title: 'Today Running', value: '5', color: '#F0F4C3', icon: <Clock size={12} />, trend: 'Active' },
        { title: 'Online Bks', value: '1', color: '#FFE0B2', icon: <Globe size={12} />, trend: 'Live' },
        { title: 'Today Offline', value: '0', color: '#E0F2F1', icon: <WifiOff size={12} />, trend: '0%' },
        { title: 'Adv Bookings', value: '12', color: '#F5F5F5', icon: <Calendar size={12} />, trend: 'Future' },
        { title: 'Free Vehicles', value: '35', color: '#F9FBE7', icon: <Car size={12} />, trend: 'Avail' },
        { title: 'Today Pending', value: '3', color: '#FFF3E0', icon: <Clock size={12} />, trend: 'Wait' },
        { title: 'Total Pending', value: '18', color: '#E8EAF6', icon: <Clock size={12} />, trend: 'All' },
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 font-outfit w-full -mt-2">
            <div className="flex items-center justify-between py-1 px-1 border-b border-gray-50 bg-white sticky top-0 z-10">
                <div className="flex flex-col pl-1"><h1 className="text-base font-black text-slate-800 tracking-tighter uppercase leading-none">Dashboard</h1><span className="text-[6px] font-black text-slate-400 uppercase tracking-[0.4em] mt-0.5">Fleet Intelligence</span></div>
                <div className="flex items-center gap-6">
                    <div className="relative w-[220px]"><Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Quick search..." className="w-full bg-slate-50 border-none rounded-lg py-1.5 pl-9 pr-4 text-[10px] font-bold focus:ring-1 ring-blue-500/10 transition-all outline-none" /></div>
                    <div className="flex items-center gap-3 border-l border-slate-100 pl-6 cursor-pointer group">
                        <div className="relative"><div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden border border-slate-200"><img src="https://i.pravatar.cc/100?u=vikash" alt="Vikash Yadav" className="w-full h-full object-cover" /></div></div>
                        <div className="hidden sm:flex flex-col items-start leading-none"><span className="text-[10px] font-black text-slate-800 group-hover:text-blue-600 transition-colors">Vikash Yadav</span><span className="text-[7px] font-black text-slate-400 uppercase mt-0.5">Administrator</span></div>
                        <ChevronDown size={12} className="text-slate-300 group-hover:text-slate-500 transition-all" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 w-full px-1">
                {stats.map((stat, index) => (
                    <div key={index} style={{ backgroundColor: stat.color }} className="p-3 rounded-xl shadow-sm flex flex-col relative min-h-[100px] transition-all hover:translate-y-[-2px] group overflow-hidden border border-white/20">
                        <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-1.5"><div className="p-1.5 bg-white/40 rounded-lg text-slate-800">{stat.icon}</div><span className="text-[8px] font-black text-slate-800 uppercase tracking-tight leading-tight max-w-[60px] truncate">{stat.title}</span></div></div>
                        <div className="mt-auto"><span className="text-xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</span></div>
                        <div className="absolute bottom-3 right-3 opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity"><TrendingUp size={24} className="text-slate-900" /></div>
                    </div>
                ))}
            </div>

            <div className="w-full px-1"><SearchHistoryChart /></div>
            <div className="w-full px-1"><BusinessReportChart /></div>

            <div className="mt-auto py-4 text-center"><p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.5em]">Copyright © 2021 NAMMA TAXI All right reserved</p></div>
        </div>
    );
};

export default Dashboard;
