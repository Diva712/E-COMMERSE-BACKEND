const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json());




// Routes
app.get('/test', (req, res) => {
  res.send('Hello World !!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});