import React from 'react'

const HighLightText = ({text}) => {
  return (
    
    <span className=' font-bold bg-gradient-to-r from-caribbeangreen-200 to-pink-500 bg-clip-text text-transparent'> 
        {text}
    </span>
  )
}

export default HighLightText