const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error'));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || user.accountStatus !== 'active') {
      return next(new Error('User not found or inactive'));
    }
    
    socket.userId = user._id.toString();
    socket.userEmail = user.email;
    next();
  } catch (error) {
    return next(new Error('Authentication error'));
  }
};
