const express = require("express");
const router = express.Router();

const {createCourse, getAllCourses, getCourseDetails} = require("../controllers/course");
const {createCategory, getAllCategories, categoriesPageDetails} = require("../controllers/categories");
const {createSection, updateSection, deleteSection} = require("../controllers/sections");
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/subSection");
const {createReview, getAverageRating, getAllRating, getAllRatingForACourse} = require("../controllers/ratingAndReviews");

const {isAuthenticated, isInstructor, isStudent, isAdmin} = require("../middleware/auth");


router.post("/createCourse", isAuthenticated, isInstructor, createCourse);
router.post("/addSection", isAuthenticated, isInstructor, createSection);
router.patch("/updateSection", isAuthenticated, isInstructor, updateSection);
router.delete("/deleteSection", isAuthenticated, isInstructor, deleteSection);
router.post("/createSubsection", isAuthenticated, isInstructor, createSubSection);
router.put("/updateSubsection", isAuthenticated, isInstructor, updateSubSection);
router.delete("/deleteSubsection", isAuthenticated, isInstructor, deleteSubSection);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails",  getCourseDetails);
router.post("/createCategory", isAuthenticated, isAdmin, createCategory);
router.get("/showAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", categoriesPageDetails);
router.post("/createRating", isAuthenticated, isStudent, createReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);
router.post("/getAllRatingCourse", getAllRatingForACourse);

module.exports = router;

