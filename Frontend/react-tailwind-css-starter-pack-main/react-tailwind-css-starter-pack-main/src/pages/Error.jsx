import React from 'react'
import ErrorGif from "../assets/Images/error.gif"
const Error = () => {
  return (
    <div className=' mt-20 flex flex-row justify-center items-center'>
        <img src={ErrorGif} width="480" height="480" />
    </div>
  )
}

export default Error;