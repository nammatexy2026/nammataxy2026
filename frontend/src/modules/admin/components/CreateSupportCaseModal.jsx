import React, { useState } from 'react';
import { X, Shield, AlertCircle, MessageSquare, Send } from 'lucide-react';
import api from '../../../lib/api';

const CreateSupportCaseModal = ({ booking, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        category: 'other',
        priority: 'medium'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post('/support', {
                ...formData,
                bookingId: booking?._id
            });
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to create support case', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col font-outfit border border-black/5">
                {/* Header */}
                <div className="p-8 bg-black text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-xl">
                            <Shield size={20} className="text-[#F7DC9D]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tight">Open Support Case</h2>
                            {booking && (
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">
                                    Linked to Booking: {booking.bookingRef}
                                </p>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Case Subject</label>
                            <input 
                                required
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                placeholder="Brief summary of the issue..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                                <select 
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none"
                                >
                                    <option value="payment">Payment</option>
                                    <option value="refund">Refund</option>
                                    <option value="driver">Driver</option>
                                    <option value="pickup_delay">Pickup Delay</option>
                                    <option value="cancellation">Cancellation</option>
                                    <option value="pricing">Pricing</option>
                                    <option value="behavior">Behavior</option>
                                    <option value="technical">Technical</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Priority</label>
                                <select 
                                    value={formData.priority}
                                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                            <textarea 
                                required
                                rows="4"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Describe the problem in detail..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-black/5 transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 bg-gray-50 text-gray-400 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="flex-3 px-8 py-4 bg-black text-[#F7DC9D] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-[#F7DC9D] border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send size={14} />
                                    Open Case
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSupportCaseModal;
