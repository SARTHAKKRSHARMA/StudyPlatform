import React from 'react'
import CTAButton from './CTAButton'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 w-[100%]`}>
        {/* Right Section */}
        <div className=' w-[50%] flex flex-col gap-8'>
            {heading}
            <div className=' text-richblack-300 font-bold'>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                    <div className=' flex gap-2 items-center'>
                        {ctabtn1.text}
                        <AiOutlineArrowRight />
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                        {ctabtn2.text}
                </CTAButton>
            </div>
        </div>

        {/* Left Section */}
        <div className='flex flex-row w-[50%]'>
            {/* <div className=' bg-radial-gradient w-[100px] h-[200px]'></div> */}
            
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            
            <div className={` flex flex-col gap-2 font-bold font-mono ${codeColor} w-[90%]`}>
                <TypeAnimation
                    style={{ whiteSpace: 'pre-line', height: '195px', display: 'block' }}
                    sequence={[
                        codeblock, 
                        10000,
                        '',
                    ]}
                    repeat={Infinity}
                />
            </div>

        </div>
    </div>
  )
}

export default CodeBlocks