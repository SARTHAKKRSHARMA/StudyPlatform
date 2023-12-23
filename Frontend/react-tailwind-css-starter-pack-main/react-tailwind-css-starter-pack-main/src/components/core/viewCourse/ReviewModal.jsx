import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler } from "react-hook-form"
import { MdCancel } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { createRating, getRatingByUserForACourse } from '../../../services/operations/courses';



const ReviewModal = ({setReviewModal}) => {
    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);
    const {courseEntireData} = useSelector(state => state.viewCourse);
    const [loading, setLoading] = useState(false);
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const {register, setValue, handleSubmit, getValues, formState : {errors}} = useForm();
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);

    const submitHandler = async (data) => {
        setReviewSubmitting(true);
        const formData = new FormData();
        formData.append("courseId", courseEntireData._id);
        formData.append("rating", data.rating);
        formData.append("review", data.review);
        const response = await createRating(formData, token);
        setReviewSubmitting(false);
        setReviewModal(false);
    }

    useEffect(() => {
        const getRatingFromUser = async () => {
            setLoading(true);
            const result = await getRatingByUserForACourse({courseId : courseEntireData._id}, token);
            if(result.rating !== -1)
            {
                setAlreadyReviewed(true);
                console.log(result)
                setValue("rating", result.rating);
                setValue("review", result.review);
            }
            else
            {
                setValue("rating", 0);
                setValue("review", "");
            }
            setLoading(false);
        }
        getRatingFromUser();
    }, [])


    if(loading)
    {
        return (
            <div>
                <div onClick={() => !loading ? setReviewModal(false) : {}} className=' fixed top-0 left-0 w-screen h-screen bg-richblack-900 bg-opacity-50 backdrop-blur-[4px]'></div>
                <div className=' w-[500px] h-fit bg-richblack-800 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md flex flex-col items-center gap-4'>
                    <div className=' spinner absolute top-[50%] left-[50%] '></div>
                 </div>
            </div>
        )
    }    

  return (
    <div>
      <div onClick={() => !reviewSubmitting ? setReviewModal(false) : {}} className=' fixed top-0 left-0 w-screen h-screen bg-richblack-900 bg-opacity-50 backdrop-blur-[4px]'></div>
      <div   className=' w-[500px] h-fit bg-richblack-800 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md flex flex-col items-center gap-4'>
        <div className=' bg-richblack-600 flex flex-row items-center justify-between px-3 py-2 rounded-md w-[100%] border-b-[1px] border-richblack-25'>
            <p className=' text-richblack-50'>Add Review</p>
            <button onClick={() => !reviewSubmitting ? setReviewModal(false) : {}} ><MdCancel className=' bg-transparent text-richblack-50' /></button>
        </div>

        <div className=' flex flex-row items-center gap-2'>
            <div className=' w-[50px]  aspect-square rounded-full overflow-hidden flex flex-row items-center justify-center'>
                <img src={user?.image} width={50} className=' object-fit rounded-full' />
            </div>
            <div className=' flex flex-col justify-between'>
                <p className=' text-richblack-25 text-[16px] font-bold'>{user.firstName} {user.lastName}</p>
                <p className=' text-richblack-25'>Posting Publicly</p>
            </div>
        </div>

        <div>
            <ReactStars count={5}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                        value={getValues("rating")}
                        edit={!reviewSubmitting && !alreadyReviewed}
                        onChange={(newRating) => setValue("rating", newRating)} 
            />
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className=' flex flex-col gap-4 w-[100%] px-3 py-3'>
            <div className=' flex flex-col gap-3 relative'>
                <label htmlFor='review' className=' text-richblack-50'>Add Your Experience <sup className=' text-[#ff0000]'>*</sup></label>
                <textarea disabled={alreadyReviewed} name='review' id='review' rows={3} className=' appearance-none rounded-md px-3 py-2 text-richblack-50 outline-none bg-richblack-600' placeholder="Share details of your experience for this course" {...register("review", {required : true})} />
                {errors.review && <span className=' text-[12px] font-bold text-[#ff0000] absolute -bottom-4 left-0'>This Field is required</span>}
            </div>
            <div className=' flex flex-row w-[100%] items-center justify-end gap-3'>
                <button disabled={reviewSubmitting} onClick={() => setReviewModal(false)} className=' bg-richblack-400 px-3 py-2 rounded-md font-bold'>Cancel</button>
                {!alreadyReviewed && <button disabled={reviewSubmitting} type='submit' className=' bg-yellow-100 px-3 py-2 rounded-md font-bold'>Share Review</button>}
            </div>
        </form>

      </div>
    </div>
  )
}

export default ReviewModal