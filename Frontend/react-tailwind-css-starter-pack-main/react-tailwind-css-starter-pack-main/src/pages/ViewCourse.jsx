import React, { useEffect, useState } from 'react'
import {Outlet, useParams} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { getFullDetailsOfCourse } from '../services/operations/courses';
import { setCourseSectionData, setEntireCourseData } from '../slices/viewCourseSlice';

const ViewCourse = () => {
    const  {token} = useSelector(state => state.auth);
    const {courseId} = useParams();
    const dispatch = useDispatch();
    const [reviewModal, setReviewModal] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchCompleteCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if(result)
            {
                dispatch(setCourseSectionData(result.courseContent));
                dispatch(setEntireCourseData(result));
                dispatch()
            }
        }
    })


  return (
    <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        
        <div>
            <Outlet />
        </div>

        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
        }
    </div>
  )
}

export default ViewCourse