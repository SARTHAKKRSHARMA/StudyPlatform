import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setCourse, setStep } from '../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import { publishCourse } from '../../../../services/operations/courses';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom"

const PublishForm = () => {
    const {register, handleSubmit, setValue, getValues, formState : {errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth)

    const submitHandler = async () => {
        setLoading(true);
        const result = await publishCourse({courseId : course._id}, token);
        if(result)
        {
            dispatch(setCourse(result));
        }
        else
        {
            toast.error("Error occured while publishing course")
        }
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
        setLoading(false);
    }

    useEffect(() => {
        setValue("coursePublish", course.status);
    }, [])
  return (
    <div className=' mt-[2rem] w-full px-3 py-4 bg-richblack-600 rounded-md'>
        <p className=' text-lg font-semibold'>Publish Settings</p>
        <form onSubmit={handleSubmit(submitHandler)} className=' flex flex-col gap-3 mt-3'>
            <div className=' flex flex-row gap-2 items-center relative'>
                <input type='checkbox' id='coursePublish' {...register("coursePublish", {required : true})}></input>
                <label htmlFor='coursePublish'>Make this course as public</label>
                {
                    errors.coursePublish && <span className=' absolute -bottom-4 left-0 text-[#ff0000] text-[10px]'>*Select this option</span>
                }
            </div>
            
            {
                loading ? <div className=' flex flex-row items-center justify-end'><div className='dots flex flex-row items-center justify-center rounded-md bg-yellow-25 w-[100px] h-[32px]'></div></div> : (
                    <div className=' flex flex-row gap-4 items-center justify-end'>
                        <button onClick={() => dispatch(setStep(2))}  className=' text-richblack-900 px-3 py-2 font-bold rounded-md bg-richblack-300'>Back</button>
                        <button type='submit' className=' text-richblack-900 px-3 py-2 w-fit font-bold rounded-md bg-yellow-100 flex flex-row gap-2 items-center'><span>Save Changes</span></button>
                    </div>
                )
            }
                
            
        </form>
    </div>
  )
}

export default PublishForm