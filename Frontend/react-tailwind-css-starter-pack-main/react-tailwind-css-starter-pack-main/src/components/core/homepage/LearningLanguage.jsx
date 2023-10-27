import React from 'react'
import HighLightText from './HighLightText'
import CompareWithOther from "../../../assets/Images/Compare_with_others.png"
import KnowYourProgress from "../../../assets/Images/Know_your_progress.png"
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton'


function LearningLanguage() {
  return (
    <div className=' w-11/12 max-w-maxContent mx-auto mt-24'>
        <div className=' w-[90%] mx-auto flex flex-col items-center justify-between'>
            <div className=' w-[100%] flex flex-col justify-center items-center'>
                <div className=' text-4xl font-bold font-inter '>
                    Your swiss knife for <HighLightText text={" learning any language"} />
                </div>
                <div className=' text-center w-[65%] mt-2 text-[1rem] font-inter font-400'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>

            <div className='flex flex-row relative w-[100%] justify-center items-center'>
                <img src={KnowYourProgress} loading='lazy' className=' aspect-auto absolute left-4 z-[1]' />
                <img src={CompareWithOther} loading='lazy' className=' aspect-auto z-[2]' />
                <img src={PlanYourLessons} loading='lazy' className=' aspect-auto absolute -right-6 z-[3]' />
            </div>
            
            <CTAButton active={true} linkTo={"/login"} >Learn More</CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguage