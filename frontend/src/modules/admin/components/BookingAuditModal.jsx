import React, { useState, useEffect } from 'react';
import { X, Clock, User, CreditCard, Bell, CheckCircle, AlertTriangle, FileText, MapPin, Smartphone, Car, Shield, IndianRupee, MessageSquare, Plus } from 'lucide-react';
import api from '../../../lib/api';
import CreateSupportCaseModal from './CreateSupportCaseModal';

const BookingAuditModal = ({ bookingId, onClose }) => {
    const [audit, setAudit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('timeline');

    const [supportSummary, setSupportSummary] = useState(null);
    const [showCreateCase, setShowCreateCase] = useState(false);

    const fetchAudit = async () => {
        try {
            setLoading(true);
            const [auditRes, supportRes] = await Promise.all([
                api.get(`/bookings/${bookingId}/audit`),
                api.get(`/support/booking/${bookingId}`)
            ]);
            if (auditRes && auditRes.data) setAudit(auditRes.data);
            if (supportRes && supportRes.data) setSupportSummary(supportRes.data);
        } catch (error) {
            console.error('Failed to fetch audit trail', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAudit();
    }, [bookingId]);

    const getEventIcon = (event) => {
        switch (event) {
            case 'BOOKING_CREATED': return <FileText size={14} className="text-blue-500" />;
            case 'STATUS_UPDATE': return <Clock size={14} className="text-purple-500" />;
            case 'DRIVER_ASSIGNED': return <Car size={14} className="text-emerald-500" />;
            case 'PAYMENT_STATE': return <CreditCard size={14} className="text-amber-500" />;
            case 'REFUND_STATE': return <AlertTriangle size={14} className="text-red-500" />;
            case 'NOTIFICATION_SENT': return <Bell size={14} className="text-indigo-500" />;
            case 'EARNING_SETTLEMENT': return <Shield size={14} className="text-cyan-500" />;
            default: return <Clock size={14} className="text-gray-400" />;
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-12 text-center">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Assembling Audit Trail...</p>
                </div>
            </div>
        );
    }

    if (!audit) return null;

    const { booking, timeline, payment, refund, earning, notifications } = audit;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-gray-50 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col font-outfit border border-white/20">
                {/* Header */}
                <div className="p-8 bg-black text-white flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-serif font-black uppercase tracking-tight">{booking.bookingRef}</h2>
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/10 border border-white/10`}>
                                {booking.status}
                            </span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">
                            Operational Audit & Event Trace
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setShowCreateCase(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#F7DC9D] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                        >
                            <Plus size={14} />
                            Open Case
                        </button>
                        <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-8 pt-4 flex gap-4 bg-white border-b border-black/5">
                    {[
                        { id: 'timeline', label: 'Event Timeline', icon: <Clock size={14} /> },
                        { id: 'details', label: 'Technical Details', icon: <FileText size={14} /> },
                        { id: 'notifications', label: `Notifications (${notifications.length})`, icon: <Bell size={14} /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                                activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'timeline' && (
                        <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-black/5">
                            {timeline.map((event, i) => (
                                <div key={i} className="flex gap-6 relative">
                                    <div className="w-9 h-9 rounded-full bg-white border border-black/5 flex items-center justify-center z-10 shadow-sm shrink-0">
                                        {getEventIcon(event.event)}
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-xs font-black text-black uppercase tracking-tight">{event.message}</h4>
                                            <span className="text-[9px] font-bold text-gray-400">
                                                {new Date(event.timestamp).toLocaleDateString()} • {new Date(event.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        {event.details && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {Object.entries(event.details).map(([key, val]) => (
                                                    <div key={key} className="bg-gray-100/50 px-2 py-1 rounded-lg border border-black/5">
                                                        <span className="text-[8px] font-black text-gray-400 uppercase mr-1">{key}:</span>
                                                        <span className="text-[9px] font-bold text-black uppercase">{String(val)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Trip Info */}
                            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin size={16} className="text-black" />
                                    <h4 className="text-xs font-black text-black uppercase">Trip Logistics</h4>
                                </div>
                                <div className="space-y-3">
                                    <DetailItem label="Service" value={booking.tripSummary.serviceType} />
                                    <DetailItem label="Pickup" value={`${booking.tripSummary.pickupDate} @ ${booking.tripSummary.pickupTime}`} />
                                    <DetailItem label="Vehicle" value={booking.selectedVehicleCategory.name} />
                                    <DetailItem label="Fare" value={`₹${booking.fareDetails.computedFare}`} />
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <User size={16} className="text-black" />
                                    <h4 className="text-xs font-black text-black uppercase">Customer Profile</h4>
                                </div>
                                <div className="space-y-3">
                                    <DetailItem label="Name" value={booking.customerInfo.name} />
                                    <DetailItem label="Phone" value={booking.customerInfo.phone} />
                                    <DetailItem label="Email" value={booking.customerInfo.email || 'N/A'} />
                                </div>
                            </div>

                            {/* Payment/Refund Info */}
                            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <CreditCard size={16} className="text-black" />
                                    <h4 className="text-xs font-black text-black uppercase">Financial State</h4>
                                </div>
                                <div className="space-y-3">
                                    <DetailItem label="Status" value={booking.paymentStatus} badge={booking.paymentStatus === 'paid' ? 'emerald' : 'amber'} />
                                    <DetailItem label="Method" value={booking.paymentMethod} />
                                    {payment && <DetailItem label="Transaction" value={payment.providerPaymentId} />}
                                    {refund && <DetailItem label="Refund" value={refund.status} badge="red" />}
                                </div>
                            </div>

                            {/* Settlement Info */}
                            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield size={16} className="text-black" />
                                    <h4 className="text-xs font-black text-black uppercase">Settlement Context</h4>
                                </div>
                                <div className="space-y-3">
                                    {earning ? (
                                        <>
                                            <DetailItem label="Status" value={earning.settlementStatus} badge={earning.settlementStatus === 'settled' ? 'emerald' : 'amber'} />
                                            <DetailItem label="Driver Earning" value={`₹${earning.earningAmount}`} />
                                            <DetailItem label="Driver" value={earning.driverId?.name} />
                                        </>
                                    ) : (
                                        <p className="text-[10px] font-bold text-gray-400 italic">No earning record yet for this booking</p>
                                    )}
                                </div>
                            </div>

                            {/* Profitability Summary */}
                            <div className="bg-black text-white p-6 rounded-3xl border border-white/10 shadow-xl md:col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <IndianRupee size={16} className="text-[#F7DC9D]" />
                                    <h4 className="text-xs font-black uppercase tracking-widest text-[#F7DC9D]">Business Net Profitability</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div>
                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Customer Paid (Net)</p>
                                        <p className="text-lg font-black italic">₹{(payment?.amount || 0) - (refund?.amount || 0)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Driver Payout</p>
                                        <p className="text-lg font-black italic">₹{earning?.earningAmount || 0}</p>
                                    </div>
                                    <div className="border-l border-white/10 pl-8">
                                        <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-1">Retained Profit</p>
                                        <p className="text-lg font-black text-emerald-400 italic">
                                            ₹{((payment?.amount || 0) - (refund?.amount || 0)) - (earning?.earningAmount || 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Support History */}
                            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm md:col-span-2">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare size={16} className="text-blue-500" />
                                        <h4 className="text-xs font-black text-black uppercase">Support Context</h4>
                                    </div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        {supportSummary?.total || 0} Linked Cases
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {supportSummary?.cases?.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {supportSummary.cases.map((c, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-black/5">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-black">{c.caseRef}</span>
                                                        <span className="text-[9px] font-bold text-gray-400 truncate max-w-[150px]">{c.subject}</span>
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase ${
                                                        c.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                        {c.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-[10px] font-bold text-gray-400 italic">No support cases opened for this booking.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-black/5">
                                    <tr>
                                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Channel</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Template</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {notifications.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-300 italic font-bold uppercase text-[10px]">No notifications recorded</td>
                                        </tr>
                                    ) : notifications.map((n, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-[10px] font-bold text-gray-400">
                                                {new Date(n.createdAt).toLocaleTimeString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-black text-black uppercase">{n.channel}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold text-gray-600 uppercase">{n.eventKey}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                                    n.status === 'sent' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                }`}>
                                                    {n.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {showCreateCase && (
                <CreateSupportCaseModal 
                    booking={booking}
                    onClose={() => setShowCreateCase(false)}
                    onSuccess={fetchAudit}
                />
            )}
        </div>
    );
};

const DetailItem = ({ label, value, badge }) => (
    <div className="flex items-center justify-between py-1 border-b border-black/[0.03] last:border-0">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
        {badge ? (
            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                badge === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                badge === 'red' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
            }`}>
                {value}
            </span>
        ) : (
            <span className="text-[10px] font-black text-black uppercase">{value || 'N/A'}</span>
        )}
    </div>
);

export default BookingAuditModal;
