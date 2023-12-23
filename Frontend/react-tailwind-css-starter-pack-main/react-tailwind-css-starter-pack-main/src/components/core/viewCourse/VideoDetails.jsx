import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courses';
import { setCompletedLecture } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css"
import { FaPlayCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";



const VideoDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const {courseId, sectionId, subSectionId} = useParams();
    const {courseSectionData, courseEntireData, completedLecture} = useSelector(state => state.viewCourse);
    const {token} = useSelector(state => state.auth);
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paused, setPaused] = useState(true);


    useEffect(() => {
        const videoSpecificData = async () => {
            if(courseSectionData.length !== 0 && sectionId && subSectionId)
            {
                const sectionData = courseSectionData.filter((section) => section._id === sectionId);
                if(sectionData.length !== 0)
                {
                    const subSectionData = sectionData[0].subSection.filter((lecture) => lecture._id === subSectionId);                    
                    setVideoData(subSectionData?.[0]);
                    setVideoEnded(false);
                }
            } else
            {
                navigate("/dashboard/enrolled-courses");
                return;
            }
        }

        videoSpecificData();
    }, [location.pathname, courseSectionData, courseEntireData]);


    const isFirstVideo = () => {
        return courseSectionData?.[0]?.subSection?.[0]?._id === videoData?._id
    }

    const isLastVideo = () => {
        return courseSectionData?.[courseSectionData.length - 1]?.subSection?.[courseSectionData[courseSectionData.length -1].subSection.length - 1]?._id === videoData._id
    }

    const goToNextVideo = () => {
        const sectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
        const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex((lecture) => lecture._id === subSectionId);
        if(subSectionIndex !== courseSectionData[sectionIndex].subSection.length - 1)
        {
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${courseSectionData[sectionIndex].subSection[subSectionIndex + 1]._id}`)
        }
        else
        {
            navigate(`/view-course/${courseId}/section/${courseSectionData[sectionIndex + 1]._id}/sub-section/${courseSectionData[sectionIndex + 1].subSection[0]._id}`)
        }
    }

    const goToPrevVideo = () => {
        const sectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
        const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex((lecture) => lecture._id === subSectionId);
        if(subSectionIndex !== 0)
        {
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${courseSectionData[sectionIndex].subSection[subSectionIndex - 1]._id}`)
        } else 
        {
            navigate(`/view-course/${courseId}/section/${courseSectionData[sectionIndex - 1]._id}/sub-section/${courseSectionData[sectionIndex - 1].subSection[courseSectionData[sectionIndex -1].subSection.length - 1]._id}`);
        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true);
        const result = await markLectureAsComplete({courseId, subSectionId}, token);
        console.log(result);
        if(result)
        {
            dispatch(setCompletedLecture(result));
        } 
        setLoading(false);
    }

    if(loading) 
    {
        return <div className=' spinner absolute top-[50%] left-[50%]'></div>        
    }

    if(!videoData)
    {
        return <div className=' absolute top-[50%] left-[50%]'>
            <p className=' text-richblack-400'>No Video Data</p>
        </div>
    }

  return (
    <div className=' text-richblack-25 px-3 py-3 flex flex-col gap-3 items-center'>
        <div className='  w-[1080px] mx-auto relative'>
            <Player onPlay={() => setPaused(false)} onPause={() => setPaused(true)} className="w-[500px]" ref={playerRef} width={1080} fluid={false} playsInline onEnded={() => setVideoEnded(true)} src={videoData.videoUrl}>                
            </Player>
            {(paused && !videoEnded) && <FaPlayCircle onClick={() => playerRef.current.video.play()} className=' absolute top-[50%] left-[50%] text-[55px] -translate-x-[50%] -translate-y-[50%]' />
            }
            {
                videoEnded && (
                    <div className=' absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col gap-3 items-center w-[100px]'>
                        {!completedLecture.includes(subSectionId) && <button disabled={loading} onClick={() => {handleLectureCompletion(); !isLastVideo() ? goToNextVideo() : navigate("/dashboard/enrolled-courses")}} className=' bg-yellow-25 w-[100%] px-2 py-3 rounded-md text-richblack-800'>Mark as Completed</button> }
                        {!isFirstVideo() && <button disabled={loading} onClick={() => goToPrevVideo()} className=' bg-yellow-25 w-[100%] px-2 py-3 rounded-md text-richblack-800'>Previous</button> }  
                        <button disabled={loading} onClick={() => {playerRef.current.video.seek(0); playerRef.current.video.play(); setVideoEnded(false)}} className=' w-[100%] text-[25px] px-2 py-3 bg-yellow-25 rounded-md flex flex-row items-center justify-center '><GrPowerReset /></button> 
                        {!isLastVideo() && <button disabled={loading} onClick={() => goToNextVideo()} className=' w-[100%] bg-yellow-25 px-2 py-3 rounded-md text-richblack-800'>Next</button> }  

                    </div>
                )
            }
        </div>
        

    </div>
  )
}

export default VideoDetails