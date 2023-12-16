import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCataogPageData } from '../services/operations/pageAndComponentData';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import toast from 'react-hot-toast';
import CourseSlider from "../components/core/dashboard/Catalog/CourseSlider"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

const Catalog = () => {
    const {categoryName} = useParams();
    const [categoryPageData, setCategoryPageData] = useState([]);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [currSection, setCurrSection] = useState("mostSelling")
    const navigate = useNavigate();


    useEffect(() => {
        const getCategoryDetail = async () => {
            try
            {
                setLoading(true);
                const response = await apiConnector("GET", categories.CATEGORIES_API);
                if(!response?.data?.success)
                {
                    throw new Error("Error occured while fetching category details");
                }
                const category = response?.data?.categories?.filter((category) => category.name.split(" ").join("-").toLowerCase() === categoryName);
                if(!category)
                {
                    throw new Error("Category Name is invalid");
                }
                setCategory(category[0]);
            } catch (e)
            {
                console.log("Error occured while calling category API", e);
            }
            setLoading(false);
        }
        getCategoryDetail();
    }, [categoryName]);

    useEffect(() => {
        const fetchCategoryPageData = async () => {
            setLoading(true);
            const result = await getCataogPageData(category._id);
            console.log(result);
            if(result)
            {
                setCategoryPageData(result)
            } else 
            {
                toast.error("Error occured while fetching category course data detail");
            }
            setLoading(false);
        }

        category && fetchCategoryPageData();
    }, [category]);

    if(loading)
    {
        return <div className=' spinner absolute top-[50%] left-[50%]'></div>
    }

  return (
    <div>

        {/* Hero Section */}
        <div className=' bg-richblack-500 py-[3rem] px-[2rem] flex flex-row items-center'>
            <div className=' w-11/12  max-w-maxContent mx-auto flex flex-col items-start h-fit'>
                <p className=' text-richblack-5 font-bold text-[35px]'>{category?.name}</p>
                <p className=' text-richblack-900 text-[14px]'>{category?.description}</p>
            </div>
        </div>

        <div className=' bg-richblack-900 py-[3rem] px-[2rem] flex flex-col items-start gap-4'>    
            {/* section1 */}
            <div className=' w-11/12  max-w-maxContent mx-auto flex flex-col items-start h-fit'>
                <p className=' text-richblack-50 text-[28px]'>Courses to get you started</p>
                <div className=' flex flex-row gap-4'>
                    <button onClick={() => currSection !== "mostSelling" && setCurrSection("mostSelling")} className={`px-3 z-[2] py-2 ${currSection === "mostSelling" ? " text-yellow-100 underline decoration-[4px] underline-offset-[0.8rem]" : " text-richblack-100"}`}>Most Selling</button>
                    <button onClick={() => currSection !== "topRated" && setCurrSection("topRated")} className={`px-3 z-[2] py-2 ${currSection === "topRated" ? "text-yellow-100 underline decoration-[4px] underline-offset-[0.8rem] " : " text-richblack-100"}`}>Top Rated</button>
                </div>
                <div className=' h-[1px] z-[1] w-full bg-richblack-200'></div>
                <div>
                    <CourseSlider courses={currSection === "mostSelling" ? categoryPageData?.mostSelling : categoryPageData?.topRated} />
                </div>
            </div>

            {/* section2 */}
            <div className=' w-11/12  max-w-maxContent mx-auto flex flex-col items-start h-fit'>
                <p className=' text-richblack-50 text-[28px]'>All Courses in {category?.name}</p>
                <div className=' mt-3 w-[1260px] mx-auto'>
                {
                    (!categoryPageData.allCourses || categoryPageData.allCourses.length === 0 )? <p className=' text-richblack-300'> No Course Found</p> :
                    <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} loop={true} spaceBetween={50} slidesPerView={2} navigation className=' w-[100%] '>
                    {
                        categoryPageData.allCourses.map((course, index) => (
                        <SwiperSlide key={index} >
                            {
                            <div onClick={() => navigate(`/course/${course._id}`)} className=' flex flex-col w-[100%] h-[100%] cursor-pointer'>
                                <img src={course.thumbnail} className='  w-full h-[200px]  object-cover' />
                                <div className=' flex flex-col items-start justify-between'>
                                <p className=' text-richblack-25'>{course.courseName}</p>
                                <p className=' text-richblack-300 text-[14px]'>{course.ratingAndReviews.length} Reviews</p>
                                <p className=' text-richblack-25'>Rs. {course.price}</p>
                                </div>
                            </div>    
                            }
                        </SwiperSlide>
                    ))
                    }
                    </Swiper>
                }
                </div>
            </div>

            <div className=' w-11/12  max-w-maxContent mx-auto flex flex-col items-start h-fit'>
                <p className=' text-richblack-50 text-[28px]'>Frequently bought courses from other categories</p>
                <div className=' flex flex-row flex-wrap items-center justify-between w-[90%] mt-3 gap-y-8'>
                    {
                        (!categoryPageData || !categoryPageData.differentCategoryTopSellingCourse || categoryPageData.differentCategoryTopSellingCourse.length === 0) ? <div className=' text-richblack-300'>No Course to show</div> : (
                            categoryPageData.differentCategoryTopSellingCourse.map((course, index) => {
                                return (
                                    <div key={course.courseDetails._id} onClick={() => navigate(`/course/${course.courseDetails._id}`)} className=' flex flex-col w-[500px] h-[350px] cursor-pointer'>
                                        <img src={course.courseDetails.thumbnail} className=' w-[500px] overflow-hidden object-cover' />
                                        <div className=' flex flex-col items-start justify-between'>
                                            <p className=' text-richblack-25'>{course.courseDetails.courseName}</p>
                                            <p className=' text-richblack-300 text-[14px]'>{course.courseDetails.ratingAndReviews.length} Reviews</p>
                                            <p className=' text-richblack-25'>Rs. {course.courseDetails.price}</p>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>

    </div>
  )
}

export default Catalog