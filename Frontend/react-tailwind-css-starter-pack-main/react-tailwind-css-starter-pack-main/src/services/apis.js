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
    CREATE_COURSE_API : BASE_URL + "/course/createCourse",
    UPDATE_COURSE_API : BASE_URL + "/course/editCourse",
    DELETE_COURSE_API : BASE_URL + "/course/deleteSubSection",
    GET_ALL_COURSE_API : BASE_URL + "/course/getAllCourses",
    GET_COURSE_DETAILS_API : BASE_URL + "/course/getCourseDetails",
    GET_FULL_COURSE_DETAILS_API : BASE_URL + "/course/getFullCourseDetails",
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

