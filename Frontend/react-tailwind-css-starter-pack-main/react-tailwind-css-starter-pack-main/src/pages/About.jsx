import React from 'react'
import HighLightText from '../components/core/homepage/HighLightText'
import aboutUs1 from "../assets/Images/aboutus1.webp"
import aboutUs2 from "../assets/Images/aboutus2.webp"
import aboutUs3 from "../assets/Images/aboutus3.webp"
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import foundingStory from "../assets/Images/FoundingStory.png"
import LearningGrid from '../components/core/about/LearningGrid'
import ContactForm from '../components/core/about/ContactForm'


const About = () => {
  return (
    <div className=' w-[100%]'>
        {/* section1 */}
        <div className=' bg-richblack-700 w-[100%]'>
            <div className=' w-11/12 max-w-[1160px] mx-auto pt-[4rem] pb-[8rem] flex flex-col justify-center items-center relative'>
                <h1 className=' text-[2rem] mb-2 text-white text-center max-w-[60%]'>Driving Innovation in Online Education for a <HighLightText text={"Brighter Future"} /></h1>
                <p className=' text-sm text-richblack-200 text-center max-w-[60%]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                <div className=' absolute w-[70%] -bottom-[5.275rem] flex flex-row justify-between items-center'>
                    <img src={aboutUs1} loading='lazy' width={250} />
                    <img src={aboutUs2} loading='lazy' width={250} />
                    <img src={aboutUs3} loading='lazy' width={250} />
                </div>
            </div>
        </div>

        {/* section2 */}
        <div className=' w-[100%] mt-[8rem] mx-auto pb-[4rem] border-richblack-5 border-b-[1px]'>
                <div className=' w-[50%] text-richblack-100 mx-auto text-center text-[1.5rem]'> 
                    <sup><FaQuoteLeft className=' text-richblack-400 inline' /></sup> 
                    <span className="text-center font-inter"> We are passionate about revolutionizing the way we learn. Our innovative platform <HighLightText text={"combines technology"} />, <span className=' text-[#FFA500]'>expertise</span>, and community to create an <span className=' text-brown-100'>unparalleled educational experience.</span> </span>
                    <sup><FaQuoteRight className=' text-richblack-400 inline' /></sup>
                </div>
        </div>

        {/* section3 */}
        <div className=' w-[100%] p-[4rem]'>
            <div className=' w-[80%] mx-auto flex flex-col gap-[10rem]'>
                <div className=' flex flex-row justify-between items-center w-[100%]'>
                    <div className=' flex flex-col justify-center items-start max-w-[40%]'>
                        <h1 className=' text-[1.8rem] bg-gradient-to-r from-[#b43aab] via-[#fd1d1d] to-[#fcb045] bg-clip-text font-bold text-transparent mb-6'>Our Founding Story</h1>
                        <p className=' text-richblack-200 mb-3'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className=' text-richblack-200'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>

                    <div>
                        <img src={foundingStory} />
                    </div>
                </div>

                <div className=' flex flex-row justify-between items-start w-[100%]'>
                    <div className=' flex flex-col justify-center items-start max-w-[40%]'>
                        <h1 className=' text-[1.8rem] font-bold bg-gradient-to-b from-[#f09708]  to-[#e44f1d] bg-clip-text text-transparent mb-6'>Our Vision</h1>
                        <p className=' text-richblack-200 mb-3'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>

                    <div className=' flex flex-col justify-center items-start max-w-[40%]'>
                        <h1 className=' text-[1.8rem] bg-blue-200 font-bold bg-clip-text text-transparent mb-6'>Our Mission</h1>
                        <p className=' text-richblack-200 mb-3'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>


        </div>

        {/* section4 */}
        <div className=' w-[100%] bg-richblack-700'>
            <div className=' w-[60%] mx-auto py-[2rem] flex flex-row justify-between items-center'>
                <div className=' flex flex-col items-center justify-center'>
                    <p className=' text-white font-bold text-[20px]'>5K</p>
                    <p className=' text-richblack-50 text-[12px]'>Active Student</p>
                </div>
                <div className=' flex flex-col items-center justify-center'>
                    <p className=' text-white font-bold text-[20px]'>10+</p>
                    <p className=' text-richblack-50 text-[12px]'>Mentors</p>
                </div>
                <div className=' flex flex-col items-center justify-center'>
                    <p className=' text-white font-bold text-[20px]'>200+</p>
                    <p className=' text-richblack-50 text-[12px]'>Courses</p>
                </div>
                <div className=' flex flex-col items-center justify-center'>
                    <p className=' text-white font-bold text-[20px]'>50+</p>
                    <p className=' text-richblack-50 text-[12px]'>Awards</p>
                </div>

            </div>
        </div>


        {/* section5 */}
        <div className=' mt-10'>
            <LearningGrid />
            <ContactForm />
        </div>

    
    </div>
  )
}

export default About