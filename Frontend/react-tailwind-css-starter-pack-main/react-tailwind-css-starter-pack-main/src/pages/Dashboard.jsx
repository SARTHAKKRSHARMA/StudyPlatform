import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/dashboard/Sidebar';

const Dashboard = () => {
    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading)
    {
        return (
            <div className=' flex items-center justify-center h-[657px]'>
                <div className='spinner text-white '></div>            
            </div>
        )
    }

    return (
    <div className='relative flex flex-row min-h-[657px]'>
        <Sidebar />
        <div className=' w-[100%] min-h-[657px]'>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard