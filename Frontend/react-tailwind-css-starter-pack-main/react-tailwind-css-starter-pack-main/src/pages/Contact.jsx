import React from 'react'
import { IoMailSharp } from "react-icons/io5";
import { BsBellFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import ContactUsForm from '../components/core/contact/ContactUsForm';
import ReviewSlider from '../components/common/ReviewSlider';





const Contact = () => {
  return (
    <div className=' w-[70%] mx-auto py-[4rem] flex flex-col gap-[2rem]'>
        <div className=' flex flex-row items-start justify-between'>
            <div className=' flex flex-col gap-3 justify-between bg-richblack-600 rounded-md px-4 py-3 w-[35%] '>
                <div className=' flex flex-row items-start gap-2'>
                    <div className=' text-[18px]'>
                        <IoMailSharp />
                    </div>
                    <div className=' flex flex-col gap-[2px]'>
                        <p className=' text-richblack-50 font-semibold text-[16px]'>Chat on us</p>
                        <p className=' text-richblack-100 text-[14px]'>Our friendly team is here to help.</p>
                        <p className=' text-richblack-100 text-[14px]'>@mail address</p>
                    </div>
                </div>

                <div className=' flex flex-row items-start gap-2'>
                    <div className=' text-[18px]'>
                        <BsBellFill />
                    </div>
                    <div className=' flex flex-col gap-[2px] justify-between'>
                        <p className=' text-richblack-50 font-semibold text-[16px]'>Visit us</p>
                        <p className=' text-richblack-100 text-[14px]'>Come and say hello at our office HQ.</p>
                        <p className=' text-richblack-100 text-[14px]'>Here is the location/ address</p>
                    </div>
                </div>

                <div className=' flex flex-row items-start gap-2'>
                    <div className=' text-[18px]'>
                        <FaPhoneAlt />
                    </div>
                    <div className=' flex flex-col gap-[2px] justify-between'>
                        <p className=' text-richblack-50 font-semibold text-[16px]'>Call us</p>
                        <p className=' text-richblack-100 text-[14px]'>Mon - Fri From 8am to 5pm</p>
                        <p className=' text-richblack-100 text-[14px]'>+123 456 7890</p>
                    </div>
                </div>

            </div>
            <div className=' border-[1px] border-richblack-50 px-[2rem] py-[2rem] w-[60%] rounded-md flex flex-col gap-4'>
                <p className=' text-[32px] text-richblack-50 font-bold'>Got a Idea? We’ve got the skills. Let’s team up</p>
                <p className=' text-richblack-300'>Tell us more about yourself and what you’re got in mind.</p>
                <div className=' w-[100%]'>
                    <ContactUsForm />   
                </div>
            </div>
        </div>

        <div className=' flex flex-col items-center w-[100%]'>
            <p className=' text-[32px] text-richblack-50 font-semibold'>Reviews from other learners</p>
            <div className=' w-[140%]'>
                <ReviewSlider />
            </div>
        </div>
    </div>
  )
}

export default Contact