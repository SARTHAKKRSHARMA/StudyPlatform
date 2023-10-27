const express = require("express");
const router = express.Router();

const {createOrder, verifySignature} = require("../controllers/payments");
const { isAuthenticated, isStudent } = require("../middleware/auth");

router.post("/capturePayment", isAuthenticated, isStudent, createOrder);
router.post("/verifySignature", verifySignature);

module.exports = router;