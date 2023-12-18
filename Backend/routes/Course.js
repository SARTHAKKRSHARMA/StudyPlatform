const express = require("express");
const router = express.Router();

const {createCourse, getAllCourses, getCourseDetails, editCourse, deleteCourse, getInstructorCourses, publishCourse, getCourseDetailsAuthenticated} = require("../controllers/course");
const {createCategory, getAllCategories, categoriesPageDetails} = require("../controllers/categories");
const {createSection, updateSection, deleteSection} = require("../controllers/sections");
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/subSection");
const {createReview, getAverageRating, getAllRating, getAllRatingForACourse} = require("../controllers/ratingAndReviews");

const {isAuthenticated, isInstructor, isStudent, isAdmin} = require("../middleware/auth");


router.post("/createCourse", isAuthenticated, isInstructor, createCourse);
router.post("/addSection", isAuthenticated, isInstructor, createSection);
router.post("/updateSection", isAuthenticated, isInstructor, updateSection);
router.post("/deleteSection", isAuthenticated, isInstructor, deleteSection);
router.post("/createSubsection", isAuthenticated, isInstructor, createSubSection);
router.post("/updateSubsection", isAuthenticated, isInstructor, updateSubSection);
router.post("/deleteSubsection", isAuthenticated, isInstructor, deleteSubSection);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails",  getCourseDetails);
router.post("/createCategory", isAuthenticated, isAdmin, createCategory);
router.get("/showAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", categoriesPageDetails);
router.post("/createRating", isAuthenticated, isStudent, createReview);
router.post("/getAverageRating", getAverageRating);
router.post("/getReviews", getAllRating);
router.post("/getAllRatingCourse", getAllRatingForACourse);
router.post("/editCourse", isAuthenticated, editCourse);
router.post("/deleteCourse", isAuthenticated, deleteCourse);
router.post("/getInstructorCourses", isAuthenticated, getInstructorCourses);
router.post("/publishCourse", isAuthenticated, publishCourse);
router.post("/getCourseDetailsAuthenticated", isAuthenticated, isStudent, getCourseDetailsAuthenticated);



module.exports = router;

