import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Eye, EyeOff, Box, CheckCircle, ChevronDown, ChevronRight, Plus, Search, Layers } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const SubcategoryManagement = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock grouped data structure
    const [categoryGroups, setCategoryGroups] = useState([
        {
            id: 101,
            name: 'Rings',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop',
            isExpanded: false,
            subcategories: [
                { id: 1, name: 'Solitaire', productCount: 42, status: 'Active' },
                { id: 2, name: 'Band', productCount: 28, status: 'Active' },
                { id: 5, name: 'Cocktail', productCount: 15, status: 'Hidden' }
            ]
        },
        {
            id: 102,
            name: 'Earrings',
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop',
            isExpanded: false,
            subcategories: [
                { id: 3, name: 'Crystal Drop', productCount: 35, status: 'Active' },
                { id: 4, name: 'Hoops', productCount: 18, status: 'Hidden' }
            ]
        },
        {
            id: 103,
            name: 'Necklaces',
            image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=100&h=100&fit=crop',
            isExpanded: false,
            subcategories: [
                { id: 6, name: 'Pendants', productCount: 56, status: 'Active' },
                { id: 7, name: 'Chokers', productCount: 22, status: 'Active' }
            ]
        }
    ]);

    // Derived stats
    const totalSubcategories = categoryGroups.reduce((acc, cat) => acc + cat.subcategories.length, 0);
    const activeSubcategories = categoryGroups.reduce((acc, cat) => acc + cat.subcategories.filter(s => s.status === 'Active').length, 0);
    const totalParents = categoryGroups.length;

    const toggleGroupExpand = (groupId) => {
        setCategoryGroups(categoryGroups.map(group =>
            group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group
        ));
    };

    const toggleSubcategoryStatus = (groupId, subId) => {
        setCategoryGroups(categoryGroups.map(group => {
            if (group.id === groupId) {
                return {
                    ...group,
                    subcategories: group.subcategories.map(sub =>
                        sub.id === subId ? { ...sub, status: sub.status === 'Active' ? 'Hidden' : 'Active' } : sub
                    )
                };
            }
            return group;
        }));
    };

    const handleDeleteSubcategory = (groupId, subId) => {
        if (window.confirm('Are you sure you want to delete this subcategory?')) {
            setCategoryGroups(categoryGroups.map(group => {
                if (group.id === groupId) {
                    return {
                        ...group,
                        subcategories: group.subcategories.filter(sub => sub.id !== subId)
                    };
                }
                return group;
            }));
        }
    };

    // Filter logic
    const filteredGroups = categoryGroups.map(group => ({
        ...group,
        subcategories: group.subcategories.filter(sub =>
            sub.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) || group.subcategories.length > 0
    );

    const stats = [
        { label: 'Total Sub-levels', value: totalSubcategories, icon: Layers, color: 'bg-blue-50 text-blue-600' },
        { label: 'Live Levels', value: activeSubcategories, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
        { label: 'Parent Groups', value: totalParents, icon: Box, color: 'bg-orange-50 text-orange-600' }
    ];

    return (
        <div className="space-y-4 animate-in fade-in duration-500 font-outfit text-left pb-12">
            <div className="mb-2">
                <PageHeader
                    title="Sub-Level Hierarchy"
                    subtitle="Administrative control over secondary product classifications"
                    action={{
                        label: "ADD SUB-CATEGORY",
                        onClick: () => navigate('/admin/subcategories/new'),
                        icon: <Plus className="w-3.5 h-3.5" />
                    }}
                />
            </div>

            {/* Stats Overview - High Density Geometric */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-3 rounded-none border border-black/5 shadow-sm flex items-center justify-between group transition-all hover:border-gold/30">
                        <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                            <p className="text-xl font-black text-black tracking-tighter tabular-nums font-outfit uppercase">{stat.value}</p>
                        </div>
                        <div className={`w-8 h-8 rounded-none flex items-center justify-center p-1.5 border border-black/5 ${stat.color.replace('bg-', 'bg-[#FDF5F6] text-gold')}`}>
                            <stat.icon className="w-full h-full" strokeWidth={2.5} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Search Interface */}
            <div className="bg-white p-3 rounded-none border border-black/5 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold" />
                    <input
                        type="text"
                        placeholder="Search specific level..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#FDF5F6] border border-black/5 rounded-none text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-gold transition-all"
                    />
                </div>
            </div>

            {/* Grouped Lists - Ultra Compact Geometric */}
            <div className="space-y-3">
                {filteredGroups.map(group => (
                    <div key={group.id} className="bg-white rounded-none border border-black/5 overflow-hidden shadow-sm transition-all duration-300 hover:border-gold/20">
                        {/* Parent Header */}
                        <div
                            className="p-3 flex items-center justify-between cursor-pointer hover:bg-[#FDF5F6]/40 transition-colors"
                            onClick={() => toggleGroupExpand(group.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-1 transition-transform duration-300 ${group.isExpanded ? 'rotate-90 text-gold' : 'text-gray-400'}`}>
                                    <ChevronRight size={16} strokeWidth={3} />
                                </div>
                                <div className="w-10 h-10 rounded-none bg-[#FDF5F6] border border-black/5 overflow-hidden shrink-0 shadow-sm">
                                    <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="font-serif font-black text-black text-[13px] uppercase tracking-tighter leading-none">{group.name}</h3>
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">{group.subcategories.length} Nodes Discovered</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => navigate(`/admin/subcategories/new?parent=${group.id}`)}
                                    className="px-4 py-1.5 bg-[#FDF5F6] border border-black/5 rounded-none text-[9px] font-black text-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-sm active:scale-95"
                                >
                                    <Plus className="inline w-3 h-3 mr-1" /> Add Node
                                </button>
                            </div>
                        </div>

                        {/* Hierarchical Detail Grid */}
                        {group.isExpanded && (
                            <div className="border-t border-black/5 bg-[#FDF5F6]/20 animate-in slide-in-from-top-1 duration-300">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#FDF5F6]/80 border-b border-black/5">
                                            <tr>
                                                <th className="px-6 py-3 pl-20 text-[8px] font-black text-gold uppercase tracking-[0.3em]">Sub-Level</th>
                                                <th className="px-6 py-3 text-center text-[8px] font-black text-gold uppercase tracking-[0.3em]">Product Log</th>
                                                <th className="px-6 py-3 text-center text-[8px] font-black text-gold uppercase tracking-[0.3em]">Protocol Status</th>
                                                <th className="px-6 py-3 text-right text-[8px] font-black text-gold uppercase tracking-[0.3em]">Lifecycle Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/5">
                                            {group.subcategories.length > 0 ? (
                                                group.subcategories.map(sub => (
                                                    <tr key={sub.id} className="hover:bg-white transition-colors group">
                                                        <td className="px-6 py-2.5 pl-20">
                                                            <span className="font-black text-black text-[10px] uppercase tracking-tight">{sub.name}</span>
                                                        </td>
                                                        <td className="px-6 py-2.5 text-center">
                                                            <span className="font-black text-[10px] text-gray-400 tabular-nums tracking-widest font-outfit uppercase">{sub.productCount} SKUs</span>
                                                        </td>
                                                        <td className="px-6 py-2.5 text-center">
                                                            <button
                                                                onClick={() => toggleSubcategoryStatus(group.id, sub.id)}
                                                                className={`inline-flex items-center justify-center px-3 py-0.5 rounded-none text-[8px] font-black uppercase tracking-widest border transition-all ${sub.status === 'Active'
                                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                                    : 'bg-red-50 text-red-500 border-red-100'
                                                                    }`}
                                                            >
                                                                {sub.status === 'Active' ? 'Operational' : 'Restricted'}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-2.5 text-right">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <button
                                                                    onClick={() => navigate(`/admin/subcategories/edit/${sub.id}`)}
                                                                    className="p-1.5 text-gray-400 hover:text-black transition-all hover:bg-gold/10"
                                                                >
                                                                    <Edit2 className="w-3.5 h-3.5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteSubcategory(group.id, sub.id)}
                                                                    className="p-1.5 text-gray-400 hover:text-red-500 transition-all hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-6 text-center text-gray-300 text-[9px] font-black uppercase tracking-widest">
                                                        Null Dataset Found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubcategoryManagement;
