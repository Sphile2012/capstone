const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createBooking = async (req, res) => {
  try {
    const { listing, checkInDate, checkOutDate, numberOfGuests, specialRequests, guestMessage } = req.body;
    
    const listingDoc = await Listing.findById(listing);
    
    if (!listingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    const totalGuests = numberOfGuests.adults + numberOfGuests.children;
    
    const basePricePerNight = listingDoc.pricing.basePrice;
    const totalBasePrice = basePricePerNight * numberOfNights;
    const cleaningFee = listingDoc.pricing.cleaningFee || 0;
    const serviceFee = totalBasePrice * 0.14;
    const taxes = (totalBasePrice + cleaningFee + serviceFee) * 0.10;
    const totalPrice = totalBasePrice + cleaningFee + serviceFee + taxes;
    
    const booking = await Booking.create({
      listing,
      guest: req.user._id,
      host: listingDoc.host,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfGuests,
      totalGuests,
      numberOfNights,
      pricing: {
        basePricePerNight,
        totalBasePrice,
        cleaningFee,
        serviceFee,
        taxes,
        totalPrice
      },
      specialRequests,
      guestMessage,
      status: listingDoc.availability.instantBook ? 'confirmed' : 'pending'
    });
    
    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate('listing', 'title photos address pricing')
      .populate('host', 'firstName lastName avatar')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getHostBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ host: req.user._id })
      .populate('listing', 'title photos address')
      .populate('guest', 'firstName lastName avatar')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('listing')
      .populate('guest', 'firstName lastName avatar email phoneNumber')
      .populate('host', 'firstName lastName avatar email phoneNumber');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    if (booking.guest._id.toString() !== req.user._id.toString() && 
        booking.host._id.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }
    
    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    if (booking.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the host can update booking status'
      });
    }
    
    booking.status = status;
    await booking.save();
    
    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const booking = await Booking.findById(req.params.id).populate('listing');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    if (booking.guest.toString() !== req.user._id.toString() && 
        booking.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }
    
    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.cancelledBy = booking.guest.toString() === req.user._id.toString() ? 'guest' : 'host';
    booking.cancelledAt = new Date();
    
    await booking.save();
    
    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
