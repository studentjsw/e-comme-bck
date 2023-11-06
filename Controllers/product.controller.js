const { productModel } = require("../Models/addProduct.model");
const { userModel } = require("../Models/user.model");

exports.addProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.find({ _id: id });
    if (user.isAdmin == true) {
      const { productName, description, price, image, category, subCategory } =
        req.body;
      const data = {
        productName,
        description,
        price,
        image,
        category,
        subCategory,
      };
      const product = await productModel.create(data);
      res.status(200).json({
        success: true,
        message: "Product Added Successfully",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Only Admin Can Add Product",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const product = await productModel.find();
    res.status(200).json({
      success: true,
      message: "Product Data Fetched Successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
