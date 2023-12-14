import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../slices/courseSlice'
import { createSubSection, updateSubSection } from '../../../../services/operations/courses'
import { IoMdClose } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";



const SubSectionModal = ({modalData, setModalData, add=false, view=false, edit=false}) => {
    const {register, handleSubmit, setValue, getValues, formState : {errors}} = useForm()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);

    const isFormUpdated = () => {
        const currValues = getValues();

        if(currValues.lectureTitle !== modalData.title || currValues.lectureDescription !== modalData.description || currValues.lectureVideo !== modalData.videoUrl) return true;
        return false;
    }

    const handleEditSubSection = async (data) => {
        const currValues = getValues();
        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id)
        formData.append("courseId", course._id);
        formData.append("title", currValues.lectureTitle);
        formData.append("description", currValues.lectureDescription);
        formData.append("lecture", currValues.lectureVideo[0]);
        
        setLoading(true);
        const result = await updateSubSection( formData, token);
        console.log(result);
        if(result)
        {
            dispatch(setCourse(result));
        } else 
        {
            toast.error("Error occured while editing lecture");
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmitHandler = async (data) => {
        if(view) return;
        if(edit)
        {
            console.log("here");
            if(isFormUpdated())
            {
                handleEditSubSection();
            } else
            {
                toast.error("No Changes made to the form");
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("courseId", course._id);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("lecture", data.lectureVideo[0]);
        setLoading(true);
        
        const result = await createSubSection(formData, token);
        console.log(result);
        if(result)
        {
            dispatch(setCourse(result));
        } else 
        {
            toast.error("Error occured while creating lecture");
        }
        setModalData(null);
        setLoading(false);
    }

    useEffect(() => {
        if(view || edit)
        {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [])
  return (
    <div>
      <div onClick={() => !loading ? setModalData(null) : {}} className=' fixed top-0 left-0 w-screen h-screen bg-richblack-900 bg-opacity-50 backdrop-blur-[4px]'></div>
      <div className=' min-w-[500px] w-fit h-fit bg-richblack-800 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md flex flex-col gap-4'>
        <div className=' px-3 py-4 flex flex-row items-center justify-between'>
            <p className=' text-lg font-bold'>{view ? "Viewing Lecture" : add ? "Adding Lecture" : (edit && "Editing Lecture") }</p>
            <button onClick={() => (!loading && setModalData(null))}><IoMdClose /></button>    
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)}  className=' bg-richblack-900 rounded-md flex flex-col gap-4 px-3 py-4'>
            <input type='file' name='lectureVideo' id='lectureVideo' {...register("lectureVideo", {required : true})}  />
            <div className=' flex flex-col justify-between gap-2 relative'>
                <label htmlFor='lectureTitle'>Lecture Title<sup className=' text-[#FF0000]'>*</sup></label>
                <input className=' appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none' name='lectureTitle' id='lectureTitle' placeholder='Add Lecture Title' {...register("lectureTitle", {required : true})}></input>
                {
                    errors.lectureTitle && (
                        <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Lecture Title is required</span>
                    )
                }
            </div>
            <div className=' flex flex-col justify-between gap-2 relative'>
                <label htmlFor='lectureDescription'>Lecture Description<sup className=' text-[#FF0000]'>*</sup></label>
                <input className=' appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none' name='lectureDescription' id='lectureDescription' placeholder='Add Lecture Description' {...register("lectureDescription", {required : true})}></input>
                {
                    errors.lectureDescription && (
                        <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Lecture Description is required</span>
                    )
                }
            </div>
            {
                !view ? loading ? <div className='dots flex flex-row items-center justify-center rounded-md bg-yellow-25 w-[100px] h-[32px]'></div> : <div className=' flex flex-row items-end gap-3'>
                    <button type='submit' className=' text-yellow-100 px-3 py-2 w-fit font-bold rounded-md bg-transparent border-2 border-yellow-100 flex flex-row gap-2 items-center'><span>{edit ? "Edit Subsection" : "Add Subsection"}</span> <CiCirclePlus /></button>
                </div> : <div></div>
            }
        </form>
      </div>

    </div>
  )
}

export default SubSectionModal