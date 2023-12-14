const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
    CATEGORY_PAGE_DETAIL_API : BASE_URL + "/course/getCategoryPageDetails"
}

export const section = {
    CREATE_SECTION_API : BASE_URL + "/course/addSection",
    UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
}


export const subsection = {
    CREATE_SUBSECTION_API : BASE_URL + "/course/createSubsection",
    UPDATE_SUBSECTION_API : BASE_URL + "/course/updateSubsection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",
}

export const course = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/createSubcection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubsection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubsection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    GET_AVERAGE_RATING_API : BASE_URL + "/course/getAverageRating"
  }


  

export const profile = {
    GET_PROFILE : BASE_URL + "/profile/getUserDetails",
    GET_ENROLLED_COURSES : BASE_URL + "/profile/enrolledCourses"
}


export const authentication = {
    SIGN_UP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    SEND_OTP_API : BASE_URL + "/auth/sendotp",
    CHANGE_PASSWORD_API : BASE_URL + "/auth/changepassword",
    RESET_PASSWORD_TOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_API : BASE_URL + "/auth/reset-password",
    GET_USER_FROM_TOKEN : BASE_URL + "/auth/getUserFromToken"
}

export const contactUs = {
    CONTACTUS_API: BASE_URL + '/contact/contactUs'
}

