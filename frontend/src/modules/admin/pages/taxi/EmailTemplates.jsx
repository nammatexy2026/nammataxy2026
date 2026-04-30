import React, { useState, useEffect, useRef } from 'react';
import { Search, PlusCircle, Pencil, Trash2, Image as ImageIcon, X, Loader2, Save } from 'lucide-react';
import api from '../../../../lib/api';

const EmailTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        package: '',
        tripType: '',
        title: '',
        description: '',
        image: ''
    });

    const handleImageUpload = async (e) => {
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

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const res = await api.get('/email-templates');
            if (res && res.data) {
                setTemplates(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch templates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleOpenModal = (template = null) => {
        if (template) {
            setEditingId(template._id);
            setFormData({
                package: template.package || '',
                tripType: template.tripType || '',
                title: template.title || '',
                description: template.description || '',
                image: template.image || ''
            });
        } else {
            setEditingId(null);
            setFormData({
                package: '',
                tripType: '',
                title: '',
                description: '',
                image: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (editingId) {
                await api.patch(`/email-templates/${editingId}`, formData);
            } else {
                await api.post('/email-templates', formData);
            }
            fetchTemplates();
            handleCloseModal();
        } catch (error) {
            alert('Operation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this template?')) return;
        try {
            await api.delete(`/email-templates/${id}`);
            fetchTemplates();
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div className="p-0.5 md:p-1 bg-[#F8F9FA] min-h-screen font-inter animate-in fade-in duration-300 text-left relative">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
                .font-roboto { font-family: 'Roboto', sans-serif; }
                .industrial-slider::-webkit-scrollbar { height: 4px; }
                .industrial-slider::-webkit-scrollbar-thumb { background: #333; }
                `}
            </style>

            {/* Top Command Bar */}
            <div className="bg-white border border-gray-200 px-2 py-1.5 mb-1.5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-black"></div>
                    <div>
                        <h1 className="text-[14px] font-black text-black uppercase tracking-tighter font-roboto leading-none">MARKETING_REPO</h1>
                        <p className="text-[7px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none mt-0.5">Asset Repository</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-black hover:bg-zinc-800 text-[#F7DC9D] p-1.5 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                    <PlusCircle size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">NEW_ASSET</span>
                </button>
            </div>

            {/* Desktop View - High Density Table */}
            <div className="hidden md:block border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto industrial-slider">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#FDFDFD] border-b border-gray-100">
                                <th className="px-2 py-1.5 text-left text-[8px] font-black text-black uppercase tracking-widest border-r border-gray-50 w-[35px]">SR</th>
                                <th className="px-2 py-1.5 text-left text-[8px] font-black text-black uppercase tracking-widest border-r border-gray-50 w-[100px]">BANNER</th>
                                <th className="px-2 py-1.5 text-left text-[8px] font-black text-black uppercase tracking-widest border-r border-gray-50 w-[80px]">PKG</th>
                                <th className="px-2 py-1.5 text-left text-[8px] font-black text-black uppercase tracking-widest border-r border-gray-50 w-[80px]">CTX</th>
                                <th className="px-2 py-1.5 text-left text-[8px] font-black text-black uppercase tracking-widest border-r border-gray-50">CAMPAIGN_TITLE</th>
                                <th className="px-2 py-1.5 text-left text-[8px] font-black text-black uppercase tracking-widest border-r border-gray-50">CONTENT</th>
                                <th className="px-2 py-1.5 text-right text-[8px] font-black text-black uppercase tracking-widest w-[80px]">CTRL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="7" className="py-10 text-center font-black text-[9px] text-gray-300 uppercase tracking-widest animate-pulse">POLLING_REPO...</td></tr>
                            ) : templates.length === 0 ? (
                                <tr><td colSpan="7" className="py-10 text-center font-black text-[9px] text-gray-300 uppercase tracking-widest italic">REPO_EMPTY</td></tr>
                            ) : templates.map((item, index) => (
                                <tr key={item._id} className="hover:bg-[#FFFDF6] transition-colors group align-top">
                                    <td className="px-2 py-1 text-[9px] text-gray-300 font-black border-r border-gray-50">{index + 1}</td>
                                    <td className="px-2 py-1 border-r border-gray-50">
                                        <div className="w-[80px] h-[40px] overflow-hidden bg-gray-50 border border-gray-100">
                                            <img src={item.image} alt="T" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                        </div>
                                    </td>
                                    <td className="px-2 py-1 border-r border-gray-50 text-[10px] font-black text-black uppercase truncate">{item.package}</td>
                                    <td className="px-2 py-1 border-r border-gray-50 text-[9px] font-bold text-gray-400 uppercase truncate">{item.tripType}</td>
                                    <td className="px-2 py-1 border-r border-gray-50 text-[10px] font-black text-black uppercase leading-tight">{item.title}</td>
                                    <td className="px-2 py-1 border-r border-gray-50 text-[9px] text-gray-500 font-medium leading-tight">
                                        {item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description}
                                    </td>
                                    <td className="px-2 py-1">
                                        <div className="flex flex-col gap-1">
                                            <button onClick={() => handleOpenModal(item)} className="bg-black text-white py-1 px-2 text-[7px] font-black uppercase tracking-widest flex items-center justify-center gap-1">
                                                <Pencil size={8} className="text-[#F7DC9D]" /> EDIT
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} className="bg-white border border-red-50 text-red-400 py-1 px-2 text-[7px] font-black uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-red-50">
                                                <Trash2 size={8} /> DEL
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile View - High Density Cards */}
            <div className="md:hidden grid grid-cols-1 gap-1 px-0.5">
                {loading ? (
                    <div className="py-10 text-center font-black text-[9px] text-gray-300 uppercase tracking-widest">POLLING_REPO...</div>
                ) : templates.map((item) => (
                    <div key={item._id} className="bg-white border border-gray-200 overflow-hidden shadow-sm flex h-[70px]">
                        <div className="w-[100px] h-full shrink-0">
                            <img src={item.image} alt="T" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-1.5 flex flex-col justify-between relative">
                            <div>
                                <div className="flex justify-between items-start">
                                    <p className="text-[10px] font-black text-black uppercase tracking-tight truncate leading-none pr-6">{item.title}</p>
                                    <div className="absolute top-1.5 right-1.5 flex gap-1.5">
                                        <button onClick={() => handleOpenModal(item)} className="text-gray-300 hover:text-black transition-colors">
                                            <Pencil size={10} />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="text-red-200 hover:text-red-500 transition-colors">
                                            <Trash2 size={10} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">{item.package} // {item.tripType}</p>
                            </div>
                            <p className="text-[8px] text-gray-500 font-medium leading-tight line-clamp-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal - Nano Pro */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-2">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={handleCloseModal}></div>
                    <div className="bg-white w-full max-w-[340px] relative z-10 shadow-2xl animate-in zoom-in duration-100 border border-black/10">
                        <div className="bg-black px-3 py-2 flex items-center justify-between">
                            <div>
                                <h2 className="text-white font-black text-[11px] uppercase tracking-tight font-roboto leading-none">
                                    {editingId ? 'MOD_TEMPLATE' : 'BUILD_ASSET'}
                                </h2>
                                <p className="text-[6px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Asset_Protocol_v3</p>
                            </div>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-white">
                                <X size={14} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-3 space-y-2.5">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-0.5">
                                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-0.5">Package</label>
                                    <input 
                                        required type="text" 
                                        className="w-full px-2 py-1.5 border border-gray-100 focus:outline-none focus:border-black text-[10px] font-black bg-gray-50/30 uppercase"
                                        placeholder="PKG_ID"
                                        value={formData.package}
                                        onChange={(e) => setFormData({...formData, package: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-0.5">Context</label>
                                    <input 
                                        required type="text" 
                                        className="w-full px-2 py-1.5 border border-gray-100 focus:outline-none focus:border-black text-[10px] font-black bg-gray-50/30 uppercase"
                                        placeholder="TRIP_CTX"
                                        value={formData.tripType}
                                        onChange={(e) => setFormData({...formData, tripType: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-0.5">Campaign Title</label>
                                <input 
                                    required type="text" 
                                    className="w-full px-2 py-1.5 border border-gray-100 focus:outline-none focus:border-black text-[10px] font-black uppercase"
                                    placeholder="TITLE_HEADER"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-0.5 text-left block">Banner_Asset</label>
                                <div 
                                    onClick={() => fileInputRef.current.click()}
                                    className="relative group cursor-pointer aspect-[21/8] bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center overflow-hidden"
                                >
                                    {uploading ? (
                                        <Loader2 className="animate-spin text-black" size={12} />
                                    ) : formData.image ? (
                                        <img src={formData.image} alt="P" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-gray-300">
                                            <ImageIcon size={14} />
                                            <span className="text-[6px] font-black uppercase tracking-widest">UPLOAD_ASSET</span>
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-0.5 text-left block">Description</label>
                                <textarea 
                                    required
                                    className="w-full px-2 py-1.5 border border-gray-100 focus:outline-none focus:border-black text-[10px] font-black min-h-[40px] leading-tight"
                                    placeholder="CONTENT_BODY..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>

                            <button 
                                type="submit" disabled={isSubmitting}
                                className="w-full py-2.5 bg-black hover:bg-zinc-800 text-[#F7DC9D] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={12} /> : (editingId ? 'COMMIT_UPDATE' : 'INITIALIZE_PUBLISH')}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Footer Status */}
            <div className="mt-3 text-center text-[7px] font-black text-gray-300 py-3 uppercase tracking-[0.5em] border-t border-gray-50">
                NAMMA_TAXI // MARKETING_OPS // v3.0.1_STABLE
            </div>
        </div>
    );
};

export default EmailTemplates;
