import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageAddress = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([
        { id: 1, type: 'Home', address: '12/1 7th cross 1st main Maruti Nagar, Madiwala, Bangalore 560068', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 2, type: 'Office', address: 'Tech Park, Whitefield Main Rd, Bengaluru 560066', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' }
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newAddr, setNewAddr] = useState({ type: '', address: '' });
    const [editId, setEditId] = useState(null);

    const handleDelete = (id) => {
        setAddresses(addresses.filter(a => a.id !== id));
    };

    const handleAdd = () => {
        if (!newAddr.type || !newAddr.address) return;
        const id = Date.now();
        const icon = newAddr.type.toLowerCase() === 'home' 
            ? 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            : 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z';
        setAddresses([...addresses, { ...newAddr, id, icon }]);
        setNewAddr({ type: '', address: '' });
        setIsAdding(false);
    };

    const handleUpdate = (id, text) => {
        setAddresses(addresses.map(a => a.id === id ? { ...a, address: text } : a));
        setEditId(null);
    };

    return (
        <div className="animate-slide-up px-6 pt-6">
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-2xl font-black">My Addresses</h1>
            </div>

            <div className="space-y-4 mb-8">
                {addresses.map(item => (
                    <div key={item.id} className="bg-white p-5 rounded-[32px] shadow-sm flex gap-4 animate-scale-in">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-extrabold text-sm mb-1">{item.type}</h3>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setEditId(item.id)}
                                        className="text-primary font-bold text-[10px] uppercase"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 font-bold text-[10px] uppercase"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {editId === item.id ? (
                                <div className="mt-2 flex gap-2">
                                    <input 
                                        autoFocus
                                        className="text-[11px] border-b border-primary w-full outline-none"
                                        defaultValue={item.address}
                                        onBlur={(e) => handleUpdate(item.id, e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleUpdate(item.id, e.target.value)}
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-400 text-[11px] leading-relaxed pr-4">{item.address}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {isAdding ? (
                <div className="bg-white p-6 rounded-[32px] shadow-lg border border-primary/20 space-y-3 mb-8 animate-slide-up">
                    <input 
                        placeholder="Address Type (e.g. Home, Work)" 
                        className="form-input text-xs"
                        value={newAddr.type}
                        onChange={e => setNewAddr({ ...newAddr, type: e.target.value })}
                    />
                    <textarea 
                        placeholder="Full Address" 
                        className="form-input text-xs min-h-[80px]"
                        value={newAddr.address}
                        onChange={e => setNewAddr({ ...newAddr, address: e.target.value })}
                    />
                    <div className="flex gap-2">
                        <button onClick={handleAdd} className="primary-btn text-[10px] py-3">Save Address</button>
                        <button onClick={() => setIsAdding(false)} className="flex-1 bg-gray-100 font-black text-[10px] uppercase rounded-2xl">Cancel</button>
                    </div>
                </div>
            ) : (
                <button 
                    onClick={() => setIsAdding(true)}
                    className="w-full py-5 border-2 border-dashed border-gray-200 rounded-[32px] flex items-center justify-center gap-3 text-gray-400 hover:border-primary hover:text-primary transition-all active:scale-95"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-black text-xs uppercase tracking-widest">Add New Address</span>
                </button>
            )}
        </div>
    );
};

export default ManageAddress;
