const ProductModel = require("../models/ProductModel");
const cloudinary = require('cloudinary');
const getDataUri = require('../utils/DataUri');

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

//create poduct
const creareProduct = async (req, res) => {
  try {

    const { name, description, price, stock, category } = req.body;
    // if (!name || !description || !price) {
    //   return res.status(500).send({
    //     success: false,
    //     message: "Please Provide All Fields"
    //   })
    // }

    if (!req.file) {
      return res.status(500).send({
        success: false,
        message: "Please provide product image"
      })
    }
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url

    }

    await ProductModel.create({
      name,
      description,
      price,
      category,
      stock,
      images: [image]
    })

    res.status(201).send({
      success: true,
      message: "Product created successfully",

    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get create product Api',
      error,
    })
  }
}


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { name, description, price, stock, category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found!"
      });
    }

    res.status(200).send({
      success: true,
      message: "Product details updated!",
      product: updatedProduct
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }
    res.status(500).send({
      success: false,
      message: 'Error in update product API',
      error: error.message,
    });
  }
};


module.exports = { getAllProduct, getSingleProduct, creareProduct, updateProduct };