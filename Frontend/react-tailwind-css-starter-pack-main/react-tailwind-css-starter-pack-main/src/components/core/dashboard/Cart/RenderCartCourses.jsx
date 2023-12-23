import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAverageRating } from '../../../../services/operations/courses';
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';


const RenderCartCourses = () => {
    const {items} = useSelector(state => state.cart);
    const [averageRating, setAverageRating] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {paymentLoading} = useSelector(state => state.course);


    useEffect(() => {
        const getAverageRatingFunc = async () => {
            setLoading(true);
            const rating = {};
            for(const item of items)
            {
                try
                {
                    const response = await getAverageRating(item._id);
                    rating[item._id] = response;
                } catch(e)
                {
                    rating[item._id] = "-";
                } finally
                {
                    setLoading(false);
                }  
            }
            console.log(rating);
            setAverageRating(rating)
        }

        getAverageRatingFunc();
    }, [items]);
    
    if(loading)
    {
        return (
            <div className=' w-[100%] h-[300px] flex flex-row items-center justify-center'>
                <div className=' spinner'></div>
            </div>
        )
    }
  return (
    <div className=' flex flex-col gap-[2rem] w-[100%]'>
        {
            items.map((item, index) => (
                <div key={item?._id} className=' flex flex-row w-[100%] py-[1rem] border-b-[1px] border-richblack-500 justify-between'>
                    <div className=' flex flex-row gap-3'>
                        <div className=' w-[150px] bg-yellow-100 aspect-square rounded-md overflow-hidden flex flex-row items-start justify-center'>
                            <img src={item?.thumbnail} className=' w-[100%] h-[100%] object-cover' />
                        </div>
                        <div className=' flex flex-col gap-3'>
                            <p className=' text-richblack-25 text-[18px]'>{item?.courseName?.length > 20 ? `${item?.courseName?.slice(0, 20)}....` : item?.courseName}</p>
                            <p className=' text-richblack-500 text-[15px]'>{ item?.instructor?.firstName} {item?.instructor?.lastName}</p>
                            <div className=' flex flex-row items-center gap-3'>
                                <p className=' text-yellow-100 text-[15px] font-bold'>{averageRating[item._id]}</p>
                                <ReactStars count={5} value={averageRating[item._id]} edit={false} isHalf={true} />
                            </div>
                        </div>
                    </div>

                    <div className=' flex flex-col gap-4'>
                        <button disabled={paymentLoading} onClick={() => dispatch(removeFromCart(item._id))} className=' bg-richblack-700 px-2 py-3 flex flex-row items-center justify-center gap-3 rounded-md font-mono text-[#d1001f]'><RiDeleteBin6Line /> <span>Remove</span></button>
                        <p className=' text-yellow-100 text-[22px] font-semibold'>Rs. {item.price}</p>
                    </div>

                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses