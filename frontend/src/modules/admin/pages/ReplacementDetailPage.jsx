import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
    ArrowLeft,
    Printer,
    Download,
    User,
    MapPin,
    Package,
    AlertCircle,
    Truck,
    CheckCircle2,
    History,
    RotateCcw,
    Box,
    Shield,
    Phone,
    Mail,
    AlertTriangle,
    Archive,
    Calendar,
    PenTool,
    Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import ringImg from '../../../assets/diamond_ring.png';
import necklaceImg from '../../../assets/gold_necklace.png';
import banglesImg from '../../../assets/gold_bangles.png';

const ReplacementDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State for Admin Actions
    const [adminComment, setAdminComment] = useState('');
    const [replacementMode, setReplacementMode] = useState('after_pickup');

    // State for Verification Step (Step 3)
    const [itemCondition, setItemCondition] = useState('Good');
    const [stockAction, setStockAction] = useState('Restock');

    // DUMMY DATA FOR REPLACEMENTS
    const DUMMY_CASES = {
        '201': {
            id: '201',
            orderId: 'ORD-6001',
            requestDate: '02 Feb 2025',
            status: 'Pickup Scheduled',
            type: 'Same Product',
            customer: {
                name: 'Priya Verma',
                phone: '+91 98765 00005',
                email: 'priya.v@example.com'
            },
            addresses: {
                delivery: { line1: 'E-20, Park Street', city: 'Kolkata', state: 'West Bengal', pincode: '700016' },
                pickup: { line1: 'E-20, Park Street', city: 'Kolkata', state: 'West Bengal', pincode: '700016' }
            },
            originalItems: [{ name: "Diamond Engagement Ring 1.0 Carat", sku: "JWL-RNG-005", qty: 1, price: 180000, reason: "Wrong Size", image: ringImg }],
            replacementItems: [{ name: "Diamond Engagement Ring 1.0 Carat", sku: "JWL-RNG-005", qty: 1, price: 0, image: ringImg }],
            evidence: { reason: 'Wrong Size', comment: 'The ring is too small for my finger.', images: [ringImg], video: null },
            pickup: { partner: 'Delhivery', awb: 'PICK-889900', date: '03 Feb 2025', status: 'Scheduled' },
            timeline: [
                { status: 'Requested', date: '02 Feb 2025', done: true },
                { status: 'Approved', date: '03 Feb 2025', done: true },
                { status: 'Pickup Scheduled', date: '03 Feb 2025', done: true },
            ],
            logs: [{ action: 'Approved', comment: 'Approved for pickup first.', user: 'Admin', date: '03 Feb 2025' }]
        },
        '202': {
            id: '202',
            orderId: 'ORD-6002',
            requestDate: '04 Feb 2025',
            status: 'Pending',
            type: 'Same Product',
            customer: {
                name: 'Neha Gupta',
                phone: '+91 99999 88888',
                email: 'neha.g@example.com'
            },
            addresses: {
                delivery: { line1: 'F-45, Hitech City', city: 'Hyderabad', state: 'Telangana', pincode: '500081' },
                pickup: { line1: 'F-45, Hitech City', city: 'Hyderabad', state: 'Telangana', pincode: '500081' }
            },
            originalItems: [{ name: "Gold Necklace Set 22k", sku: "JWL-NCK-006", qty: 1, price: 125000, reason: "Defective", image: necklaceImg }],
            replacementItems: [{ name: "Gold Necklace Set 22k", sku: "JWL-NCK-006", qty: 1, price: 0, image: necklaceImg }],
            evidence: { reason: 'Defective', comment: 'Clasp is not working properly.', images: [], video: null },
            timeline: [
                { status: 'Requested', date: '04 Feb 2025', done: true },
            ],
            logs: []
        },
        '203': {
            id: '203',
            orderId: 'ORD-6003',
            requestDate: '06 Feb 2025',
            status: 'Pickup Completed',
            type: 'Same Product',
            customer: { name: 'Rahul Roy', phone: '+91 77777 66666', email: 'rahul.r@example.com' },
            addresses: {
                delivery: { line1: 'G-10, Salt Lake', city: 'Kolkata', state: 'West Bengal', pincode: '700091' },
                pickup: { line1: 'G-10, Salt Lake', city: 'Kolkata', state: 'West Bengal', pincode: '700091' }
            },
            originalItems: [{ name: "22k Gold Bangles (Set of 4)", sku: "JWL-BNG-007", qty: 1, price: 85000, reason: "Damaged", image: banglesImg }],
            replacementItems: [{ name: "22k Gold Bangles (Set of 4)", sku: "JWL-BNG-007", qty: 1, price: 0, image: banglesImg }],
            evidence: { reason: "Damaged", comment: "Surface has visible scratches.", images: [banglesImg], video: null },
            pickup: { partner: 'BlueDart', awb: 'PICK-777', date: '06 Feb 2025', status: 'Picked' },
            timeline: [
                { status: 'Requested', date: '06 Feb 2025', done: true },
                { status: 'Approved', date: '06 Feb 2025', done: true },
                { status: 'Pickup Scheduled', date: '06 Feb 2025', done: true },
                { status: 'Pickup Completed', date: '07 Feb 2025', done: true },
            ],
            logs: [{ action: 'Approved', comment: 'Standard replacement.', user: 'Admin', date: '06 Feb 2025' }]
        }
    };

    // Initialize local data from ID or default
    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {
        const data = DUMMY_CASES[id] || DUMMY_CASES['202'];
        setCurrentData(data);
    }, [id]);

    const updateStatusMutation = useMutation({
        mutationFn: async ({ status, comment, mode, type }) => {
            // Simulate API call
            await new Promise(r => setTimeout(r, 600));
            return { status, comment, mode, type };
        },
        onSuccess: ({ status, comment, type }) => {
            if (status === 'Approved') {
                // Simulate Approval -> Pickup Generation
                setCurrentData(prev => ({
                    ...prev,
                    status: 'Pickup Scheduled',
                    logs: [...prev.logs, { action: 'Approved', comment: comment || 'Approved by Admin', user: 'Admin', date: new Date().toLocaleDateString() }],
                    timeline: [...prev.timeline, { status: 'Approved', date: new Date().toLocaleDateString(), done: true }, { status: 'Pickup Scheduled', date: new Date().toLocaleDateString(), done: true }],
                    pickup: {
                        partner: 'Delhivery',
                        awb: 'PICK-' + Math.floor(Math.random() * 10000),
                        date: new Date(Date.now() + 86400000).toLocaleDateString(),
                        status: 'Scheduled'
                    }
                }));
                toast.success('Approved! Pickup Scheduled.');
            } else if (status === 'Rejected') {
                setCurrentData(prev => ({
                    ...prev,
                    status: 'Rejected',
                    logs: [...prev.logs, { action: 'Rejected', comment: comment || 'Rejected by Admin', user: 'Admin', date: new Date().toLocaleDateString() }],
                    timeline: [...prev.timeline, { status: 'Rejected', date: new Date().toLocaleDateString(), done: true }]
                }));
                toast.error('Replacement Rejected.');
            } else if (status === 'Replacement Shipped') {
                setCurrentData(prev => ({
                    ...prev,
                    status: 'Replacement Shipped',
                    logs: [...prev.logs, { action: 'Processed', comment: 'Item Verified & Shipped', user: 'Admin', date: new Date().toLocaleDateString() }],
                    timeline: [...prev.timeline, { status: 'Replacement Shipped', date: new Date().toLocaleDateString(), done: true }],
                    shipment: {
                        partner: 'BlueDart',
                        awb: 'SHIP-' + Math.floor(Math.random() * 10000),
                        status: 'Shipped',
                        trackingLink: '#'
                    }
                }));
                toast.success('Replacement Processed & Shipped!');
            }
        }
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': case 'Requested': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Approved': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Pickup Scheduled': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'Pickup Completed': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'Replacement Shipped': case 'Shipped': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    if (!currentData) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="space-y-4 pb-12 text-left font-outfit animate-in fade-in duration-500 max-w-[1400px] mx-auto px-4 md:px-0">
            {/* Navigation Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 pb-6">
                <div>
                    <button onClick={() => navigate('/admin/replacements')} className="flex items-center gap-2 text-gray-400 hover:text-black font-black text-[9px] uppercase tracking-widest transition-all group mb-2">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Log
                    </button>
                    <h1 className="text-2xl font-serif font-black text-black tracking-tight leading-none uppercase">Replacement Protocol</h1>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2">Internal Verification & Logistics Management</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-3 bg-[#FDF5F6] border border-black/5 rounded-none text-[9px] font-black uppercase tracking-widest text-black hover:bg-gold transition-all">
                        <Download size={14} /> Data Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-none text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
                        <Printer size={14} /> Slip Protocol
                    </button>
                </div>
            </div>

            {/* 1. REPLACEMENT SUMMARY - High Density Geometric */}
            <div className="bg-white p-3 rounded-none border border-black/5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border-r border-black/5 pr-4">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Reference ID</p>
                    <p className="text-sm font-serif font-black text-black tracking-tighter tabular-nums">REP-{currentData.id}</p>
                </div>
                <div className="border-r border-black/5 pr-4 pl-2">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Origin Order</p>
                    <p className="text-[10px] font-black text-gold uppercase tracking-widest cursor-pointer hover:underline tabular-nums">{currentData.orderId}</p>
                </div>
                <div className="border-r border-black/5 pr-4 pl-2">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Chronology</p>
                    <p className="text-[11px] font-serif font-black text-black">{currentData.requestDate}</p>
                </div>
                <div className="pl-2">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Protocol State</p>
                    <span className={`inline-block px-3 py-0.5 rounded-none text-[8px] font-black uppercase tracking-widest border ${getStatusColor(currentData.status)}`}>
                        {currentData.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Items Section (Original & Replacement) - Unified Geometric Table */}
                    <div className="bg-white rounded-none border border-black/5 shadow-sm overflow-hidden">
                        <div className="p-3 border-b border-black/5 bg-[#FDF5F6]/50">
                            <h3 className="text-[9px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                                <RotateCcw size={14} className="text-gold" /> Inventory Flux (Old vs New)
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#FDF5F6]/30 text-[8px] uppercase font-black text-gold tracking-[0.2em] border-b border-black/5">
                                    <tr>
                                        <th className="px-5 py-2.5">Nomenclature</th>
                                        <th className="px-5 py-2.5 text-center">Qty</th>
                                        <th className="px-5 py-2.5 text-right">Valuation</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[10px]">
                                    {/* Original Item */}
                                    {currentData.originalItems.map((item, i) => (
                                        <tr key={`orig-${i}`} className="bg-red-50/20 border-b border-black/5 group">
                                            <td className="px-5 py-2.5 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-none border border-black/5 bg-white overflow-hidden shrink-0 shadow-sm">
                                                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-black uppercase">{item.name}</span>
                                                    <span className="text-[7px] text-red-400 font-bold uppercase tracking-widest mt-0.5">To Be Returned</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-2.5 text-center font-serif font-black">{item.qty}</td>
                                            <td className="px-5 py-2.5 text-right font-serif font-black text-black">₹{item.price.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    {/* Replacement Item */}
                                    {currentData.replacementItems.map((item, i) => (
                                        <tr key={`rep-${i}`} className="bg-emerald-50/20 group">
                                            <td className="px-5 py-2.5 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-none border border-black/5 bg-white overflow-hidden shrink-0 shadow-sm">
                                                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-black uppercase">{item.name}</span>
                                                    <span className="text-[7px] text-emerald-500 font-bold uppercase tracking-widest mt-0.5">New Shipment (Gratis)</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-2.5 text-center font-serif font-black">{item.qty}</td>
                                            <td className="px-5 py-2.5 text-right font-serif font-black text-emerald-600">FREE</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Evidence & Logic */}
                    <div className="bg-white rounded-none border border-black/5 shadow-sm p-3">
                        <h3 className="text-[9px] font-black text-black uppercase tracking-widest mb-3 flex items-center gap-2">
                            <AlertCircle size={14} className="text-gold" /> Discrepancy Evidence
                        </h3>
                        <div className="bg-[#FDF5F6]/50 p-3 border border-black/5">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer Testimony</p>
                            <div className="flex flex-col gap-1">
                                <span className="font-black text-black text-[10px] uppercase">{currentData.evidence.reason}</span>
                                <span className="text-[10px] text-gray-500 italic font-serif">"{currentData.evidence.comment}"</span>
                            </div>
                        </div>
                        {currentData.evidence.images.length > 0 && (
                            <div className="mt-3">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">Visual Verification</p>
                                <div className="flex gap-2">
                                    {currentData.evidence.images.map((img, i) => (
                                        <img key={i} src={img} alt="Proof" className="w-16 h-16 object-cover rounded-none border border-black/5 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN - Actions & Protocol */}
                <div className="space-y-4">
                    {/* Admin Actions Panel - Ultra Compact */}
                    {(currentData.status === 'Pending' || currentData.status === 'Requested') && (
                        <div className="bg-white p-3 rounded-none border border-black/5 shadow-sm space-y-3">
                            <h3 className="text-[9px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                                <Shield size={14} className="text-gold" /> Decision Protocol
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Replacement Mode</p>
                                    <div className="flex gap-1">
                                        {['after_pickup', 'immediate'].map(mode => (
                                            <button
                                                key={mode}
                                                onClick={() => setReplacementMode(mode)}
                                                className={`flex-1 py-1.5 px-2 rounded-none text-[8px] font-black uppercase tracking-widest border transition-all ${replacementMode === mode ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-black/5'}`}
                                            >
                                                {mode.replace('_', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <textarea
                                    className="w-full bg-[#FDF5F6]/40 border border-black/5 rounded-none p-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-gold min-h-[70px] placeholder-gray-300"
                                    placeholder="Internal Log Comment..."
                                    value={adminComment}
                                    onChange={(e) => setAdminComment(e.target.value)}
                                ></textarea>

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => updateStatusMutation.mutate({ status: 'Approved', comment: adminComment, mode: replacementMode })}
                                        className="w-full flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-none font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
                                    >
                                        {updateStatusMutation.isPending ? 'STAGING...' : <><Plus size={14} /> AUTHORIZE RETURN</>}
                                    </button>
                                    <button
                                        onClick={() => updateStatusMutation.mutate({ status: 'Rejected', comment: adminComment })}
                                        className="w-full flex items-center justify-center gap-2 bg-white text-red-500 border border-red-100 py-2 rounded-none font-black text-[9px] uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95"
                                    >
                                        DISMISS REQUEST
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Customer Logistics Card */}
                    <div className="bg-white p-4 rounded-none border border-black/5 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#FDF5F6] border border-black/5 rounded-none flex items-center justify-center font-serif font-black text-sm text-gold">
                                {currentData.customer.name?.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-serif font-black text-black text-sm uppercase leading-tight tabular-nums tracking-tight">{currentData.customer.name}</h3>
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{currentData.customer.phone}</p>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-black/5">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><MapPin size={10} /> Logistics Point</p>
                            <div className="bg-[#FDF5F6]/40 p-3 border border-black/5 text-[10px] font-black text-black uppercase tracking-tight leading-relaxed">
                                {currentData.addresses.pickup.line1}<br />
                                <span className="text-gold">{currentData.addresses.pickup.city}, {currentData.addresses.pickup.state} - {currentData.addresses.pickup.pincode}</span>
                            </div>
                        </div>
                    </div>

                    </div>
            </div>
        </div>
    );
};

export default ReplacementDetailPage;
