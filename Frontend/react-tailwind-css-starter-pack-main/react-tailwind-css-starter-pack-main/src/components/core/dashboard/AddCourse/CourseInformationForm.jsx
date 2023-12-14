import React, {useEffect, useState, useRef} from 'react'
import { useForm, SubmitHandler, set } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../services/operations/courses';
import { HiCurrencyRupee } from "react-icons/hi";
import { GiCancel } from "react-icons/gi";
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../slices/courseSlice';
import { IoIosArrowForward } from "react-icons/io";
import toast from 'react-hot-toast';




const CourseInformationForm = () => {
    const [loading, setLoading] = useState(false);
    const {token} = useSelector(state => state.auth);
    const {course, editCourse} = useSelector(state => state.course);
    const [courseCategories, setCourseCategories] = useState([]);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const tagRef = useRef(null);
    const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState:{isSubmitSuccessful, errors}
    } = useForm();

    const isFormUpdated = () => {
        const currValues = getValues();
        if( currValues.courseTitle !== course.courseName || 
            currValues.courseShortDesc !== course.courseDescription  || 
            currValues.coursePrice !== course.price || 
            currValues.courseTags !== course.tags || 
            currValues.courseCategory !== course.category || 
            currValues.courseBenefits !== course.whatYouWillLearn || 
            currValues.courseRequirements !== course.requirements || 
            currValues.courseImage !== course.thumbnail) return true;
        else return false;
    }

    const onSubmit = async ( data) => {
        if(editCourse)
        {
            if(isFormUpdated())
            {
                const currValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);
    
                formData.append("courseName", data.courseTitle);
                formData.append("courseDescription", data.courseShortDesc);
                formData.append("price", data.coursePrice);
                formData.append("tags", data.courseTags);
                formData.append("category", data.courseCategory);
                formData.append("whatYouWillLearn", data.courseBenefits);
                formData.append("requirements", JSON.stringify(data.courseRequirements));
                formData.append("thumbnail", data.courseImage[0]);
                
                setLoading(true);
                const response = await editCourseDetails(formData, token);
                setLoading(false);
                if(response)
                {
                    dispatch(setStep(2));
                    dispatch(setCourse(response));
                }
            }
            else
            {
                toast.error("No Change detected");
            }
            
            return;
        } 
        else 
        {
            console.log(data.courseImage);
            const formData = new FormData();
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice);
            formData.append("tags", JSON.stringify(data.courseTags));
            formData.append("category", data.courseCategory);
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("requirements", JSON.stringify(data.courseRequirements));
            formData.append("thumbnail", data.courseImage[0]);
            formData.append("status", "draft");

            setLoading(true);
            const response = await addCourseDetails(formData, token);
            setLoading(false);
            if(response)
                {
                    console.log(response);
                    dispatch(setStep(2));
                    dispatch(setCourse(response));
                }
        }
    }

    const handleKeyDown = (event) => {
        if(tagRef.current)
        {
            if(event.key === "Enter" || event.key === ",")
            {
                console.log("Here")
                event.preventDefault();
                if(tag)
                {
                    setTags([...tags, tag]);
                    setTag("");
                }
            }   
        }
        
    }

    const handleCancelClick = (event, index) => {
        event.preventDefault();
        const newTags = tags.filter((tag,index1) => index1 != index)
        setTags(newTags);
    }


    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            setCourseCategories(categories);
            setLoading(false);
        }

        register("courseTags", {required : true, validate : (value) => value.length > 0});

        if(editCourse)
        {
            console.log(course.thumbnail);
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tags);
            setTags(course.tags);
            setValue("courseCategory", course.category);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseRequirements", course.requirements);
            setValue("courseImage", course.thumbnail);
        }
        getCategories();
    }, [])

    useEffect(() => {
        setValue("courseTags", tags)
    }, [tags])


  return (
    <form onSubmit={handleSubmit(onSubmit)} className=' text-white w-[100%] py-8 px-6 bg-richblack-700 rounded-md  flex flex-col gap-3'>
        <div className=' flex flex-col justify-between gap-2 relative'>
            <label htmlFor='courseTitle'>Course Title<sup className=' text-[#FF0000]'>*</sup></label>
            <input className=' appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none' name='courseTitle' id='courseTitle' placeholder='Enter course Title' {...register("courseTitle", {required : true})}></input>
            {
                errors.courseTitle && (
                    <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Course Title is required</span>
                )
            }
        </div>

        <div className=' flex flex-col justify-between gap-2 relative'>
            <label htmlFor='courseShortDesc'>Course Description<sup className=' text-[#FF0000]'>*</sup></label>
            <textarea placeholder='Enter Short Description' className=' appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none' name='courseShortDesc' id='courseShortDesc' rows={4} {...register("courseShortDesc", {required : true, maxLength : { value : 120, message : "Max Length is 120 characters only"}})}></textarea>
            {
                errors.courseShortDesc && (
                    <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Course Description is required Field</span>
                )
            }
        </div>

        <div className=' flex flex-col justify-between gap-2 relative'>
            <label htmlFor='coursePrice'>Price<sup className=' text-[#FF0000]'>*</sup></label>
            <input type='number' className=' relative appearance-none rounded-md  pl-12 py-3 text-[16px] bg-richblack-800 outline-none' name='coursePrice' id='coursePrice' placeholder='Enter course price' {...register("coursePrice", {required : true, min : {value : 0, message : "Value can't be less than 0"}})}></input>
            <div className=' absolute top-8 rounded-md bg-richblack-800 h-[48px] text-richblack-100 px-2 py-3 flex flex-row items-center justify-center'> <HiCurrencyRupee className=' text-[22px]'  /> </div>
            {
                errors.coursePrice && (
                    <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Course Price is required</span>
                )
            }
        </div>

        <div className='flex flex-col justify-between gap-2 relative'>
            <label htmlFor='courseCategory'>Course Category<sup className=' text-[#FF0000]'>*</sup></label>
            <select className=' text-richblack-200  appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none' defaultValue={""} {...register("courseCategory", {required : true})}>
                <option value={""} disabled className=' text-richblack-500'>Choose A Category</option>
                {
                    !loading && courseCategories.map((category, index) => {
                        return <option key={index} value={category?._id} >{category.name}</option>
                    })
                }
            </select>
            {
                errors.courseCategory && 
                <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Course Category is required</span>
            }
            
            
        </div>

        <div className='flex flex-col justify-between gap-2 relative'>
            <label htmlFor='courseTags'>Course Tags<sup className=' text-[#FF0000]'>*</sup></label>
            {
                (tags.length > 0) && 
                (
                    <div className=' flex flex-row flex-wrap gap-2'>
                        {
                            tags.map((tag, index) => {
                                return <div key={index} className=' flex flex-row gap-2 items-center justify-between bg-yellow-50 px-2 py-1 text-richblack-700 rounded-full'> <span>{tag}</span> <button onClick={(event) => handleCancelClick(event, index)}><GiCancel  className=' text-[#D22B2B]'/></button></div>
                            })
                        }
                    </div>
                )
            }
            <input ref={tagRef} onChange={(e) => setTag(e.target.value)}  onKeyDown={handleKeyDown} value={tag}  className=' appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none' name='courseTags' id='courseTags' placeholder='Enter course Tags'></input>
            {
                errors.courseTags && (
                    <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Course Tags is required</span>
                )
            }
        </div>
        
        {/* create a component for uploading and showing a preview of medial */}
        <div>

        </div>

        <div className=' flex flex-col justify-between gap-2 relative'>
            <label htmlFor='courseBenefits'>Benefits of the course<sup className=' text-[#FF0000]'>*</sup></label>
            <textarea placeholder='Enter Course Benefits' className=' appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none' name='courseBenefits' id='courseBenefits' rows={4} {...register("courseBenefits", {required : true, maxLength : { value : 120, message : "Max Length is 120 characters only"}})}></textarea>
            {
                errors.courseBenefits && (
                    <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Course Benefits is required Field</span>
                )
            }
        </div>


        {/* Create a component for requirement field */}
        <RequirementField
            name="courseRequirements"
            label="Requirements/ Instruction"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            editCourse={editCourse}
        />

        <input type='file' name='courseImage' id='courseImage' {...register("courseImage", {required : true})} ></input>

        <div className=' flex flex-row items-center justify-end gap-4'>
            {
                editCourse && (
                    <button onClick={() => dispatch(setStep(2))}  className=' text-richblack-900 px-3 py-2 font-bold rounded-md bg-richblack-300'>Continue Without Saving</button>
                )
            }
            <button className=' text-richblack-900 px-3 py-2 font-bold rounded-md bg-yellow-100 flex flex-row gap-2 items-center'><span>{!editCourse ? "Next" : "Save Changes"}</span> <IoIosArrowForward /></button>
        </div>

        

    </form>
  )
}

export default CourseInformationForm