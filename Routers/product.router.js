const router = require("express").Router();
const product = require("../Controllers/product.controller")

router.get ("/get/product",product.getProductDetails)
router.post("/addproduct/:id",product.addProduct)

module.exports = router;