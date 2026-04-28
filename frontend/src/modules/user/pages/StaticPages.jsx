import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageLayout = ({ title, children }) => {
    const navigate = useNavigate();
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
                <h1 className="text-2xl font-black">{title}</h1>
            </div>
            <div className="bg-white rounded-[32px] p-8 shadow-sm text-gray-600 text-sm leading-relaxed mb-32">
                {children}
            </div>
        </div>
    );
};

export const Terms = () => (
    <PageLayout title="Terms & Conditions">
        <h2 className="font-bold text-obsidian mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing and using Namma Taxi, you agree to be bound by these Terms and Conditions. Our services are provided to facilitate easy transportation bookings in Bangalore and surrounding areas.</p>
        <h2 className="font-bold text-obsidian mb-4">2. Booking Policy</h2>
        <p className="mb-4">All bookings are subject to vehicle availability. Fares are calculated based on distance, time, and service type selected.</p>
        <h2 className="font-bold text-obsidian mb-4">3. Cancellation Policy</h2>
        <p>Cancellations made 1 hour before pickup are free. Last-minute cancellations may incur a small fee.</p>
    </PageLayout>
);

export const Privacy = () => (
    <PageLayout title="Privacy Policy">
        <h2 className="font-bold text-obsidian mb-4">Data Collection</h2>
        <p className="mb-4">We collect minimal personal data including name, phone number, and location to provide efficient taxi services.</p>
        <h2 className="font-bold text-obsidian mb-4">Data Usage</h2>
        <p>Your data is never shared with third parties for marketing purposes. We only use it to communicate trip details and improve service quality.</p>
    </PageLayout>
);

export const Support = () => (
    <PageLayout title="Help & Support">
        <div className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <h3 className="font-bold text-obsidian mb-1">Call Us</h3>
                <p className="text-primary font-black">+91 80 4112 4112</p>
            </div>
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <h3 className="font-bold text-obsidian mb-1">Email Us</h3>
                <p className="text-primary font-black">support@nammataxi.com</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-obsidian mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-xs mb-1">How do I book a cab?</h4>
                        <p className="opacity-70">Simply select your service on home screen, enter details and confirm.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs mb-1">Can I book for outstation?</h4>
                        <p className="opacity-70">Yes, we have dedicated outstation packages starting at ₹12/km.</p>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
);
