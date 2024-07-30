const orderModel = require('../models/OrderModel');
const productModel = require('../models/ProductModel'); // Assuming this is your product model
const Razorpay = require('razorpay');
//create order
const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    } = req.body;
    //valdiation
    // create order
    await orderModel.create({
      user: req.user._id,
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    });



    // stock update
    for (let i = 0; i < orderItems.length; i++) {
      // find product
      const product = await productModel.findById(orderItems[i].product);
      product.stock -= orderItems[i].quantity;
      await product.save();
    }
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Order API",
      error,
    });
  }
};

//get my order
const myOrder = async (req, res) => {
  try {
    // find orders
    const orders = await orderModel.find({ user: req.user._id });
    //valdiation
    if (!orders) {
      return res.status(404).send({
        success: false,
        message: "no orders found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your orders data",
      totalOrder: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In My orders Order API",
      error,
    });
  }
};


//get Single Order details
const getSingleOrder = async (req, res) => {
  try {
    // find orders
    const order = await orderModel.findById(req.params.id);
    //valdiation
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "no order found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your order fetched",
      order,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
}

//Razor pay integration 
const razorPayKey = async (req, res) => {
  return res.status(200).send({
    success: true,
    key: process.env.RAZORPAY_KEY_ID
  })
}

// capturing Payment;
const razorPayCapturingPayment = async (req, res) => {
  try {
    const { nanoid } = await import('nanoid');

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET_KEY;

    console.log("RAZORPAY_KEY_ID:", keyId);
    console.log("RAZORPAY_SECRET_KEY:", keySecret);

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const orderOptions = {
      amount: req.body.totalAmount * 100, // Convert to smallest currency unit
      currency: "INR",
      receipt: nanoid(10)
    };

    const myOrder = await instance.orders.create(orderOptions);

    res.status(200).send({
      success: true,
      totalAmount: req.body.totalAmount,
      order: myOrder
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      message: "Error In Razorpay API",
      error: error.message || error
    });
  }
};




module.exports = { createOrder, myOrder, getSingleOrder, razorPayKey, razorPayCapturingPayment };