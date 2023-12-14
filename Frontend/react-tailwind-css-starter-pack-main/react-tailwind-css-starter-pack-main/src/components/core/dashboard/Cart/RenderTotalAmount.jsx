import React from 'react'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {
    const {total, items} = useSelector(state => state.cart)
    const handleBuyCourse = () => {
        const courses = items.map(item => item._id);
        console.log(courses);
    }
  return (
    <div>
        <p>Total:</p>
        <p>Rs. {total}</p>
        <button onClick={handleBuyCourse}>Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount