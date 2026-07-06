import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get('/api/admin/analytics');
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard-page">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="stats-grid">
          <div className="stat-card card">
            <h3>Total Users</h3>
            <p className="stat-number">{analytics?.totalUsers || 0}</p>
          </div>
          <div className="stat-card card">
            <h3>Total Listings</h3>
            <p className="stat-number">{analytics?.totalListings || 0}</p>
          </div>
          <div className="stat-card card">
            <h3>Total Bookings</h3>
            <p className="stat-number">{analytics?.totalBookings || 0}</p>
          </div>
          <div className="stat-card card">
            <h3>Total Revenue</h3>
            <p className="stat-number">${analytics?.totalRevenue || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
