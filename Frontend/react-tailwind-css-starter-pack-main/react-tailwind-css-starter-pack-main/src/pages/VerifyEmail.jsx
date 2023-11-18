import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {HiArrowLongLeft} from "react-icons/hi2"
import {FaClockRotateLeft} from 'react-icons/fa6'
import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';
import { sendOtp, signup } from '../services/operations/auth';

const VerifyEmail = () => {
    const {loading, signupData} = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("Value of otp is ", otp);
    if(!signupData)
    {
        return <Navigate to="/signup" />
    }

    async function submitHandler(e)
    {
        e.preventDefault();
        if(otp.length != 6)
        {
            toast.error("Invalid Otp");
            return;
        }
        dispatch(signup(otp, signupData, navigate))
        
    }

    async function sendOtpHandler()
    {
        dispatch(sendOtp(signupData.email, signupData, navigate));   
    }

    return (    
        <div className='h-[688px] w-[100%] flex justify-center items-center text-white'>
            <div className=' w-[20%] flex flex-col gap-2 '>
            <h1 className=' font-bold text-[1.5rem]'>Verify Email</h1>
            <form className=' w-[100%] flex items-center justify-between' onSubmit={submitHandler}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    shouldAutoFocus={true}
                    containerStyle={{display : 'flex', justifyContent : "space-between", alignItems : 'center', width : "100%"}}
                    inputStyle={{display : 'flex', justifyContent : 'center', alignItems : 'center', width : "40px", height:"40px", backgroundColor : "#2C333F", text : "white", border:"1px solid white", borderRadius:"10px"}}
                    renderInput={(props) => <input {...props} />}
                />
            </form>
            <p className=' w-[100%] text-richblack-200 mb-10'>A verification code has been sent to you. Enter the code below</p>
            {
                        
                loading ?
                <div className=' bg-yellow-5 h-10 flex justify-center items-center mb-7 text-black font-bold w-[100%] rounded-md py-2 px-3 transition-all duration-200' >
                    <div className=" dots">
                    </div>
                </div> : 
                <button className=' bg-yellow-50 mb-7 text-black font-bold w-[100%] rounded-md py-2 px-3 hover:scale-95 transition-all duration-200' onClick={submitHandler}>Verify email</button>  
                
            }
            <div className=' flex flex-row w-[100%] justify-between items-center'>
                <Link to={"/signup"}>
                    <div className=' flex flex-row gap-2 justify-center items-center'>
                        <HiArrowLongLeft />
                        <p>Back to Sign Up</p>
                    </div>
                </Link>
                <div onClick={sendOtpHandler}>
                    <div className=' flex flex-row gap-2 justify-center items-center'>
                        <FaClockRotateLeft />
                        <p>Resend it</p>
                    </div>
                </div>
            </div>

            

            </div>
        </div>
    )
}

export default VerifyEmail