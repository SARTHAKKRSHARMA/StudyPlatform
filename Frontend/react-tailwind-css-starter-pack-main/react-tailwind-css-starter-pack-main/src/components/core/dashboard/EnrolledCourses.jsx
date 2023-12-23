import React, { useEffect, useState } from 'react'
import { getEnrolledCourses } from '../../../services/operations/profile';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/operations/auth';
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Navigate, useNavigate } from 'react-router-dom';


const EnrolledCourses = () => {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [currPage, setCurrPage] = useState("all");
    const [loading, setLoading] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [courseList, setCourseList] = useState([]);

    const changeCourseList = function (filterKeyword)
    {
        if(currPage !== filterKeyword)
        {
            if(filterKeyword === "pending")
            {
                const pendingCourseList = enrolledCourses.filter((course) => (course.completedVideos / course.totalVideos !== 1))
                setCourseList(pendingCourseList);
            } else if(filterKeyword === "completed")
            {
                const completedCourseList = enrolledCourses.filter((course) => (course.completedVideos / course.totalVideos === 1))
                setCourseList(completedCourseList);
            } else 
            {
                setCourseList(enrolledCourses);
            }
    
            setCurrPage(filterKeyword);
        }

    }

    useEffect(() => {
        const getEnrolledCoursesFun = async (token) => {
            setLoading(true);
            const response = await getEnrolledCourses(token, setLoading);
            console.log(response)
            if(response?.success) 
            {
                setEnrolledCourses(response?.data);
                setCourseList(response?.data)
            }
            setLoading(false);
        }
        getEnrolledCoursesFun(token);
    }, [])

    if(loading) {
        return (
            <div className=' w-[80%] h-[647px] flex flex-row items-center justify-center'>
                <div className=' spinner'></div>
            </div>
        )
    }


  return (
        <div className=' flex flex-col gap-3 px-3 py-3'>
            <p className=' text-[22px] font-bold text-richblack-50'>Enrolled Courses</p>

            <div className=' flex flex-row min-w-[300px] w-[25%]  gap-2 bg-richblack-700 rounded-full px-[2px] py-[2px]'>
                <button onClick={() => changeCourseList("all")} className={` px-2 py-1 w-[33%] rounded-full transition-all duration-200 ${currPage === "all" ? " bg-richblack-900 text-richblack-50" : " text-richblack-500"}`}>All</button>
                <button onClick={() => changeCourseList("pending")} className={` px-2 py-1 w-[33%] rounded-full transition-all duration-200 ${currPage === "pending" ? " bg-richblack-900 text-richblack-50" : " text-richblack-500"}`}>Pending</button>
                <button onClick={() => changeCourseList("completed")} className={` px-2 py-1 w-[33%] rounded-full transition-all duration-200 ${currPage === "completed" ? " bg-richblack-900 text-richblack-50" : " text-richblack-500"}`}>Completed</button>
            </div>

            {
                courseList.length === 0 ? (<div className=' text-richblack-300'>No Course Found</div>) : (
                    <Table className=' w-[90%] px-3 border-separate border-spacing-y-8 border-[2px] border-richblack-300 rounded-md'>
                        <Thead>
                            <Tr className=" bg-richblack-600 w-[80%] h-fit py-3">
                                <Th className=" text-left  text-richblack-50 w-[50%]">Course Name</Th>
                                <Th className=" text-left text-richblack-50  w-[20%]">Duration</Th>
                                <Th className=" text-left text-richblack-50  w-[20%]">Progress</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                courseList.map((course, index) => (
                                    <Tr key={course._id} className=" w-[80%]"> 
                                        <Td>
                                            <div onClick={() => navigate(`/view-course/${course._id}/section/${course.firstSection._id}/sub-section/${course.firstSection.subSection[0]}`)} className=' cursor-pointer flex flex-row gap-3'>
                                                <div className=' flex flex-row bg-yellow-50 items-center justify-center rounded-md overflow-hidden w-[100px] aspect-square'>
                                                    <img src={course.courseThumbnail} className=' w-[100%] h-[100%] object-cover' />
                                                </div>
                                                <div className=' flex flex-col justify-around'>
                                                    <p className=' text-richblack-50 text-[16px]'>{course.courseName.length > 30 ? `${course.courseName.slice(0, 30)}...` : course.courseName}</p>
                                                    <p className=' text-richblack-300 text-[16px]'>{course.courseDescription.length > 30 ? `${course.courseDescription.slice(0, 30)}...` : course.courseDescription}</p> 
                                                </div>
                                            </div>
                                        </Td>

                                        <Td>
                                            <p className=' text-richblack-50'>2 hr 30 mins</p>
                                        </Td>

                                        <Td>
                                            <div className=' w-[80%]'>
                                                <ProgressBar bgColor='#7FFFD4' labelColor='black' labelSize='12px' completed={(course.completedVideos * 100)/ course.totalVideos} />
                                            </div>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                )
            }

        </div>
  )
}

export default EnrolledCourses