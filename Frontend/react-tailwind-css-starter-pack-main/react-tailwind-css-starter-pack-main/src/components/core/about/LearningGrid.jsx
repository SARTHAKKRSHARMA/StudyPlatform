import React from 'react'
import  {useNavigate} from 'react-router-dom'


const datas = [
    {
        order : -1,
        heading : "World-Class Learning for",
        highlightText : "Anyone, Anywhere",
        description : "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText : "Learn More",
        btnLink : "/"
    },
    {
        order : 1,
        heading : "Curriculum Based on Industry Needs",
        description : "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order : 2,
        heading : "Our Learning Methods",
        description : "The learning process uses the namely online and offline.",
    },
    {
        order : 3,
        heading : "Certification",
        description : "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order : 4,
        heading : "Rating Auto-grading",
        description : "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order : 5,
        heading : "Ready to Work",
        description : "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
]

const LearningGrid = () => {
    const navigate = useNavigate();
  return (
    <div className=' mt-20 mb-32 grid grid-rows-2 grid-cols-4 gap-0 text-white items-start w-[80%] max-w-[1000px] mx-auto'>
        {
            datas.map((data, index) => 
                <div key={index} className={`${data.order === -1  ? "col-span-2" : "col-span-1"} ${data.order !== -1 &&  ((data.order&1 === 1) ? "  bg-richblack-700" : " bg-richblack-800")} ${data.order !== -1 && "w-[250px] h-[250px] p-4"} ${data.order === -1 && "w-[100%] h-[250px]"} ${data.order === 3 && ' col-start-2'} flex flex-col justify-start items-start gap-4`}>
                    <div className=' w-[100%]'> 
                        <h1 className={`${data.order === -1 ? "text-[28px]" : " text-[14px] w-[90%]"} font-bold text-richblack-5`}>{data.heading}</h1>
                        {data.order === -1 && <p className={` text-[28px] bg-gradient-to-b from-[#08d3f0] to-[#1de4c7] bg-clip-text font-bold text-transparent`}>{data.highlightText}</p>}
                    </div>
                    <div className=' w-[80%] text-richblack-100 text-[12px]'>
                        {data.description}
                    </div>
                    <div>
                        {
                            data.btnText && <button onClick={(e) => {e.preventDefault(); navigate("/dashboard/my-profile")}} className=' bg-yellow-25 text-richblack-900 px-2 py-2 font-bold rounded-md hover:scale-95 transistion-all duration-200'>{data.btnText}</button>
                        }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default LearningGrid