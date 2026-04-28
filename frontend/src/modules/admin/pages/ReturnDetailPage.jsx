import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ArrowLeft,
    Box,
    Truck,
    Clock,
    User,
    Phone,
    Mail,
    MapPin,
    AlertCircle,
    CheckCircle2,
    XCircle,
    FileText,
    Image as ImageIcon,
    Video,
    MessageSquare,
    ChevronDown,
    ChevronUp,
    IndianRupee,
    CreditCard,
    Check,
    X,
    Send,
    Printer,
    Download
} from 'lucide-react';
import toast from 'react-hot-toast';
import ringImg from '../../../assets/diamond_ring.png';
import necklaceImg from '../../../assets/gold_necklace.png';
import banglesImg from '../../../assets/gold_bangles.png';

const ReturnDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // DUMMY DATA CASES - JEWELRY THEMED
    const DUMMY_CASES = {
        // CASE 101: PENDING
        '101': {
            id: '101',
            orderId: '5001',
            type: 'Refund',
            status: 'Pending',
            requestDate: '2025-02-06T09:00:00Z',
            amount: 120000,
            refundAmount: 120000,
            reason: 'Damaged Product',
            userName: 'Rahul Sharma',
            phone: '+91 98765 00001',
            email: 'rahul.s@example.com',
            address: {
                line1: 'A-12, Green Park',
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110016',
                fullName: 'Rahul Sharma'
            },
            items: [
                {
                    name: "Bridal Gold Necklace Set 22k",
                    sku: "JWL-NCK-001",
                    qty: 1,
                    reason: "Clasp Broken",
                    condition: "Defective",
                    price: 120000,
                    image: necklaceImg
                }
            ],
            evidence: {
                comment: "The clasp of the necklace was broken when I opened the box.",
                images: [necklaceImg],
                video: null
            },
            timeline: [
                { status: 'Return Requested', date: '2025-02-06', done: true },
                { status: 'Admin Approved', date: null, done: false },
                { status: 'Pickup Scheduled', date: null, done: false }
            ],
            logs: [
                { type: 'Email', msg: 'Return Request Received', date: '06 Feb 2025, 09:00 AM' }
            ]
        },

        // CASE 102: APPROVED (Pickup Scheduled)
        '102': {
            id: '102',
            orderId: '5002',
            type: 'Refund',
            status: 'Approved',
            requestDate: '2025-02-04T14:30:00Z',
            amount: 85000,
            refundAmount: 85000,
            reason: 'Wrong Item Received',
            userName: 'Priya Singh',
            phone: '+91 98765 00002',
            email: 'priya.s@example.com',
            address: {
                line1: 'B-402, Lotus Tower, Andheri West',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400053',
                fullName: 'Priya Singh'
            },
            items: [
                {
                    name: "22k Gold Bangles (Set of 4)",
                    sku: "JWL-BNG-002",
                    qty: 1,
                    reason: "Wrong Design",
                    condition: "Unopened",
                    price: 85000,
                    image: banglesImg
                }
            ],
            evidence: {
                comment: "I ordered the floral design but received the geometric pattern instead.",
                images: [banglesImg],
                video: null
            },
            courier: {
                partner: 'Delhivery',
                awb: 'RT987654321',
                pickupDate: '2025-02-07',
                status: 'Scheduled'
            },
            timeline: [
                { status: 'Return Requested', date: '2025-02-04', done: true },
                { status: 'Admin Approved', date: '2025-02-05', done: true },
                { status: 'Pickup Scheduled', date: '2025-02-05', done: true },
                { status: 'Picked Up', date: null, done: false }
            ],
            logs: [
                { type: 'Email', msg: 'Return Request Received', date: '04 Feb 2025, 02:30 PM' },
                { type: 'System', msg: 'Pickup Scheduled via Delhivery', date: '05 Feb 2025, 10:00 AM' }
            ]
        },

        // CASE 103: REFUNDED (Completed)
        '103': {
            id: '103',
            orderId: '5003',
            type: 'Refund',
            status: 'Refunded',
            requestDate: '2025-01-20T09:15:00Z',
            amount: 250000,
            refundAmount: 250000,
            reason: 'Quality Issue',
            userName: 'Amit Verma',
            phone: '+91 98765 00003',
            email: 'amit.v@example.com',
            address: {
                line1: 'C-15, Golf Links',
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560071',
                fullName: 'Amit Verma'
            },
            items: [
                {
                    name: "Diamond Engagement Ring 1.5 Carat",
                    sku: "JWL-RNG-003",
                    qty: 1,
                    reason: "Polish Issue",
                    condition: "Opened",
                    price: 250000,
                    image: ringImg
                }
            ],
            evidence: {
                comment: "The diamond seems slightly loose and setting is not as expected.",
                images: [ringImg],
                video: null
            },
            courier: {
                partner: 'BlueDart',
                awb: 'RT555666777',
                pickupDate: '2025-01-22',
                status: 'Delivered'
            },
            refund: {
                method: 'UPI',
                amount: 250000,
                transactionId: 'UPI-1234567890',
                date: '2025-01-25'
            },
            timeline: [
                { status: 'Return Requested', date: '2025-01-20', done: true },
                { status: 'Admin Approved', date: '2025-01-21', done: true },
                { status: 'Picked Up', date: '2025-01-22', done: true },
                { status: 'Received', date: '2025-01-24', done: true },
                { status: 'Refund Completed', date: '2025-01-25', done: true }
            ],
            logs: [
                { type: 'Email', msg: 'Refund Processed successfully', date: '25 Jan 2025, 02:00 PM' }
            ]
        },

        // CASE 104: REJECTED
        '104': {
            id: '104',
            orderId: '5004',
            type: 'Refund',
            status: 'Rejected',
            requestDate: '2025-02-01T16:45:00Z',
            amount: 45000,
            refundAmount: 0,
            reason: 'Changed Mind',
            userName: 'Sneha Gupta',
            phone: '+91 98765 00004',
            email: 'sneha.g@example.com',
            address: {
                line1: 'D-5, Civil Lines',
                city: 'Jaipur',
                state: 'Rajasthan',
                pincode: '302006',
                fullName: 'Sneha Gupta'
            },
            items: [
                {
                    name: "Gold Chain 18k (20 inches)",
                    sku: "JWL-CHN-004",
                    qty: 1,
                    reason: "Changed Mind",
                    condition: "Unopened",
                    price: 45000,
                    image: necklaceImg
                }
            ],
            evidence: {
                comment: "I don't need it anymore.",
                images: [],
                video: null
            },
            adminComment: 'Return policy does not cover "Change of Mind" for jewelry items.',
            timeline: [
                { status: 'Return Requested', date: '2025-02-01', done: true },
                { status: 'Rejected', date: '2025-02-02', done: true }
            ],
            logs: [
                { type: 'Email', msg: 'Return Request Rejected', date: '02 Feb 2025, 09:30 AM' }
            ]
        },

        // CASE 201: REPLACEMENT APPROVED
        '201': {
            id: '201',
            orderId: '6001',
            type: 'Replacement',
            status: 'Approved',
            requestDate: '2025-02-02T14:30:00Z',
            amount: 180000,
            reason: 'Wrong Size',
            userName: 'Priya Verma',
            phone: '+91 98765 00005',
            email: 'priya.v@example.com',
            address: {
                line1: 'E-20, Park Street',
                city: 'Kolkata',
                state: 'West Bengal',
                pincode: '700016',
                fullName: 'Priya Verma'
            },
            items: [
                {
                    name: "Diamond Engagement Ring 1.0 Carat",
                    sku: "JWL-RNG-005",
                    qty: 1,
                    reason: "Wrong Size",
                    condition: "Unopened",
                    price: 180000,
                    image: ringImg
                }
            ],
            evidence: {
                comment: "The ring is too small for my finger.",
                images: [ringImg],
                video: null
            },
            courier: {
                partner: 'Delhivery',
                awb: 'RPL123456',
                pickupDate: '2025-02-03',
                status: 'Scheduled'
            },
            timeline: [
                { status: 'Return Requested', date: '2025-02-02', done: true },
                { status: 'Approved', date: '2025-02-03', done: true },
                { status: 'Pickup Scheduled', date: '2025-02-03', done: true }
            ],
            logs: []
        },

        // CASE 202: REPLACEMENT PENDING
        '202': {
            id: '202',
            orderId: '6002',
            type: 'Replacement',
            status: 'Pending',
            requestDate: '2025-02-04T12:00:00Z',
            amount: 125000,
            reason: 'Defective',
            userName: 'Neha Gupta',
            phone: '+91 99999 88888',
            email: 'neha.g@example.com',
            address: {
                line1: 'F-45, Hitech City',
                city: 'Hyderabad',
                state: 'Telangana',
                pincode: '500081',
                fullName: 'Neha Gupta'
            },
            items: [
                {
                    name: "Gold Necklace Set 22k",
                    sku: "JWL-NCK-006",
                    qty: 1,
                    reason: "Defective",
                    condition: "Opened",
                    price: 125000,
                    image: necklaceImg
                }
            ],
            evidence: {
                comment: "Clasp is not working properly.",
                images: [necklaceImg],
                video: null
            },
            timeline: [
                { status: 'Return Requested', date: '2025-02-04', done: true }
            ],
            logs: []
        },

        // CASE 203: REPLACEMENT SHIPPED
        '203': {
            id: '203',
            orderId: '6003',
            type: 'Replacement',
            status: 'Shipped',
            requestDate: '2025-02-06T09:00:00Z',
            amount: 85000,
            reason: 'Damaged',
            userName: 'Rahul Roy',
            phone: '+91 77777 66666',
            email: 'rahul.r@example.com',
            address: {
                line1: 'G-10, Salt Lake',
                city: 'Kolkata',
                state: 'West Bengal',
                pincode: '700091',
                fullName: 'Rahul Roy'
            },
            items: [
                {
                    name: "22k Gold Bangles (Set of 4)",
                    sku: "JWL-BNG-007",
                    qty: 1,
                    reason: "Damaged",
                    condition: "Opened",
                    price: 85000,
                    image: banglesImg
                }
            ],
            evidence: {
                comment: "Surface has visible scratches.",
                images: [banglesImg],
                video: null
            },
            courier: {
                partner: 'BlueDart',
                awb: 'RPL987654',
                pickupDate: '2025-02-07',
                status: 'Picked Up'
            },
            timeline: [
                { status: 'Return Requested', date: '2025-02-06', done: true },
                { status: 'Approved', date: '2025-02-06', done: true },
                { status: 'Shipped', date: '2025-02-07', done: true }
            ],
            logs: []
        }
    };

    const currentDummyData = DUMMY_CASES[id] || DUMMY_CASES['101'];

    // Fetch Return Details (with fallback to dummy data)
    const { data: ret = currentDummyData, isLoading } = useQuery({
        queryKey: ['return', id],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/returns/${id}`);
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                return data || (DUMMY_CASES[id] || DUMMY_CASES['101']);
            } catch (err) {
                console.log("Using Dummy Data for ID:", id);
                return DUMMY_CASES[id] || DUMMY_CASES['101'];
            }
        }
    });

    // Update Status Mutation
    // Update Status Mutation
    const updateStatusMutation = useMutation({
        mutationFn: async ({ status, comment }) => {
            await new Promise(r => setTimeout(r, 600)); // Simulate API
            const updatedData = {
                ...ret,
                status,
                adminComment: comment,
                // Add dummy courier info if Approved
                ...(status === 'Approved' && {
                    courier: {
                        partner: 'Delhivery',
                        awb: 'RT987654321',
                        pickupDate: new Date().toISOString().split('T')[0],
                        status: 'Scheduled'
                    },
                    timeline: ret.timeline.map(t =>
                        t.status === 'Admin Approved' || t.status === 'Pickup Scheduled'
                            ? { ...t, date: new Date().toISOString().split('T')[0], done: true }
                            : t
                    )
                })
            };
            return updatedData;
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(['return', id], newData);
            toast.success(`Return request ${newData.status}`);
        },
        onError: () => toast.error('Failed to update status')
    });

    const [adminComment, setAdminComment] = useState('');

    if (isLoading) return <div className="p-20 text-center">Loading Return Details...</div>;

    const isReplacement = ret.type === 'Replacement';

    const getStatusColor = (st) => {
        switch (st) {
            case 'Completed':
            case 'Refunded': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'Approved': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'Pending': return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'Rejected': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="space-y-4 font-outfit text-left pb-20 animate-in fade-in duration-500 relative">
            {/* Top Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <button
                    onClick={() => navigate('/admin/returns')}
                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest transition-all"
                >
                    <ArrowLeft size={14} /> Back to Requests
                </button>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-black/10 text-black rounded-none text-[9px] font-black uppercase tracking-widest hover:bg-gold/10 transition-all shadow-sm">
                        <Download size={14} /> Download PDF
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-none text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-lg active:scale-95">
                        <Printer size={14} strokeWidth={2.5} /> Print Slip
                    </button>
                </div>
            </div>

            {/* 1. Return Summary (Top Card) - High Density */}
            <div className="bg-white p-4 rounded-none border border-black/5 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Return ID</p>
                    <p className="text-xl font-serif font-black text-black">#{ret.id}</p>
                </div>
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Ref</p>
                    <p 
                        className="text-sm font-black text-gold hover:underline cursor-pointer tracking-tighter" 
                        onClick={() => navigate(`/admin/orders/${ret.orderId}`)}
                    >
                        #{ret.orderId}
                    </p>
                </div>
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Status</p>
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-none text-[9px] font-black uppercase tracking-widest border ${getStatusColor(ret.status)}`}>
                        {ret.status}
                    </span>
                </div>
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Refund Valuation</p>
                    <p className="text-2xl font-serif font-black text-gold tabular-nums tracking-tighter">₹{(ret.refundAmount || 0).toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column: Items, Breakup, Evidence */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Return Items Table */}
                    <div className="bg-white rounded-none border border-black/5 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-black/5 flex items-center gap-2 bg-[#FDF5F6]/30">
                            <Box size={14} className="text-gold" />
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Return Inventory ({ret.items?.length || 0})</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#FDF5F6]/80 text-gold border-b border-black/5">
                                    <tr>
                                        <th className="px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em] w-1/2">Item Description</th>
                                        <th className="px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em] text-center">Qty</th>
                                        <th className="px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em] text-right">Price</th>
                                        <th className="px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em]">Reason / Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {ret.items?.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-[#FDF5F6]/40 transition-colors">
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white rounded-none border border-black/5 p-1 shrink-0">
                                                        <img src={item.image} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <p className="text-[11px] font-black text-black tracking-tight line-clamp-1 uppercase">{item.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-center font-bold text-black text-[11px] tabular-nums">{item.qty}</td>
                                            <td className="px-6 py-3 text-right font-black text-gray-400 text-[11px] tabular-nums">₹{item.price.toLocaleString()}</td>
                                            <td className="px-6 py-3">
                                                <div className="flex flex-col gap-1">
                                                    <span className="inline-block w-fit px-2 py-0.5 bg-red-50 text-red-600 rounded-none text-[8px] font-black uppercase tracking-widest border border-red-100">{item.reason}</span>
                                                    <span className="text-[9px] font-medium text-gray-400 italic">Condition: {item.condition}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Customer Evidence */}
                    <div className="bg-white rounded-none border border-black/5 shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Inspection Evidence</h3>
                        </div>
                        <div className="bg-[#FDF5F6] p-4 rounded-none border border-gold/10 mb-4 flex gap-4">
                            <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center text-gold shrink-0">
                                <MessageSquare size={16} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gold uppercase tracking-widest mb-1">Customer Statement</p>
                                <p className="text-xs font-bold text-black leading-relaxed italic uppercase tracking-tight">"{ret.evidence?.comment}"</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Verification Uploads</p>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {ret.evidence?.images?.map((img, i) => (
                                    <div key={i} className="w-24 h-24 rounded-none border border-black/5 overflow-hidden shrink-0 group cursor-pointer relative shadow-sm hover:border-gold/50 transition-all">
                                        <img src={img} alt="Proof" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <ImageIcon className="text-white" size={16} />
                                        </div>
                                    </div>
                                ))}
                                {ret.evidence?.video && (
                                    <div className="w-24 h-24 rounded-none border border-black/5 bg-gray-50 flex flex-col items-center justify-center shrink-0 cursor-pointer hover:border-gold/50 transition-all group">
                                        <Video className="text-gray-400 group-hover:text-gold" size={24} />
                                        <p className="text-[8px] font-black uppercase text-gray-400 mt-2">Play Media</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Refund Details */}
                    {!isReplacement && (
                        <div className="bg-white rounded-none border border-black/5 shadow-sm p-4">
                            <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                                <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Fiscal Disposition</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-1">
                                <div className="bg-[#FDF5F6]/50 p-3 border border-black/5">
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Acquisition Method</p>
                                    <p className="text-[11px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                                        <CreditCard size={12} className="text-gold" /> {ret.refund?.method || 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-[#FDF5F6]/50 p-3 border border-black/5">
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Transaction Ref</p>
                                    <p className="text-[11px] font-black text-black tracking-widest uppercase truncate">{ret.refund?.transactionId || 'Awaiting Cycle'}</p>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-black/5 pt-4 flex justify-between items-center">
                                <span className="text-[10px] font-black text-black uppercase tracking-widest">Final Settlement Amount</span>
                                <span className="text-2xl font-serif font-black text-emerald-600 tracking-tighter">₹{ret.refund?.amount?.toLocaleString() || '0'}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Customer, Timeline, Actions */}
                <div className="space-y-4">
                    {/* Admin Actions */}
                    {ret.status === 'Pending' && (
                        <div className="bg-white p-4 rounded-none border border-black/5 shadow-sm animate-in slide-in-from-top-4">
                            <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                                <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Protocol Decision</h3>
                            </div>
                            <textarea
                                className="w-full bg-[#FDF5F6]/50 border border-black/5 rounded-none p-3 text-[10px] font-bold text-gray-800 outline-none focus:border-gold min-h-[80px] resize-none mb-3 transition-all"
                                placeholder="Mandatory internal rationale..."
                                value={adminComment}
                                onChange={(e) => setAdminComment(e.target.value)}
                            ></textarea>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => updateStatusMutation.mutate({ status: 'Approved', comment: adminComment })}
                                    className="flex items-center justify-center gap-2 py-2 bg-black text-white rounded-none text-[9px] font-black uppercase tracking-widest hover:bg-gold transition-all shadow-md active:scale-95"
                                >
                                    <CheckCircle2 size={14} strokeWidth={3} /> Approve
                                </button>
                                <button
                                    onClick={() => updateStatusMutation.mutate({ status: 'Rejected', comment: adminComment })}
                                    className="flex items-center justify-center gap-2 py-2 bg-[#FDF5F6] border border-black/10 text-gray-400 rounded-none text-[9px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all active:scale-95"
                                >
                                    <XCircle size={14} strokeWidth={3} /> Reject
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Decision Note (If resolved) */}
                    {(ret.status === 'Approved' || ret.status === 'Rejected') && (
                        <div className={`${ret.status === 'Approved' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'} p-4 rounded-none border shadow-sm`}>
                            <h3 className={`text-[9px] font-black ${ret.status === 'Approved' ? 'text-emerald-600' : 'text-red-500'} uppercase tracking-widest mb-2`}>
                                Official Rationale
                            </h3>
                            <p className={`text-[10px] font-bold leading-relaxed uppercase tracking-tight ${ret.status === 'Approved' ? 'text-emerald-800' : 'text-red-800'}`}>
                                {ret.adminComment || "Operational clearance provided without specific notation."}
                            </p>
                        </div>
                    )}

                    {/* Customer Portfolio */}
                    <div className="bg-white p-4 rounded-none border border-black/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Client Portfolio</h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#FDF5F6] rounded-none border border-black/5 flex items-center justify-center font-black text-gold text-lg shadow-sm">
                                {ret.userName?.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-black text-black text-[11px] uppercase tracking-widest truncate">{ret.userName}</h3>
                                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-1">
                                    <Phone size={10} /> {ret.phone}
                                </p>
                                <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest flex items-center gap-1">
                                    <Mail size={10} /> {ret.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pickup Address */}
                    <div className="bg-white p-4 rounded-none border border-black/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Logistics Disposition</h3>
                        </div>
                        <div className="bg-[#FDF5F6]/50 p-3 border border-black/5">
                            <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-tight">
                                {ret.address?.line1}<br />
                                <span className="block mt-1 font-black text-black text-[11px]">
                                    {ret.address?.city}, {ret.address?.state} - {ret.address?.pincode}
                                </span>
                            </p>
                            <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between">
                                <p className="text-[8px] font-black text-gold uppercase tracking-[0.2em] flex items-center gap-1">
                                    <Truck size={10} /> Shiprocket Verified
                                </p>
                                <X size={10} className="text-gray-300" />
                            </div>
                        </div>
                    </div>

                    {/* Return Timeline */}
                    <div className="bg-white p-4 rounded-none border border-black/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-5 border-l-2 border-gold pl-3">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Processing Chronology</h3>
                        </div>
                        <div className="space-y-5 relative pl-1.5">
                            <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-black/5"></div>
                            {ret.timeline?.map((step, idx) => (
                                <div key={idx} className={`relative flex items-start gap-4 z-10 transition-opacity ${step.done ? 'opacity-100' : 'opacity-40'}`}>
                                    <div className={`w-2.5 h-2.5 rounded-none rotate-45 border shrink-0 z-10 ${step.done ? 'bg-gold border-gold' : 'bg-white border-black/10'}`}></div>
                                    <div className="-mt-1">
                                        <p className="text-[9px] font-black text-black uppercase tracking-widest">{step.status}</p>
                                        <p className="text-[8px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{step.date || 'Pending Cycle'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Courier Tracking (If active) */}
                    {(ret.status === 'Approved' || ret.status === 'Completed' || ret.status === 'Refunded') && (
                        <div className="bg-white p-4 rounded-none border border-black/5 border-l-2 border-l-gold shadow-sm">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Truck size={14} className="text-gold" strokeWidth={2.5} /> Tracking Protocol
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Carrier</span>
                                    <span className="text-black font-black">{ret.courier?.partner}</span>
                                </div>
                                <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>AWB Reference</span>
                                    <span className="text-black font-black select-all tracking-widest">{ret.courier?.awb}</span>
                                </div>
                                <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Cycle Window</span>
                                    <span className="text-black font-black">{ret.courier?.pickupDate}</span>
                                </div>
                                <button className="w-full mt-2 py-2.5 bg-black text-white hover:bg-gold hover:text-black rounded-none text-[8px] font-black uppercase tracking-widest transition-all">
                                    Synchronize Live Map
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Operational Dispatch */}
                    <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center gap-2 py-2.5 bg-[#FDF5F6] text-black border border-black/5 rounded-none text-[8px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                            <Send size={12} /> WhatsApp
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 bg-[#FDF5F6] text-black border border-black/5 rounded-none text-[8px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            <Mail size={12} /> Email Registry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnDetailPage;
