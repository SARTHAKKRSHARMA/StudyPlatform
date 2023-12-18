import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
    const {items, totalItems, total} = useSelector(state => state.cart);
    console.log(items);
    console.log(totalItems);
  return (
    <div>
        <h1>Your Cart</h1>
        <p>{totalItems} Courses in Cart</p>

        {
            total > 0 ?
            <div>
                <RenderCartCourses /> 
                <RenderTotalAmount />
            </div> :
            <p>Your cart is empty</p>
        }
    </div>
  )
}

export default Cart