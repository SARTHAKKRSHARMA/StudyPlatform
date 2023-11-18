import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {HiArrowLongLeft} from "react-icons/hi2"
import {TiTick} from "react-icons/ti"
import toast from 'react-hot-toast';
import { resetPassword } from '../services/operations/auth';

const UpdatePassword = () => {
    const location = useLocation();
    const resetPasswordToken = location.pathname.split("/").slice(-1)[0];
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.auth);
    const [resetPasswordDone, setResetPassswordDone] = useState(false);
    const [email, setEmail] = useState("");
    const [formData, setFormData] = useState({password : "", confirmPassword : ""});
    const [passwordCheck, setPasswordCheck] = useState({lowercase : false, uppercase : false, minLength : false, specialChar : false, number : false});

    const regexLowerCase = /.*[a-z].*/;
    const regexUppperCase = /.*[A-Z].*/
    const regexNumber = /.*\d.*/
    const regexSpecialChar = /[\W_]+/
    const regexMinLength = /^.{8,}$/

    function changeHandler(e) 
    {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name] : e.target.value
            }
        })

        if(e.target.name == "password")
        {
            setPasswordCheck((prevState) => {
                return {
                    ...prevState,
                    lowercase : regexLowerCase.test(e.target.value),
                    uppercase : regexUppperCase.test(e.target.value),
                    number : regexNumber.test(e.target.value),
                    specialChar: regexSpecialChar.test(e.target.value),
                    minLength : regexMinLength.test(e.target.value)
                }
            })
        }
    }

    function submitHandler(e)
    {
        e.preventDefault();
        if(!passwordCheck.lowercase || !passwordCheck.uppercase || !passwordCheck.specialChar || !passwordCheck.minLength || !passwordCheck.specialChar)
        {
            toast.error("Password doesn't meet required standard");
            return;
        }
        if (formData.password !== formData.confirmPassword){
            toast.error("Password Doesn't Match");
            return;
        }

        dispatch(resetPassword(formData.password, formData.confirmPassword, resetPasswordToken, setResetPassswordDone, setEmail))
    }
    return (
        <div className='h-[657px] w-[100%] flex justify-center items-center text-white'>
            {loading ? <div className="spinner"></div> : 
                <div className=' w-[25%] flex flex-col justify-between items-start'>
                    <h1 className=' font-bold text-[1.5rem]'>{!resetPasswordDone ? "Choose new password" : "Reset Complete"}</h1>
                    <p className=' w-[100%] text-richblack-200 mb-10'>{!resetPasswordDone ? "Almost done. Enter your new password and youre all set." : `All done! We have sent an email to ${email} to confirm`}</p>
                    { !resetPasswordDone &&
                        <form className=' w-[100%] mb-10 flex flex-col gap-2 items-start justify-center' onSubmit={submitHandler}>
                            <div className=' flex flex-col items-start justify-center gap-2 w-[100%]'>
                                <label htmlFor='password' className=' text-richblack-200'>New Password<span><sup className=''>*</sup></span></label>
                                <input type='password' className=' appearance-none w-[100%] h-10 rounded-md py-1 px-2 bg-richblack-600 outline-none text-white' name='password' id='password' value={formData.password} onChange={changeHandler} ></input>
                            </div>

                            <div className=' flex flex-col items-start justify-center gap-2 w-[100%]'>
                                <label htmlFor='confirmPassword' className=' text-richblack-200'>Confirm New Password<span><sup className=''>*</sup></span></label>
                                <input type='password' className=' appearance-none w-[100%] h-10 rounded-md py-1 px-2 bg-richblack-600 outline-none text-white' name='confirmPassword' id='confirmPassword' value={formData.confirmPassword} onChange={changeHandler} ></input>
                            </div>

                        </form>
                    }
                    {
                        !resetPasswordDone && 
                        <div className=' flex flex-row flex-wrap gap-x-2 gap-y-2 w-[100%] mb-7 font-inter text-[14px]'>
                            <div className=' flex flex-row justify-center items-center gap-2'>
                                <div className={`w-4 h-4 rounded-full ${passwordCheck.lowercase ? "bg-caribbeangreen-300" :"bg-[#FF0000]"} flex justify-center items-center`}>{passwordCheck.lowercase && <TiTick /> }</div>
                                <p className={`${passwordCheck.lowercase ? "text-caribbeangreen-300" :"text-[#FF0000]"}`}>one lowercase character</p>
                            </div>
                            <div className=' flex flex-row justify-center items-center gap-2'>
                                <div className={`w-4 h-4 rounded-full ${passwordCheck.specialChar ? "bg-caribbeangreen-300" :"bg-[#FF0000]"} flex justify-center items-center`}>{passwordCheck.specialChar && <TiTick />}</div>
                                <p className={`${passwordCheck.specialChar ? "text-caribbeangreen-300" :"text-[#FF0000]"}`}>one special character</p>
                            </div>
                            <div className=' flex flex-row justify-center items-center gap-2'>
                                <div className={`w-4 h-4 rounded-full ${passwordCheck.uppercase ? "bg-caribbeangreen-300" :"bg-[#FF0000]"} flex justify-center items-center`}>{passwordCheck.uppercase && <TiTick />}</div>
                                <p className={`${passwordCheck.uppercase ? "text-caribbeangreen-300" :"text-[#FF0000]"}`}>one uppercase character</p>
                            </div>
                            <div className=' flex flex-row justify-center items-center gap-2'>
                                <div className={`w-4 h-4 rounded-full ${passwordCheck.minLength ? "bg-caribbeangreen-300" :"bg-[#FF0000]"} flex justify-center items-center`}>{passwordCheck.minLength && <TiTick />}</div>
                                <p className={`${passwordCheck.minLength ? "text-caribbeangreen-300" :"text-[#FF0000]"}`}>8 character minimum</p>
                            </div>
                            <div className=' flex flex-row justify-center items-center gap-2'>
                                <div className={`w-4 h-4 rounded-full ${passwordCheck.number ? "bg-caribbeangreen-300" :"bg-[#FF0000]"} flex justify-center items-center`}>{passwordCheck.number && <TiTick />}</div>
                                <p className={`${passwordCheck.number ? "text-caribbeangreen-300" :"text-[#FF0000]"}`}>one number</p>
                            </div>
                        </div>
                    }
                    {
                        !resetPasswordDone ? <button className=' bg-yellow-50 mb-7 text-black font-bold w-[100%] rounded-md py-2 px-3 hover:scale-95 transition-all duration-200' onClick={submitHandler}>Reset Password</button> :
                        <Link to={"/login"}><button className=' bg-yellow-50 mb-7 text-black font-bold w-[100%] rounded-md py-2 px-3 hover:scale-95 transition-all duration-200'>Return to Login</button></Link>
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

export default UpdatePassword