const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Experience = require('../models/Experience');

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find({ status: 'active' })
      .populate('host', 'firstName lastName avatar isSuperhost');
    res.json({ success: true, experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const experience = await Experience.create({ ...req.body, host: req.user._id });
    res.status(201).json({ success: true, experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
