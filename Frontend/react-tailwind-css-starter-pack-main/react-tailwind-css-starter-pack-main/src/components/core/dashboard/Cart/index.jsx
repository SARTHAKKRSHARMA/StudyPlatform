import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
    const {items, totalItems, total} = useSelector(state => state.cart);
    console.log(items);
    console.log(totalItems);
  return (
    <div className=' px-[1rem] py-[2rem] flex flex-col items-start gap-[2rem]'>
        <h1 className=' text-richblack-50 text-[22px] font-bold'>Your Cart</h1>
        <div className=' w-[90%] flex flex-col gap-3'>
          <p className=' text-richblack-200 text-[14px]'>{totalItems} Courses in Cart</p>
          <div className=' h-[1px] w-[100%] bg-richblack-500'></div>
          {
            total > 0 ?
            <div className=' flex flex-row justify-between w-[100%]'>
              <div className=' w-[60%] h-fit px-3 py-4 '>
                <RenderCartCourses /> 
              </div>
              <div className=' w-[35%] h-fit bg-richblack-700 px-3 py-4 rounded-md'>
                <RenderTotalAmount />
              </div>
            </div> :
            <p className=' text-richblack-300'>Your cart is empty</p> 
          }
        </div>
    </div>
  )
}

export default Cart