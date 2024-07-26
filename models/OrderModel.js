const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City name is required"],
    },
    country: {
      type: String,
      required: [true, "Country name is required"],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, "Product name is required"],
      },
      price: {
        type: Number,
        required: [true, "Product price is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
      },
      image: {
        type: String,
        required: [true, "Product image is required"],
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
    },
  ],
  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  paidAt: Date,
  paymentInfo: {
    id: String,
    status: String,
  },
  itemPrice: {
    type: Number,
    required: [true, "Item price is required"],
  },
  tax: {
    type: Number,
    required: [true, "Tax amount is required"],
  },
  shippingCharges: {
    type: Number,
    required: [true, "Shipping charges are required"],
  },
  totalAmount: {
    type: Number,
    required: [true, "Total amount is required"],
  },
  orderStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered"],
    default: "processing",
  },
  deliveredAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);