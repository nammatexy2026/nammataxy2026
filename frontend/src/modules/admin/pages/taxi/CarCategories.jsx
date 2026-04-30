import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Pencil, ChevronLeft, ChevronRight, Check, X, Upload, Loader2, IndianRupee, Users, Briefcase } from 'lucide-react';
import api from '../../../../lib/api';
import { imageMap } from '../../../../data';

const CarCategories = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await api.get('/vehicle-categories');
            if (res && res.data) {
                setCategories(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        try {
            await api.patch(`/vehicle-categories/${id}`, { isActive: !currentStatus });
            setCategories(prev => prev.map(c => c._id === id ? { ...c, isActive: !currentStatus } : c));
        } catch (error) {
            console.error('Failed to update category status', error);
            alert('Failed to update status');
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setShowModal(true);
    };

    const filteredCategories = categories.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500 text-left">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">CAR CATEGORY</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fleet & Pricing Configuration</p>
            </div>

            {/* Filter Section */}
            <div className="mb-4 flex items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2 flex-1">
                    <input 
                        type="text" 
                        placeholder="Search Name .." 
                        className="w-full max-w-[240px] px-3 py-1.5 border border-gray-300 rounded-none text-[13px] focus:outline-none focus:border-gray-500 transition-colors placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="px-10 py-1.5 bg-black hover:bg-zinc-800 text-white font-bold text-[14px] rounded-none transition-all uppercase tracking-tight">
                        Search
                    </button>
                </div>
                
                <button 
                    onClick={handleAdd}
                    className="hover:scale-110 transition-transform active:scale-95 flex-shrink-0"
                >
                    <div className="w-9 h-9 bg-gradient-to-b from-[#A6D96A] to-[#88C54D] rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)] border border-white/30 mr-1">
                        <PlusCircle size={32} className="text-white fill-[#88C54D] stroke-[1px]" />
                    </div>
                </button>
            </div>

            {/* Table Section */}
            <div className="border border-gray-200 rounded-none overflow-hidden bg-white shadow-sm">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#FDFDFD] border-b border-gray-200 text-left">
                            <th className="px-3 py-2.5 text-[13px] font-black text-black uppercase border-r border-gray-200 w-[70px]">Sr No.</th>
                            <th className="px-3 py-2.5 text-[13px] font-black text-black uppercase border-r border-gray-200">Name</th>
                            <th className="px-3 py-2.5 text-center text-[13px] font-black text-black uppercase border-r border-gray-200">Image</th>
                            <th className="px-3 py-2.5 text-[13px] font-black text-black uppercase border-r border-gray-200 w-[80px]">Seats</th>
                            <th className="px-3 py-2.5 text-[13px] font-black text-black uppercase border-r border-gray-200 w-[100px]">Status</th>
                            <th className="px-3 py-2.5 text-[13px] font-black text-black uppercase border-r border-gray-200">Base Price</th>
                            <th className="px-3 py-2.5 text-[13px] font-black text-black uppercase w-[100px]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="px-3 py-8 text-center text-[13px] text-gray-500 font-medium">Loading categories...</td>
                            </tr>
                        ) : filteredCategories.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-3 py-8 text-center text-[13px] text-gray-500 font-medium">No categories found.</td>
                            </tr>
                        ) : filteredCategories.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-3 py-4 text-[13px] text-[#333] border-r border-gray-200">{index + 1}</td>
                                <td className="px-3 py-4 text-[13px] font-bold text-[#1a1a1a] border-r border-gray-200 uppercase tracking-tight">{item.name}</td>
                                <td className="px-3 py-4 border-r border-gray-200">
                                    <div className="flex justify-center h-12">
                                        {item.image ? (
                                            <img 
                                                src={item.image.startsWith('http') ? item.image : (imageMap[item.image] || item.image)} 
                                                alt={item.name} 
                                                className="h-full w-auto object-contain drop-shadow-md" 
                                            />
                                        ) : (
                                            <div className="h-full w-12 bg-gray-50 rounded flex items-center justify-center text-[8px] text-gray-400 font-bold uppercase border border-dashed border-gray-200">No Image</div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-3 py-4 text-[13px] font-bold text-[#333] border-r border-gray-200 text-center">{item.seats}</td>
                                <td className="px-3 py-4 border-r border-gray-200">
                                    <span className={`px-3 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-tight
                                        ${item.isActive 
                                            ? 'bg-emerald-500 text-white' 
                                            : 'bg-red-500 text-white'}`}
                                    >
                                        {item.isActive ? 'Enable' : 'Disable'}
                                    </span>
                                </td>
                                <td className="px-3 py-4 text-[13px] font-black text-black border-r border-gray-200">
                                    ₹{item.baseDisplayPrice || 0}
                                </td>
                                <td className="px-3 py-4">
                                    <div className="flex items-center gap-3">
                                        <div 
                                            onClick={() => toggleStatus(item._id, item.isActive)}
                                            className={`w-11 h-5 rounded-full p-0.5 transition-all duration-300 cursor-pointer flex items-center
                                            ${item.isActive ? 'bg-[#88C54D]' : 'bg-[#D1D5DB]'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                                                ${item.isActive ? 'translate-x-6' : 'translate-x-0'}`}
                                            ></div>
                                        </div>
                                        <button 
                                            onClick={() => handleEdit(item)}
                                            className="text-amber-500 hover:text-amber-600 transition-colors"
                                        >
                                            <Pencil size={18} fill="currentColor" stroke="none" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            {!loading && filteredCategories.length > 0 && (
                <div className="mt-4 flex justify-end">
                    <div className="flex items-center border border-gray-200 rounded-none overflow-hidden">
                        <button className="px-2 py-1 text-gray-400 hover:bg-gray-50 border-r border-gray-200 transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="px-3 py-1 bg-black text-[#F7DC9D] text-[13px] font-bold border-r border-gray-200">1</button>
                        <button className="px-2 py-1 text-black hover:bg-gray-50 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-12 text-center text-[10px] font-bold text-gray-400 py-6 border-t border-gray-100 uppercase tracking-[0.3em]">
                NAMMA TAXI • FLEET OPERATIONS CENTER
            </div>

            {showModal && (
                <CategoryModal 
                    category={editingCategory}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setShowModal(false);
                        fetchCategories();
                    }}
                />
            )}
        </div>
    );
};

const CategoryModal = ({ category, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: category?.name || '',
        seats: category?.seats || 4,
        luggage: category?.luggage || 2,
        baseDisplayPrice: category?.baseDisplayPrice || 0,
        image: category?.image || '',
        isActive: category?.isActive ?? true
    });
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const data = new FormData();
            data.append('image', file);
            
            const res = await api.post('/upload/image', data);
            if (res && res.data) {
                setFormData(prev => ({ ...prev, image: res.data.url }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            if (category?._id) {
                await api.patch(`/vehicle-categories/${category._id}`, formData);
            } else {
                await api.post('/vehicle-categories', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Save failed:', error);
            alert(error.message || 'Failed to save category');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col font-outfit border border-white/20">
                <div className="p-8 bg-black text-white flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight">{category ? 'Update Category' : 'New Fleet Category'}</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Configure Vehicle Specs</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-8 space-y-6">
                    {/* Image Upload Area */}
                    <div 
                        onClick={() => fileInputRef.current.click()}
                        className="relative group cursor-pointer aspect-[16/9] bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 overflow-hidden flex flex-col items-center justify-center transition-all hover:border-black/20"
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="animate-spin text-black" size={32} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Uploading to Cloud...</span>
                            </div>
                        ) : formData.image ? (
                            <>
                                <img 
                                    src={formData.image.startsWith('http') ? formData.image : (imageMap[formData.image] || formData.image)} 
                                    alt="Preview" 
                                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white p-3 rounded-full shadow-xl">
                                        <Upload size={20} className="text-black" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-4 bg-white rounded-full shadow-sm border border-gray-100">
                                    <Upload size={24} className="text-gray-400" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Click to upload vehicle photo</span>
                            </div>
                        )}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            className="hidden" 
                            accept="image/*"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Category Name</label>
                            <input 
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                placeholder="e.g., PREMIUM SEDAN"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Seats</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input 
                                    type="number"
                                    required
                                    value={formData.seats}
                                    onChange={e => setFormData(prev => ({ ...prev, seats: e.target.value }))}
                                    className="w-full pl-10 pr-5 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Luggage (Units)</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input 
                                    type="number"
                                    required
                                    value={formData.luggage}
                                    onChange={e => setFormData(prev => ({ ...prev, luggage: e.target.value }))}
                                    className="w-full pl-10 pr-5 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Base Display Price</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={14} />
                                <input 
                                    type="number"
                                    required
                                    value={formData.baseDisplayPrice}
                                    onChange={e => setFormData(prev => ({ ...prev, baseDisplayPrice: e.target.value }))}
                                    className="w-full pl-10 pr-5 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-[13px] font-black text-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={saving || uploading}
                        className="w-full py-4 bg-black text-[#F7DC9D] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="animate-spin" size={16} />
                                Synchronizing Data...
                            </>
                        ) : (
                            category ? 'Update Category' : 'Deploy Category'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CarCategories;
