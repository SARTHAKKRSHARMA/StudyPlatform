const express = require("express");
const router = express.Router();

const {updateProfile, getAllUserDetails, deleteAccount, getEnrolledCourses, updateDisplayPicture} = require("../controllers/profile");
const { isAuthenticated, isStudent } = require("../middleware/auth");

router.delete("/deleteProfile", isAuthenticated, deleteAccount);
router.put("/updateProfile", isAuthenticated, updateProfile);
router.get("/getUserDetails", isAuthenticated, getAllUserDetails);
router.get("/enrolledCourses", isAuthenticated, isStudent, getEnrolledCourses);
router.put("/updateDisplayPicture", isAuthenticated, updateDisplayPicture);



module.exports = router;