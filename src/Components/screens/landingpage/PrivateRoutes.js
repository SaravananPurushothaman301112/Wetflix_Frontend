import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import LandingPage from './LandingPage'
import { useSelector } from 'react-redux';

const useAuth = () => {
    const user = { loggedIn: localStorage.getItem("accessToken") };
    return user && user.loggedIn;
  };
  
const PrivateRoutes = () => {
 
  
      const authUser = JSON.parse(localStorage.getItem("auth"));
     
     
    
    const isAuth = useAuth();
    // let loginResponse = useSelector((state) => state.Login.loginSuccessfull);


        // let auth = {'accessToken': false}
    return(
        authUser?.accessToken  ? <LandingPage/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes