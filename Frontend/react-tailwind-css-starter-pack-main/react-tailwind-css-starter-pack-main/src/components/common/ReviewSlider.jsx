import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode } from 'swiper/modules';
import ReactStars from "react-rating-stars-component";
import { fetchAllReviews } from '../../services/operations/courses';



const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const truncatedWords = 15;

    useEffect(() => {
        const getAllReviews = async () => {
            const data = await fetchAllReviews();
            setReviews(data);
        }    
        getAllReviews();
    }, [])
  return (
    <div className=' mt-[3rem] mb-[10rem] text-richblack-25 w-full h-[150px] px-3'>
        <Swiper className=' h-[100%] flex flex-row items-center justify-center' modules={[Navigation, FreeMode, Autoplay, A11y]}
                spaceBetween={50} 
                slidesPerView={3}
                loop={true}
                navigation={true}
                centeredSlides={true}
                autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                }}
        >
            {
                reviews.length !== 0 && reviews.map((review) => {
                    return (
                        <SwiperSlide key={review._id} className=' flex flex-row items-center justify-center'>
                            <div className=' bg-richblack-700 rounded-md min-w-[250px] h-[100%] w-fit px-3 py-4 flex flex-col gap-3'>
                                <div className=' flex flex-row items-center gap-3'>
                                    <div className=' flex flex-row items-center justify-center overflow-hidden w-[40px] aspect-square rounded-full'>
                                        <img src={review.user.image} />
                                    </div>
                                    <div className=' h-[100%] flex flex-col items-start justify-between'>
                                        <p>{review.user.firstName} {review.user.lastName}</p>
                                        <p className=' text-richblack-400'>{review.user.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>{review.review.length > 15 ? `${review.review.slice(0, 15)}....` : review.review}</p>
                                </div>
                                <div className=' flex flex-row items-center gap-3'>
                                    <p className=' text-yellow-100'>{review.rating}</p>
                                    <ReactStars count={5} value={review.rating} edit={false} isHalf={true} />
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })
            }

        </Swiper>
    </div>
  )
}

export default ReviewSlider