import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { LiaEditSolid } from "react-icons/lia";
import { getProfile } from '../../../services/operations/profile';

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const getProfileFunc = async (token, setLoading) => 
      {
        const response = await getProfile(token, setLoading);
        if(response?.success) setProfile(response.data.additionalDetails);
      } 
      getProfileFunc(token, setLoading);
    }, [])
  return (
    <div className=' mx-auto w-[70%] py-7 flex flex-col gap-[2rem] bg-richblack-900'>
        <h1 className=' text-white text-[22px]'>My Profile</h1>

        <div className=' w-[100%] bg-richblack-700  px-3 py-5 flex flex-row items-center justify-between rounded-md'>
          <div className=' flex flex-row items-center gap-2'>
            <div className=' rounded-full flex justify-center items-center bg-blue-100 w-[50px] h-[50px] overflow-hidden'>
              <img src={user.image} />
            </div>
            <div>
              <p className=' text-richblack-5'>{user.firstName} {user.lastName}</p>
              <p className=' text-richblack-200'>{user.email}</p>
            </div>
          </div>
          <div>
            <button onClick={() => navigate("/dashboard/settings")} className=' bg-yellow-200 flex flex-row gap-2 px-3 py-2 rounded-md justify-center items-center font-bold'><span>Edit</span> <LiaEditSolid /></button>
          </div> 
        </div>

        <div className=' w-[100%] bg-richblack-700 px-3 py-5 flex flex-col  justify-between rounded-md'>
           <div className=' flex flex-row w-[100%] justify-between items-center'>
            <p className=' text-richblack-5'>About</p>
            <button onClick={() => navigate("/dashboard/settings")} className=' bg-yellow-200 flex flex-row gap-2 px-3 py-2 rounded-md justify-center items-center font-bold'><span>Edit</span> <LiaEditSolid /></button>
           </div>
           <div>
            <p className=' text-richblack-300 mt-5'>{(profile?.about && profile.about.length > 0) ? profile.about : "Write something about yourself"}</p>
           </div>
        </div>

        <div className=' w-[100%] bg-richblack-700 px-3 py-5 flex flex-col  justify-between rounded-md'>
           <div className=' flex flex-row w-[100%] justify-between items-center  mb-5'>
            <p className=' text-richblack-5'>Personal Details</p>
            <button onClick={() => navigate("/dashboard/settings")} className=' bg-yellow-200 flex flex-row gap-2 px-3 py-2 rounded-md justify-center items-center font-bold'><span>Edit</span> <LiaEditSolid /></button>
           </div>

           <div className=' grid grid-rows-3 grid-cols-2 gap-2'>
            <div className=' flex flex-col gap-2'>
              <p className=' text-richblack-400'>First Name</p>
              <p className=' text-richblack-25'>{user.firstName}</p>
            </div>
            <div className=' flex flex-col gap-2'>
              <p className=' text-richblack-400'>Last Name</p>
              <p className=' text-richblack-25'>{user.lastName}</p>
            </div>
            <div className=' flex flex-col gap-2'>
              <p className=' text-richblack-400'>email</p>
              <p className=' text-richblack-25'>{user.email}</p>
            </div>
            <div className=' flex flex-col gap-2'>
              <p className=' text-richblack-400'>Contact Number</p>
              <p className=' text-richblack-25'>{profile?.contactNumber ? profile.contactNumber : "Add Contact Number"}</p>
            </div>
            <div className=' flex flex-col gap-2'>
              <p className=' text-richblack-400'>Gender</p>
              <p className=' text-richblack-25'>{profile?.gender ? profile.gender : "Add Gender"}</p>
            </div>
            <div className=' flex flex-col gap-2'>
              <p className=' text-richblack-400'>Date Of Birth</p>
              <p className=' text-richblack-25'>{profile?.dateOfBirth ? profile.dateOfBirth : "1 Jan 1970"}</p>
            </div>
           </div>
        </div>



    </div>
  )
}

export default MyProfile