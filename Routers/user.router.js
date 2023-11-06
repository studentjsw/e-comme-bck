const router = require("express").Router();
const user = require("../Controllers/user.controller");

router.post("/signup",user.userSignUp)
router.post("/signin",user.login)

module.exports = router;