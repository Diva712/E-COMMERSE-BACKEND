const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.DB_URL;
  if (!uri) {
    console.error('MongoDB URI is not defined. Please set the MONGO_URI environment variable.');
    process.exit(1);
  }
  try {

    const instance = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));

  } catch (error) {
    console.log(`MongoDb Error : ${error}`)
  }
}

module.exports = { connectDB };

