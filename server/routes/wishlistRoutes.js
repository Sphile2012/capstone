const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Wishlist = require('../models/Wishlist');

router.post('/', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user: req.user._id }).populate('listings');
    res.json({ success: true, wishlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/add-listing', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { listings: req.body.listingId } },
      { new: true }
    );
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/remove-listing', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      { $pull: { listings: req.body.listingId } },
      { new: true }
    );
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
