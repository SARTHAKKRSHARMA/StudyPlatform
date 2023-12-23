import React, { useEffect, useState } from 'react'
import { getInstructorDashboard } from '../../../services/operations/profile';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../services/operations/courses';
import  {useNavigate} from "react-router-dom"
import InstructorChart from './InstructorChart';

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [courses, setCourses] = useState([]);
  const {token} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.profile);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchInstructorDashboard = async () => {
      setLoading(true);
      const result1 = await getInstructorDashboard(token);
      const result2 = await fetchInstructorCourses(token);
      console.log("Result1 is ", result1);
      console.log("Result2 is ", result2);
      setDashboardData(result1);
      setCourses(result2);
      setLoading(false);
    }
    fetchInstructorDashboard();
  }, [])
  
  const totalAmount = dashboardData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
  const totalStudents = dashboardData?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0);
  
  if(loading)
  {
    return (
      <div className=' w-[100%] h-[645px] flex flex-row justify-center items-center'>
        <div className=' spinner'></div>
      </div>
    )
  }

  return (
    <div className=' w-[80%] max-w-[1080px] py-4 mx-auto flex flex-col gap-3'>
      <div>
        <p className=' text-richblack-25 text-[22px] font-bold '>Hi <span className=' capitalize'>{user.firstName}</span> 👋</p>
        <p className=' text-richblack-400'>Let's start something new</p>
      </div>

      {
        (courses.length > 0) ? (
          <div className=' w-[100%] flex flex-row items-center min-h-[400px] justify-between'>
            <div className=' w-[65%] h-[600px] px-3 py-4 bg-richblack-600 rounded-md'>
              <InstructorChart dashboardData={dashboardData} />
            </div>
            <div className=' w-[33%] h-[600px] bg-richblack-600 rounded-md px-3 py-5 flex flex-col gap-5'>
              <p className=' text-richblack-50 font-bold text-[22px]'>Statistics</p>
              
              <div className=' flex flex-col gap-[1px]'>
                <p className=' text-richblack-200 text-[16px]'>Total Courses</p>
                <p className=' text-richblack-50 text-[18px] font-semibold'>{courses.length}</p>
              </div>

              <div className=' flex flex-col gap-[1px]'>
                <p className=' text-richblack-200 text-[16px]'>Total Students</p>
                <p className=' text-richblack-50 text-[18px] font-semibold'>{totalStudents}</p>
              </div>

              <div className=' flex flex-col gap-[1px]'>
                <p className=' text-richblack-200 text-[16px]'>Total Income</p>
                <p className=' text-richblack-50 text-[18px] font-semibold'>Rs. {totalAmount}</p>
              </div>  

            </div>
            
          </div>) : (<div className=' text-richblack-200'>
            No data available for this instructor yet!
          </div>)
      }

      { courses.length > 0 && (
          <div className=' w-[100%] bg-richblack-600 px-3 py-3 rounded-md flex flex-col gap-2'>
           <div className=' flex flex-row w-[100%] items-center justify-between'>
            <p className=' text-richblack-50 font-bold text-[22px]'>Your Courses</p>
            <button onClick={()=>navigate("/dashboard/my-courses")} className=' text-yellow-100  text-[18px]'>View All</button>
           </div>
           <div className=' flex flex-row items-center justify-between gap-3 h-[250px]'>
            {
              courses.map((course, index) => {
                if(index >= 3) return;
                return (
                  <div key={course._id} className=' w-[33%] overflow-hidden h-[250px] rounded-md flex flex-col items-start gap-2'>
                    <div className=' w-[100%] h-[200px] flex flex-row items-center justify-center overflow-hidden'>
                      <img src={course.thumbnail} className=' w-[100%] object-cover rounded-md' />                    
                    </div>
                    <div>
                      <p className=' text-richblack-25'>{course.courseName.length < 15 ? course.courseName : `${course.courseName.slice(0, 15)}.....`}</p>
                      <p className=' text-richblack-300'><span>{course.students.length} students</span> | <span>Rs. {course.price}</span></p>
                    </div>
                  </div>
                )
              })
            }
           </div>
          </div>
        )
      }

    </div>
  )
}

export default Instructor