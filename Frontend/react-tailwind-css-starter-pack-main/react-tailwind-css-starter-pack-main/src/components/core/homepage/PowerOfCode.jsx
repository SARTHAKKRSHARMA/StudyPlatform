import React, { useEffect, useState } from 'react'
import HighLightText from './HighLightText'
import PowerOfCodeCard from './PowerOfCodeCard'
import { HomePageExplore } from '../../../data/homepage-explore'



const commonProperties = "text-richblack-100 cursor-pointer transition-all duration-200" 
const selectedProperties = "bg-black py-1 px-2 rounded-full cursor-pointer"

const PowerOfCode = () => {
    const [currSelected, setCurrSelected] = useState("Free");
    const [cardsData, setCardsData] = useState(null);
    const [cardSelected, setCardSelected] = useState(0);
    useEffect(() => {
        const data = HomePageExplore.filter((data) => data.tag === currSelected);
        if(data && data[0]) setCardsData(data[0]?.courses);
    }, [currSelected]);
    

    function changeSelected(event)
    {
        if(event.target.id != currSelected)
        {
            setCurrSelected(event.target.id);
        }
    }   

    function changeSelectedCard(index)
    {
        if(cardSelected != index)
        {
            setCardSelected(index);
        }
    }

  return (
    <div className='w-11/12 max-w-maxContent mx-auto'>
        <div className=' w-[90%] mx-auto flex flex-col items-center justify-between text-white'>
            <div>
                <p className=' text-4xl text-center'>Unlock the <HighLightText text={" Power of Code"} /></p>
                <p className=' opacity-50 text-center text-sm mt-2'>Learn to Build Anything You Can Imagine</p>
            </div>

            <div className=' flex flex-row items-center py-3 px-4 bg-richblack-700 rounded-full gap-5 mt-5 box-border'>
                <p className={currSelected=="Free" ? selectedProperties : commonProperties} onClick={changeSelected} id='Free'>Free</p>
                <p className={currSelected=="New to coding" ? selectedProperties : commonProperties} onClick={changeSelected} id='New to coding'>New to Coding</p>
                <p className={currSelected=="Most popular" ? selectedProperties : commonProperties} onClick={changeSelected} id='Most popular'>Most Popular</p>
                <p className={currSelected=="Skills paths" ? selectedProperties : commonProperties} onClick={changeSelected} id='Skills paths'>Skills paths</p>
                <p className={currSelected=="Career paths" ? selectedProperties : commonProperties} onClick={changeSelected} id='Career paths'>Career Paths</p>
            </div>

            <div className=' mt-20 flex flex-row justify-around w-[100%] items-center'>
                {
                    cardsData && cardsData.map((data, index) => {
                        return <PowerOfCodeCard key={index} index={index} changeSelectedCard={changeSelectedCard} active={index == cardSelected ? true : false} data={data} />
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default PowerOfCode