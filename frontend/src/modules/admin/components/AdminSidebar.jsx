import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Car,
    ClipboardList,
    Settings,
    LogOut,
    Zap,
    Box,
    PieChart,
    CreditCard,
    ArrowLeftRight,
    MessageSquare,
    ChevronDown,
    ShoppingBag,
    User,
    BarChart3,
    Menu,
    UserCheck,
    CalendarCheck,
    FileText,
    Ticket,
    Briefcase,
    Plane,
    Mail,
    Search,
    ChevronRight,
    History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState({
        bookings: false,
        prices: false,
        coupons: false,
        posts: false,
        bangaloreTaxi: false,
        searchHistories: false
    });

    const toggleMenu = (menu) => {
        if (isCollapsed) {
            setIsCollapsed(false);
            setExpandedMenus(prev => ({ ...prev, [menu]: true }));
        } else {
            setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
        }
    };

    const isActive = (path) => location.pathname === path;

    const navItemClasses = (path) => `
        flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-6 py-2.5 transition-all duration-200 group cursor-pointer relative
        ${location.pathname.startsWith(path) ? 'text-[#F7DC9D]' : 'text-[#9E9E9E] hover:text-white'}
    `;

    const subItemClasses = (path) => `
        flex items-center gap-3 ${isCollapsed ? 'hidden' : 'pl-14'} pr-6 py-1.5 text-[12px] font-medium transition-all duration-200
        ${isActive(path) ? 'text-[#F7DC9D]' : 'text-[#757575] hover:text-white'}
    `;

    return (
        <motion.div 
            animate={{ width: isCollapsed ? 80 : 240 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-screen bg-[#1E1E1E] text-white flex flex-col sticky top-0 border-r border-white/5 shadow-2xl overflow-hidden shrink-0" 
            style={{ 
                fontFamily: "'Inter', sans-serif",
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
        >
            <style>
                {`
                div::-webkit-scrollbar { display: none; }
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                `}
            </style>

            {/* Header - Compact Single Line */}
            <div className={`px-6 py-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-white/5`}>
                {!isCollapsed && (
                    <h1 className="font-extrabold text-[18px] tracking-tight text-white whitespace-nowrap animate-in fade-in duration-300">
                        Namma Taxi
                    </h1>
                )}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 hover:bg-white/5 rounded-md text-[#9E9E9E] hover:text-white transition-all shrink-0"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Navigation - Comprehensive List from Reference */}
            <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
                <nav className="space-y-0.5">
                    {/* Dashboard */}
                    <Link to="/admin/dashboard" className={navItemClasses('/admin/dashboard')}>
                        {location.pathname.startsWith('/admin/dashboard') && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#F7DC9D] rounded-r-full"></div>
                        )}
                        <div className="flex items-center gap-4">
                            <PieChart size={18} className={location.pathname.startsWith('/admin/dashboard') ? 'text-[#F7DC9D]' : 'text-[#9E9E9E]'} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Dashboard</span>}
                        </div>
                    </Link>

                    {/* Bookings */}
                    <div className="relative">
                        <button onClick={() => toggleMenu('bookings')} className={navItemClasses('/admin/bookings')}>
                            {location.pathname.startsWith('/admin/bookings') && !expandedMenus.bookings && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#F7DC9D] rounded-r-full"></div>
                            )}
                            <div className="flex items-center gap-4">
                                <ClipboardList size={18} />
                                {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Bookings</span>}
                            </div>
                            {!isCollapsed && <ChevronDown size={12} className={`transition-transform ${expandedMenus.bookings ? 'rotate-180' : ''}`} />}
                        </button>
                        <AnimatePresence>
                            {expandedMenus.bookings && !isCollapsed && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-black/10">
                                    <div className="py-1 flex flex-col">
                                        <Link to="/admin/bookings/new" className={subItemClasses('/admin/bookings/new')}><Zap size={10} className="text-red-500" /><span className="text-red-500 font-bold">New Booking</span></Link>
                                        <Link to="/admin/bookings/today" className={subItemClasses('/admin/bookings/today')}>Today Bookings</Link>
                                        <Link to="/admin/bookings/cancelled" className={subItemClasses('/admin/bookings/cancelled')}>Cancelled Bookings</Link>
                                        <Link to="/admin/bookings/completed" className={subItemClasses('/admin/bookings/completed')}>Completed Bookings</Link>
                                        <Link to="/admin/bookings/running" className={subItemClasses('/admin/bookings/running')}>Running Bookings</Link>
                                        <Link to="/admin/bookings/online" className={subItemClasses('/admin/bookings/online')}>Online Bookings</Link>
                                        <Link to="/admin/bookings/offline" className={subItemClasses('/admin/bookings/offline')}>Offline Bookings</Link>
                                        <Link to="/admin/bookings/advanced" className={subItemClasses('/admin/bookings/advanced')}>Advanced Bookings</Link>
                                        <Link to="/admin/bookings/free-vehicles" className={subItemClasses('/admin/bookings/free-vehicles')}>Free Vehicles</Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/admin/car-category" className={navItemClasses('/admin/car-category')}>
                        <div className="flex items-center gap-4">
                            <Car size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Car Category</span>}
                        </div>
                    </Link>

                    <Link to="/admin/customers" className={navItemClasses('/admin/customers')}>
                        <div className="flex items-center gap-4">
                            <Users size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Customers</span>}
                        </div>
                    </Link>

                    {/* Prices */}
                    <div className="relative">
                        <button onClick={() => toggleMenu('prices')} className={navItemClasses('/admin/prices')}>
                            <div className="flex items-center gap-4">
                                <CreditCard size={18} />
                                {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Prices</span>}
                            </div>
                            {!isCollapsed && <ChevronDown size={12} className={expandedMenus.prices ? 'rotate-180' : ''} />}
                        </button>
                        <AnimatePresence>
                            {expandedMenus.prices && !isCollapsed && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-black/10">
                                    <div className="py-1 flex flex-col">
                                        <Link to="/admin/prices/local" className={subItemClasses('/admin/prices/local')}>Local</Link>
                                        <Link to="/admin/prices/airport" className={subItemClasses('/admin/prices/airport')}>Airport</Link>
                                        <Link to="/admin/prices/out-station" className={subItemClasses('/admin/prices/out-station')}>Out Station</Link>
                                        <Link to="/admin/prices/tours-package" className={subItemClasses('/admin/prices/tours-package')}>Tours Package</Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/admin/vehicle-attachments" className={navItemClasses('/admin/vehicle-attachments')}>
                        <div className="flex items-center gap-4">
                            <ArrowLeftRight size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Vehicle Attachments</span>}
                        </div>
                    </Link>

                    <Link to="/admin/drivers" className={navItemClasses('/admin/drivers')}>
                        <div className="flex items-center gap-4">
                            <UserCheck size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Drivers</span>}
                        </div>
                    </Link>

                    <Link to="/admin/attendance" className={navItemClasses('/admin/attendance')}>
                        <div className="flex items-center gap-4">
                            <CalendarCheck size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Attendance</span>}
                        </div>
                    </Link>

                    <Link to="/admin/staff" className={navItemClasses('/admin/staff')}>
                        <div className="flex items-center gap-4">
                            <Briefcase size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Staff</span>}
                        </div>
                    </Link>

                    <Link to="/admin/staff-reports" className={navItemClasses('/admin/staff-reports')}>
                        <div className="flex items-center gap-4">
                            <FileText size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Staff Reports</span>}
                        </div>
                    </Link>

                    <Link to="/admin/keywords" className={navItemClasses('/admin/keywords')}>
                        <div className="flex items-center gap-4">
                            <MessageSquare size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Keywords</span>}
                        </div>
                    </Link>

                    {/* Coupons */}
                    <div className="relative">
                        <button onClick={() => toggleMenu('coupons')} className={navItemClasses('/admin/coupons')}>
                            <div className="flex items-center gap-4">
                                <Ticket size={18} />
                                {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Coupons</span>}
                            </div>
                            {!isCollapsed && <ChevronDown size={12} className={expandedMenus.coupons ? 'rotate-180' : ''} />}
                        </button>
                        <AnimatePresence>
                            {expandedMenus.coupons && !isCollapsed && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-black/10">
                                    <div className="py-1 flex flex-col">
                                        <Link to="/admin/coupons/list" className={subItemClasses('/admin/coupons/list')}>Coupons</Link>
                                        <Link to="/admin/coupons/discounts" className={subItemClasses('/admin/coupons/discounts')}>Discount Coupons</Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Posts */}
                    <div className="relative">
                        <button onClick={() => toggleMenu('posts')} className={navItemClasses('/admin/posts')}>
                            <div className="flex items-center gap-4">
                                <Box size={18} />
                                {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Posts</span>}
                            </div>
                            {!isCollapsed && <ChevronDown size={12} className={expandedMenus.posts ? 'rotate-180' : ''} />}
                        </button>
                        <AnimatePresence>
                            {expandedMenus.posts && !isCollapsed && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-black/10">
                                    <div className="py-1 flex flex-col">
                                        <Link to="/admin/posts/nammataxi" className={subItemClasses('/admin/posts/nammataxi')}>NAMMATAXI</Link>
                                        <Link to="/admin/posts/airport-taxi" className={subItemClasses('/admin/posts/airport-taxi')}>AIRPORTTAXISERVICE</Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/admin/business" className={navItemClasses('/admin/business')}>
                        <div className="flex items-center gap-4">
                            <PieChart size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Business</span>}
                        </div>
                    </Link>

                    {/* Bangalore Airport Taxi */}
                    <div className="relative">
                        <button onClick={() => toggleMenu('bangaloreTaxi')} className={navItemClasses('/admin/bangalore-taxi')}>
                            <div className="flex items-center gap-4">
                                <Plane size={18} />
                                {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">BangaloreAirportTaxi</span>}
                            </div>
                            {!isCollapsed && <ChevronDown size={12} className={`transition-transform ${expandedMenus.bangaloreTaxi ? 'rotate-180' : ''}`} />}
                        </button>
                        <AnimatePresence>
                            {expandedMenus.bangaloreTaxi && !isCollapsed && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-black/10">
                                    <div className="py-1 flex flex-col">
                                        <Link to="/admin/bangalore-taxi/keywords" className={subItemClasses('/admin/bangalore-taxi/keywords')}>Keywords</Link>
                                        <Link to="/admin/bangalore-taxi/distances" className={subItemClasses('/admin/bangalore-taxi/distances')}>Our Distances</Link>
                                        <Link to="/admin/bangalore-taxi/contacts" className={subItemClasses('/admin/bangalore-taxi/contacts')}>Contacts</Link>
                                        <Link to="/admin/bangalore-taxi/posts" className={subItemClasses('/admin/bangalore-taxi/posts')}>Posts</Link>
                                        <Link to="/admin/bangalore-taxi/routes" className={subItemClasses('/admin/bangalore-taxi/routes')}>Popular Routes</Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/admin/email-templates" className={navItemClasses('/admin/email-templates')}>
                        <div className="flex items-center gap-4">
                            <Mail size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Email Templates</span>}
                        </div>
                    </Link>

                    {/* Search Histories */}
                    <div className="relative">
                        <button onClick={() => toggleMenu('searchHistories')} className={navItemClasses('/admin/search-histories')}>
                            <div className="flex items-center gap-4">
                                <Search size={18} />
                                {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Search histories</span>}
                            </div>
                            {!isCollapsed && <ChevronDown size={12} className={expandedMenus.searchHistories ? 'rotate-180' : ''} />}
                        </button>
                        <AnimatePresence>
                            {expandedMenus.searchHistories && !isCollapsed && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-black/10">
                                    <div className="py-1 flex flex-col">
                                        <Link to="/admin/search-histories/nammataxi" className={subItemClasses('/admin/search-histories/nammataxi')}>Nammataxi</Link>
                                        <Link to="/admin/search-histories/bangalore-airport" className={subItemClasses('/admin/search-histories/bangalore-airport')}>Bangalore Airpot</Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/admin/settings" className={navItemClasses('/admin/settings')}>
                        <div className="flex items-center gap-4">
                            <Settings size={18} />
                            {!isCollapsed && <span className="text-[13.5px] font-medium tracking-tight">Settings</span>}
                        </div>
                    </Link>
                </nav>
            </div>

            {/* Logout - Integrated */}
            <div className="px-6 py-6 border-t border-white/5">
                <button className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} text-[#9E9E9E] hover:text-white transition-all group`}>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#F7DC9D] group-hover:text-black transition-all">
                        <LogOut size={16} />
                    </div>
                    {!isCollapsed && <span className="text-[13.5px] font-semibold">Log Out</span>}
                </button>
            </div>
        </motion.div>
    );
};

export default AdminSidebar;
