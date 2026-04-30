import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, ChevronLeft, ChevronRight, ListFilter, UserPlus, Phone, CreditCard, Calendar } from 'lucide-react';
import api from '../../../../lib/api';

const Drivers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [vehicleCategories, setVehicleCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newDriver, setNewDriver] = useState({
        name: '',
        phone: '',
        email: '',
        licenseNumber: '',
        vehicleNumber: '',
        vehicleCategoryId: '',
        status: 'available'
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [driversRes, categoriesRes] = await Promise.all([
                api.get('/drivers'),
                api.get('/vehicle-categories')
            ]);
            
            if (driversRes && driversRes.data) setDrivers(driversRes.data);
            if (categoriesRes && categoriesRes.data) setVehicleCategories(categoriesRes.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddDriver = async (e) => {
        e.preventDefault();
        try {
            await api.post('/drivers', newDriver);
            setShowAddModal(false);
            setNewDriver({ name: '', phone: '', email: '', licenseNumber: '', vehicleNumber: '', vehicleCategoryId: '', status: 'available' });
            fetchData();
        } catch (err) {
            alert(err.message || 'Failed to add driver');
        }
    };

    const toggleStatus = async (id, currentIsActive) => {
        try {
            await api.patch(`/drivers/${id}`, { isActive: !currentIsActive });
            fetchData();
        } catch {
            alert('Failed to update status');
        }
    };

    const filteredDrivers = drivers.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone.includes(searchTerm) ||
        d.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">DRIVER LIST</h1>
            </div>

            {/* Action Bar - Production Cyan Theme */}
            <div className="mb-4 flex items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2 flex-1">
                    <input 
                        type="text" 
                        placeholder="Name/Phone/Vehicle" 
                        className="w-full max-w-[320px] px-3 py-1.5 border border-gray-200 rounded-none text-[13px] focus:outline-none focus:border-gray-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="hover:scale-110 transition-transform active:scale-95 flex-shrink-0"
                >
                    <div className="w-9 h-9 bg-gradient-to-b from-[#A6D96A] to-[#88C54D] rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)] border border-white/30 mr-1">
                        <PlusCircle size={32} className="text-white fill-[#88C54D] stroke-[1px]" />
                    </div>
                </button>
            </div>

            {/* Driver Table */}
            <div className="border border-gray-200 rounded-none overflow-hidden overflow-x-auto">
                <table className="w-full border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-[#FDFDFD] border-b border-gray-200">
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200 w-[60px]">Sr No.</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">ID/NAME</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Email</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Phone</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">License/Vehicle</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Status</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black border-r border-gray-200">Account</th>
                            <th className="px-2 py-3 text-left text-[12px] font-bold text-black">Join Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="8" className="py-10 text-center text-gray-400">Loading drivers...</td></tr>
                        ) : filteredDrivers.length === 0 ? (
                            <tr><td colSpan="8" className="py-10 text-center text-gray-400">No drivers found</td></tr>
                        ) : filteredDrivers.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-2 py-3 text-[12px] text-gray-700 border-r border-gray-200">{index + 1}</td>
                                <td className="px-2 py-3 border-r border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">DRIVER ID</span>
                                        <span className="text-[12px] text-black font-black uppercase tracking-tight">{item._id.substring(item._id.length-6).toUpperCase()}</span>
                                        <span className="text-[12px] text-gray-700 font-medium mt-0.5">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-2 py-3 text-[11px] text-gray-600 border-r border-gray-200">{item.email || 'N/A'}</td>
                                <td className="px-2 py-3 text-[12px] text-gray-700 border-r border-gray-200">{item.phone}</td>
                                <td className="px-2 py-3 border-r border-gray-200">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-[#E53935] uppercase leading-none mb-1">{item.vehicleNumber}</span>
                                        <span className="text-[10px] text-gray-500 font-medium">LIC: {item.licenseNumber}</span>
                                    </div>
                                </td>
                                <td className="px-2 py-3 border-r border-gray-200">
                                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-tight text-white
                                        ${item.status === 'available' ? 'bg-[#88C54D]' : item.status === 'busy' ? 'bg-[#FF9800]' : 'bg-gray-400'}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-2 py-3 border-r border-gray-200">
                                    <button 
                                        onClick={() => toggleStatus(item._id, item.isActive)}
                                        className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest transition-colors ${item.isActive ? 'bg-[#FF4B55] text-white hover:bg-red-600' : 'bg-[#88C54D] text-white hover:bg-green-600'}`}
                                    >
                                        {item.isActive ? 'DEACTIVATE' : 'ACTIVATE'}
                                    </button>
                                </td>
                                <td className="px-2 py-3 text-[11px] text-gray-600">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Driver Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                        <div className="bg-black p-6 text-white flex justify-between items-center">
                            <h2 className="text-xl font-black uppercase tracking-tight">Add New Driver</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                                <PlusCircle className="rotate-45" size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddDriver} className="p-8 space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Full Name</label>
                                    <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors" 
                                        value={newDriver.name} onChange={e => setNewDriver({...newDriver, name: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Phone</label>
                                        <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors" 
                                            value={newDriver.phone} onChange={e => setNewDriver({...newDriver, phone: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Email</label>
                                        <input type="email" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors" 
                                            value={newDriver.email} onChange={e => setNewDriver({...newDriver, email: e.target.value})} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">License No</label>
                                        <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors" 
                                            value={newDriver.licenseNumber} onChange={e => setNewDriver({...newDriver, licenseNumber: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Vehicle No</label>
                                        <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors" 
                                            value={newDriver.vehicleNumber} onChange={e => setNewDriver({...newDriver, vehicleNumber: e.target.value})} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Vehicle Category</label>
                                    <select 
                                        required 
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                                        value={newDriver.vehicleCategoryId}
                                        onChange={e => setNewDriver({...newDriver, vehicleCategoryId: e.target.value})}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {vehicleCategories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-[#88C54D] hover:bg-[#78B043] text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-[#88C54D]/30 transition-all active:scale-[0.98] mt-4">
                                Create Driver Profile
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Footer Copyright */}
            <div className="mt-8 text-center text-[11px] text-gray-400 py-4 border-t border-gray-100">
                Copyright © 2021 NAMMA TAXI All right reserved
            </div>
        </div>
    );
};

export default Drivers;
