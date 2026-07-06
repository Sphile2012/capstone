const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    default: 'My Wishlist'
  },
  description: {
    type: String,
    maxlength: 500
  },
  listings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }],
  isPrivate: {
    type: Boolean,
    default: false
  },
  coverPhoto: {
    type: String
  }
}, {
  timestamps: true
});

wishlistSchema.index({ user: 1 });

module.exports = mongoose.model('Wishlist', wishlistSchema);
