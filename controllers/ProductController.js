const ProductModel = require("../models/ProductModel");

const getAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).send({
      success: true,
      message: "all products fetched succesfully!!",
      products,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get all product Api',
      error,
    })
  }
}

module.exports = { getAllProduct };