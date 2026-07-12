const express =require("express");
const router= express.Router();
const { validateRegister, validateLogin } = require("../validators/authValidator");
const { registerController, loginController } = require("../controllers/authController");


router.post("/register",validateRegister,registerController);

router.post("/login",validateLogin,loginController);

module.exports= router;