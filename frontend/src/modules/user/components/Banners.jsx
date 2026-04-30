import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';

const Banners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await api.get('/banners?status=Active');
                if (res && res.data) {
                    setBanners(res.data);
                }
            } catch (error) {
                console.error('Failed to fetch banners:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    if (!loading && banners.length === 0) return null;

    return (
        <div className="px-5 mt-8 mb-4">
            <div className="flex justify-between items-end mb-4 px-1">
                <h2 className="font-extrabold text-sm">Special Offers</h2>
                <button className="text-[8px] font-black text-gray-400 uppercase tracking-widest">View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-1 px-1">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="flex-shrink-0 w-[280px] h-[140px] rounded-[28px] bg-gray-100 animate-pulse"></div>
                    ))
                ) : (
                    banners.map(banner => (
                        <div key={banner._id} className="relative flex-shrink-0 w-[280px] h-[140px] rounded-[28px] overflow-hidden shadow-sm group cursor-pointer">
                            <img src={banner.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={banner.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-5 left-5 text-white">
                                <div className="flex flex-col text-left">
                                    <h3 className="font-black text-sm mb-0.5">{banner.title}</h3>
                                    <p className="text-[9px] font-medium opacity-80">{banner.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Banners;
