const router = require("express").Router();
const cart = require("../Controllers/cart.controller");

const validate = async(req,res,next)=>{
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token);
        if (Math.round(new Date() / 1000) < data.exp) {
          next();
        } else {
          res.status(400).json({
            message: "Token Experied",
          });
        }
      } else {
        res.status(400).json({
          message: "Token Not Found",
        });
      }
}

router.get("/get/:id",cart.getCartData)

router.post("/add/:userId/:productId",cart.addToCart)

router.delete("/delete/all/:id",cart.deleteAllCartItems)

router.delete("/delete/:id/:productId",cart.deleteCartItems)


module.exports = router;