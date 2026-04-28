import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Taxi Admin Pages
import AllBookings from './pages/taxi/AllBookings';
import CarCategories from './pages/taxi/CarCategories';
import Customers from './pages/taxi/Customers';
import BasePrices from './pages/taxi/BasePrices';
import VehicleAttachments from './pages/taxi/VehicleAttachments';
import Drivers from './pages/taxi/Drivers';
import Attendance from './pages/taxi/Attendance';
import Staff from './pages/taxi/Staff';
import StaffReports from './pages/taxi/StaffReports';
import Keywords from './pages/taxi/Keywords';
import Business from './pages/taxi/Business';
import EmailTemplates from './pages/taxi/EmailTemplates';
import Settings from './pages/taxi/Settings';

// Additional Pages
import CouponListPage from './pages/CouponListPage';
import PlaceholderPage from './pages/PlaceholderPage';

function AdminModule() {
    return (
        <Routes>
            {/* Public Admin Routes */}
            <Route path="login" element={<LoginPage />} />

            {/* Protected Admin Routes */}
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                
                {/* Taxi Specific Routes */}
                <Route path="bookings/*" element={<AllBookings />} />
                <Route path="car-category/*" element={<CarCategories />} />
                <Route path="customers/*" element={<Customers />} />
                <Route path="prices/*" element={<BasePrices />} />
                <Route path="vehicle-attachments/*" element={<VehicleAttachments />} />
                <Route path="drivers/*" element={<Drivers />} />
                <Route path="attendance/*" element={<Attendance />} />
                <Route path="staff/*" element={<Staff />} />
                <Route path="staff-reports/*" element={<StaffReports />} />
                <Route path="keywords/*" element={<Keywords />} />
                <Route path="business/*" element={<Business />} />
                <Route path="email-templates/*" element={<EmailTemplates />} />
                <Route path="settings/*" element={<Settings />} />

                {/* Additional Sidebar Routes */}
                <Route path="coupons/list" element={<CouponListPage />} />
                <Route path="coupons/*" element={<PlaceholderPage />} />
                <Route path="posts/*" element={<PlaceholderPage />} />
                <Route path="bangalore-taxi/*" element={<PlaceholderPage />} />
                <Route path="search-histories/*" element={<PlaceholderPage />} />

                {/* Default Fallback Route */}
                <Route path="*" element={<DashboardPage />} />
            </Route>
        </Routes>
    );
}

export default AdminModule;
