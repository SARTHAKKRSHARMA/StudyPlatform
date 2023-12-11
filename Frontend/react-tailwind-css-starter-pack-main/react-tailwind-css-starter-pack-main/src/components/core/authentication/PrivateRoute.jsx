import React from 'react'
import  {Navigate} from 'react-router-dom'
import { useSelector } from "react-redux"

const PrivateRoute = ({children}) => {
  const {token} = useSelector((state) => state.auth);  
  
  if(token)
  {
    return <div>{children}</div>
  } else
  {
    return <Navigate to="/auth/login" />
  }
}

export default PrivateRoute