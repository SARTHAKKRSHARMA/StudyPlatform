import React from 'react'
import ContactUsForm from '../contact/ContactUsForm'

const ContactForm = () => {
  return (
    <div className='flex flex-col items-center '>
        <h1 className=' text-white font-bold text-[28px]'>Get in Touch</h1>
        <p className=' text-richblack-50 mb-[4rem]'>We’d love to here for you, Please fill out this form.</p>
        <ContactUsForm />
    </div>
  )
}

export default ContactForm