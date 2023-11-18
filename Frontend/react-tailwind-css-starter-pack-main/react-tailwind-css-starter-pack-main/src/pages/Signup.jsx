import React from 'react'
import Form from '../components/core/authentication/Form'

const Signup = ({userType="Student"}) => {
  return (
    <div className=' w-11/12 max-w-maxContent mx-auto mt-36'>
        <Form type="signup" accountType={userType} />
    </div>
  )
}

export default Signup