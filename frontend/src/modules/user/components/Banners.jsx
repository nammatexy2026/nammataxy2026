import React from 'react';
import bannerMysore from '../../../assets/banner_mysore.png';
import bannerCoorg from '../../../assets/banner_coorg.png';
import bannerOoty from '../../../assets/banner_ooty.png';

const Banners = () => {
    const promos = [
        { id: 1, img: bannerMysore, title: 'Mysore Heritage', subtitle: 'Book Outstation @ ₹12/km' },
        { id: 2, img: bannerCoorg, title: 'Coorg Hills', subtitle: 'Special Weekend Packages' },
        { id: 3, img: bannerOoty, title: 'Ooty Special', subtitle: 'Flat 10% Off on First Trip' }
    ];

    return (
        <div className="px-5 mt-8 mb-4">
            <div className="flex justify-between items-end mb-4 px-1">
                <h2 className="font-extrabold text-sm">Special Offers</h2>
                <button className="text-[8px] font-black text-gray-400 uppercase tracking-widest">View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-1 px-1">
                {promos.map(promo => (
                    <div key={promo.id} className="relative flex-shrink-0 w-[280px] h-[140px] rounded-[28px] overflow-hidden shadow-sm group">
                        <img src={promo.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={promo.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-5 left-5 text-white">
                            <h3 className="font-black text-sm mb-0.5">{promo.title}</h3>
                            <p className="text-[9px] font-medium opacity-80">{promo.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banners;
