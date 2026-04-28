import React from 'react';

const Header = () => {
    return (
        <div className="px-6 pt-2 pb-4 flex justify-between items-center bg-white border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=User&background=BCE3E8" alt="profile" />
                </div>
                <div>
                    <h4 className="text-gray-400 text-[8px] font-black uppercase tracking-tighter">Welcome back</h4>
                    <p className="font-extrabold text-xs">Hritik, India</p>
                </div>
            </div>
            <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </div>
        </div>
    );
};

export default Header;
