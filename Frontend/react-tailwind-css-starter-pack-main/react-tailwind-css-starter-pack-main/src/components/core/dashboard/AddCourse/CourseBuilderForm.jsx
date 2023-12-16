import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosArrowForward } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../services/operations/courses';
import NestedView from './NestedView';



const CourseBuilderForm = () => {
    const {token} = useSelector(state => state.auth);
    const {register, handleSubmit, setValue, getValues, formState : {errors}} = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    console.log(course);

    const goBack = (event) => {
        event.preventDefault();
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
    }

    const goNext = (event) => {
        event.preventDefault();
        if(course.courseContent.length === 0) 
        {
            toast.error('Atleast one section is required');
            return;
        }

        if(course.courseContent.some((section) => section.subSection.length === 0))
        {
            toast.error('Atleast add one subsection to each section');
            return;
        }

        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId)
        {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

    const cancelEdit = (event) => {
        event.preventDefault();
        setEditSectionName(null);
        setValue("sectionName", "");
    }

    const submitHandler = async (data) => {
        setLoading(true);
        let result;
        if(editSectionName) {
            result = await updateSection({sectionName : data.sectionName, sectionId : editSectionName, courseId : course._id}, token)
        } else 
        {
            result = await createSection({sectionName : data.sectionName, courseId : course._id}, token);
        }

        console.log(result);
        if(result)
        {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        setLoading(false);
    }

  return (
    <div className=' mt-[2rem] w-full px-2 py-3 bg-richblack-600 rounded-md'>
        <h1 className=' text-white font-bold text-[22px]'>Course Builder</h1>
        <form onSubmit={handleSubmit(submitHandler)} className=' text-white w-[100%] py-8 px-6 rounded-md  flex flex-col gap-3'>
            <div className=' flex flex-col justify-between gap-2 relative'>
                <label htmlFor='sectionName'>Section Name<sup className=' text-[#FF0000]'>*</sup></label>
                <input className=' appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none' name='sectionName' id='sectionName' placeholder='Add Section Name' {...register("sectionName", {required : true})}></input>
                {
                    errors.sectionName && (
                        <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Course Section is required</span>
                    )
                }
            </div>
            <div className=' flex flex-row items-end gap-3'>
                <button className=' text-yellow-100  px-3 py-2 w-fit font-bold rounded-md bg-transparent border-2 border-yellow-100 flex flex-row gap-2 items-center'><span>{editSectionName ? "Edit Section Name" : "Create Section"}</span> <CiCirclePlus /></button>
                {editSectionName && <button onClick={cancelEdit} className=' text-richblack-50 underline underline-offset-2'>Cancel Edit</button>}
            </div>
        </form>

        {
            course.courseContent.length > 0 && <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        }

        <div className=' flex flex-row items-center justify-end gap-2 mt-5'>
                <button onClick={goBack}  className=' text-richblack-900 px-3 py-2 font-bold rounded-md bg-richblack-300'>Back</button>
                <button onClick={goNext} className=' text-richblack-900 px-3 py-2 w-fit font-bold rounded-md bg-yellow-100 flex flex-row gap-2 items-center'><span>Next</span> <IoIosArrowForward /></button>
        </div>
    </div>
  )
}

export default CourseBuilderForm