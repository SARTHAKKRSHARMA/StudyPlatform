import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const LoginFormField = ({formData, setFormData}) => {
    const [showPassword, setShowPassword] = useState(false);
    function changeFormData(event)
    {
        setFormData((prevState) => {
            return {
                ...prevState, 
                [event.target.name] : event.target.value
            }
        })
    }
  return (
    <div className='w-[100%]'>
        <form className=' flex flex-col gap-4'>
            <div className=' flex flex-col justify-center items-start gap-1'>
                <label htmlFor="email" className=' text-sm text-richblack-300'>Email Address</label>
                <input required type='email' name='email' id="email" value={formData.email} onChange={changeFormData}  placeholder='Enter email address' className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[87%] placeholder:text-richblack-200 outline-none'/>
            </div>
            <div className=' flex flex-col justify-center items-start gap-1 relative'>
                <label htmlFor="password" className=' text-sm text-richblack-300' >Password</label>
                <input required type={showPassword ? `text` : 'password'} name='password' id="password" value={formData.password} onChange={changeFormData} placeholder='Enter Password' className=' appearance-none text-white bg-richblack-700 rounded-md px-1 py-2 w-[87%] placeholder:text-richblack-200 outline-none'/>
                <div onClick={() => {setShowPassword(!showPassword)}} className=' absolute right-20 bottom-3 cursor-pointer'>
                    {
                        showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                    }
                </div>
                <div className=' absolute right-20 -bottom-6 cursor-pointer'>
                    <Link to={"/forgot-password"}><p className=' text-blue-200 text-sm'>Forgot Password</p></Link>
                </div>
            </div>

        </form>
    </div>
  )
}

export default LoginFormField