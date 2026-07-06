const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
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
    maxlength: 5000
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['apartment', 'house', 'cabin', 'villa', 'cottage', 'bungalow', 'townhouse', 'castle', 'treehouse', 'boat', 'camper', 'tent', 'other']
  },
  roomType: {
    type: String,
    required: true,
    enum: ['entire-place', 'private-room', 'shared-room']
  },
  accommodates: {
    type: Number,
    required: true,
    min: 1
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  beds: {
    type: Number,
    required: true,
    min: 1
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0.5
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  amenities: [{
    type: String,
    enum: [
      'wifi', 'kitchen', 'washer', 'dryer', 'air-conditioning', 'heating',
      'tv', 'iron', 'hair-dryer', 'workspace', 'pool', 'hot-tub', 'gym',
      'free-parking', 'paid-parking', 'ev-charger', 'crib', 'high-chair',
      'smoke-alarm', 'carbon-monoxide-alarm', 'fire-extinguisher',
      'first-aid-kit', 'lock-on-bedroom', 'hangers', 'bed-linens',
      'extra-pillows', 'room-darkening-shades', 'ethernet', 'dedicated-workspace',
      'outdoor-furniture', 'bbq-grill', 'fire-pit', 'pool-table', 'piano',
      'exercise-equipment', 'lake-access', 'beach-access', 'ski-in-out',
      'outdoor-shower', 'sun-loungers', 'hammock', 'kayak', 'security-cameras',
      'bathtub', 'outdoor-dining', 'espresso-machine', 'wine-glasses'
    ]
  }],
  photos: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    order: Number
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: true,
      min: 0
    },
    weekendPrice: {
      type: Number,
      min: 0
    },
    monthlyDiscount: {
      type: Number,
      min: 0,
      max: 100
    },
    weeklyDiscount: {
      type: Number,
      min: 0,
      max: 100
    },
    cleaningFee: {
      type: Number,
      default: 0,
      min: 0
    },
    serviceFee: {
      type: Number,
      default: 0,
      min: 0
    },
    extraGuestFee: {
      type: Number,
      default: 0,
      min: 0
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  availability: {
    minNights: {
      type: Number,
      default: 1,
      min: 1
    },
    maxNights: {
      type: Number,
      default: 365,
      min: 1
    },
    checkInTime: {
      type: String,
      default: '15:00'
    },
    checkOutTime: {
      type: String,
      default: '11:00'
    },
    instantBook: {
      type: Boolean,
      default: false
    },
    blockedDates: [{
      startDate: Date,
      endDate: Date,
      reason: String
    }],
    customPricing: [{
      date: Date,
      price: Number
    }]
  },
  houseRules: {
    smokingAllowed: {
      type: Boolean,
      default: false
    },
    petsAllowed: {
      type: Boolean,
      default: false
    },
    eventsAllowed: {
      type: Boolean,
      default: false
    },
    quietHours: {
      start: String,
      end: String
    },
    additionalRules: [String]
  },
  accessibility: {
    stepFreeEntry: Boolean,
    accessibleBathroom: Boolean,
    wideDoorways: Boolean,
    wheelchairAccessible: Boolean,
    accessibleParking: Boolean,
    elevatorAccess: Boolean
  },
  cancellationPolicy: {
    type: String,
    enum: ['flexible', 'moderate', 'strict', 'super-strict'],
    default: 'moderate'
  },
  checkInMethod: {
    type: String,
    enum: ['self-checkin', 'keypad', 'lockbox', 'smartlock', 'host-greeting'],
    default: 'host-greeting'
  },
  languages: [{
    type: String
  }],
  categories: [{
    type: String,
    enum: [
      'beach', 'amazing-views', 'cabins', 'tiny-homes', 'farms', 'treehouses',
      'mansions', 'castles', 'skiing', 'camping', 'islands', 'national-parks',
      'luxe', 'surfing', 'historical', 'vineyards', 'tropical', 'desert',
      'lakefront', 'countryside', 'caves', 'arctic', 'boat', 'windmills',
      'adapted', 'bed-breakfast', 'design', 'containers', 'earthen-homes',
      'towers', 'off-grid', 'golfing', 'chef-kitchen'
    ]
  }],
  rating: {
    overall: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    cleanliness: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    checkIn: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    communication: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    location: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    value: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: 'pending'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  guestFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

listingSchema.index({ 'address.latitude': 1, 'address.longitude': 1 });
listingSchema.index({ 'pricing.basePrice': 1 });
listingSchema.index({ 'rating.overall': -1 });
listingSchema.index({ categories: 1 });
listingSchema.index({ status: 1 });

module.exports = mongoose.model('Listing', listingSchema);
