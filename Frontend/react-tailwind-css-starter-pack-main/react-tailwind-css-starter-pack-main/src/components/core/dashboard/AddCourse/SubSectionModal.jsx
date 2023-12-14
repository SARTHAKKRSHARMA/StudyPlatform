import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const SubSectionModal = ({modalData, setModalData, add=false, view=false, edit=false}) => {
    const {register, handleSubmit, setValue, getValues, formState : {errors}} = useForm()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);

    const isFormUpdated = () => {
        const currValues = getValues();

        if(currValues.lectureTitle !== modalData.title || currValues.lectureDescription !== modalData.description || currValues.lectureVideo !== modalData.videoUrl) return true;
        return false;
    }

    const onSubmitHandler = async (data) => {
        if(view) return;
        if(edit)
        {
            if(isFormUpdated())
            {
                //
            } else
            {
                toast.error("No Changes made to the form");
            }
            return;
        }


    }

    useEffect(() => {
        if(view || edit)
        {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [])
  return (
    <div>
      <div   className=' fixed top-0 left-0 w-screen h-screen bg-richblack-900 bg-opacity-50 backdrop-blur-[4px]'></div>
      <form   className=' w-[350px] h-fit bg-richblack-800 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md py-4 px-5 flex flex-col gap-4'>
      </form>
    </div>
  )
}

export default SubSectionModal