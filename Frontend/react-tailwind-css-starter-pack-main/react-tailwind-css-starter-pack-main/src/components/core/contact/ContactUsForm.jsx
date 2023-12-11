import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, set } from "react-hook-form"
import { contactUsAPI } from '../../../services/operations/contact';
import countryCode from "../../../data/countrycode.json"

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, reset, formState: { isSubmitSuccessful, errors},
    } = useForm();

    useEffect(() => 
    {
        if(isSubmitSuccessful)
        {
            reset(
                {
                    email : "",
                    firstName : "",
                    lastName : "",
                    message : "",
                    phoneNumber : "",
                    countryCode : ""
                }
            )      
        }
    }, [reset, isSubmitSuccessful])

    const submitContactForm = async function(data) 
    {
        try
        {
            await contactUsAPI(data, setLoading);
        } catch(e)
        {
            console.log(e.message);
        }
    }

  return (
        <form onSubmit={handleSubmit(submitContactForm)} className=' w-[40%] max-w-[1080px] flex flex-col items-center justify-center mb-3 gap-4'>
        <div className=' flex flex-row items-center justify-between w-[100%] mb-2'>
            <div className=' flex flex-col gap-2 w-[49%] relative'>
                <label htmlFor="firstName" className=' text-white'>First Name</label>
                <input type="text" name="firstName" id="firstName" placeholder='Enter first Name' {...register("firstName", {required : true})} className=' appearance-none text-richblack-25 h-[32px] rounded-md px-2 py-3 bg-richblack-700 focus:outline-none' />
                { errors.firstName && (
                    <span className=' absolute -bottom-4 left-0 text-[#FF0000] font-bold text-[10px]'>*Please enter your first name</span>
                )}
            </div>
            <div className=' flex flex-col gap-2 w-[49%] relative'>
                <label htmlFor="lastName" className=' text-white'>Last Name</label>
                <input type="text" name="lastName" id="lastName" placeholder='Enter last Name' {...register("lastName", {required : true})} className=' appearance-none text-richblack-25 h-[32px] rounded-md px-2 py-3 bg-richblack-700 focus:outline-none' />
                { errors.lastName && (
                    <span className=' absolute left-0 -bottom-4 text-[#FF0000] font-bold text-[10px]'>*Please enter your last name</span>
                )}
            </div>
        </div>
        
        <div className=' flex flex-col justify-between w-[100%] gap-2 relative'>
            <label htmlFor="email" className=' text-white'>Email Address</label>    
            <input type='email' name='email' id='email' placeholder='Enter your email address' {...register("email", {required : true})} className=' appearance-none text-richblack-25 h-[32px] rounded-md px-2 py-3 bg-richblack-700 focus:outline-none' />  
            { errors.email && 
                    <span className=' absolute left-0 -bottom-4 text-[#FF0000] font-bold text-[10px]'>*Please enter your email</span>
            }
        </div>

        <div className=' flex flex-col w-[100%] mb-2'>
            <div className=' flex flex-col gap-2 w-[49%] relative'>
                <label htmlFor="phoneNumber" className=' text-white'>Phone Number</label>
            </div>
            <div className=' flex flex-row gap-2 w-[100%] relative'>
                <select name='dropdown' id='dropdown' {...register("countryCode", {required : true})} className=' w-[10%] appearance-none h-[32px] px-2 text-richblack-25 rounded-md bg-richblack-700 focus:outline-none'>
                    {
                        countryCode.map((country, index)=> <option key={index}> {country.code} - {country.country} </option>)
                    }
                </select>
                <input type="number" name="phoneNumber" id="phoneNumber" placeholder='Enter phone number' {...register("phoneNumber", {required : true, minLength: {value : 8, message : "Minimum 8 digits need to be entered"}, maxLength: {value : 10, message : "Maximum 10 digits can be entered"}})} className=' appearance-none text-richblack-25 h-[32px] rounded-md px-2 py-3 bg-richblack-700 focus:outline-none w-[95%]' />
                { errors.phoneNumber && (
                    <span className=' absolute left-0 -bottom-4 text-[#FF0000] font-bold text-[10px]'>*Please enter valid Phone Number</span>
                )}
            </div>
        </div>
        
        <div className=' flex flex-col justify-between w-[100%] gap-2 relative'>
            <label htmlFor="message" className=' text-white'>Message</label>    
            <textarea name='message' id="message" placeholder='Enter your message' rows={7} cols={30} className=' appearance-none text-richblack-25 rounded-md px-2 py-3 bg-richblack-700 focus:outline-none' {...register("message", {required : true})} />
            {
                errors.message && 
                <span className=' absolute left-0 -bottom-4 text-[#FF0000] font-bold text-[10px]'>*Please enter your message</span>
            }
        </div>
        
        <div className=' flex flex-col justify-between w-[100%] gap-2'>
            <button type='submit' className=' bg-yellow-50 rounded-md py-2 outline-none font-bold transition-all duration-200 hover:scale-95'>Send Message</button>
        </div>
    </form>
  )
}

export default ContactUsForm