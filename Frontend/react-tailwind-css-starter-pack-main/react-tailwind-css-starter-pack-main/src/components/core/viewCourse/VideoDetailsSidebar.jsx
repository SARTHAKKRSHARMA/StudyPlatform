import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FaAngleDown, FaAngleUp, FaPlay } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { LuMonitorPlay } from "react-icons/lu";
import { logout } from '../../../services/operations/auth';



const VideoDetailsSidebar = ({setReviewModal}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const location = useLocation();
    const {courseId, sectionId, subSectionId} = useParams();
    const {courseSectionData, courseEntireData, completedLecture, totalNumberOfLecture} = useSelector(state => state.viewCourse);
    const [activeSection, setActiveSection] = useState(null);
    const [videoBarActive, setVideoBarActive] = useState(null);

    useEffect(() => {
        setActiveSection(sectionId);
        setVideoBarActive(subSectionId);
    }, [courseSectionData, courseEntireData, location.pathname]);

    const toggleSection = (e, sectionId) => {
        e.stopPropagation();
        e.preventDefault();
        if(sectionId === activeSection) setActiveSection(null);
        else setActiveSection(sectionId);
    }

    if(!courseEntireData || !courseSectionData)
    {
        dispatch(logout)
        return;
    }

  return (
    <div className=' max-w-[20%] min-w-[15%] w-fit border-r-[1px] border-richblack-100 min-h-[647px] flex flex-col gap-3 py-5'>
        <div className=' flex flex-row items-center justify-around'>
            <div onClick={() => navigate("/dashboard/enrolled-courses")} className=' flex flex-row items-center justify-center w-[40px] aspect-square bg-richblack-200 rounded-full'>
                <IoIosArrowBack />
            </div>
            <button onClick={() => setReviewModal(true)} className=' bg-yellow-100 px-3 py-2 text-richblack-900 font-bold rounded-md'>Add Review</button>
        </div>

        <div className=' flex flex-col items-start gap-2 mt-2 px-3 py-4 border-b-[1px] border-richblack-100'>
            <p className=' text-richblack-5 font-bold text-[14px]'>{courseEntireData.courseName}</p>
            <p className=' text-richblack-400 text-[12px]'>{completedLecture.length} / {totalNumberOfLecture}</p>
        </div>

        <div className=' flex flex-col gap-3 mt-2'>
            {
                courseSectionData.map((section) => (
                    <details onClick={(e) => toggleSection(e, section._id)} key={section._id} open={section._id === activeSection}>
                        <summary className=' bg-richblack-700 text-richblack-25 px-2 py-3 flex flex-row items-center justify-between'>
                            <div>{section.sectionName.length < 30 ? section.sectionName : `${section.sectionName.slice(0, 30)}...` }</div>
                            {section._id === activeSection ? <FaAngleUp />  : <FaAngleDown />}
                        </summary>
                        
                        <div className=' py-3'>
                            {
                                section.subSection.map((lecture) => (
                                    <details onClick={(e) => {e.stopPropagation(); navigate(`/view-course/${courseId}/section/${section._id}/sub-section/${lecture._id}`)}} key={lecture._id}>
                                        <summary className=' cursor-pointer' >
                                            <div className=' flex flex-row items-center px-4 py-3 gap-2 '>
                                                {videoBarActive === lecture._id ? <FaPlay className=' text-blue-200'/>  : completedLecture.includes(lecture._id) ? <MdCheckBox className=' text-richblack-100'/> : <MdCheckBoxOutlineBlank className=' text-richblack-100' />}
                                                <p className={` text-[16px] ${videoBarActive === lecture._id ? " text-blue-200" : " text-richblack-200"}`}>{lecture.title.length < 15 ? lecture.title : `${lecture.title.slice(0, 15)}...` }</p>
                                                <LuMonitorPlay className=' text-richblack-25' />
                                            </div>

                                        </summary>
                                    </details>
                                ))
                            }  
                        </div>

                        
                    </details>
                ) 

                )
            }
        </div>
    </div>
  )
}

export default VideoDetailsSidebar