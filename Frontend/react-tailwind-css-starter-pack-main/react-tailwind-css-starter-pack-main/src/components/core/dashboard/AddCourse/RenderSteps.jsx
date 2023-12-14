import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FaCheck } from "react-icons/fa";
import { setStep } from '../../../../slices/courseSlice';
import CourseInformationForm from './CourseInformationForm';
import CourseBuilderForm from './CourseBuilderForm';
import PublishForm from './PublishForm';


const RenderSteps = () => {
    const {step} = useSelector(state => state.course);
    const dispatch = useDispatch();
    const steps = [
        {
            id : 1,
            title : "Course Information"
        },
        {
            id : 2,
            title : "Course Builder"
        },
        {
            id : 3,
            title : "Publish"
        }
    ]
  return (
    <div className=' text-white flex flex-col gap-[2rem]'>
        <div className=' flex flex-row items-center justify-center w-[100%] h-[40px] '>
            {
                steps.map((item, index) => {
                    return (
                        <div key={index} className=' relative flex flex-col items-center justify-center w-[33%]'>
                            <div key={index} className=' flex flex-row items-center justify-around'>
                                <div className=' flex flex-col justify-center items-center gap-4'>
                                    <div className={` w-[2.5rem] h-[2.5rem] rounded-full flex flex-row items-center justify-center ${(item.id === step) ? " text-yellow-100 bg-yellow-50 bg-opacity-10 border-2 border-yellow-100" : "text-richblack-300 bg-richblack-600 border-2 border-richblack-300"}`}>
                                        {
                                            step > item.id ? (<FaCheck className=' text-caribbeangreen-400' />) : item.id
                                        }
                                    </div>
                                    <div>{item.title}</div>
                                </div>
                                
                                
                            </div>
                        </div>          
                    )
                })
            }
        </div>
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishForm />}
    </div>
  )
}

export default RenderSteps