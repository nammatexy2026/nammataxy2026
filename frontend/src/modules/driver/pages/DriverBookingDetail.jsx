import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Navigation, CheckCircle, ChevronLeft, ArrowRight, User } from 'lucide-react';
import api from '../../../lib/api';

const DriverBookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchBooking = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/driver/bookings/${id}`);
            if (res && res.data) {
                setBooking(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch booking details', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [id]);

    const handleStatusUpdate = async (nextStatus) => {
        try {
            setActionLoading(true);
            await api.patch(`/driver/bookings/${id}/status`, { status: nextStatus });
            await fetchBooking();
            alert(`Job updated to ${nextStatus}`);
        } catch (error) {
            console.error('Failed to update status', error);
            alert(error.response?.data?.message || 'Update failed');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 font-outfit">
            <div className="w-8 h-8 border-4 border-[#F7DC9D] border-t-black rounded-full animate-spin mb-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Loading Ride Details...</span>
        </div>
    );

    if (!booking) return <div className="p-8 text-center">Ride not found</div>;

    const getNextAction = () => {
        switch (booking.status) {
            case 'assigned': return { label: 'Start Enroute', status: 'enroute', color: 'bg-black text-[#F7DC9D]' };
            case 'enroute': return { label: 'Mark Arrived', status: 'arrived', color: 'bg-cyan-500 text-white' };
            case 'arrived': return { label: 'Start Ride', status: 'started', color: 'bg-orange-500 text-white' };
            case 'started': return { label: 'Complete Ride', status: 'completed', color: 'bg-emerald-500 text-white' };
            default: return null;
        }
    };

    const action = getNextAction();

    return (
        <div className="space-y-6 font-outfit pb-24">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <button 
                    onClick={() => navigate('/driver/bookings')}
                    className="p-3 bg-white rounded-2xl border border-black/5 text-black active:scale-90 transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex flex-col">
                    <h2 className="text-xl font-serif font-black uppercase text-black">{booking.bookingRef}</h2>
                    <span className="text-[9px] font-bold text-[#F7DC9D] uppercase tracking-widest italic">{booking.status}</span>
                </div>
            </div>

            {/* Customer Card */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                            <User size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-black uppercase tracking-tight">{booking.customerInfo.name}</span>
                            <span className="text-[10px] font-bold text-gray-400">{booking.customerInfo.phone}</span>
                        </div>
                    </div>
                    <a 
                        href={`tel:${booking.customerInfo.phone}`}
                        className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 active:scale-95 transition-all shadow-sm"
                    >
                        <Phone size={20} />
                    </a>
                </div>

                <div className="space-y-6 border-t border-black/5 pt-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-50 rounded-xl text-black">
                            <MapPin size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pickup Location</span>
                            <span className="text-xs font-bold text-black mt-1 leading-relaxed">{booking.tripSummary.pickupLocation}</span>
                        </div>
                    </div>
                    {booking.tripSummary.dropLocation && (
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-gray-50 rounded-xl text-gray-300">
                                <Navigation size={16} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Drop Location</span>
                                <span className="text-xs font-bold text-black mt-1 leading-relaxed">{booking.tripSummary.dropLocation}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[2rem] border border-black/5 text-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Fare</span>
                    <span className="text-xl font-serif font-black text-black tracking-tight">₹{booking.fareDetails.computedFare}</span>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-black/5 text-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Service</span>
                    <span className="text-xs font-black text-[#F7DC9D] uppercase tracking-tight">{booking.selectedVehicleCategory.name}</span>
                </div>
            </div>

            {/* Main Action FAB */}
            {action && (
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 to-transparent z-50">
                    <button 
                        onClick={() => handleStatusUpdate(action.status)}
                        disabled={actionLoading}
                        className={`w-full flex items-center justify-between p-5 rounded-[2rem] shadow-2xl active:scale-[0.98] transition-all border-2 border-white/20 ${action.color}`}
                    >
                        <span className="text-xs font-black uppercase tracking-[0.2em] pl-4">{action.label}</span>
                        <div className="bg-white/20 p-2 rounded-xl">
                            {actionLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <ArrowRight size={20} />
                            )}
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default DriverBookingDetail;
