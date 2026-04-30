import React, { useState, useEffect } from 'react';
import { 
    Shield, Search, Filter, Clock, AlertTriangle, 
    CheckCircle, MessageSquare, ArrowUpRight, 
    MoreHorizontal, User, Calendar
} from 'lucide-react';
import api from '../../../lib/api';
import SupportCaseDetailModal from '../components/SupportCaseDetailModal';

const SupportManagement = () => {
    const [cases, setCases] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState('all');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedCaseId, setSelectedCaseId] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [casesRes, metricsRes] = await Promise.all([
                api.get(`/support?range=${range}&search=${search}&status=${statusFilter}`),
                api.get(`/support/metrics?range=${range}`)
            ]);
            setCases(casesRes.data);
            setMetrics(metricsRes.data);
        } catch (error) {
            console.error('Failed to fetch support data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [range, statusFilter]);

    const getPriorityColor = (p) => {
        switch (p) {
            case 'urgent': return 'text-red-600 bg-red-50 border-red-100';
            case 'high': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'medium': return 'text-blue-600 bg-blue-50 border-blue-100';
            default: return 'text-gray-400 bg-gray-50 border-gray-100';
        }
    };

    const getStatusBadge = (s) => {
        switch (s) {
            case 'open': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'in_progress': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'resolved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'closed': return 'bg-gray-100 text-gray-500 border-gray-200';
            default: return 'bg-gray-50 text-gray-400 border-gray-100';
        }
    };

    const calculateAge = (createdAt) => {
        const hours = Math.floor((new Date() - new Date(createdAt)) / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <div className="p-6 space-y-8 font-outfit text-left">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-footerBg uppercase tracking-tight">Support Case Management</h1>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest italic">Structured operational issue tracking & internal audits</p>
                </div>

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
            </header>

            {/* Metrics */}
            {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard 
                        label="Stale Cases" 
                        value={metrics.aging.staleCount} 
                        subtext="Open > 48 Hours"
                        icon={<AlertTriangle size={20} className="text-red-500" />}
                        urgent={metrics.aging.staleCount > 0}
                    />
                    <MetricCard 
                        label="Open Cases" 
                        value={metrics.byStatus.filter(s => ['open', 'in_progress'].includes(s._id)).reduce((acc, curr) => acc + curr.count, 0)} 
                        subtext="Active Workflow"
                        icon={<Clock size={20} className="text-blue-500" />}
                    />
                    <MetricCard 
                        label="Avg Resolution" 
                        value={`${Math.round(metrics.aging.avgAge)}h`} 
                        subtext="Current Aging"
                        icon={<Calendar size={20} className="text-amber-500" />}
                    />
                    <MetricCard 
                        label="Resolved Today" 
                        value={metrics.byStatus.find(s => s._id === 'resolved')?.count || 0} 
                        subtext="Completion Rate"
                        icon={<CheckCircle size={20} className="text-emerald-500" />}
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
                            placeholder="Case # / Booking # / Phone..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-black/5 transition-all shadow-sm"
                        />
                    </div>

                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none shadow-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="waiting_customer">Waiting</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            {/* Cases Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Case Reference</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject / Issue</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Priority</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Age / Latest</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Loading cases...</td></tr>
                            ) : cases.length === 0 ? (
                                <tr><td colSpan="6" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No support cases found</td></tr>
                            ) : cases.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-black uppercase tracking-tight">{item.caseRef}</span>
                                            <span className="text-[9px] font-bold text-gray-300 uppercase mt-0.5">Booking: {item.bookingRef || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col max-w-xs">
                                            <span className="text-xs font-black text-black uppercase truncate">{item.subject}</span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{item.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${getPriorityColor(item.priority)}`}>
                                            {item.priority}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${getStatusBadge(item.status)}`}>
                                            {item.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-black uppercase">{calculateAge(item.createdAt)}</span>
                                            <div className="flex items-center justify-end gap-1 mt-0.5">
                                                <MessageSquare size={10} className="text-gray-300" />
                                                <span className="text-[9px] font-bold text-gray-300 uppercase">{item.notes?.length || 0} Notes</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button 
                                            onClick={() => setSelectedCaseId(item.caseRef)}
                                            className="p-3 bg-gray-50 hover:bg-black hover:text-white rounded-2xl transition-all border border-gray-100 group shadow-sm"
                                        >
                                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedCaseId && (
                <SupportCaseDetailModal 
                    caseId={selectedCaseId} 
                    onClose={() => setSelectedCaseId(null)}
                    onUpdate={fetchData}
                />
            )}
        </div>
    );
};

const MetricCard = ({ label, value, subtext, icon, urgent }) => (
    <div className={`p-8 rounded-[2.5rem] border border-gray-100 shadow-sm bg-white ${urgent ? 'ring-2 ring-red-500/20 bg-red-50/30' : ''}`}>
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-2xl">
                {icon}
            </div>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
        <h3 className="text-3xl font-serif font-black text-black">{value}</h3>
        <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 italic ${urgent ? 'text-red-500' : 'text-gray-400'}`}>
            {subtext}
        </p>
    </div>
);

export default SupportManagement;
