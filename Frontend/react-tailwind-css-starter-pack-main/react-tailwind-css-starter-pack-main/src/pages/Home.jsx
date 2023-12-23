import React from 'react'
import {Link} from "react-router-dom"
import { AiOutlineArrowRight } from 'react-icons/ai';
import HighLightText from '../components/core/homepage/HighLightText';
import CTAButton from '../components/core/homepage/CTAButton';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/homepage/CodeBlocks';
import TimelineSection from '../components/core/homepage/TimelineSection';
import LearningLanguageSection from '../components/core/homepage/LearningLanguage';
import PowerOfCode from '../components/core/homepage/PowerOfCode';
import Instructor from "../assets/Images/Instructor.png"
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div>
        {/* section1 */}
        <div className=' relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
            <Link to="/signup" className='group'>
                <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richBlack-200 transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <AiOutlineArrowRight />
                    </div>
                </div>
            </Link>
            <div className='flex flex-row mx-auto w-[80%] justify-center gap-2 mt-7 text-4xl font-semibold'>
                Empower Your Future with 
                <HighLightText text={"Coding Skills"} />
            </div>
            <div className=' mt-4 w-[70%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkTo={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkTo={"/login"}>
                    Book a demo
                </CTAButton>      
            </div>

            <div className=' shadow-blue-200 mx-3 my-12 w-[80%] relative'>
                <video muted loop autoPlay className=' shadow-[15px_15px_0px_0px_rgba(255,255,255)]'>
                        <source src={Banner} type='video/mp4' />
                </video>    
            </div>

            {/* code_section_1 */}
            <div className='w-[100%]'>
                <CodeBlocks 
                    position={"lg:flex-row"} 
                    heading={
                                <div className=' text-4xl font-semibold'>
                                    Unlock your 
                                    <HighLightText text={" coding potential "} />  
                                    with our online courses.
                                </div>
                            } 
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}  
                    ctabtn1={{
                                active : true, 
                                linkTo : "/signup", 
                                text : "Try it Yourself"
                            }} 
                    ctabtn2={{
                                active : false, 
                                linkTo : "/login", 
                                text : "Learn More"
                            }}
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><linkrel= "stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>\n`}
                    codeColor={"text-yellow-25"}  
                />
            </div>

            <div className='w-[100%] mb-[24rem]'>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"} 
                    heading={
                                <div className=' text-4xl font-semibold'>
                                    Start 
                                    <HighLightText text={" coding in seconds "} />  
                                </div>
                            } 
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}  
                    ctabtn1={{
                                active : true, 
                                linkTo : "/login", 
                                text : "Continue Lesson"
                            }} 
                    ctabtn2={{
                                active : false, 
                                linkTo : "/signup", 
                                text : "Learn More"
                            }}
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><linkrel= "stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>\n`}
                    codeColor={"text-yellow-25"}  
                />
            </div>
        </div>
        {/* section2 */}
        <div className='relative bg-pure-greys-5 text-richblack-700 pb-24   '>
            <div className=' absolute -top-[22rem] w-[100%]'>
                <PowerOfCode />
            </div>
            <div className='homepage_bg h-[310px]'>
                <div className=' w-[11/12] max-w-maxContent mx-auto h-[400px] flex items-center justify-center gap-5 '>    
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkTo={"/signup"}>
                            <div className='flex flex-row gap-2 items-center'>
                                Explore Full Catalog 
                                <AiOutlineArrowRight />
                            </div>                        
                        </CTAButton>
                        <CTAButton active={false} linkTo={"/login"}>
                                Learn More 
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className=' w-[11/12] max-w-maxContent mx-auto flex flex-col justify-center items-center mt-32'>
                <div className='flex flex-row justify-between gap-2 w-[90%] font-semibold'>
                    <div className=' text-4xl w-[50%]'>
                        Get the skills you need for a <HighLightText text={" job that is in demand."} /> 
                    </div>
                    <div className='flex flex-col items-start gap-[50px] w-[50%]'>
                        <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <CTAButton active={true} linkTo={"/signup"}>Learn More</CTAButton>
                    </div>
                </div>
            </div>
            
            <TimelineSection />
            
            <LearningLanguageSection/>

        </div>
        {/* section3 */}
        <div className=' w-11/12 max-w-maxContent mx-auto flex flex-col items-center bg-richblack-900 mt-12'>
            <div className=' flex flex-row gap-10 items-center w-[100%]'>
                <div className=' w-[60%]'>
                    <img src={Instructor} className='shadow-[-15px_-15px_0px_0px_rgba(255,255,255)] object-contain' />
                </div>
                <div className=' flex flex-col items-start justify-center text-white w-[30%] gap-10'>
                    <div>
                        <div className=' text-4xl'>
                            <p>Become an </p>
                            <HighLightText text={"instructor"} />
                        </div>
                        <div className=' text-richblack-50 opacity-40 mt-4'>
                            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </div>
                    </div>
                    <div>
                        <CTAButton active={true} linkTo={"/signup"} >
                            <div className=' flex flex-row gap-2 items-center'>
                                <p>Start Teaching Today</p>
                                <AiOutlineArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

        </div>

        {/* section4 */}
        <div>
            <ReviewSlider />
        </div>
    </div>
  )
}


export default Home;
