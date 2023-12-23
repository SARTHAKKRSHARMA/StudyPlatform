import React, { useEffect, useState } from 'react'
import {Outlet, useParams} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { getFullDetailsOfCourse } from '../services/operations/courses';
import { setCompletedLecture, setCourseSectionData, setEntireCourseData, setTotalNumberOfLecture } from '../slices/viewCourseSlice';
import toast from 'react-hot-toast';
import VideoDetailsSidebar from '../components/core/viewCourse/VideoDetailsSidebar';
import ReviewModal from '../components/core/viewCourse/ReviewModal';

const ViewCourse = () => {
    const  {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);
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
                dispatch(setCourseSectionData(result?.populatedCourse?.courseContent));
                dispatch(setEntireCourseData(result?.populatedCourse));
                dispatch( setCompletedLecture(result?.courseProgress?.completedVideos));
                let lectures = 0;
                result?.populatedCourse?.courseContent.forEach((section) => lectures += section?.subSection?.length)
                dispatch(setTotalNumberOfLecture(lectures));
            }
            else
            {
                toast.error("Failed to load course details");
            }
            setLoading(false);
        }
        fetchCompleteCourseDetails();
    }, [])

    if(loading)
    {
        return <div className=' spinner relative top-[50%] left-[50%]'></div>
    }


  return (
    <div className=' flex flex-row'>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        
        <div>
            <Outlet />
        </div>

        {
            reviewModal && <ReviewModal setReviewModal={setReviewModal} />
        }
    </div>
  )
}

export default ViewCourse