import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className=' w-[100%] flex flex-row p-3'>
        <div className=' mx-[14px] w-[60%] py-7 px-3 bg-richblack-900 flex flex-col gap-[2rem] '>
            <h1 className=' text-white text-[22px]'>Add Course</h1>
            <div>
                <RenderSteps />
            </div>
        </div>
        <div className=' bg-richblack-700 w-[30%] h-fit rounded-md py-3 px-2'>
            <p className=' text-white text-[16px] mb-4'>⚡Course Upload Tips</p> 
            <div className=' w-[80%] mx-[3%]'>
                <ul className=' text-richblack-5 text-[12px] list-disc list-outside flex flex-col gap-2'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
            

        </div>
    </div>
    
  )
}

export default AddCourse