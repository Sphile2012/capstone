const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { bookingValidation, validate } = require('../middleware/validation');

router.post('/', protect, bookingValidation, validate, bookingController.createBooking);
router.get('/user', protect, bookingController.getUserBookings);
router.get('/host', protect, bookingController.getHostBookings);
router.get('/:id', protect, bookingController.getBookingById);
router.put('/:id/status', protect, bookingController.updateBookingStatus);
router.put('/:id/cancel', protect, bookingController.cancelBooking);

module.exports = router;
