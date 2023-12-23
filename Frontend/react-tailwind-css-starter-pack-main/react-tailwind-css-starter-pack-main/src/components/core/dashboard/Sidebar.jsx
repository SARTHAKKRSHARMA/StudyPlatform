import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { VscAccount, VscDashboard, VscVm, VscAdd, VscMortarBoard, VscHistory, VscSettingsGear } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'
import { IoLogOutOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";




const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [clicked, setClicked] = useState(false);

    const logoutFun = function()
    {
        dispatch(logout(navigate));
    }
    const matchRoute = (route) => {
        return matchPath(route, location.pathname);
    }

    function closeModal()
    {
        setClicked(false);
    }

    const {user, loading : profileLoading} = useSelector((state) => state.profile);
    console.log(user);
    const {loading : authLoading} = useSelector((state) => state.auth.loading);
    if(profileLoading || authLoading)
    {
        return (
            <div className=' flex items-center justify-center w-[200px] min-h-[657px] border border-r-[1px] border-r-richblack-700'>
                <div className='spinner'></div>            
            </div>
        )
    }

    return (
    <div className='min-w-[200px] min-h-[657px] flex flex-col gap-3 py-10 border border-r-[1px] border-r-richblack-700'>
        {
            sidebarLinks.map((link, index) => {
                return (!("type" in link) || link.type === user.accountType) && <div key={link.id} className={` flex flex-row items-center gap-2 px-4 py-2 ${matchRoute(link?.path) ? "  border-l-[3px] border-l-yellow-50 bg-yellow-50 bg-opacity-20 text-yellow-100" : "text-richblack-400"} `}>
                    { link.icon === "VscAccount" && <VscAccount  />}
                    { link.icon === "VscDashboard" && <VscDashboard  />}
                    { link.icon === "VscVm" && <VscVm  />}
                    { link.icon === "VscAdd" && <VscAdd  />}
                    { link.icon === "VscMortarBoard" && <VscMortarBoard  />}
                    { link.icon === "IoCart" && <IoCart  />}
                    { <Link to={link?.path} >{link?.name}</Link>    }
                </div>
            })
        }

        <div className=' w-[95%] h-[1px] bg-richblack-700 mx-auto'></div>

        <div  className={` flex flex-row items-center gap-2 px-4 py-2 ${matchRoute("/dashboard/settings") ? "  border-l-[3px] border-l-yellow-50 bg-yellow-50 bg-opacity-20 text-yellow-100" : "text-richblack-400"} `}>                  
            <VscSettingsGear />
            <Link to="/dashboard/settings">Settings</Link> 
        </div>

        <div  className={` flex flex-row items-center gap-2 px-4 py-2 ${matchRoute("") ? "  border-l-[3px] border-l-yellow-50 bg-yellow-50 bg-opacity-20 text-yellow-100" : "text-richblack-400"} `}>
            <IoLogOutOutline />
            <button onClick={() => setClicked(true)}>Logout</button> 
        </div>

        {
            clicked && 
            <ConfirmationModal modalData={{text1 : "Are you Sure?",  text2 : "You will be logged out of your account", btn1 : { text : "Logout", action : logoutFun}, btn2 : { text : "Cancel", action : closeModal}}} />
        }
    </div>
  )
}

export default Sidebar