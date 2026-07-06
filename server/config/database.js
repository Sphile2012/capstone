const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`Database connected successfully: ${mongoose.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      console.error('Database connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Database disconnected');
    });
    
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Database connection closed due to app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
