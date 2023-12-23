const express = require("express");
const router = express.Router();

const {updateProfile, getAllUserDetails, deleteAccount, getEnrolledCourses, updateDisplayPicture, instructorDashboard} = require("../controllers/profile");
const { isAuthenticated, isStudent, isInstructor } = require("../middleware/auth");

router.delete("/deleteProfile", isAuthenticated, deleteAccount);
router.put("/updateProfile", isAuthenticated, updateProfile);
router.post("/getUserDetails", isAuthenticated, getAllUserDetails);
router.post("/enrolledCourses", isAuthenticated, isStudent, getEnrolledCourses);
router.put("/updateDisplayPicture", isAuthenticated, updateDisplayPicture);
router.post("/instructorDashboard", isAuthenticated, isInstructor, instructorDashboard)



module.exports = router;