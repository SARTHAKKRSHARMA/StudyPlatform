import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo : Logo1,
        heading : "Leadership",
        subheading : "Fully committed to the success company"
    },
    {
        logo : Logo2,
        heading : "Responsibility",
        subheading : "Students will always be our top priority"
    },
    {
        logo : Logo3,
        heading : "Flexibility",
        subheading : "The ability to switch is an important skills"
    },
    {
        logo : Logo4,
        heading : "Solve the problem",
        subheading : "Code your way to a solution"
    },
]

const TimelineSection = () => {
  return (
        <div className=' w-11/12 max-w-maxContent mx-auto mt-24'>
            <div className=' w-[90%] mx-auto flex flex-row items-center justify-between'>
                <div className='flex flex-col w-[40%]'>
                    {
                        timeline.map((element, index) => {
                            return(
                                <div key={index}>
                                    <div className=' flex flex-row items-center gap-7'>
                                        <div className='w-[10%] bg-white rounded-full aspect-square flex justify-center items-center'>
                                            <img src={element.logo} loading='lazy'/>
                                        </div>
                                        <div className=' flex flex-col justify-center items-start'>
                                            <p className=' font-bold'>{element.heading}</p>
                                            <p className=' text-sm'>{element.subheading}</p>
                                        </div>
                                    </div>
                                    {
                                       (index != timeline.length - 1) && <div className=' my-2 ml-5  h-12 border-l-2 border-dashed'></div>
                                    }   
                                </div>  
                            )
                        })
                    }
                </div>
                <div className='w-[55%] relative'>
                    <img src={TimelineImage} loading='lazy' />
                    <div className=' flex absolute -bottom-14 left-24 flex-row justify-between items-center p-[2rem] w-[70%] mx-auto bg-caribbeangreen-700'>
                        <div className='flex flex-row items-center gap-3 w-[33%]'>
                            <p className=' text-white text-3xl font-bold'>10</p>
                            <p className=' text-white text-[10px] opacity-40'>YEARS EXPERIENCES</p>
                        </div>
                        <div className=' h-10 w-[1px] bg-white opacity-40'></div>
                        <div className='flex flex-row items-center gap-3 w-[33%]'>
                            <p className=' text-white text-3xl font-bold'>250</p>
                            <p className=' text-white text-[10px] opacity-40'>TYPES OF COURSES</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TimelineSection