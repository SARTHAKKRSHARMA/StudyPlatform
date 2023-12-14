const express = require("express");
const router = express.Router();

const {contactUsForm} = require("../controllers/contactUs");

router.post("/contactUs", contactUsForm);

module.exports = router