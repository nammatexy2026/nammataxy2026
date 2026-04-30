import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, Clock, Search, Filter, ArrowUpRight, Download, History } from 'lucide-react';
import api from '../../../lib/api';
import SettlementBatchDetailModal from '../components/SettlementBatchDetailModal';

const SettlementManagement = () => {
    const [earnings, setEarnings] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('earnings'); // 'earnings' | 'batches'
    const [filter, setFilter] = useState('pending');
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedBatchId, setSelectedBatchId] = useState(null);

    const fetchEarnings = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/drivers/earnings/all?status=${filter}`);
            if (res && res.data) {
                setEarnings(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch settlements', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBatches = async () => {
        try {
            setLoading(true);
            const res = await api.get('/drivers/batches');
            if (res && res.data) {
                setBatches(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch batches', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'earnings') {
            fetchEarnings();
        } else {
            fetchBatches();
        }
    }, [filter, activeTab]);

    const handleCreateBatch = async () => {
        if (!selectedIds.length) return;
        if (!window.confirm(`Create a payout batch for ${selectedIds.length} selected earnings?`)) return;
        
        try {
            setIsProcessing(true);
            const res = await api.post('/drivers/batches', {
                earningIds: selectedIds,
                notes: `Batch created from admin on ${new Date().toLocaleDateString()}`
            });
            
            if (res && res.data) {
                const batchId = res.data._id;
                // Automatically process the batch for now to keep it simple, or we can leave it as draft
                if (window.confirm('Batch created as draft. Process payment now?')) {
                    await api.patch(`/drivers/batches/${batchId}/process`);
                    alert('Batch processed and earnings settled.');
                } else {
                    alert('Batch created as draft.');
                }
                setSelectedIds([]);
                fetchEarnings();
            }
        } catch (error) {
            alert('Failed to create batch: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSettle = async (id) => {
        if (!window.confirm('Mark this trip earning as settled?')) return;
        try {
            await api.patch(`/drivers/earnings/${id}/settle`, { notes: 'Settled from Admin Console' });
            fetchEarnings();
        } catch (error) {
            alert('Failed to settle: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleExport = async () => {
        try {
            const res = await api.get(`/drivers/earnings/export?status=${filter}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `settlements_${filter}_${new Date().getTime()}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export failed', error);
            alert('Failed to export settlements');
        }
    };

    const filteredEarnings = earnings.filter(e => 
        e.bookingRef?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-8 font-outfit text-left">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-footerBg uppercase tracking-tight">Driver Settlements</h1>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest italic">Manage and track driver trip commissions</p>
                    
                    <div className="flex items-center gap-1 mt-6 bg-gray-50 p-1 rounded-xl border border-gray-100 w-fit">
                        {[
                            { id: 'earnings', label: 'All Earnings', icon: <CreditCard size={12} /> },
                            { id: 'batches', label: 'Payout History', icon: <History size={12} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeTab === tab.id ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {activeTab === 'earnings' && selectedIds.length > 0 && (
                        <button 
                            onClick={handleCreateBatch}
                            disabled={isProcessing}
                            className="flex items-center gap-2 px-6 py-3 bg-[#F7DC9D] text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-[#F7DC9D] transition-all shadow-lg active:scale-95 animate-in zoom-in duration-300"
                        >
                            <CheckCircle size={14} />
                            Create Payout Batch ({selectedIds.length})
                        </button>
                    )}
                    
                    <button 
                        onClick={handleExport}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-black transition-all active:scale-95"
                    >
                        <Download size={14} />
                        Export CSV
                    </button>

                    {activeTab === 'earnings' && (
                        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                            {['pending', 'settled'].map(s => (
                                <button 
                                    key={s}
                                    onClick={() => setFilter(s)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        filter === s ? 'bg-black text-[#F7DC9D]' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Search Bar - only for earnings */}
            {activeTab === 'earnings' && (
                <div className="relative max-w-md">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by Booking ID..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                </div>
            )}

            {/* Content Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                {activeTab === 'earnings' ? (
                                    <>
                                        <th className="px-8 py-4 w-10">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-gray-300 text-black focus:ring-black"
                                                checked={selectedIds.length === filteredEarnings.length && filteredEarnings.length > 0}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedIds(filteredEarnings.map(e => e._id));
                                                    } else {
                                                        setSelectedIds([]);
                                                    }
                                                }}
                                            />
                                        </th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking Ref</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Driver</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fare</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Driver Share</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Batch Reference</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Trips</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Amount</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Processed At</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Details</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="7" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Loading data...</td></tr>
                            ) : activeTab === 'earnings' ? (
                                filteredEarnings.length === 0 ? (
                                    <tr><td colSpan="7" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No settlement records found</td></tr>
                                ) : filteredEarnings.map((item) => (
                                    <tr key={item._id} className={`hover:bg-slate-50/50 transition-colors ${selectedIds.includes(item._id) ? 'bg-amber-50/30' : ''}`}>
                                        <td className="px-8 py-4">
                                            {item.settlementStatus === 'pending' && !item.payoutBatchId && (
                                                <input 
                                                    type="checkbox" 
                                                    className="rounded border-gray-300 text-black focus:ring-black"
                                                    checked={selectedIds.includes(item._id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedIds([...selectedIds, item._id]);
                                                        } else {
                                                            setSelectedIds(selectedIds.filter(id => id !== item._id));
                                                        }
                                                    }}
                                                />
                                            )}
                                        </td>
                                        <td className="px-8 py-4">
                                            <p className="font-bold text-footerBg text-xs uppercase">{item.bookingRef}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">{(new Date(item.createdAt)).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-8 py-4">
                                            <p className="font-bold text-footerBg text-xs uppercase italic">{item.driverId?.name || 'Assigned Driver'}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">ID: {item.driverId?._id?.substring(20)}</p>
                                        </td>
                                        <td className="px-8 py-4">
                                            <p className="font-bold text-footerBg text-xs">₹{item.tripFare}</p>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <p className="font-black text-footerBg text-xs">₹{item.earningAmount}</p>
                                            <p className="text-[9px] text-emerald-600 font-bold uppercase mt-1">80% Share</p>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                                item.settlementStatus === 'settled' ? 'bg-emerald-50 text-emerald-600' : 
                                                item.payoutBatchId ? 'bg-slate-100 text-slate-400' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                                {item.payoutBatchId && item.settlementStatus === 'pending' ? 'Reserved' : item.settlementStatus}
                                            </span>
                                            {item.payoutBatchId && (
                                                <div className="text-[8px] font-bold text-gray-400 mt-1 uppercase">Batch: {item.payoutBatchId.substring(20)}</div>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            {item.settlementStatus === 'pending' && !item.payoutBatchId && (
                                                <button 
                                                    onClick={() => handleSettle(item._id)}
                                                    className="bg-black text-[#F7DC9D] px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                                                >
                                                    Settle
                                                </button>
                                            )}
                                            {item.settlementStatus === 'pending' && item.payoutBatchId && (
                                                <div className="flex flex-col items-end opacity-50">
                                                    <span className="text-[8px] font-bold text-slate-400 uppercase italic">Locked in Batch</span>
                                                    <span className="text-[9px] font-black text-slate-400">DRAFT</span>
                                                </div>
                                            )}
                                            {item.settlementStatus === 'settled' && (
                                                <div className="flex flex-col items-end opacity-50">
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase italic">Settled At</span>
                                                    <span className="text-[9px] font-black text-black">{(new Date(item.settledAt)).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                batches.length === 0 ? (
                                    <tr><td colSpan="6" className="px-8 py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No payout batches found</td></tr>
                                ) : batches.map((batch) => (
                                    <tr key={batch._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-4">
                                            <p className="font-black text-footerBg text-xs uppercase tracking-tight">{batch.batchRef}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">ID: {batch._id.substring(20)}</p>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-2">
                                                <ArrowUpRight size={12} className="text-gray-400" />
                                                <span className="text-xs font-bold text-footerBg">{batch.totalTrips} Trips</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <p className="font-black text-footerBg text-xs">₹{batch.totalAmount}</p>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                                batch.status === 'processed' ? 'bg-emerald-50 text-emerald-600' : 
                                                batch.status === 'draft' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                                {batch.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            {batch.processedAt ? (
                                                <div>
                                                    <p className="text-[10px] font-bold text-footerBg">{(new Date(batch.processedAt)).toLocaleDateString()}</p>
                                                    <p className="text-[9px] text-gray-400 font-bold uppercase">By: {batch.processedBy?.name || 'Admin'}</p>
                                                </div>
                                            ) : (
                                                <span className="text-[9px] font-bold text-gray-300 uppercase italic">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <button 
                                                onClick={() => setSelectedBatchId(batch._id)}
                                                className="p-2 text-gray-400 hover:text-black rounded-lg transition-all"
                                                title="View Batch Details"
                                            >
                                                <ArrowUpRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedBatchId && (
                <SettlementBatchDetailModal 
                    batchId={selectedBatchId} 
                    onClose={() => setSelectedBatchId(null)} 
                    onBatchProcessed={() => {
                        fetchBatches();
                        if (activeTab === 'earnings') fetchEarnings();
                    }}
                />
            )}
        </div>
    );
};

export default SettlementManagement;
