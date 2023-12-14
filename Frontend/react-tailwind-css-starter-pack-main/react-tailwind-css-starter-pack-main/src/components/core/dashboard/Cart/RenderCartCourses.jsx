import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAverageRating } from '../../../../services/operations/courses';
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';



const RenderCartCourses = () => {
    const {items} = useSelector(state => state.items);
    const [averageRating, setAverageRating] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        const getAverageRatingFunc = async () => {
            setLoading(true);
            const rating = {};
            for(const item of items)
            {
                try
                {
                    const response = await getAverageRating(item._id);
                    rating[item._id] = response.success ? response?.data?.averageRating : "-";
                } catch(e)
                {
                    rating[item._id] = "-";
                } finally
                {
                    setLoading(false);
                }  
            }
            setAverageRating(rating)
        }

        getAverageRatingFunc();
    }, [items]);
    

  return (
    <div>
        {
            items.map((item, index) => {
                return (
                    <div key={index}>
                        <div>
                            <img src={item?.thumnail} />
                            <div>
                                <p>{item?.courseName}</p>
                                <p>{item?.category?.name}</p>
                                <div>
                                    {
                                        loading ? <p>Rating : Fetching</p> :
                                        <div>
                                            <p>Rating: {item._id in averageRating ? averageRating[item._id] : "-"} </p>
                                            <ReactStars 
                                                    count={5} 
                                                    value={item._id in averageRating ? averageRating[item._id] == "-" ? 0 : averageRating[item._id] : 0} 
                                                    size={20} 
                                                    edit={false} 
                                                    activeColor={"#ffd700"} 
                                                    emptyIcon={FaRegStar} 
                                                    fullIcon={FaStar} 
                                            />
                                            <span>{item?.ratingAndReviews?.length} Ratings</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => dispatch(removeFromCart(item._id))}><RiDeleteBin6Line /> <span>Remove</span></button>
                            <p>Rs. {item?.price}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default RenderCartCourses