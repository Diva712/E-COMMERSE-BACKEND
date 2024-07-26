const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

  category: {
    type: String,
    required: [true, "category  is required"],
  },



}, { timestamps: true });


module.exports = mongoose.model("Category", categorySchema);