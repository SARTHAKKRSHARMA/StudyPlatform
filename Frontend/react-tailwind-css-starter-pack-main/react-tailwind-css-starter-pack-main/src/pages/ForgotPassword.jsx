import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CTAButton from '../components/core/homepage/CTAButton';
import { resetPasswordToken } from '../services/operations/auth';
import { Link } from 'react-router-dom';
import {HiArrowLongLeft} from "react-icons/hi2"

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.auth);

    return (
        <div className='h-[657px] w-[100%] flex justify-center items-center text-white'>
            {
                loading ? <div className="spinner"></div> :
                <div className=' w-[25%] flex flex-col justify-between items-start'>
                    <h1 className=' font-bold text-[1.5rem]'>{!emailSent ? "Reset Your Password" : "Check your Email"}</h1>
                    <p className=' w-[100%] text-richblack-200 mb-10'>{!emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`}</p>
                    { !emailSent &&
                        <form className=' w-[100%] mb-10' onSubmit={(e)=> { e.preventDefault(); dispatch(resetPasswordToken(email, setEmailSent))}}>
                            <div className=' flex flex-col items-start justify-center gap-2 w-[100%]'>
                                <label htmlFor='email' className=' text-richblack-200'>Email Address<span><sup className=''>*</sup></span></label>
                                <input className=' appearance-none w-[100%] h-10 rounded-md py-1 px-2 bg-richblack-600 outline-none text-white' name='email' id='email' value={email} onChange={(e) => {setEmail(e.target.value)}} ></input>
                            </div>
                        </form>
                    }
                    {
                        <button className=' bg-yellow-50 mb-7 text-black font-bold w-[100%] rounded-md py-2 px-3 hover:scale-95 transition-all duration-200' onClick={()=> dispatch(resetPasswordToken(email, setEmailSent))}>{!emailSent ? "Reset Password" : "Resend Email"}</button>
                    }
                    {
                        <Link to={"/login"}>
                            <div className=' flex flex-row justify-center items-center gap-2'> 
                                <HiArrowLongLeft />
                                <p>Back to Login</p>
                            </div>
                        </Link>
                    }
                </div> 
            }
        </div>
    )
}

export default ForgotPassword