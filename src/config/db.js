const mongoose = require('mongoose');

const connectDB = async () => {
  try{ 
    const conn =    await mongoose.connect(process.env.MONGO_URI);
    console.log(' ✅ MongoDB connected successfully');
  } catch (err) {
    console.log( "❌  here is the error",  process.env.MONGO_URI);
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
  }

module.exports = connectDB;