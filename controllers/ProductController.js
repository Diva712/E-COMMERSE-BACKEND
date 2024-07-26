const ProductModel = require("../models/ProductModel");

//get all product
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


//get single product
const getSingleProduct = async (req, res) => {
  try {

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(500).send({
        success: false,
        message: 'Product not found !!',
        error,
      })
    }

    res.status(200).send({
      success: true,
      message: "Product Found",
      product,
    })

  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      res.status(500).send({
        success: false,
        message: 'Invalid Id',

      })
    }
    res.status(500).send({
      success: false,
      message: 'Error in Get single product Api',
      error,
    })
  }
}

module.exports = { getAllProduct, getSingleProduct };