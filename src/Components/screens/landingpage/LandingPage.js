import React, { useEffect, useState } from "react";
import HomePage from "../pages/homePage/HomePage.js";
import Sidebar from "../sideBar/SideBar";
import Styles from "./Index.module.css";
import Header from "../pages/header/Header.js";
import { Outlet } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";



//
  // import Notification from "../TestNotification/Notification.js";

const LandingPage = () => {
  return (
    <div className={Styles.LandingPageMainContainer}>  
      <Sidebar />
     
      <div className={Styles.LandingPageBodyContainerContainer}>
        <Header />
         {/* <Notification /> */}
        <div className="screens-section-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
