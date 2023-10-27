const express = require("express");
const router = express.Router();

const {logIn, sendOtp, signUp, changePassword} = require("../controllers/auth")
const {resetPasswordToken, resetPassword} = require("../controllers/resetPassword");
const {isNotAuthenticated, isAuthenticated} = require("../middleware/auth");

router.post("/login", isNotAuthenticated, logIn);

router.post("/signup", isNotAuthenticated, signUp);

router.post("/sendotp", isNotAuthenticated, sendOtp);

router.post("/changepassword", isAuthenticated, changePassword);

router.post("/reset-password-token", isNotAuthenticated, resetPasswordToken);
router.post("/reset-password", isNotAuthenticated, resetPassword);

module.exports = router;