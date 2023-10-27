import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkTo}) => {
  return (
    <Link to={linkTo}>
        <button className={` text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? " bg-yellow-50 text-black" : "bg-richblack-800"} transition-all duration-200 hover:scale-95`}>{children}</button>
    </Link>
  )
}

export default CTAButton