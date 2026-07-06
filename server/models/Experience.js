const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 3000
  },
  category: {
    type: String,
    required: true,
    enum: ['adventure', 'cooking', 'cultural', 'entertainment', 'nature', 'wellness', 'workshop', 'online']
  },
  duration: {
    type: Number,
    required: true
  },
  maxGuests: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    city: String,
    country: String,
    latitude: Number,
    longitude: Number
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  photos: [{
    url: String,
    caption: String
  }],
  availability: [{
    date: Date,
    slots: [{
      startTime: String,
      endTime: String,
      available: Boolean
    }]
  }],
  included: [String],
  whatToBring: [String],
  languages: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);
