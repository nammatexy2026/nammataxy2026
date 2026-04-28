// Imports from lucide-react were modified, so I should ensure I include the correct imports at the top
// But the replace_file_content cannot edit two blocks at once if non-contiguous AND allow_multiple=false unless I replace a big chunk.
// I will split this into two calls or use multi_replacement. The chunk is large (imports + JSX + Logic). I will rewrite a contiguous large chunk.
// I will replace from imports to end of render.

import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Edit2, Trash2, Eye, EyeOff, Box, CheckCircle, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import AdminStatsCard from '../../components/AdminStatsCard';

const CategoryPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const department = queryParams.get('department') || 'jewellery';

    // Mock Data for different departments
    const departmentalData = {
        jewellery: [
            { id: 1, name: 'Rings', count: 124, status: 'Active', showInCollection: true, showInNavbar: true, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop' },
            { id: 2, name: 'Earrings', count: 85, status: 'Active', showInCollection: true, showInNavbar: true, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop' },
            { id: 3, name: 'Necklaces', count: 64, status: 'Active', showInCollection: false, showInNavbar: true, image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=100&h=100&fit=crop' },
            { id: 4, name: 'Bracelets', count: 42, status: 'Hidden', showInCollection: false, showInNavbar: false, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1520e?w=100&h=100&fit=crop' },
        ],
        machine: [
            { id: 101, name: 'Polishing Machines', count: 12, status: 'Active', showInCollection: true, showInNavbar: true, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100&h=100&fit=crop' },
            { id: 102, name: 'Cutting Tools', count: 28, status: 'Active', showInCollection: true, showInNavbar: true, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&h=100&fit=crop' },
            { id: 103, name: 'Engraving Machines', count: 8, status: 'Active', showInCollection: true, showInNavbar: false, image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=100&h=100&fit=crop' },
        ],
        tools: [
            { id: 201, name: 'Precision Pliers', count: 145, status: 'Active', showInCollection: true, showInNavbar: true, image: 'https://images.unsplash.com/photo-1530124560676-4ce5784914f6?w=100&h=100&fit=crop' },
            { id: 202, name: 'Measuring Gauges', count: 67, status: 'Active', showInCollection: true, showInNavbar: true, image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?w=100&h=100&fit=crop' },
            { id: 203, name: 'Soldering Kits', count: 34, status: 'Active', showInCollection: false, showInNavbar: true, image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop' },
        ]
    };

    const [categories, setCategories] = useState([]);

    // Initialize/Update categories when department changes
    React.useEffect(() => {
        setCategories(departmentalData[department] || departmentalData.jewellery);
    }, [department]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
    };

    const toggleVisibility = (id, field) => {
        setCategories(categories.map(cat =>
            cat.id === id ? { ...cat, [field]: !cat[field] } : cat
        ));
    };

    const toggleStatus = (id) => {
        setCategories(categories.map(cat =>
            cat.id === id ? { ...cat, status: cat.status === 'Active' ? 'Hidden' : 'Active' } : cat
        ));
    };

    const columns = [
        {
            header: 'Category',
            render: (item) => (
                <div className="flex items-center gap-4 text-gray-900">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-bold text-black text-sm">{item.name}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Products',
            render: (item) => (
                <span className="font-bold text-sm text-gray-800">{item.count}</span>
            )
        },
        {
            header: 'In Collection',
            render: (item) => (
                <button
                    onClick={() => toggleVisibility(item.id, 'showInCollection')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${item.showInCollection ? 'bg-[#8D6E63]/10 text-[#8D6E63]' : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    {item.showInCollection ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {item.showInCollection ? 'Shown' : 'Hidden'}
                </button>
            )
        },
        {
            header: 'In Navbar',
            render: (item) => (
                <button
                    onClick={() => toggleVisibility(item.id, 'showInNavbar')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${item.showInNavbar ? 'bg-[#8D6E63]/10 text-[#8D6E63]' : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    {item.showInNavbar ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {item.showInNavbar ? 'Shown' : 'Hidden'}
                </button>
            )
        },
        {
            header: 'Status',
            render: (item) => (
                <button
                    onClick={() => toggleStatus(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${item.status === 'Active'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}
                >
                    {item.status === 'Active' ? <CheckCircle className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {item.status}
                </button>
            )
        },
        {
            header: 'Actions',
            align: 'right',
            render: (item) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => navigate(`/admin/categories/view/${item.id}`)}
                        className="p-2 text-gray-600 hover:text-[#8D6E63] hover:bg-[#8D6E63]/5 rounded-lg transition-all"
                        title="View Category"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => navigate(`/admin/categories/edit/${item.id}`)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    const filters = [
        {
            options: [
                { label: 'All Status', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Hidden', value: 'hidden' }
            ],
            onChange: (val) => console.log('Filter by status:', val)
        }
    ];

    const stats = [
        {
            label: 'Total Categories',
            value: categories.length,
            icon: Box,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            label: 'Active Categories',
            value: categories.filter(c => c.status === 'Active').length,
            icon: CheckCircle,
            color: 'bg-green-50 text-green-600'
        },
        {
            label: 'Hidden Categories',
            value: categories.filter(c => c.status === 'Hidden').length,
            icon: EyeOff,
            color: 'bg-orange-50 text-orange-600'
        }
    ];

    return (
        <div className="space-y-4 animate-in fade-in duration-500 pb-12 font-outfit text-left">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 border border-black/5 rounded-none shadow-sm gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-black text-black tracking-tight leading-none uppercase">
                         {department} Matrix
                    </h1>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2">
                         Global Hierarchy Management for {department}
                    </p>
                </div>
                <button 
                    onClick={() => navigate('/admin/categories/new')}
                    className="px-5 py-2.5 bg-black text-white rounded-none text-[9px] font-black uppercase tracking-widest hover:bg-primary shadow-xl shadow-black/20 transition-all flex items-center gap-3 active:scale-95 group"
                >
                    <Box size={14} className="group-hover:translate-y-0.5 transition-transform" /> 
                    <span>INITIALIZE NEW CATEGORY</span>
                </button>
            </div>

            {/* Matrix Console - High Density */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminStatsCard
                    label="TOTAL CATEGORY DEPTH"
                    value={categories.length.toString().padStart(2, '0')}
                    icon={Box}
                    color="text-footerBg"
                    bgColor="bg-gray-50"
                />
                <AdminStatsCard
                    label="ACTIVE PROTOCOLS"
                    value={categories.filter(c => c.status === 'Active').length.toString().padStart(2, '0')}
                    icon={CheckCircle}
                    color="text-emerald-600"
                    bgColor="bg-emerald-50"
                />
                <AdminStatsCard
                    label="HIDDEN REGISTRIES"
                    value={categories.filter(c => c.status === 'Hidden').length.toString().padStart(2, '0')}
                    icon={EyeOff}
                    color="text-orange-600"
                    bgColor="bg-orange-50"
                />
            </div>

            <DataTable
                columns={columns}
                data={categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchPlaceholder={`Search within ${department} matrix...`}
                filters={filters}
            />
        </div>
    );
};

export default CategoryPage;
