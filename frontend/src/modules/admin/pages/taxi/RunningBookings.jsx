import React from 'react';
import AllBookings from './AllBookings';

const RunningBookings = () => {
    // In a real app, this would filter by status='Running'
    return <AllBookings title="Running Bookings" filterStatus="Running" />;
};

export default RunningBookings;
