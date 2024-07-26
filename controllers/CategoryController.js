const categoryModel = require('../models/CategoryModel');


const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    // validation
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "please provide category name",
      });
    }
    const createdCategory = await categoryModel.create({ category });
    res.status(201).send({
      success: true,
      message: `${category} category creted successfully`,
      createCategory
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Cat API",
    });
  }
}

module.exports = { createCategory };