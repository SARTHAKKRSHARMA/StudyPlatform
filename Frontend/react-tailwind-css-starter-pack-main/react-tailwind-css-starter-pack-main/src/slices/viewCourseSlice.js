import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courseSectionData : [],
    courseEntireData : [],
    completedLecture : [],
    totalNumberOfLecture : 0
}

const viewCourseSlice = createSlice({
    name : "viewCourse",
    initialState,
    reducers : {
        setCourseSectionData : (state, action) => {
            state.courseSectionData = action.payload
        },
        setEntireCourseData : (state, action) => {
            state.courseEntireData = action.payload
        },
        setTotalNumberOfLecture : (state, action) => {
            state.totalNumberOfLecture = action.payload
        },
        setCompletedLecture : (state, action) => {
            state.completedLecture = action.payload
        }
    }
})

export const {setCourseSectionData, setEntireCourseData, setTotalNumberOfLecture, setCompletedLecture} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;