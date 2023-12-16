import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FaRegClock } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { MdEdit, MdDelete  } from "react-icons/md";
import ConfirmationModal from '../../../common/ConfirmationModal';
import  {setCourse, setEditCourse, setStep} from "../../../../slices/courseSlice"
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import { deleteCourse } from '../../../../services/operations/courses';





const CoursesTable = ({courses, setCourses}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const editCourse = async (course) => {
        console.log(course);
        dispatch(setCourse(course));
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
        navigate("/dashboard/add-course")
    }

    const deleteCourseHandler = async (courseId) => {
        setLoading(true);
        const result  = await deleteCourse({courseId}, token);  
        console.log(result)
        if(result)
        {
            setCourses(result);
        } else
        {
            toast.error("Error occured while deleting course");
        }
        setConfirmationModal(null);
        setLoading(false);
    }

  return (
    <div className=' mt-12'>
        {
            courses.length === 0 ? <div className=' text-richblack-200 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] '>No Courses Found</div>  : 
            <Table className=' w-[100%] px-3 border-separate border-spacing-y-8'>
                <Thead>
                    <Tr>
                        <Th className=' text-richblack-300 w-[40%] text-left'>COURSES</Th>
                        <Th className=' text-richblack-300'>DURATION</Th>
                        <Th className=' text-richblack-300'>PRICE</Th>
                        <Th className=' text-richblack-300'>ACTIONS</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.map((course, index) => {
                            return (
                                <Tr key={course._id} >
                                    <Td>
                                        <div className=' flex flex-row items-center gap-3'>
                                            <img src={course.thumbnail} loading='lazy' width={220} height={150}  className=' w-[220px] h-[150px] rounded-lg object-cover'></img>     
                                            <div className='  flex flex-col justify-between items-start h-[150px] py-3 w-[80%]'>
                                                <div className=' flex flex-col gap-2'>
                                                    <p className=' text-richblack-100 text-[22px] font-semibold'>{course.courseName}</p>
                                                    <p className=' text-richblack-400'>{course.courseDescription.length > 30 ? course.courseDescription.slice(0, 30) + "..." : course.courseDescription}</p>
                                                </div>
                                                <div className={` text-richblack-900 flex flex-row items-center gap-2 rounded-md px-2 py-1 ${course.status === "Published" ? " bg-caribbeangreen-400" : " bg-yellow-200"} `}> {course.status === "Draft" ? <FaRegClock /> : <TiTick /> } <span>{course.status}</span> </div>
                                            </div>                  
                                        </div>
                                    </Td>
                                    
                                    <Td>
                                        <div className=' text-center text-richblack-50'>
                                            2hr 30min
                                        </div>
                                    </Td>

                                    <Td>
                                        <p className=' text-center text-richblack-50'>INR {course.price}</p>
                                    </Td>

                                    <Td>
                                        <div className=' flex flex-row items-center justify-center gap-2 w-[100%]'>
                                            <button disabled={loading} onClick={() => editCourse(course)}><MdEdit className=' text-richblack-100' /></button>
                                            <button disabled={loading} onClick={() => setConfirmationModal({text1 : "Course will get deleted", text2 : "Are you sure ?", btn1 : {text : "Delete", action : () => deleteCourseHandler(course._id)}, btn2: {text : "Cancel", action : () => setConfirmationModal(null)}})}><MdDelete className=' text-richblack-100'/></button>
                                        </div>
                                    </Td>
                                    
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        }

        { confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CoursesTable