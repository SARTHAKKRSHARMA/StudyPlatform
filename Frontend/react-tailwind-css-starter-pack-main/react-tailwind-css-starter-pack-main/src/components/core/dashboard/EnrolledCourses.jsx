import React, { useEffect, useState } from 'react'
import { getEnrolledCourses } from '../../../services/operations/profile';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/operations/auth';
import ProgressBar from "@ramonak/react-progress-bar";


const EnrolledCourses = () => {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [currPage, setCurrPage] = useState("All");
    const [loading, setLoading] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [courseList, setCourseList] = useState([]);

    const changeCourseList = function (filterKeyword)
    {
        setCurrPage(filterKeyword);
    }

    useEffect(() => {
        const getEnrolledCoursesFun = async (token, setLoading) => {
            const response = await getEnrolledCourses(token, setLoading);
            if(response?.data?.logOut) dispatch(logout); 
            if(response?.success) 
            {
                setEnrolledCourses(response?.data);
                setCourseList(response?.data);
            }
        }
        getEnrolledCoursesFun(token, setLoading);
    }, [])

  return (
    <div className=' text-white px-6 py-12 min-h-full relative'>
        <h1 className=' text-[28px]'>Enrolled Courses</h1>
        { !loading && <div className=' flex flex-row gap-2 items-center px-3 py-2 rounded-full bg-richblack-500 w-fit text-richblack-300'>
            <button onClick={() => changeCourseList("All")} className={currPage === "All" ? " bg-black text-richblack-5 rounded-full px-2 " : ""}>All</button>
            <button onClick={() => changeCourseList("Pending")} className={currPage === "Pending" ? " bg-black text-richblack-5 rounded-full px-2 " : ""} >Pending</button>
            <button onClick={() => changeCourseList("Completed")} className={currPage === "Completed" ? " bg-black text-richblack-5 rounded-full px-2 " : ""} >Completed</button>
        </div>
        }
        {
            loading ? (<div className='spinner absolute top-[50%] left-[50%]'></div>) : courseList.length == 0 ? 
            <div className=' absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>No Course to display</div> : 
            <div>
                <div>
                    <p>Course Name</p>
                    <p>Duration</p>
                    <p>Progress</p>
                </div>
                {
                    enrolledCourses.map((course, index) => {
                        <div key={index}>
                            <div>
                                <img src={course.thumbnail} />
                                <div>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                            </div>

                            <div>
                                {course?.totalDuration}
                            </div>

                            <div>
                                Progress : {course.progressPercentage || "0%"}
                                <ProgressBar completed={course.progressPercentage || 0} height='8px' isLabelVisible={false} />
                            </div>
                        </div>
                    })
                }
            </div>
        }
    </div>
  )
}

export default EnrolledCourses