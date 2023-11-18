import React from 'react'
import Form from '../components/core/authentication/Form'


const Login = ({userType="Student"}) => {
  
  return (
    <div className=' w-11/12 max-w-maxContent mx-auto mt-36'>
        <Form type="login" accountType={userType} />
    </div>
  )
}

export default Login