// const mongoose=require('mongoose');
// //youtubeBackend
// mongoose
//     .connect('mongodb://localhost:27017/youtubeBackend')
//     .then(()=> console.log('DB connection successful!'))
//     .catch(err=>console.log(err));

const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
