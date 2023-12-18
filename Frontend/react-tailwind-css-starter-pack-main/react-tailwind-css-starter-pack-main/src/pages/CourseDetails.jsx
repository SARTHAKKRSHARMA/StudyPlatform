import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails, getAverageRating } from '../services/operations/courses';
import toast from 'react-hot-toast';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { TiTick } from "react-icons/ti";
import { buyCourse } from '../services/operations/payment';
import { FaAngleDown } from "react-icons/fa";
import { BiVideoRecording } from "react-icons/bi";



const CourseDetails = () => {
    const {user} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth)
    const {paymentLoading} = useSelector(state => state.course);
    const {items} = useSelector(state => state.cart);
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [averageRating, setAverageRating] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [coursePurchased, setCoursePurchased] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [totalLecture, setTotalLecture] = useState(0);
    const [isActive, setIsActive] = useState([]);

    console.log(course)



    useEffect(() => {
        const getCourseDetails = async () => {
            setLoading(true);
            const result = await fetchCourseDetails(courseId);
            console.log(result)
            if(result) setCourse(result);
            else toast.error("Error occured while fetching course details");
            setLoading(false);
        }
        courseId && getCourseDetails();
    }, [courseId, user])

    useEffect(() => {
        const fetchAverageRating = async () => {
            const result = await getAverageRating(courseId);
            console.log(result);
            setAverageRating(result);
        }
        courseId && fetchAverageRating();
    }, [courseId, user])

    useEffect(() => {
        if(user && courseId && user?.courses.includes(courseId))
        {
            setCoursePurchased(true);
        }
    }, [courseId, user])

    useEffect(() => {
        if(courseId)
        {
            setAddedToCart(items.some((item) => item._id === courseId))
        }
    }, [courseId, user])

    useEffect(() => {
        let lecture = 0;
        if(course)
        {
            for(const section of course.courseContent)
            {
                lecture += section.subSection.length;
            }
            setTotalLecture(lecture);
        }
    }, [course])

    const addToCartHandler = () => {
        dispatch(addToCart(course));
        setAddedToCart(true);
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromCart(course._id));
        setAddedToCart(false);
    }

    const handleBuyCourse = async () => {
        if(token) 
        {
            await buyCourse([courseId], token, user, navigate, dispatch);
        }
    }

    const handleActive = (id, e) => {
        e.stopPropagation();
        e.preventDefault();
        if(isActive.includes(id))
        {
            const updatedActive = isActive.filter((item) => item !== id);
            setIsActive(updatedActive);
        }
        else
        {
            setIsActive([...isActive, id]);
        }
    }

    const handleCollapse = (e) => {
        e.preventDefault();
        setIsActive([]);
    }


    if(!course || loading)
    {
        return <div className=' absolute top-[50%] left-[50%] spinner'></div>
    }

  return (
    <div>

        <div className=' bg-richblack-500 py-[3rem] px-[2rem] flex flex-row items-center'>
            <div className=' w-11/12  max-w-maxContent mx-auto relative'>
                <div className=' flex flex-col items-start h-fit w-[70%]'>
                    <p className=' text-richblack-5 font-bold text-[35px]'>{course?.courseName}</p>
                    <p className=' text-richblack-900 text-[14px]'>{course?.courseDescription}</p>
                    <div className=' flex flex-row items-center gap-3'>
                        <p className=' text-yellow-100 font-inter text-[16px]'>{averageRating}</p>
                        <ReactStars
                            count={5}
                            value={averageRating}
                            isHalf={true}
                            size={24}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p>({course?.ratingAndReviews?.length.toLocaleString("en-US")} Ratings)</p>
                        <p>{course?.students?.length.toLocaleString("en-US")} students</p>
                    </div>
                    <p>Created By Instructor: <span className=' capitalize'>{course?.instructor?.firstName}</span> <span className=' capitalize'>{course?.instructor?.lastName}</span></p>
                </div>

                <div className=' absolute z-[100] right-0 top-0 flex flex-col w-[300px] h-fit bg-richblack-500 rounded-md'>
                    <img src={course?.thumbnail} className=' w-full h-[200px] rounded-md object-cover' />
                    <div className=' flex flex-col gap-3 px-3 py-2'>
                        <p className=' text-[24px] text-richblack-25 font-bold'>Rs. {course?.price}</p>
                        {
                            (user && user?.accountType !== "Instructor") ? coursePurchased ? (
                                <div>
                                    <button disabled={paymentLoading} className=' text-richblack-900 bg-yellow-100 px-3 py-2 rounded-md w-[100%] flex items-center justify-center font-semibold'>Start Learning</button>
                                </div>
                            ) : addedToCart ? (
                                <div className=' flex flex-col gap-3'>
                                    <button disabled={paymentLoading} onClick={removeFromCartHandler} className=' text-richblack-900 bg-[#e45454] px-3 py-2 rounded-md w-[100%] flex items-center justify-center font-semibold'>Remove from Cart</button>
                                    <button disabled={paymentLoading} onClick={handleBuyCourse} className=' text-richblack-50 bg-richblack-800 px-3 py-2 rounded-md w-[100%] flex items-center justify-center font-semibold'>Buy Now</button>
                                </div>
                            ) : 
                                <div className=' flex flex-col gap-3'>
                                    <button disabled={paymentLoading} onClick={addToCartHandler} className=' text-richblack-900 bg-yellow-100 px-3 py-2 rounded-md w-[100%] flex items-center justify-center font-semibold'>Add to Cart</button>
                                    <button disabled={paymentLoading} onClick={handleBuyCourse} className=' text-richblack-50 bg-richblack-800 px-3 py-2 rounded-md w-[100%] flex items-center justify-center font-semibold'>Buy Now</button>
                                </div>
                            : <div className=' text-richblack-50 font-bold '>*Login with students account to purchase the course*</div>
                        }
                        <div className=' flex flex-row items-center justify-center'>
                            <p className=' text-richblack-50'>30-Day Money-Back Guarantee</p>
                        </div>
                        <div>
                            <p className=' text-richblack-5 font-semibold'>This course includes:</p>
                            <ul className=' flex flex-col items-start gap-2'>
                                <li className=' flex flex-row items-center gap-3 text-caribbeangreen-200'> <TiTick /> <span>8 hours on-demand video</span> </li>
                                <li className=' flex flex-row items-center gap-3 text-caribbeangreen-200'> <TiTick /> <span>Full Lifetime access</span> </li>
                                <li className=' flex flex-row items-center gap-3 text-caribbeangreen-200'> <TiTick /> <span>Access on Mobile and TV</span> </li>
                                <li className=' flex flex-row items-center gap-3 text-caribbeangreen-200'> <TiTick /> <span>Certificate of completion</span> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        </div>

        
        <div className=' bg-richblack-900 py-[3rem] px-[2rem] flex flex-col items-start gap-4 border-1 border-richblack-300'>    
            <div className=' w-11/12 max-w-[60%] mx-[6rem] relative'>
                <p className=' text-richblack-50 font-semibold text-[22px]'>What you'll learn</p>
                <div className=' flex flex-col gap-2 mt-3'>
                    {
                        course.whatYouWillLearn.split("\n").map((benefit, index) => (
                            <p key={index} className=' text-richblack-100'>{benefit}</p>
                        ))
                    } 
                </div>
               
            </div>

            <div className=' w-11/12 max-w-[60%] mx-[6rem] relative'>
                <p className=' text-richblack-50 font-semibold text-[22px]'>Course Content</p>
                <div className=' flex flex-row items-center justify-between w-[100%]'>
                    <p className=' text-richblack-50' >{course.courseContent.length} sections • {totalLecture} lectures • 7h 57m total length</p> 
                    <button onClick={(e) => handleCollapse(e)} className=' text-yellow-100 font-semibold'>Collapse all sections</button>
                </div>
                <div className=' border-2 border-richblack-400 mt-3'>
                    {
                        course.courseContent.map((section, index) => (
                            <details key={section._id} onClick={(e) => handleActive(section._id, e)} className=' text-richblack-50' open={isActive.includes(section._id)}>
                                <summary className=' bg-richblack-800 px-3 py-3 flex items-center justify-between'>
                                    <div className=' flex flex-row items-center gap-3'> <FaAngleDown /> <span>{section.sectionName}</span></div>
                                    <p className=' text-yellow-100 font-semibold'>{`${section.subSection.length} lecture(s)`} </p>
                                </summary>
                                <div className=' px-3 py-3'>
                                    {
                                        section.subSection.map((lecture, index) => (
                                            <details key={lecture._id} onClick={(e) => handleActive(lecture._id, e)}  className=' text-richblack-50 py-3' open={isActive.includes(lecture._id)}>
                                                <summary className=' flex flex-row items-center justify-between'>
                                                    <div className=' flex flex-row gap-3 items-center'>
                                                        <BiVideoRecording />
                                                        <p>{lecture.title}</p>
                                                        <FaAngleDown />
                                                    </div>
                                                    <p>02:09</p>
                                                </summary>
                                                <div className=' px-6 mt-2'>
                                                    <p className=' text-richblack-300'>{lecture.description}</p>
                                                </div>
                                            </details>
                                        ))
                                    }
                                </div>                               

                            </details>
                        ))
                    }
                </div>      
            </div>

            <div className=' w-11/12 max-w-[60%] mx-[6rem] relative flex flex-col items-start'>
                <p className=' text-richblack-50 font-semibold text-[22px]'>Author</p>
                <div className=' flex flex-row items-center gap-3 mt-4'>
                    <div className=' flex flex-row items-center justify-center w-[40px] aspect-square rounded-full overflow-hidden'>
                        <img src={course?.instructor?.image} />
                    </div>
                    <p className=' text-richblack-50 capitalize'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                </div>
                {
                    course?.instructor?.additionalDetails?.about && <p>{course?.instructor?.additionalDetails?.about}</p>   
                }
            </div>
        </div>


    </div>
  )
}

export default CourseDetails