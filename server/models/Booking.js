const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  numberOfGuests: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    },
    infants: {
      type: Number,
      default: 0,
      min: 0
    },
    pets: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  totalGuests: {
    type: Number,
    required: true
  },
  numberOfNights: {
    type: Number,
    required: true
  },
  pricing: {
    basePricePerNight: {
      type: Number,
      required: true
    },
    totalBasePrice: {
      type: Number,
      required: true
    },
    cleaningFee: {
      type: Number,
      default: 0
    },
    serviceFee: {
      type: Number,
      default: 0
    },
    taxes: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed', 'cancelled'],
    default: 'pending'
  },
  paymentIntentId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'declined'],
    default: 'pending'
  },
  cancellationReason: {
    type: String
  },
  cancelledBy: {
    type: String,
    enum: ['guest', 'host', 'admin']
  },
  cancelledAt: {
    type: Date
  },
  refundAmount: {
    type: Number,
    default: 0
  },
  specialRequests: {
    type: String,
    maxlength: 500
  },
  guestMessage: {
    type: String,
    maxlength: 1000
  },
  checkInCompleted: {
    type: Boolean,
    default: false
  },
  checkOutCompleted: {
    type: Boolean,
    default: false
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  guestReviewed: {
    type: Boolean,
    default: false
  },
  hostReviewed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

bookingSchema.index({ guest: 1, checkInDate: -1 });
bookingSchema.index({ host: 1, checkInDate: -1 });
bookingSchema.index({ listing: 1, checkInDate: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
