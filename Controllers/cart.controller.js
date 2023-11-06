const { productModel } = require("../Models/addProduct.model");
const { cartModel } = require("../Models/cart.model");
const { userModel } = require("../Models/user.model");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await cartModel.findOne({ userId: userId });
    if (!cart) {
      const product = await productModel.findOne({ _id: productId });
      const data = {
        userId,
        items: [
          {
            productId,
            quantity: 1,
            price: product.price,
          },
        ],
        totalItem: 1,
      };
      const createCart = await cartModel.create(data);
      res.status(200).json({
        success: true,
        message: "Product Added To Cart Successfully",
        createCart,
      });
    } else {
      const filterData = cart.items.find((data) => data.productId == productId);
      if (!filterData) {
        const product = await productModel.findOne({ _id: productId });
        const oldData = cart.items;
        const data = {
          productId,
          quantity: 1,
          price: product.price,
        };
        const newData = [...oldData, data];
        cart.items = newData;
        cart.totalItem = cart.totalItem + 1;
        cart.save();
        res.status(200).json({
          success: true,
          message: "Product Added To Cart Successfully",
          newData,
          cart,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Product Already In The Cart",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getCartData = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: req.params.id });
    res.status(200).json({
      success: true,
      message: "Cart Data Fetched Successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.deleteCartItems = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: req.params.id });
    const filterData = cart.items.filter(
      (data) => data.productId != req.params.productId
    );
    cart.items = filterData;
    cart.totalItem = filterData.length;
    cart.save();
    res.status(200).json({
      success: true,
      message: "Cart Data Deleted Successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.deleteAllCartItems = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: req.params.id });
    cart.items = [];
    cart.totalItem = 0;
    cart.save();
    res.status(200).json({
      success: true,
      message: "All Cart Data Deleted Successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
