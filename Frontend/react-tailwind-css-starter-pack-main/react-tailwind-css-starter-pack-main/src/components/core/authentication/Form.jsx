import React, { useState } from 'react'
import HighLightText from '../homepage/HighLightText';
import Frame from "../../../assets/Images/frame.png"
import SignUpStudent from "../../../assets/Images/signup.webp"
import LoginStudent from "../../../assets/Images/login.webp"
import Instructor from "../../../assets/Images/InstructorLS.png"
import LoginFormField from './LoginFormField';
import SignupFormField from './SignupFormField';
import { useSelector, useDispatch } from "react-redux";
import { login, sendOtp } from '../../../services/operations/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Form = ({type, accountType}) => {
    const [userType, setUserType] = useState("Student");
    const [formData, setFormData] = useState(type==="login" ? { email : "", password : ""}  : {firstName : "", lastName : "", email : "",  contact : "", countryCode : "+91", password : "", confirmPassword : "", accountType : userType});
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async function(e)
    {
        e.preventDefault()
        dispatch(login(formData.email, formData.password, navigate));
    }

    const sendOtpHandler = async function(e)
    {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword)
        {
            toast.error("Password didn't match");
        }
        else
        {
            dispatch(sendOtp(formData.email, formData, navigate));
        }
    }

    console.log(formData)
    function changeUserType(event)
    {
        if(userType !== event.target.id)
        {
            setUserType(event.target.id);
            if(type === 'signup')
            {
                setFormData((prevState) => {
                    return {...prevState, accountType: event.target.id}
                })
            }
        }
    }

  return (
    <div className=' text-white  w-[90%] mx-auto flex flex-row items-center'>
        <div className=' flex flex-col items-start justify-between gap-8 w-[50%]'>
            <div>
                <p className=' font-bold text-4xl'>Welcome Back</p>
                {userType === "Student" ? 
                    <p className=' mt-2 font-inter text-[18px] leading-6 text-richblack-200'>Build skills for today, tomorrow, and beyond. <HighLightText text={"Education to future-proof your career."} /></p> :
                    <div>
                        <p className=' mt-2 font-inter text-[18px] leading-6 text-richblack-200'>Discover your passions,</p>
                        <HighLightText text={"Be Unstoppable"} />
                    </div>
                }

            </div>
            <div className=' flex flex-row justify-between  items-center rounded-full h-[50px] w-[40%] px-5 py-3  bg-richblack-700 box-border'>
                <p className={` cursor-pointer ${userType=="Student" ? "bg-black rounded-full px-2 py-1 text-white" : " text-richblack-200" } transition-all duration-200 `} onClick={changeUserType} id="Student">Student</p>
                <p className={` cursor-pointer ${userType=="Instructor" ? "bg-black rounded-full px-2 py-1 text-white" : " text-richblack-200" } transition-all duration-200 `} onClick={changeUserType} id='Instructor'>Instructor</p>
            </div>
            
            <div className=' w-[100%]'>
                {type == "login" ? <LoginFormField formData={formData} setFormData={setFormData} /> : <SignupFormField formData={formData} setFormData={setFormData} />}
            </div>

            <div className=' w-[100%]'>
                {
                    loading ? 
                            <div className=' flex justify-center items-center w-[87%] h-10 rounded-md bg-yellow-5 transition-all duration-200'>
                                <div className='dots'></div>
                            </div> :
                    type === "login" ? <button onClick={loginHandler} className=' w-[87%] rounded-md bg-yellow-50 p-3 text-black font-bold transition-all duration-200 hover:scale-95'>Sign In</button> :
                    <button onClick={sendOtpHandler} className=' w-[87%] rounded-md bg-yellow-50 p-3 text-black font-bold transition-all duration-200 hover:scale-95'>Create Account</button>

                }
            </div>  
        </div>

        <div className=' relative w-[50%] h-[550px]'>
            <img src={userType === "Student" ?  type=="signup"  ? SignUpStudent : LoginStudent : Instructor} className=' absolute z-[10]' />
            <img src={Frame}  className='absolute -right-4 bottom-4' />
        </div>        
    </div>
  )
}

export default Form