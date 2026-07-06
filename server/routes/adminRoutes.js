const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find().populate('host', 'firstName lastName email');
    res.json({ success: true, listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('guest', 'firstName lastName email')
      .populate('host', 'firstName lastName email')
      .populate('listing', 'title');
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/analytics', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHosts = await User.countDocuments({ isHost: true });
    const totalListings = await Listing.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$pricing.totalPrice' } } }
    ]);
    
    res.json({
      success: true,
      analytics: {
        totalUsers,
        totalHosts,
        totalListings,
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
