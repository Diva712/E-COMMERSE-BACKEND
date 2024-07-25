const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    const instance = await mongoose.connect(process.env.DB_URL)
    console.log(`Mongodb connected : ${instance.connection.host}`)

  } catch (error) {
    console.log(`MongoDb Error : ${error}`)
  }
}

module.exports = { connectDB };

