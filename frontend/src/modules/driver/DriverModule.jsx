import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DriverLogin from './pages/DriverLogin';
import DriverBookings from './pages/DriverBookings';
import DriverBookingDetail from './pages/DriverBookingDetail';
import DriverEarnings from './pages/DriverEarnings';
import { useAuth } from '../../context/AuthContext';
import { ClipboardList, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const DriverModule = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-outfit">
      <div className="w-8 h-8 border-4 border-[#F7DC9D] border-t-black rounded-full animate-spin" />
    </div>
  );

  // Public route for driver login
  return (
    <Routes>
      <Route path="login" element={<DriverLogin />} />
      
      {/* Protected Driver Routes */}
      <Route 
        path="*" 
        element={
          user && user.role === 'driver' ? (
            <div className="min-h-screen bg-gray-50 font-outfit">
              <nav className="bg-black text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
                <span className="font-serif font-black tracking-tight uppercase">Driver Portal</span>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase text-[#F7DC9D]">{user.name}</span>
                  <span className="text-[8px] font-bold opacity-50 uppercase tracking-widest leading-none">Online</span>
                </div>
              </nav>
              
              <div className="p-4 pb-28">
                <Routes>
                  <Route path="bookings" element={<DriverBookings />} />
                  <Route path="booking/:id" element={<DriverBookingDetail />} />
                  <Route path="earnings" element={<DriverEarnings />} />
                  <Route path="/" element={<Navigate to="bookings" replace />} />
                </Routes>
              </div>

              {/* Bottom Navigation */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 p-4 flex justify-around items-center z-50 backdrop-blur-lg bg-white/90">
                <NavLink 
                  to="bookings" 
                  className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-black scale-110' : 'text-gray-300'}`}
                >
                  <ClipboardList size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Rides</span>
                </NavLink>
                <NavLink 
                  to="earnings" 
                  className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-black scale-110' : 'text-gray-300'}`}
                >
                  <Wallet size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Earnings</span>
                </NavLink>
              </div>
            </div>
          ) : (
            <Navigate to="login" replace />
          )
        } 
      />
    </Routes>
  );
};

export default DriverModule;
