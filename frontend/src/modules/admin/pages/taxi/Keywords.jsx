import React, { useState, useEffect } from 'react';
import { Pencil, ListFilter, Loader2, Save, X, Search } from 'lucide-react';
import api from '../../../../lib/api';

const Keywords = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', keywords: '', description: '' });

    const fetchKeywords = async () => {
        try {
            setLoading(true);
            const res = await api.get('/seo');
            if (res && res.data) {
                setKeywords(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch keywords:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeywords();
    }, []);

    const handleEdit = (item) => {
        setEditingId(item._id);
        setEditForm({
            title: item.title,
            keywords: item.keywords,
            description: item.description
        });
    };

    const handleUpdate = async () => {
        try {
            await api.patch(`/seo/${editingId}`, editForm);
            setEditingId(null);
            fetchKeywords();
        } catch (error) {
            alert('Failed to update SEO settings');
        }
    };

    const filteredKeywords = keywords.filter(item => 
        item.page?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-1 md:p-3 bg-white min-h-screen font-inter animate-in fade-in duration-500 text-left">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #000;
                }
                `}
            </style>

            {/* Header Section */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[22px] font-black text-black uppercase tracking-tight font-roboto">SEO KEYWORD MANAGEMENT</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Control platform visibility and meta metadata</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                        type="text" 
                        className="pl-9 pr-4 py-2 border border-black/10 rounded-none focus:outline-none focus:border-black text-[13px] bg-gray-50/50 min-w-[280px] transition-colors"
                        placeholder="Search by page or title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Keyword Table */}
            <div className="border border-gray-200 rounded-none shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-[#FDFDFD] border-b border-gray-200">
                                <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-100 w-[60px]">Sr No.</th>
                                <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-100 w-[160px]">Target Page</th>
                                <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-100 w-[250px]">Meta Title</th>
                                <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-100">Keywords (Tags)</th>
                                <th className="px-4 py-4 text-left text-[11px] font-black text-black uppercase tracking-widest border-r border-gray-100">Meta Description</th>
                                <th className="px-4 py-4 text-center text-[11px] font-black text-black uppercase tracking-widest w-[100px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="animate-spin text-black" size={32} />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading SEO Database...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredKeywords.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-20 text-center text-gray-400 italic font-medium uppercase text-[11px] tracking-widest">No SEO records found.</td>
                                </tr>
                            ) : filteredKeywords.map((item, index) => (
                                <tr key={item._id} className={`${editingId === item._id ? 'bg-amber-50/30' : 'hover:bg-gray-50/50'} transition-colors align-top`}>
                                    <td className="px-4 py-4 text-[12px] text-gray-500 border-r border-gray-100">{index + 1}</td>
                                    <td className="px-4 py-4 text-[12px] text-black font-black uppercase border-r border-gray-100">{item.page}</td>
                                    <td className="px-4 py-4 border-r border-gray-100">
                                        {editingId === item._id ? (
                                            <textarea 
                                                className="w-full p-2 border border-black/20 text-[11px] h-20 focus:outline-none focus:border-black"
                                                value={editForm.title}
                                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                            />
                                        ) : (
                                            <p className="text-[11px] text-gray-800 font-bold leading-relaxed">{item.title}</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 border-r border-gray-100">
                                        {editingId === item._id ? (
                                            <textarea 
                                                className="w-full p-2 border border-black/20 text-[11px] h-20 focus:outline-none focus:border-black"
                                                value={editForm.keywords}
                                                onChange={(e) => setEditForm({...editForm, keywords: e.target.value})}
                                            />
                                        ) : (
                                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed italic">{item.keywords}</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 border-r border-gray-100">
                                        {editingId === item._id ? (
                                            <textarea 
                                                className="w-full p-2 border border-black/20 text-[11px] h-20 focus:outline-none focus:border-black"
                                                value={editForm.description}
                                                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                            />
                                        ) : (
                                            <p className="text-[11px] text-gray-500 leading-relaxed">{item.description}</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {editingId === item._id ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={handleUpdate} className="p-2 bg-black text-white rounded-none hover:bg-zinc-800 transition-colors">
                                                    <Save size={14} />
                                                </button>
                                                <button onClick={() => setEditingId(null)} className="p-2 bg-gray-200 text-gray-600 rounded-none hover:bg-gray-300 transition-colors">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-zinc-400 hover:text-black transition-colors"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-12 text-center text-[10px] font-bold text-gray-400 py-6 border-t border-gray-100 uppercase tracking-[0.4em]">
                NAMMA TAXI • SEO & META ENGINE
            </div>
        </div>
    );
};

export default Keywords;
