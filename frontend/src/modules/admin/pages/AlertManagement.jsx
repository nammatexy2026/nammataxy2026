import React, { useState, useEffect } from 'react';
import { 
    AlertTriangle, CheckCircle, Clock, Shield, 
    Search, Filter, RefreshCcw, ArrowUpRight,
    Check, XCircle, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';

const AlertManagement = () => {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [statusFilter, setStatusFilter] = useState('active');
    const [severityFilter, setSeverityFilter] = useState('');

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/alerts?status=${statusFilter}&severity=${severityFilter}`);
            setAlerts(res.data);
        } catch (error) {
            console.error('Failed to fetch alerts', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, [statusFilter, severityFilter]);

    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            await api.post('/alerts/refresh');
            fetchAlerts();
        } catch (error) {
            console.error('Failed to refresh alerts', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleAcknowledge = async (id) => {
        try {
            await api.post(`/alerts/${id}/acknowledge`);
            fetchAlerts();
        } catch (error) {
            console.error('Failed to acknowledge alert', error);
        }
    };

    const handleResolve = async (id) => {
        try {
            await api.post(`/alerts/${id}/resolve`);
            fetchAlerts();
        } catch (error) {
            console.error('Failed to resolve alert', error);
        }
    };

    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'critical': return 'bg-red-50 text-red-600 border-red-100';
            case 'high': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'medium': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'low': return 'bg-gray-50 text-gray-500 border-gray-200';
            default: return 'bg-gray-50 text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <AlertCircle size={14} className="text-red-500" />;
            case 'acknowledged': return <Clock size={14} className="text-amber-500" />;
            case 'resolved': return <CheckCircle size={14} className="text-emerald-500" />;
            default: return null;
        }
    };

    const navigateToEntity = (alert) => {
        if (alert.bookingId) {
            // Check if it's reconciliation or general booking
            if (alert.type === 'RECONCILIATION_EXCEPTION') {
                navigate('/admin/reconciliation');
            } else {
                navigate('/admin/bookings');
            }
        } else if (alert.supportCaseId) {
            navigate('/admin/support');
        } else if (alert.payoutBatchId) {
            navigate('/admin/settlements');
        }
    };

    return (
        <div className="p-6 space-y-8 font-outfit text-left">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-footerBg uppercase tracking-tight">Operational Alerts</h1>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest italic tracking-tight">Proactive system health monitoring & exception management</p>
                </div>

                <button 
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-[#F7DC9D] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                    <RefreshCcw size={14} className={refreshing ? 'animate-spin' : ''} />
                    {refreshing ? 'Scanning...' : 'Scan System'}
                </button>
            </header>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none shadow-sm"
                    >
                        <option value="active">Active</option>
                        <option value="acknowledged">Acknowledged</option>
                        <option value="resolved">Resolved</option>
                        <option value="dismissed">Dismissed</option>
                        <option value="">All Statuses</option>
                    </select>

                    <select 
                        value={severityFilter}
                        onChange={(e) => setSeverityFilter(e.target.value)}
                        className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none shadow-sm"
                    >
                        <option value="">All Severities</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Showing {alerts.length} operational exceptions
                </div>
            </div>

            {/* Alerts Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Severity / ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Alert Condition</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Triggered</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="5" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest italic">Loading operational state...</td></tr>
                            ) : alerts.length === 0 ? (
                                <tr><td colSpan="5" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest italic">No active alerts found for current filters</td></tr>
                            ) : alerts.map((alert) => (
                                <tr key={alert._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-2">
                                            <span className={`w-fit px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${getSeverityBadge(alert.severity)}`}>
                                                {alert.severity}
                                            </span>
                                            <span className="text-[10px] font-black text-gray-400 tracking-tight uppercase">{alert.alertRef}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col max-w-md">
                                            <span className="text-xs font-black text-black uppercase tracking-tight mb-1">{alert.title}</span>
                                            <p className="text-[10px] font-medium text-gray-500 leading-relaxed">{alert.message}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col text-[10px] font-black text-black">
                                            <span>{new Date(alert.triggeredAt).toLocaleDateString()}</span>
                                            <span className="text-gray-400 text-[9px] font-bold">{new Date(alert.triggeredAt).toLocaleTimeString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl w-fit">
                                            {getStatusIcon(alert.status)}
                                            <span className="text-[9px] font-black text-black uppercase tracking-widest">{alert.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {alert.status === 'active' && (
                                                <button 
                                                    onClick={() => handleAcknowledge(alert._id)}
                                                    title="Acknowledge"
                                                    className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all shadow-sm"
                                                >
                                                    <Clock size={14} />
                                                </button>
                                            )}
                                            {alert.status !== 'resolved' && (
                                                <button 
                                                    onClick={() => handleResolve(alert._id)}
                                                    title="Resolve"
                                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all shadow-sm"
                                                >
                                                    <Check size={14} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => navigateToEntity(alert)}
                                                title="View Context"
                                                className="p-2 bg-black text-[#F7DC9D] rounded-xl hover:scale-105 transition-all shadow-sm"
                                            >
                                                <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AlertManagement;
