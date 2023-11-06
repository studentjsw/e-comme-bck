const { userModel } = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = "da%ui#43F%d^3*4u346h";

// User SignUp
exports.userSignUp =  async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      const {
        name,
        email,
        password
      } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = {
        name,
        email,
        password: hashedPassword
      };
      const user = await userModel.create(data);
      res.status(200).json({
        success: true,
        message: "User Account Created Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User Already Exist",
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

// Login
exports.login = async(req,res) => {
    try{
        const user = await userModel.findOne({ email: req.body.email });
        if(user){
            if (await bcrypt.compare(req.body.password, user.password)){
                const token = await jwt.sign(
                                  {
                                    email: user.email,
                                    name: user.name,
                                    isAdmin: user.isAdmin
                                  },
                                  secretKey
                                );
                                res.status(200).json({
                                  success: true,
                                  message: "User SignIn Successfully",
                                  token,
                                  id: user._id,
                                });
            }else{
                res.status(400).json({
                    success:false,
                    message: "Invalid Password",
                  });
            }
        }else{
            res.status(400).json({
                success:false,
                message: "User Does't Exist"
              });
        }
    }catch(error){
        res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    error
                  });
    }
}