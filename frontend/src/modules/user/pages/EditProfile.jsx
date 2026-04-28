import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('Hritik');
    const [email, setEmail] = useState('hritik@example.com');
    const [phone, setPhone] = useState('+91 88 8449 9990');

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
                <h1 className="text-2xl font-black">Edit Profile</h1>
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm space-y-6">
                <div className="flex flex-col items-center mb-4">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-3xl border-4 border-white shadow-md">
                            {name[0]}
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-obsidian text-white rounded-full flex items-center justify-center border-2 border-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        </button>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase mt-4 tracking-widest">Change Photo</p>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} />
                        <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1">Full Name</span>
                    </div>
                    <div className="relative">
                        <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
                        <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1">Email Address</span>
                    </div>
                    <div className="relative">
                        <input type="tel" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} />
                        <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1">Phone Number</span>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/profile')}
                    className="primary-btn mt-4"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
