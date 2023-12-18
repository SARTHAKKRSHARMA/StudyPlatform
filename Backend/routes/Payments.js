const express = require("express");
const router = express.Router();

const {capturePayment, verifyPayment} = require("../controllers/payments");
const { isAuthenticated, isStudent } = require("../middleware/auth");

router.post("/capturePayment", isAuthenticated, isStudent, capturePayment);
router.post("/verifySignature", isAuthenticated, isStudent, verifyPayment);

module.exports = router;