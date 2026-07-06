const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { Message, Conversation } = require('../models/Message');

router.post('/', protect, async (req, res) => {
  try {
    const { recipient, content, listing } = req.body;
    
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, recipient] }
    });
    
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, recipient],
        listing
      });
    }
    
    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      recipient,
      content
    });
    
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();
    await conversation.save();
    
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/conversations', protect, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id
    })
      .populate('participants', 'firstName lastName avatar')
      .populate('lastMessage')
      .sort({ lastMessageAt: -1 });
    
    res.json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/conversation/:conversationId', protect, async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.conversationId })
      .populate('sender', 'firstName lastName avatar')
      .sort({ createdAt: 1 });
    
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
