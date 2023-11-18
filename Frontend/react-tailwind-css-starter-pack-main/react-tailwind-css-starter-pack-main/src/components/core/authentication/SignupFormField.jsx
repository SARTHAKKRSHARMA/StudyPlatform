import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdArrowDropDown } from 'react-icons/md';

import { Link } from 'react-router-dom';
import countryCode from "../../../data/countrycode.json"


const SignupFormField = ({formData, setFormData}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function changeFormData(event)
    {
        
        console.log(event.target.value);
        setFormData((prevState) => {
            return {
                ...prevState, 
                [event.target.name] : event.target.name === "countryCode" ? event.target.value.split(" ")[1] :  event.target.value
            }
        })
    }
  return (
    <div className='w-[100%]'>
        <form className=' flex flex-col gap-4'>
            <div className=' flex flex-row justify-between items-center w-[90%] '>
                <div className=' flex flex-col justify-center items-start gap-1 relative w-[50%]'>
                    <label htmlFor="firstName" className=' text-sm text-richblack-300' >First Name</label>
                    <input required type="text" name='firstName' id="firstName" value={formData.firstName} onChange={changeFormData} placeholder='Enter First Name' className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[90%] placeholder:text-richblack-200 outline-none'/>
                </div>
                <div className=' flex flex-col justify-center items-start gap-1 relative w-[50%]'>
                    <label htmlFor="lastName" className=' text-sm text-richblack-300' >Last Name</label>
                    <input required type="text" name='lastName' id="lastName" value={formData.lastName} onChange={changeFormData} placeholder='Enter Last Name' className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[90%] placeholder:text-richblack-200 outline-none'/>
                </div>
            </div>
            <div className=' flex flex-col justify-center items-start gap-1 w-[90%] '>
                <label htmlFor="email" className=' text-sm text-richblack-300'>Email Address</label>
                <input required type='email' name='email' id="email" value={formData.email} onChange={changeFormData}  placeholder='Enter email address' className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[95%] placeholder:text-richblack-200 outline-none'/>
            </div>

            <div className=' flex flex-row justify-between items-center w-[95%] '>
                <div className=' flex flex-col w-[100%]'>
                    <label htmlFor='contact' className=' text-sm text-richblack-300'>Phone Number</label>
                    <div className=' flex flex-row  w-[100%]'>
                        <div className='w-[13%] relative'>
                            <select onChange={changeFormData} name='countryCode' value={formData.countryCode} className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[90%] placeholder:text-richblack-200 outline-none'>
                                {countryCode.map((country, index) => <option key={index}>{formData.countryCode === country.code ? country.code : `${country.country} ${country.code}`}</option>)}
                            </select>                    
                            <div className=' absolute bottom-3 right-2'>
                                <MdArrowDropDown />
                            </div>
                        </div>
                        <div className=' flex flex-col justify-center items-start gap-1 relative w-[100%]'>
                            <input required type='text' name='contact' id="contact" value={formData.contact} onChange={changeFormData} placeholder='Enter phone number' className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[90%] placeholder:text-richblack-200 outline-none'/>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className=' flex flex-row justify-between items-center w-[90%] '>
                <div className=' flex flex-col justify-center items-start gap-1 relative w-[50%]'>
                    <label htmlFor="password" className=' text-sm text-richblack-300' >Password</label>
                    <input required type={showPassword ? `text` : 'password'} name='password' id="password" value={formData.password} onChange={changeFormData} placeholder='Enter Password' className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[90%] placeholder:text-richblack-200 outline-none'/>
                    <div onClick={() => {setShowPassword(!showPassword)}} className=' absolute right-8 bottom-3 cursor-pointer'>
                        {
                            showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                        }
                    </div>
                </div>
                <div className=' flex flex-col justify-center items-start gap-1 relative w-[50%]'>
                    <label htmlFor="confirmPassword" className=' text-sm text-richblack-300' >Confirm Password</label>
                    <input required type={showConfirmPassword ? `text` : 'password'} name='confirmPassword' id="confirmPassword" value={formData.confirmPassword} onChange={changeFormData} placeholder='Enter Password' className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[90%] placeholder:text-richblack-200 outline-none'/>
                    <div onClick={() => {setShowConfirmPassword(!showConfirmPassword)}} className=' absolute right-8 bottom-3 cursor-pointer'>
                        {
                            showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                        }
                    </div>
                </div>
            </div>
            

        </form>
    </div>
  )
}

export default SignupFormField