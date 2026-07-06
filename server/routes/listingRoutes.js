const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { protect, verifyHost } = require('../middleware/auth');
const { listingValidation, validate } = require('../middleware/validation');

router.get('/', listingController.getAllListings);
router.get('/search/nearby', listingController.searchNearby);
router.get('/host/my-listings', protect, verifyHost, listingController.getHostListings);
router.get('/:id', listingController.getListingById);
router.post('/', protect, listingValidation, validate, listingController.createListing);
router.put('/:id', protect, verifyHost, listingController.updateListing);
router.delete('/:id', protect, verifyHost, listingController.deleteListing);

module.exports = router;
