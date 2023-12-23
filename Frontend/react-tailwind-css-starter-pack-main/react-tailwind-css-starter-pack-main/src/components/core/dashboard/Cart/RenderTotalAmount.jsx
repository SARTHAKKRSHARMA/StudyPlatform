import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../../services/operations/payment';
import {useNavigate} from "react-router-dom"



const RenderTotalAmount = () => {
    const {total, items} = useSelector(state => state.cart)
    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);
    const {paymentLoading} = useSelector(state => state.course);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleBuyCourse = async () => {
      if(token) 
      { 
          const courseIds = items.map((item) => item._id);
          await buyCourse(courseIds, token, user, navigate, dispatch);
      }
  }
  return (
    <div className=' flex flex-col w-[100%] gap-2'>
        <p className=' text-richblack-200'>Total:</p>
        <p className=' text-yellow-50 text-[22px] font-bold'>Rs. {total}</p>
        <button disabled={paymentLoading} onClick={handleBuyCourse} className=' w-[100%] flex flex-row items-center py-3 px-2 justify-center bg-yellow-100 rounded-md font-bold transition-all duration-200 hover:scale-90'>Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount