const ProductModel = require("../models/ProductModel");
const cloudinary = require('cloudinary');
const getDataUri = require('../utils/DataUri');

//get all product
const getAllProduct = async (req, res) => {
  const { keyword } = req.query;

  try {
    const products = await ProductModel.find({
      name: {
        $regex: keyword ? keyword : "",
        $options: "i",
      },
      // category: category ? category : null,
    });
    res.status(200).send({
      success: true,
      totalProducts: products.length,
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

//update product
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

//update image
const updateProductImage = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Procduct not found !!"
      })
    }

    if (!req.file) {
      return res.status(404).send({
        success: false,
        message: "Product image not found !!",
      })
    }

    const file = getDataUri(req.file);
    //delete previous image
    //await cloudinary.v2.uploader.destroy(product.images.public_id);

    const cdb = await cloudinary.v2.uploader.upload(file.content);

    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url
    }

    product.images.push(image)
    await product.save();

    res.status(200).send({
      success: true,
      message: "Product image updated "
    })


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
}

//delete image product
const deleteProductImage = async (req, res) => {
  try {

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(500).send({
        success: false,
        message: "Product not found!!"
      })
    }
    //image id 
    const id = req.query.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "product image not found !"
      })
    }

    let isExist = -1;
    product.images.forEach((item, index) => {
      if (item._id.toString() === id.toString()) isExist = index;
    });
    if (isExist < 0) {
      return res.status(404).send({
        success: false,
        message: "Image Not Found",
      });
    }
    // Delete product image
    await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
    product.images.splice(isExist, 1);
    await product.save();
    return res.status(200).send({
      success: true,
      message: "Product Image Deleted Successfully",
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
}


//delete product
const deleteProduct = async (req, res) => {
  try {

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found !",
      })
    }

    for (let index = 0; index < product.images.length; index++) {
      await cloudinary.v2.uploader.destroy(product.images[index].public_id)
    }

    await product.deleteOne();
    res.status(200).send({
      success: true,
      message: "Product deleted successfully!!"
    })

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
}


//create product rview

const productReviewController = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    // find product
    const product = await ProductModel.findById(req.params.id);
    // check previous review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Product Alredy Reviewed",
      });
    }
    // review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // passing review object to reviews array
    product.reviews.push(review);
    // number or reviews
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    // save
    await product.save();
    res.status(200).send({
      success: true,
      message: "Review Added!",
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
      message: "Error In Review Comment API",
      error,
    });
  }
};

module.exports = {
  getAllProduct,
  getSingleProduct,
  creareProduct,
  updateProduct,
  updateProductImage,
  deleteProductImage,
  deleteProduct,

  productReviewController
};