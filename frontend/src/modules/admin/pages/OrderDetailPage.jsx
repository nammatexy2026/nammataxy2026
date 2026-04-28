import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Printer,
    Download,
    CheckCircle2,
    Clock,
    Truck,
    Package,
    MapPin,
    User,
    CreditCard,
    Tag,
    MessageCircle,
    Mail,
    AlertCircle,
    XCircle,
    Check,
    X
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';

const OrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { orders } = useShop();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Approval Workflow State
    const [showRejectInput, setShowRejectInput] = useState(false); // In-card state
    const [rejectionReason, setRejectionReason] = useState('');

    // Fetch order logic (with robust dummy scenarios)
    useEffect(() => {
        setLoading(true);
        const cleanId = id.replace('#', '');

        const allOrders = Object.values(orders || {}).flat();
        const foundOrder = allOrders.find(o => o.id === cleanId || o.id === `#${cleanId}`);

        if (foundOrder) {
            setOrder(foundOrder);
            setLoading(false);
        } else {
            // Dummy Data Logic
            let mockStatus = 'Delivered';
            let mockShipment = { courier: 'Delhivery Express', awb: '123456789012', estimated: '30 Jan 2026' };
            let mockRejection = null;

            if (cleanId.includes('PEND') || cleanId.includes('1561')) {
                mockStatus = 'Pending';
                mockShipment = null;
            } else if (cleanId.includes('REJ') || cleanId.includes('0998')) {
                mockStatus = 'Rejected';
                mockShipment = null;
                mockRejection = {
                    reason: 'Payment verification failed. Customer requested cancellation.',
                    by: 'Admin User',
                    date: new Date().toISOString()
                };
            } else if (cleanId.includes('SHIP')) {
                mockStatus = 'Shipped';
            }

            setTimeout(() => {
                setOrder({
                    id: cleanId,
                    date: new Date().toISOString(),
                    status: mockStatus,
                    paymentMethod: 'Online Payment',
                    amount: 2344,
                    items: [
                        { id: 1, name: 'Premium Almond Jumbo Size', sku: 'SKU-1-V2', quantity: 2, price: 782, image: 'https://via.placeholder.com/50' },
                        { id: 2, name: 'Premium Jumbo Roasted Cashew', sku: 'SKU-2-V2', quantity: 1, price: 980, image: 'https://via.placeholder.com/50' }
                    ],
                    subtotal: 2544,
                    discount: 200,
                    gst: 450,
                    shipping: 0,
                    couponCode: 'WELCOME200',
                    user: { name: 'Aditya Raj', email: 'aditya@example.com', type: 'Individual' },
                    address: { name: 'Aditya Raj', street: '123 Sky Tower', city: 'Mumbai', state: 'Maharashtra', zip: '400001', phone: '+91 9876543210' },
                    timeline: [],
                    shipment: mockShipment,
                    rejection: mockRejection
                });
                setLoading(false);
            }, 500);
        }
    }, [id, orders]);

    const handleApprove = () => {
        setOrder(prev => ({
            ...prev,
            status: 'Approved',
            shipment: { courier: 'Pending Assignment', awb: 'Pending', estimated: 'Calculating...' }
        }));
    };

    const confirmReject = () => {
        if (!rejectionReason.trim()) return;

        setOrder(prev => ({
            ...prev,
            status: 'Rejected',
            rejection: {
                reason: rejectionReason,
                by: 'Admin User',
                date: new Date().toISOString()
            }
        }));
        setShowRejectInput(false);
        setRejectionReason('');
    };

    if (loading) return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Loading Order Details...</div>;
    if (!order) return <div className="p-10 text-center text-red-400 font-bold uppercase tracking-widest">Order not found</div>;

    const statusColor = (status) => {
        if (status === 'Delivered' || status === 'Approved') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        if (status === 'Cancelled' || status === 'Rejected') return 'bg-red-50 text-red-600 border-red-100';
        if (status === 'Shipped') return 'bg-blue-50 text-blue-600 border-blue-100';
        return 'bg-amber-50 text-amber-600 border-amber-100';
    };

    const getTimeline = () => {
        const steps = [
            { status: 'Order Placed', completed: true, date: new Date(order.date).toLocaleDateString() },
            { status: 'Payment Confirmed', completed: true, date: new Date(order.date).toLocaleDateString() },
        ];

        if (order.status === 'Rejected' || order.status === 'Cancelled') {
            steps.push({ status: 'Order Rejected', completed: true, date: order.rejection?.date ? new Date(order.rejection.date).toLocaleDateString() : 'Today', isError: true });
        } else if (order.status === 'Pending') {
            steps.push({ status: 'Admin Approval', completed: false, date: 'Pending' });
        } else {
            steps.push({ status: 'Admin Approved', completed: true, date: 'Today' });
            steps.push({ status: 'Shipment Created', completed: ['Shipped', 'Delivered', 'Out For Delivery'].includes(order.status), date: order.shipment ? 'Today' : 'Pending' });
            steps.push({ status: 'Out for Delivery', completed: ['Out For Delivery', 'Delivered'].includes(order.status), date: 'Pending' });
            steps.push({ status: 'Delivered', completed: order.status === 'Delivered', date: 'Pending' });
        }
        return steps;
    };

    return (
        <div className="space-y-4 font-outfit text-left pb-20 animate-in fade-in duration-500 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <button
                    onClick={() => navigate('/admin/orders')}
                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-[0.2em] transition-all"
                >
                    <ArrowLeft size={14} /> Back to Orders
                </button>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-black/10 text-black rounded-none text-[9px] font-black uppercase tracking-widest hover:bg-gold/10 transition-all">
                        <Printer size={14} /> Print Invoice
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-none text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-lg active:scale-95">
                        <Download size={14} /> Download Slip
                    </button>
                </div>
            </div>

            {/* Info Strip - High Density */}
            <div className="bg-white p-4 rounded-none border border-black/5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Ref</p>
                    <p className="text-xl font-serif font-black text-black tracking-tighter">#{order.id}</p>
                </div>
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Date & Time</p>
                    <p className="text-sm font-black text-black">
                        {new Date(order.date).toLocaleDateString('en-GB')} <span className="text-gray-400 text-xs font-normal ml-1">10:30 AM</span>
                    </p>
                </div>
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-none text-[9px] font-black uppercase tracking-widest border ${statusColor(order.status)}`}>
                        {order.status}
                    </span>
                </div>
                <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Mode</p>
                    <p className={`text-xs font-black tracking-widest uppercase ${order.paymentMethod?.toLowerCase().includes('cod') ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {order.paymentMethod || 'Online Protocol'}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Net Assets</p>
                    <p className="text-2xl font-serif font-black text-gold tabular-nums tracking-tighter">₹ {order.amount?.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column: Items, Billing, Coupon */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-none border border-black/5 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-black/5 flex items-center gap-2 bg-[#FDF5F6]/30">
                            <Package size={14} className="text-gold" />
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Order Items ({order.items?.length || 0})</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#FDF5F6]/80 text-gold border-b border-black/5">
                                    <tr>
                                        <th className="px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em] w-1/2">Item Details</th>
                                        <th className="px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em] text-center">Qty</th>
                                        <th className="px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em] text-right">Price</th>
                                        <th className="px-6 py-3 text-[8px] font-black uppercase tracking-[0.3em] text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {(order.items || []).map((item, idx) => (
                                        <tr key={idx} className="hover:bg-[#FDF5F6]/40 transition-colors">
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white rounded-none border border-black/5 p-1 flex-shrink-0">
                                                        <img src={item.image} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <p className="text-[11px] font-black text-black tracking-tight line-clamp-1 uppercase">{item.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-center font-bold text-black text-[11px] tabular-nums">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-3 text-right text-[10px] font-black text-gray-400 tabular-nums lowercase tracking-tighter">
                                                {item.quantity} x ₹ {item.price}
                                            </td>
                                            <td className="px-6 py-3 text-right font-black text-black text-[11px] tabular-nums">
                                                ₹ {(item.quantity * item.price).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-none border border-black/5 shadow-sm p-4 space-y-3">
                        <div className="flex items-center gap-2 mb-2 border-l-2 border-gold pl-3">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Billing Summary</h3>
                        </div>
                        <div className="space-y-2.5 pt-1">
                            <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span className="text-black font-black">₹ {(order.subtotal || order.amount).toLocaleString()}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                                    <span>Discount (Coupon)</span>
                                    <span className="font-black">-₹ {order.discount}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>GST (18% Included)</span>
                                <span className="text-black font-black">₹ {order.gst || 0}</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>Shipping Charges</span>
                                <span className="text-emerald-600 font-black tracking-[0.2em] text-[10px]">Free</span>
                            </div>
                            <div className="border-t border-black/5 pt-3 flex justify-between items-center">
                                <span className="text-[10px] font-black text-black uppercase tracking-widest">Final Payable Amount</span>
                                <span className="text-2xl font-serif font-black text-black tabular-nums tracking-tighter">₹ {order.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {(order.couponCode || order.discount > 0) && (
                        <div className="bg-[#FDF5F6] rounded-none border border-gold/10 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center text-gold shadow-sm">
                                    <Tag size={16} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gold uppercase tracking-widest mb-0.5">Applied Code</p>
                                    <p className="text-md font-black text-black tracking-widest uppercase">{order.couponCode || 'WELCOME200'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Coupon Saved</p>
                                <p className="text-xl font-serif font-black text-emerald-600 tabular-nums">₹ {order.discount || 200}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Steps, Customer, etc. */}
                <div className="space-y-4">

                    {/* ADMIN ACTIONS: Conditionally show for Pending Orders */}
                    {order.status === 'Pending' && (
                        <div className="bg-white rounded-none border border-black/5 shadow-sm p-4 animate-in slide-in-from-top-4">
                            <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                                <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Admin Actions</h3>
                            </div>
                            <p className="text-[9px] text-gray-400 mb-4 font-bold uppercase tracking-widest leading-relaxed">This order requires your approval to proceed to shipment.</p>

                            {!showRejectInput ? (
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={handleApprove}
                                        className="flex items-center justify-center gap-2 py-2 bg-black text-white rounded-none text-[9px] font-black uppercase tracking-widest hover:bg-gold transition-all shadow-md active:scale-95"
                                    >
                                        <CheckCircle2 size={14} strokeWidth={3} /> Approve
                                    </button>
                                    <button
                                        onClick={() => setShowRejectInput(true)}
                                        className="flex items-center justify-center gap-2 py-2 bg-[#FDF5F6] border border-black/10 text-gray-400 rounded-none text-[9px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all active:scale-95"
                                    >
                                        <XCircle size={14} strokeWidth={3} /> Reject
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="bg-red-50 p-3 rounded-none border border-red-100">
                                        <label className="text-[8px] font-black text-red-400 uppercase tracking-widest block mb-2">Reason for Rejection</label>
                                        <textarea
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            placeholder="..."
                                            className="w-full bg-white border border-red-200 rounded-none p-3 text-[10px] font-bold text-gray-900 focus:outline-none focus:border-red-400 transition-all min-h-[60px] resize-none"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setShowRejectInput(false)}
                                            className="py-2 bg-gray-50 hover:bg-gray-100 text-gray-400 rounded-none text-[9px] font-black uppercase tracking-widest transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmReject}
                                            disabled={!rejectionReason.trim()}
                                            className="py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-none text-[9px] font-black uppercase tracking-widest transition-colors"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Ordered By */}
                    <div className="bg-white rounded-none border border-black/5 shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Ordered By</h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#FDF5F6] rounded-none flex items-center justify-center text-gold font-black border border-black/5 shadow-sm text-md">
                                {order.user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <p className="font-black text-black text-[11px] tracking-widest uppercase">{order.user?.name || 'Unknown User'}</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{order.user?.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="bg-white rounded-none border border-black/5 shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Delivery Details</h3>
                        </div>
                        <div className="bg-[#FDF5F6]/50 rounded-none p-3 border border-black/5">
                            <p className="font-black text-[11px] text-black mb-1 uppercase tracking-widest">{order.address?.name}</p>
                            <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1 mb-3 lowercase tracking-tighter">
                                <MessageCircle size={10} className="text-gold" /> {order.address?.phone || 'N/A'}
                            </p>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Shipping Address</p>
                            <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-tight">
                                {order.address?.street}<br />
                                {order.address?.city}, {order.address?.state} - {order.address?.zip}
                            </p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-none border border-black/5 shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-4 border-l-2 border-gold pl-3">
                            <h3 className="text-[10px] font-black text-black uppercase tracking-widest">Order Timeline</h3>
                        </div>
                        <div className="space-y-4 relative pl-1.5">
                            {getTimeline().map((step, i, arr) => (
                                <div key={i} className="relative flex items-start gap-4 z-10">
                                    {/* Line */}
                                    {i !== arr.length - 1 && (
                                        <div className={`absolute left-[5px] top-5 bottom-[-20px] w-[1px] ${step.completed ? 'bg-gold' : 'bg-black/5'} -z-10`}></div>
                                    )}

                                    <div className={`w-2.5 h-2.5 rounded-none flex items-center justify-center rotate-45 border shrink-0 ${step.isError
                                        ? 'bg-red-500 border-red-500'
                                        : step.completed
                                            ? 'bg-gold border-gold'
                                            : 'bg-white border-black/10'
                                        }`}>
                                    </div>
                                    <div className="-mt-1">
                                        <p className={`text-[9px] font-black uppercase tracking-widest ${step.isError ? 'text-red-600' : 'text-black'}`}>{step.status}</p>
                                        <p className="text-[8px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{step.date || 'Pending'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
