import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const CourseSlider = ({courses}) => {
  console.log(courses);
  const navigate = useNavigate()
  return (
    <div className=' mt-3 w-[1260px] mx-auto'>
      {
        (!courses || courses.length === 0 )? <p className=' text-richblack-300'> No Course Found</p> :
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} loop={true} spaceBetween={50} slidesPerView={2} navigation className=' w-[100%] '>
        {
          courses.map((course, index) => (
            <SwiperSlide key={index} >
                {
                  <div onClick={() => navigate(`/course/${course.courseDetails._id}`)} className=' flex flex-col w-[100%] h-[100%] cursor-pointer'>
                    <img src={course?.courseDetails?.thumbnail} className='  w-full h-[200px]  object-cover' />
                    <div className=' flex flex-col items-start justify-between'>
                      <p className=' text-richblack-25'>{course.courseDetails.courseName}</p>
                      <p className=' text-richblack-300 text-[14px]'>{course.courseDetails.ratingAndReviews.length} Reviews</p>
                      <p className=' text-richblack-25'>Rs. {course.courseDetails.price}</p>
                    </div>
                  </div>    
                }
            </SwiperSlide>
          ))
        }
        </Swiper>
      }
    </div>
  )
}



export default CourseSlider