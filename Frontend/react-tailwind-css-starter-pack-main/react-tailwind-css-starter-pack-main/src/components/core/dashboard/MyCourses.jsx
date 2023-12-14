import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourses } from '../../../services/operations/courses';
import toast from 'react-hot-toast';
import {useSelector} from 'react-redux'
import { FaPlus } from "react-icons/fa6";


const MyCourses = () => {
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [course, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            const result = await fetchInstructorCourses(token);
            console.log(result);
            if(result)
            {
                setCourses(result);
            }
            else
            {
                toast.error("Error occured while fetching courses");
            }
            setLoading(false);
        }

        fetchCourses()
    }, [])

    if(loading)
    {
        return <div className=' w-full min-h-[647px] flex flex-row justify-center items-center'>
            <div className=' spinner'></div>
        </div> 
    }

  return (
    <div className=' w-[80%] mx-auto mt-5'>
        <div className=' flex flex-row items-center justify-between'>
            <p className=' text-richblack-50 text-[26px] font-bold'>My Courses</p>
            <button onClick={() => navigate("/dashboard/add-course")} className=' flex flex-row items-center gap-2 font-bold px-3 py-2 bg-yellow-100 text-richblack-800 rounded-md'><span>Add Course</span> <FaPlus /></button>
        </div>
    </div>
  )
}

export default MyCourses