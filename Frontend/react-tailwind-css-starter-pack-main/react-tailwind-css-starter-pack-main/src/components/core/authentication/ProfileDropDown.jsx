import React, { useRef, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../../../services/operations/auth'
import useOnClickOutside from '../../../hooks/useOnClickOutside'


const ProfileDropDown = () => {
    const {user} = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => {setIsVisible(false)});
    

    return (
    <div className=' relative'>
      <div onClick={(event) => {setIsVisible(true)}} className=' w-10 h-full rounded-full overflow-hidden flex flex-row justify-center items-center cursor-pointer'>
        <img src={user.image} height={50} width={50} loading='lazy' />
      </div>
      {isVisible && (
      <div
          className="absolute z-[1000] top-[50%] left-[50%] -translate-x-[50%] translate-y-[40%] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setIsVisible(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              {/* <VscDashboard className="text-lg" /> */}
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setIsVisible(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            {/* <VscSignOut className="text-lg" /> */}
            Logout
          </div>
        </div>
      )}    
    </div>
  )
}

export default ProfileDropDown