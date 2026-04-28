import React, { useState } from 'react';
import {
    Image as ImageIcon, Plus, Trash2, Eye, EyeOff,
    Calendar, Link as LinkIcon, Edit3,
    Bell, Send, Layout, Move, ChevronRight, X, ExternalLink,
    MousePointer2, Sparkles, Monitor, ArrowRight
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

const BannerManagement = () => {
    // Mock Banners Data matching the Home.jsx heroSlides structure
    const [banners, setBanners] = useState([
        {
            id: 'BN-001',
            badge: 'Daily Essentials',
            title: 'Minimalist Grace Every Day',
            description: 'Statement pieces designed for your everyday lifestyle.',
            btnText: 'Explore Now',
            link: '/shop',
            image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=1600&q=80',
            cardImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200',
            status: 'Active',
            startDate: 'Dec 01, 2024',
            endDate: 'Jan 31, 2025',
            secondaryTitle: 'Exquisite Details',
            secondaryLink: '/collections/minimalist'
        },
        {
            id: 'BN-002',
            badge: 'Wedding Specials',
            title: 'Bridal Elegance Redefined',
            description: 'Timeless silver pieces for your most special moments.',
            btnText: 'Shop Bridal',
            link: '/category/rings',
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80',
            cardImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200',
            status: 'Active',
            startDate: 'Dec 20, 2024',
            endDate: 'Feb 28, 2025',
            secondaryTitle: 'Bridal Sets',
            secondaryLink: '/collections/bridal'
        }
    ]);

    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

    const [editingBanner, setEditingBanner] = useState(null);
    const [formData, setFormData] = useState({
        badge: '',
        title: '',
        description: '',
        btnText: 'Explore Now',
        link: '/shop',
        image: '',
        cardImage: '',
        secondaryTitle: 'Exquisite Details',
        secondaryLink: '/shop',
        status: 'Active',
        startDate: '',
        endDate: ''
    });

    const [notificationData, setNotificationData] = useState({
        title: '',
        message: '',
        target: 'All Users'
    });

    const openAddModal = () => {
        setEditingBanner(null);
        setFormData({
            badge: '',
            title: '',
            description: '',
            btnText: 'Explore Now',
            link: '/shop',
            image: '',
            cardImage: '',
            secondaryTitle: 'Exquisite Details',
            secondaryLink: '/shop',
            status: 'Active',
            startDate: '',
            endDate: ''
        });
        setIsBannerModalOpen(true);
    };

    const openEditModal = (banner) => {
        setEditingBanner(banner.id);
        setFormData(banner);
        setIsBannerModalOpen(true);
    };

    const handleSaveBanner = (e) => {
        e.preventDefault();
        if (editingBanner) {
            setBanners(banners.map(b => b.id === editingBanner ? { ...formData, id: b.id } : b));
        } else {
            const newBanner = {
                ...formData,
                id: `BN-${Math.floor(100 + Math.random() * 900)}`
            };
            setBanners([newBanner, ...banners]);
        }
        setIsBannerModalOpen(false);
    };

    const toggleBannerStatus = (id) => {
        setBanners(banners.map(b =>
            b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b
        ));
    };

    const deleteBanner = (id) => {
        if (window.confirm('Delete this banner from the homepage rotation?')) {
            setBanners(banners.filter(b => b.id !== id));
        }
    };

    const handleSendNotification = (e) => {
        e.preventDefault();
        alert(`Notification "${notificationData.title}" sent successfully.`);
        setNotificationData({ title: '', message: '', target: 'All Users' });
        setIsNotificationModalOpen(false);
    };

    return (
        <div className="space-y-3 animate-in fade-in duration-500 pb-20 font-outfit text-left">
            {/* Header Section - Refined & Compact */}
            <div className="bg-white p-3 border border-black/5 rounded-none shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-black text-black tracking-tight leading-none uppercase">Interface Registry</h1>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2">Calibrate Hero Transitions & Marketing Narratives</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-hidden">
                    <button
                        onClick={() => setIsNotificationModalOpen(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-black/5 text-black rounded-none text-[8px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                    >
                        <Bell className="w-3 h-3 text-gold" />
                        <span>INITIALIZE BLAST</span>
                    </button>
                    <button
                        onClick={openAddModal}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-black text-white border border-black/5 rounded-none text-[8px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-xl shadow-black/10 active:scale-95 whitespace-nowrap"
                    >
                        <Plus className="w-3 h-3" />
                        <span>DEPLOY NEW SLIDE</span>
                    </button>
                </div>
            </div>

            {/* Banners Matrix Grid - Optimized for Density (3-4 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {banners.map((banner) => (
                    <div key={banner.id} className="bg-white rounded-none border border-black/5 shadow-sm overflow-hidden flex flex-col group hover:border-gold/30 transition-all relative">
                        {/* Visual Core Sector */}
                        <div className="relative aspect-[16/8] overflow-hidden bg-gray-50">
                            <img
                                src={banner.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'}
                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${banner.status === 'Inactive' ? 'grayscale opacity-60' : ''}`}
                                alt={banner.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            {/* Visual Badge */}
                            <div className="absolute top-2 left-2 flex gap-1 items-center">
                                <span className={`px-2 py-0.5 rounded-none text-[7px] font-black uppercase tracking-[0.2em] border shadow-lg ${banner.status === 'Active'
                                    ? 'bg-emerald-500 text-white border-emerald-600'
                                    : 'bg-white text-gray-400 border-gray-100'
                                    }`}>
                                    {banner.status}
                                </span>
                                {banner.badge && (
                                    <span className="bg-gold text-black text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-none shadow-lg">
                                        {banner.badge}
                                    </span>
                                )}
                            </div>

                            {/* Actions Protocol Overlay */}
                            <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <button
                                    onClick={() => toggleBannerStatus(banner.id)}
                                    className="p-1 px-2 border border-white/20 bg-black/80 backdrop-blur-md text-white hover:bg-gold hover:text-black transition-all shadow-sm active:scale-95"
                                    title={banner.status === 'Active' ? 'Deactivate' : 'Activate'}
                                >
                                    {banner.status === 'Active' ? <EyeOff size={12} /> : <Eye size={12} />}
                                </button>
                                <button
                                    onClick={() => openEditModal(banner)}
                                    className="p-1 px-2 border border-white/20 bg-black/80 backdrop-blur-md text-white hover:bg-gold hover:text-black transition-all shadow-sm active:scale-95"
                                >
                                    <Edit3 size={12} />
                                </button>
                                <button
                                    onClick={() => deleteBanner(banner.id)}
                                    className="p-1 px-2 border border-white/20 bg-red-600/80 backdrop-blur-md text-white hover:bg-white hover:text-red-600 transition-all shadow-sm active:scale-95"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>

                            {/* Content Preview Simulation Overlay */}
                            <div className="absolute bottom-3 left-3 right-10 pointer-events-none">
                                <h3 className="text-white text-[11px] font-black uppercase tracking-tight leading-none mb-1 drop-shadow-md">{banner.title}</h3>
                                <p className="text-white/80 text-[8px] font-serif italic line-clamp-1 leading-none drop-shadow-sm">{banner.description}</p>
                            </div>
                        </div>

                        {/* Logic Data Component */}
                        <div className="p-3 flex-1 flex flex-col font-outfit">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[7px] font-black text-gray-300 uppercase tracking-widest">{banner.id}</span>
                                <div className="h-[1px] flex-1 bg-black/5"></div>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-0.5">
                                        <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Action Protocol</p>
                                        <p className="text-[9px] font-black text-black truncate uppercase tracking-tighter">{banner.btnText}</p>
                                        <p className="text-[8px] text-gold font-bold truncate tracking-tight lowercase font-serif italic">{banner.link}</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Secondary Target</p>
                                        <p className="text-[9px] font-black text-black truncate uppercase tracking-tighter">{banner.secondaryTitle}</p>
                                        <p className="text-[8px] text-blue-500 font-bold truncate tracking-tight lowercase font-serif italic">{banner.secondaryLink}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/5 mt-auto">
                                    <div className="flex items-center gap-1.5 text-[8px] text-gray-400 font-black uppercase tracking-widest bg-gray-50 px-2 py-1 border border-black/5 rounded-none italic">
                                        <Calendar size={10} className="text-gold" />
                                        {banner.startDate} <ArrowRight size={8} /> {banner.endDate}
                                    </div>
                                    <button className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-black transition-colors flex items-center gap-1">
                                        INSPECT <ArrowRight size={10} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Matrix Logic Modal - Refined Geometric */}
            <AnimatePresence>
                {isBannerModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            className="relative bg-white w-full max-w-4xl rounded-none shadow-2xl overflow-hidden border border-black/10 font-outfit"
                        >
                            <div className="p-4 border-b border-black/5 bg-[#FDF5F6] flex items-center justify-between">
                                <h2 className="text-xs font-serif font-black text-black uppercase tracking-widest flex items-center gap-3">
                                    <Monitor size={14} className="text-gold" />
                                    {editingBanner ? 'Update Visual Protocol' : 'Initialize New Interface Slide'}
                                </h2>
                                <button
                                    onClick={() => setIsBannerModalOpen(false)}
                                    className="p-1.5 hover:bg-gray-200 rounded-none transition-all text-gray-400 border border-transparent hover:border-black/5"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveBanner} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[80vh]">
                                {/* Strategic Data Column */}
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">Visual Primary Core (Background)</label>
                                        <input
                                            className="w-full bg-gray-50 border border-black/5 rounded-none py-2 px-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-gold transition-all text-black placeholder:text-gray-200"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            placeholder="CSS/CDN URL SOURCE..."
                                            required
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">Nomenclature Badge</label>
                                            <input
                                                className="w-full bg-gray-50 border border-black/5 rounded-none px-3 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:border-gold transition-all"
                                                value={formData.badge}
                                                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                                placeholder="E.G. NEW ARRIVAL..."
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">Main Headline Strategy</label>
                                            <input
                                                className="w-full bg-gray-50 border border-black/5 rounded-none px-3 py-2 text-[10px] font-black uppercase tracking-tight outline-none focus:border-gold transition-all"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">Narrative Directive</label>
                                        <textarea
                                            className="w-full bg-gray-50 border border-black/5 rounded-none px-3 py-2 text-[10px] font-serif italic outline-none focus:border-gold transition-all resize-none h-20 leading-tight"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="p-4 bg-gray-50 border border-black/5 rounded-none space-y-3">
                                        <h4 className="text-[9px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-2">
                                            <MousePointer2 size={12} className="text-gold" /> Primary Call-to-Action Protocol
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest italic">Label</label>
                                                <input
                                                    className="w-full bg-white border border-black/5 rounded-none p-2 text-[9px] font-black uppercase tracking-widest outline-none focus:border-gold"
                                                    value={formData.btnText}
                                                    onChange={(e) => setFormData({ ...formData, btnText: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest italic">Target URL</label>
                                                <input
                                                    className="w-full bg-white border border-black/5 rounded-none p-2 text-[9px] font-black uppercase tracking-widest outline-none focus:border-gold"
                                                    value={formData.link}
                                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Spotlight & Logic Column */}
                                <div className="space-y-4">
                                    <div className="p-4 bg-[#FDF5F6]/50 border border-black/5 rounded-none space-y-4">
                                        <h4 className="text-[9px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-2 border-b border-black/5 pb-2">
                                            <Sparkles size={12} className="text-gold" /> Secondary Spotlight Integration
                                        </h4>
                                        <div className="space-y-1">
                                            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Spotlight Resource URL</label>
                                            <input
                                                className="w-full bg-white border border-black/5 rounded-none p-2 text-[9px] font-black tracking-widest outline-none focus:border-gold"
                                                value={formData.cardImage}
                                                onChange={(e) => setFormData({ ...formData, cardImage: e.target.value })}
                                                placeholder="ITEM IMAGE URL..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Spotlight Nomenclature</label>
                                                <input
                                                    className="w-full bg-white border border-black/5 rounded-none p-2 text-[9px] font-black uppercase tracking-widest outline-none focus:border-gold"
                                                    value={formData.secondaryTitle}
                                                    onChange={(e) => setFormData({ ...formData, secondaryTitle: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Spotlight Target URL</label>
                                                <input
                                                    className="w-full bg-white border border-black/5 rounded-none p-2 text-[9px] font-black uppercase tracking-widest outline-none focus:border-gold"
                                                    value={formData.secondaryLink}
                                                    onChange={(e) => setFormData({ ...formData, secondaryLink: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-900 border border-black/5 rounded-none space-y-3 shadow-inner">
                                        <h4 className="text-[9px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Calendar size={12} className="text-gold" /> Registry Schedule Calibrator
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Protocol Activation</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-none p-2 text-[9px] font-black text-white outline-none focus:border-gold"
                                                    value={formData.startDate}
                                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                    placeholder="E.G. JAN 01, 2025"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Protocol Termination</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-none p-2 text-[9px] font-black text-white outline-none focus:border-gold"
                                                    value={formData.endDate}
                                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                    placeholder="E.G. DEC 31, 2025"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsBannerModalOpen(false)}
                                            className="flex-1 px-4 py-3 bg-white border border-black/5 text-gray-400 text-[9px] font-black uppercase tracking-widest hover:text-black hover:bg-gray-50 transition-all rounded-none"
                                        >
                                            REVERT
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-2 px-8 py-3 bg-black text-white rounded-none text-[9px] font-black uppercase tracking-[0.3em] shadow-xl shadow-black/20 hover:bg-gold hover:text-black transition-all active:scale-95 flex items-center justify-center gap-3"
                                        >
                                            <Sparkles size={12} /> COMMIT TO REGISTRY
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Broadcast Protocol Modal - High Density */}
            <AnimatePresence>
                {isNotificationModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            className="relative bg-white w-full max-w-sm rounded-none border border-black/10 shadow-2xl font-outfit"
                        >
                            <div className="p-4 border-b border-black/5 bg-[#FDF5F6] flex items-center justify-between">
                                <h3 className="text-xs font-black text-black uppercase tracking-widest font-serif italic">Global Broadcast Interface</h3>
                                <button onClick={() => setIsNotificationModalOpen(false)} className="p-1 text-gray-400 hover:text-black hover:bg-black/5 rounded-none transition-all">
                                    <X size={16} />
                                </button>
                            </div>
                            <form onSubmit={handleSendNotification} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Subject Filter</label>
                                    <select
                                        className="w-full bg-gray-50 border border-black/5 rounded-none p-2 text-[9px] font-black uppercase tracking-widest outline-none focus:border-gold appearance-none"
                                        value={notificationData.target}
                                        onChange={(e) => setNotificationData({ ...notificationData, target: e.target.value })}
                                    >
                                        <option>All Global Citizens</option>
                                        <option>Active Clients (30d)</option>
                                        <option>Dormant Accounts</option>
                                        <option>Exclusive Registry</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Nomenclature Title</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-black/5 rounded-none p-2 text-[9px] font-black uppercase tracking-widest outline-none focus:border-gold"
                                        value={notificationData.title}
                                        onChange={(e) => setNotificationData({ ...notificationData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Visual Narrative Message</label>
                                    <textarea
                                        className="w-full bg-gray-50 border border-black/5 rounded-none p-2 text-[10px] font-serif italic outline-none focus:border-gold min-h-[80px] resize-none leading-tight"
                                        value={notificationData.message}
                                        onChange={(e) => setNotificationData({ ...notificationData, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 rounded-none text-[9px] font-black uppercase tracking-[0.3em] shadow-xl shadow-black/20 hover:bg-gold hover:text-black transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <Send size={12} /> INITIALIZE BROADCAST
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BannerManagement;
