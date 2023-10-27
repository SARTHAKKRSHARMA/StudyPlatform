import React from 'react'
import { FaUsers } from 'react-icons/fa';
import { SiAwsorganizations } from 'react-icons/si';

const PowerOfCodeCard = ({active, data, index, changeSelectedCard}) => {
    function changeSelected()
    {
        changeSelectedCard(index);
    }
    return (
    <div onClick={changeSelected} className={` w-[300px] h-[250px] ${active ? " bg-white text-richblack-700 shadow-[15px_15px_0px_0px_rgba(255,255,255)] shadow-yellow-25" : " bg-richblack-700 text-white"} py-3 px-2 flex flex-col justify-between`}>
        <div>
            <h1 className='font-bold'>{data.heading}</h1>
            <p className=' text-sm opacity-30 mt-3'>{data.description}</p>
        </div>
        <div className='border-dashed border-t-2 border-richblack-50 flex flex-row justify-between items-center pt-2'>
            <div className=' flex flex-row gap-2 items-center'>
                <FaUsers />
                <p>{data.level}</p>
            </div>
            <div className=' flex flex-row gap-2 items-center'>
                <SiAwsorganizations />
                <p>{data.lessionNumber} Lessons</p>
            </div>
        </div>
    </div>
  )
}

export default PowerOfCodeCard
