import React, { useState, useEffect } from 'react';
import { 
    CreditCard, CheckCircle, Clock, Search, Filter, 
    ArrowUpRight, Download, AlertTriangle, IndianRupee,
    TrendingUp, TrendingDown, Wallet, ShieldAlert,
    ExternalLink, Shield, Plus
} from 'lucide-react';
import api from '../../../lib/api';
import BookingAuditModal from '../components/BookingAuditModal';
import CreateSupportCaseModal from '../components/CreateSupportCaseModal';

const FinanceReconciliation = () => {
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState('7d');
    const [search, setSearch] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('');
    const [exceptionOnly, setExceptionOnly] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [showCreateCase, setShowCreateCase] = useState(false);
    const [selectedBookingForCase, setSelectedBookingForCase] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [reconRes, summaryRes] = await Promise.all([
                api.get(`/finance/reconciliation?range=${range}&search=${search}&paymentStatus=${paymentFilter}&exceptionOnly=${exceptionOnly}`),
                api.get(`/finance/summary?range=${range}`)
            ]);
            setData(reconRes.data);
            setSummary(summaryRes.data);
        } catch (error) {
            console.error('Failed to fetch finance data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [range, paymentFilter, exceptionOnly]);

    const handleExport = async () => {
        try {
            const res = await api.get(`/finance/export?range=${range}&search=${search}&paymentStatus=${paymentFilter}&exceptionOnly=${exceptionOnly}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `finance_recon_${new Date().getTime()}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export failed', error);
        }
    };

    const getExceptionLabel = (code) => {
        switch (code) {
            case 'MISSING_EARNING': return 'Missing Earning';
            case 'REFUNDED_BUT_PAID_DRIVER': return 'Refunded with Payout';
            case 'COMPLETED_WITHOUT_PAYMENT': return 'Unpaid Completed Trip';
            default: return code;
        }
    };

    return (
        <div className="p-6 space-y-8 font-outfit text-left">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-footerBg uppercase tracking-tight">Finance Reconciliation</h1>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest italic">Booking-level ledger & money-flow auditing</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={handleExport}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-black transition-all active:scale-95 shadow-sm"
                    >
                        <Download size={14} />
                        Export Ledger
                    </button>

                    <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                        {['today', '7d', '30d', 'all'].map(r => (
                            <button 
                                key={r}
                                onClick={() => setRange(r)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    range === r ? 'bg-black text-[#F7DC9D]' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Summary Cards */}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Gross Inflow" 
                        value={`₹${summary.grossInflow.toLocaleString()}`} 
                        icon={<TrendingUp className="text-emerald-500" />}
                        subtext="Realized Revenue"
                    />
                    <StatCard 
                        title="Refund Outflow" 
                        value={`₹${summary.refundOutflow.toLocaleString()}`} 
                        icon={<TrendingDown className="text-red-500" />}
                        subtext="Processed Refunds"
                    />
                    <StatCard 
                        title="Net Business" 
                        value={`₹${summary.netProfit.toLocaleString()}`} 
                        icon={<Wallet className="text-black" />}
                        subtext="After Payouts & Refunds"
                        primary
                    />
                    <StatCard 
                        title="Exceptions" 
                        value={summary.exceptionCount} 
                        icon={<ShieldAlert className={summary.exceptionCount > 0 ? 'text-amber-500' : 'text-gray-300'} />}
                        subtext="Reconciliation Alerts"
                    />
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative w-64">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Booking Ref / Phone..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                        />
                    </div>

                    <select 
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none"
                    >
                        <option value="">All Payments</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>

                    <button 
                        onClick={() => setExceptionOnly(!exceptionOnly)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                            exceptionOnly 
                                ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm' 
                                : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                        }`}
                    >
                        <AlertTriangle size={14} />
                        Exceptions Only
                    </button>
                </div>
            </div>

            {/* Reconciliation Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking / Customer</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Inflow (Net)</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Driver Share</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Profit</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Reconciliation Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Reconciling records...</td></tr>
                            ) : data.length === 0 ? (
                                <tr><td colSpan="6" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No reconciliation data found</td></tr>
                            ) : data.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-black uppercase tracking-tight">{item.bookingRef}</span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase italic mt-0.5">{item.customer} • {item.customerPhone}</span>
                                            <span className="text-[8px] font-bold text-gray-300 mt-1 uppercase">{(new Date(item.createdAt)).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-black text-black">₹{item.paymentAmount - item.refundedAmount}</span>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <span className={`text-[8px] font-black uppercase tracking-widest ${
                                                    item.paymentStatus === 'paid' ? 'text-emerald-500' : 'text-amber-500'
                                                }`}>{item.paymentStatus}</span>
                                                {item.refundedAmount > 0 && (
                                                    <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">(Ref: ₹{item.refundedAmount})</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-black text-black">₹{item.earningAmount}</span>
                                            <span className={`text-[8px] font-black uppercase tracking-widest mt-0.5 ${
                                                item.payoutStatus === 'settled' ? 'text-emerald-500' : 'text-amber-500'
                                            }`}>{item.payoutStatus}</span>
                                            {item.payoutBatchRef !== 'N/A' && (
                                                <span className="text-[7px] font-bold text-gray-400 uppercase">{item.payoutBatchRef}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className={`text-xs font-black ${item.businessNet >= 0 ? 'text-black' : 'text-red-500'}`}>
                                                ₹{item.businessNet}
                                            </span>
                                            <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">Net Retained</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        {item.exceptions.length > 0 ? (
                                            <div className="flex flex-col items-center gap-1">
                                                {item.exceptions.map((exc, idx) => (
                                                    <span key={idx} className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[7px] font-black uppercase border border-amber-100 flex items-center gap-1">
                                                        <AlertTriangle size={8} />
                                                        {getExceptionLabel(exc)}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[8px] font-black uppercase border border-emerald-100">
                                                Reconciled
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => {
                                                    setSelectedBookingForCase(item);
                                                    setShowCreateCase(true);
                                                }}
                                                className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl transition-all border border-blue-100"
                                                title="Open Support Case"
                                            >
                                                <Shield size={14} />
                                            </button>
                                            <button 
                                                onClick={() => setSelectedBookingId(item._id)}
                                                className="p-3 bg-gray-50 hover:bg-black hover:text-white rounded-2xl transition-all border border-gray-100"
                                                title="View Detail Audit"
                                            >
                                                <ExternalLink size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedBookingId && (
                <BookingAuditModal 
                    bookingId={selectedBookingId} 
                    onClose={() => setSelectedBookingId(null)} 
                />
            )}

            {showCreateCase && (
                <CreateSupportCaseModal 
                    booking={selectedBookingForCase}
                    onClose={() => {
                        setShowCreateCase(false);
                        setSelectedBookingForCase(null);
                    }}
                    onSuccess={fetchData}
                />
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon, subtext, primary }) => (
    <div className={`p-8 rounded-[2.5rem] border border-gray-100 shadow-sm ${primary ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-4">
            <span className="p-3 bg-gray-50 rounded-2xl">
                {icon}
            </span>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{title}</span>
        </div>
        <h3 className="text-3xl font-serif font-black text-black">{value}</h3>
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">{subtext}</p>
    </div>
);

export default FinanceReconciliation;
