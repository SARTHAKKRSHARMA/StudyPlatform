import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

const ConfirmationModal = ({modalData}) => {
  const {loading} = useSelector((state) => state.auth.loading);
  return (
    <div>
      <div onClick={modalData.btn2.action} className=' fixed top-0 left-0 w-screen h-screen bg-richblack-900 bg-opacity-50 backdrop-blur-[4px]'></div>
      <div   className=' w-[350px] h-fit bg-richblack-800 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md py-4 px-5 flex flex-col gap-4'>
        <p className=' text-white font-bold text-lg'>{modalData.text1}</p>
        <p className=' text-richblack-200'>{modalData.text2}</p>
        {
          !loading ? (<div className=' flex flex-row gap-2'>
            <button onClick={modalData.btn1.action} className={` text-black font-bold bg-yellow-100 rounded-md px-4 py-2 `}>{modalData.btn1.text}</button>
            <button onClick={modalData.btn2.action} className=' text-black font-bold bg-richblack-200 rounded-md px-4 py-2'>{modalData.btn2.text}</button>
          </div>) :
          (<div className=' flex flex-row gap-2'>
            <button onClick={modalData.btn1.action} disabled className={` text-black font-bold bg-yellow-100 rounded-md px-4 py-2 `}>{modalData.btn1.text}</button>
            <button onClick={modalData.btn2.action} disabled className=' text-black font-bold bg-richblack-200 rounded-md px-4 py-2'>{modalData.btn2.text}</button>
          </div>)
        }
      </div>
    </div>

  )
}

export default ConfirmationModal