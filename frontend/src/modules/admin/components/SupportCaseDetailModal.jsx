import React, { useState, useEffect } from 'react';
import { X, Shield, Clock, User, MessageSquare, Send, CheckCircle, Lock, AlertTriangle } from 'lucide-react';
import api from '../../../lib/api';

const SupportCaseDetailModal = ({ caseId, onClose, onUpdate }) => {
    const [supportCase, setSupportCase] = useState(null);
    const [noteBody, setNoteBody] = useState('');
    const [loading, setLoading] = useState(true);
    const [submittingNote, setSubmittingNote] = useState(false);

    const fetchCase = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/support/ref/${caseId}`);
            if (res.data) {
                setSupportCase(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch case details', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCase();
    }, [caseId]);

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!noteBody.trim()) return;
        try {
            setSubmittingNote(true);
            await api.post(`/support/${supportCase._id}/notes`, { body: noteBody });
            setNoteBody('');
            fetchCase();
        } catch (error) {
            console.error('Failed to add note', error);
        } finally {
            setSubmittingNote(false);
        }
    };

    const handleUpdateStatus = async (status) => {
        try {
            await api.patch(`/support/${supportCase._id}`, { status });
            fetchCase();
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    if (loading) return null; // Or a spinner

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1200] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-gray-50 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col font-outfit border border-black/5">
                {/* Header */}
                <div className="p-8 bg-black text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-black uppercase tracking-tight">{supportCase.caseRef}</h2>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                                    supportCase.priority === 'urgent' ? 'bg-red-500 text-white' :
                                    supportCase.priority === 'high' ? 'bg-amber-500 text-white' : 'bg-white/10 text-[#F7DC9D]'
                                }`}>
                                    {supportCase.priority}
                                </span>
                            </div>
                            <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-tight">{supportCase.subject}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white/10 p-1 rounded-xl">
                            {['open', 'in_progress', 'resolved', 'closed'].map(s => (
                                <button 
                                    key={s}
                                    onClick={() => handleUpdateStatus(s)}
                                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                                        supportCase.status === s ? 'bg-[#F7DC9D] text-black' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {s.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                        <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden flex">
                    {/* Left: Case Content */}
                    <div className="flex-1 overflow-y-auto p-8 border-r border-black/5 bg-white">
                        <div className="space-y-8">
                            {/* Meta Info */}
                            <div className="grid grid-cols-2 gap-6">
                                <MetaItem label="Linked Booking" value={supportCase.bookingRef} />
                                <MetaItem label="Customer Phone" value={supportCase.customerPhone} />
                                <MetaItem label="Category" value={supportCase.category} />
                                <MetaItem label="Created By" value={supportCase.createdBy?.name || supportCase.createdByName} />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Initial Description</h4>
                                <div className="bg-gray-50 p-6 rounded-[2rem] text-xs font-medium text-gray-600 leading-relaxed border border-gray-100">
                                    {supportCase.description}
                                </div>
                            </div>

                            {/* Internal Notes */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Internal Activity Log</h4>
                                <div className="space-y-4">
                                    {supportCase.notes.length === 0 ? (
                                        <p className="text-[10px] font-bold text-gray-300 italic uppercase">No internal notes yet</p>
                                    ) : supportCase.notes.map((note, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                                <User size={14} className="text-gray-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[9px] font-black text-black uppercase">{note.authorName} <span className="text-gray-300 ml-1">({note.authorRole})</span></span>
                                                    <span className="text-[8px] font-bold text-gray-300">{(new Date(note.createdAt)).toLocaleString()}</span>
                                                </div>
                                                <div className="text-[11px] font-medium text-gray-600 bg-gray-50/50 p-4 rounded-2xl rounded-tl-none border border-black/5">
                                                    {note.body}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions/Notes Sidebar */}
                    <div className="w-80 bg-gray-50 flex flex-col shrink-0">
                        <div className="p-8 flex-1 flex flex-col">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Add Internal Note</h4>
                            <form onSubmit={handleAddNote} className="flex-1 flex flex-col">
                                <textarea 
                                    value={noteBody}
                                    onChange={(e) => setNoteBody(e.target.value)}
                                    placeholder="Write a private note for staff..."
                                    className="flex-1 w-full p-6 bg-white border border-gray-100 rounded-[2rem] text-xs focus:outline-none focus:ring-2 focus:ring-black/5 transition-all resize-none shadow-sm"
                                />
                                <button 
                                    disabled={submittingNote || !noteBody.trim()}
                                    className="mt-4 w-full py-4 bg-black text-[#F7DC9D] rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50 shadow-lg"
                                >
                                    {submittingNote ? (
                                        <div className="w-4 h-4 border-2 border-[#F7DC9D] border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send size={14} />
                                            Post Internal Note
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetaItem = ({ label, value }) => (
    <div>
        <label className="text-[9px] font-black text-gray-300 uppercase tracking-widest block mb-1">{label}</label>
        <p className="text-[11px] font-black text-black uppercase">{value || 'N/A'}</p>
    </div>
);

export default SupportCaseDetailModal;
