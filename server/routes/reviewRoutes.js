const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Review = require('../models/Review');

router.post('/', protect, async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, reviewer: req.user._id });
    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/listing/:listingId', async (req, res) => {
  try {
    const reviews = await Review.find({ listing: req.params.listingId, status: 'active' })
      .populate('reviewer', 'firstName lastName avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
