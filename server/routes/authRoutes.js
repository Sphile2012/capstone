const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { registerValidation, loginValidation, validate } = require('../middleware/validation');

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/logout', protect, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/send-phone-verification', protect, authController.sendPhoneVerification);
router.post('/verify-phone', protect, authController.verifyPhone);
router.post('/enable-2fa', protect, authController.enable2FA);
router.post('/verify-2fa', protect, authController.verify2FA);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
