import React from 'react';
import { Search, Bell, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const AdminHeader = () => {
    const { user } = useAuth();

    return (
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40 text-left">
            <div className="flex flex-col">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-1">Administrative Center</p>
                <h1 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={16} className="text-gold" strokeWidth={2.5} />
                    NAMMA TAXI <span className="text-gold">Admin</span>
                </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-6 pr-8 border-r border-gray-100">
                    <button className="relative p-2.5 text-gray-400 hover:text-gold transition-colors group">
                        <Bell size={20} strokeWidth={2} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm ring-2 ring-red-500/10"></span>
                    </button>
                    <button className="p-2.5 text-gray-400 hover:text-gold transition-colors">
                        <Search size={20} strokeWidth={2} />
                    </button>
                </div>

                <div className="flex items-center gap-4 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-[12px] font-black text-primary leading-none uppercase tracking-wider">Vikash Yadav</p>
                        <p className="text-[9px] font-bold text-gold uppercase tracking-widest mt-1.5 flex items-center justify-end gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            Online
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-gray-100 overflow-hidden shadow-sm">
                        <img src="https://ui-avatars.com/api/?name=Vikash+Yadav&background=F5C544&color=000" alt="Vikash Yadav" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
