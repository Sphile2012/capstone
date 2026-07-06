const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const { sendEmail } = require('../utils/email');
const { sendSMS } = require('../utils/sms');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      emailVerificationToken,
      authProvider: 'local'
    });
    
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${emailVerificationToken}`;
    
    await sendEmail({
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email</p>`
    });
    
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    user.refreshToken = refreshToken;
    await user.save();
    
    res.status(201).json({
      success: true,
      token,
      refreshToken,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    
    if (user.twoFactorEnabled) {
      return res.status(200).json({
        success: true,
        requiresTwoFactor: true,
        userId: user._id
      });
    }
    
    user.lastLogin = new Date();
    await user.save();
    
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    user.refreshToken = refreshToken;
    await user.save();
    
    res.status(200).json({
      success: true,
      token,
      refreshToken,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.refreshToken = undefined;
    await req.user.save();
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with that email'
      });
    }
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 3600000;
    
    await user.save();
    
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.</p>`
    });
    
    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }
    
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    const user = await User.findOne({ emailVerificationToken: token });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token'
      });
    }
    
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.sendPhoneVerification = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    req.user.phoneVerificationToken = code;
    req.user.phoneNumber = phoneNumber;
    await req.user.save();
    
    await sendSMS(phoneNumber, `Your verification code is: ${code}`);
    
    res.status(200).json({
      success: true,
      message: 'Verification code sent'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.verifyPhone = async (req, res) => {
  try {
    const { code } = req.body;
    
    if (req.user.phoneVerificationToken !== code) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }
    
    req.user.phoneVerified = true;
    req.user.phoneVerificationToken = undefined;
    await req.user.save();
    
    res.status(200).json({
      success: true,
      message: 'Phone verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.enable2FA = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `Airbnb Clone (${req.user.email})`
    });
    
    req.user.twoFactorSecret = secret.base32;
    await req.user.save();
    
    const qrCode = await QRCode.toDataURL(secret.otpauth_url);
    
    res.status(200).json({
      success: true,
      secret: secret.base32,
      qrCode
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.verify2FA = async (req, res) => {
  try {
    const { token } = req.body;
    
    const verified = speakeasy.totp.verify({
      secret: req.user.twoFactorSecret,
      encoding: 'base32',
      token
    });
    
    if (!verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid 2FA code'
      });
    }
    
    req.user.twoFactorEnabled = true;
    await req.user.save();
    
    res.status(200).json({
      success: true,
      message: '2FA enabled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }
    
    const newToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);
    
    user.refreshToken = newRefreshToken;
    await user.save();
    
    res.status(200).json({
      success: true,
      token: newToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
};
