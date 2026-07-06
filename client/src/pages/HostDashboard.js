import React from 'react';
import { Link } from 'react-router-dom';
import './HostDashboard.css';

const HostDashboard = () => {
  return (
    <div className="host-dashboard-page">
      <div className="container">
        <h1>Host Dashboard</h1>
        <div className="dashboard-grid">
          <Link to="/host/create-listing" className="dashboard-card card">
            <h3>Create New Listing</h3>
            <p>List your space on Airbnb</p>
          </Link>
          <div className="dashboard-card card">
            <h3>My Listings</h3>
            <p>Manage your properties</p>
          </div>
          <div className="dashboard-card card">
            <h3>Reservations</h3>
            <p>View upcoming bookings</p>
          </div>
          <div className="dashboard-card card">
            <h3>Earnings</h3>
            <p>Track your income</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
