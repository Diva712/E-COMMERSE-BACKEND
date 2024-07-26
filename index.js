const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const cloudinary = require('cloudinary');

const userRoutes = require('./routers/UserRoutes');
// Load environment variables from .env file
dotenv.config();

//DB Connection
connectDB()

//cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
})


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());




// Routes
app.use('/api/v1/users', userRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});