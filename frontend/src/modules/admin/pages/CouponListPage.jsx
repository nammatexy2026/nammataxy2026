import React, { useState, useEffect, useMemo } from 'react';
import {
    Plus,
    Ticket,
    Calendar,
    Activity,
    Clock,
    Edit2,
    Trash2,
    Loader2,
    Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';
import Pagination from '../components/Pagination';
import DataTable from '../components/common/DataTable';
import AdminStatsCard from '../components/AdminStatsCard';

const CouponListPage = () => {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const res = await api.get('/coupons');
            if (res && res.data) {
                setCoupons(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch coupons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                await api.delete(`/coupons/${id}`);
                fetchCoupons();
            } catch (error) {
                alert('Failed to delete coupon');
            }
        }
    };

    const filteredCoupons = useMemo(() => {
        return (coupons || [])
            .filter(c => 
                c.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [coupons, searchTerm]);

    const paginatedCoupons = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCoupons.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCoupons, currentPage]);

    const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);

    const getCouponStatus = (coupon) => {
        const now = new Date();
        if (!coupon.isActive) return { label: 'Inactive', color: 'bg-gray-100 text-gray-400 border-gray-200' };
        if (coupon.validUntil && new Date(coupon.validUntil) < now) return { label: 'Expired', color: 'bg-red-50 text-red-600 border-red-100' };
        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) return { label: 'Limit Reached', color: 'bg-amber-50 text-amber-600 border-amber-100' };
        return { label: 'Active', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
    };

    const columns = [
        {
            key: 'code',
            header: 'Coupon Code',
            render: (coupon) => (
                <div className="flex items-center gap-4 normal-case">
                    <div className="w-10 h-10 bg-black text-[#F7DC9D] rounded-lg flex items-center justify-center shadow-sm shrink-0">
                        <Ticket size={18} />
                    </div>
                    <div>
                        <p className="font-black text-black text-[13px] tracking-tight uppercase">{coupon.code}</p>
                        <p className="text-[10px] text-gray-400 font-bold mt-0.5 max-w-[200px] truncate normal-case italic">{coupon.description || 'No description'}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'discount',
            header: 'Benefit',
            render: (coupon) => (
                <div className="normal-case">
                    <div className="flex items-center gap-1.5">
                        {coupon.type === 'percentage' ? (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm text-[10px] font-black border border-emerald-100 uppercase">
                                {coupon.value}% OFF
                            </span>
                        ) : (
                            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm text-[10px] font-black border border-blue-100 uppercase">
                                ₹{coupon.value} OFF
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold mt-1">Min Order: <span className="text-black">₹{coupon.minOrderValue}</span></p>
                </div>
            )
        },
        {
            key: 'validity',
            header: 'Validity',
            render: (coupon) => (
                <div className="space-y-1 normal-case font-bold text-[10px]">
                    <p className="text-gray-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        Expires: {new Date(coupon.validUntil).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 flex items-center gap-1.5 italic">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Started: {new Date(coupon.validFrom).toLocaleDateString()}
                    </p>
                </div>
            )
        },
        {
            key: 'usage',
            header: 'Usage',
            render: (coupon) => (
                <div className="normal-case">
                    <p className="text-[11px] font-black text-black">{coupon.usageCount} Used</p>
                    {coupon.usageLimit && (
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Limit: {coupon.usageLimit}</p>
                    )}
                </div>
            )
        },
        {
            key: 'status',
            header: 'Status',
            render: (coupon) => {
                const status = getCouponStatus(coupon);
                return (
                    <span className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest border ${status.color}`}>
                        {status.label}
                    </span>
                );
            }
        },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (coupon) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => navigate(`/admin/coupons/edit/${coupon._id}`)}
                        className="p-2 text-gray-400 hover:text-black transition-colors"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(coupon._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500 text-left">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">COUPON & OFFERS</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Manage promotional campaigns & discounts</p>
                </div>
                <button
                    onClick={() => navigate('/admin/coupons/add')}
                    className="bg-black text-white px-6 py-2.5 rounded-none font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
                >
                    <Plus size={16} strokeWidth={3} /> Create Coupon
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <AdminStatsCard
                    label="Total Coupons"
                    value={coupons.length}
                    icon={Ticket}
                    color="text-black"
                    bgColor="bg-gray-50"
                />
                <AdminStatsCard
                    label="Active Now"
                    value={coupons.filter(c => getCouponStatus(c).label === 'Active').length}
                    icon={Activity}
                    color="text-emerald-600"
                    bgColor="bg-emerald-50"
                />
                <AdminStatsCard
                    label="Expiring Soon"
                    value={coupons.filter(c => {
                        const daysLeft = (new Date(c.validUntil) - new Date()) / (1000 * 60 * 60 * 24);
                        return daysLeft > 0 && daysLeft < 7;
                    }).length}
                    icon={Clock}
                    color="text-amber-600"
                    bgColor="bg-amber-50"
                />
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center gap-3 border border-gray-100 rounded-none bg-gray-50/30">
                    <Loader2 className="animate-spin text-black" size={32} />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Scanning Marketing Database...</p>
                </div>
            ) : (
                <>
                    <DataTable
                        columns={columns}
                        data={paginatedCoupons}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        searchPlaceholder="Search by code or description..."
                    />

                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                            Showing {paginatedCoupons.length} of {filteredCoupons.length} Campaign Entries
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={filteredCoupons.length}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                </>
            )}

            {/* Footer */}
            <div className="mt-12 text-center text-[10px] font-bold text-gray-400 py-6 border-t border-gray-100 uppercase tracking-[0.4em]">
                NAMMA TAXI • MARKETING ENGINE
            </div>
        </div>
    );
};

export default CouponListPage;
