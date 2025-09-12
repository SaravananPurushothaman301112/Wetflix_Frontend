import React, { useEffect, useLayoutEffect, useState } from "react";
import Styles from "./Index.module.css";
import WetflixLogo from "../../assets/images/WetflixLogo.png";
import ProfileImage from "../../assets/images/ProfileImage.png";
import { ToggleButtonGroup, ToggleButton, } from '@mui/material'
import { decodeToken } from "react-jwt";

import WetFlixMobile from "../../assets/images/WetFlixMobile.png";
import { Link } from "react-router-dom";
import { ReactComponent as DashBoardIcon } from "../../assets/SvgIcons/DashBoardIcon.svg";
import { ReactComponent as DeviceManagement } from "../../assets/SvgIcons/DeviceManagement.svg";
import { ReactComponent as PaymentIcon } from "../../assets/SvgIcons/PaymentIcon.svg";
import { ReactComponent as BookingIcon } from "../../assets/SvgIcons/BookingIcon.svg";
import { ReactComponent as DeviceInstallationIcon } from "../../assets/SvgIcons/DeviceInstallationIcon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/SvgIcons/SettingsIcon.svg";
import { ReactComponent as ToggleSideBarIcon } from "../../assets/SvgIcons/ToggleSideBarIcon.svg";
import { ReactComponent as MapAndGeo } from "../../assets/SvgIcons/MapAndGeo.svg"
import { ReactComponent as CustomerBook } from "../../assets/SvgIcons/people.svg";
import LeftArrow from "../../assets/images/LeftArrow.png";
import RightArrow from "../../assets/images/RightArrow.png";
// import MapAndGeoIcon from "../../assets/images/MapAndGeoIcon.png"
import CustomerBooking from "../../assets/images/customerBooking.png"
import { useLocation } from 'react-router-dom';

import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const CustomToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: '#4d8bff',
    textTransform: "capitalize",
  },
});
const SidebarToggleButton = ({ open, selected, ...props }) => (
  <CustomToggleButton
    {...props}
    selected={selected}
    className={Styles.SidebarToggleButtons}
  >
    <DashBoardIcon className={Styles.SidebarToggleIcon} />
  </CustomToggleButton>
);
const Sidebar = () => {
  let loginResponse = useSelector((state) => state.Login.loginSuccessfull);
  const [alignment, setAlignment] = useState('dashboard');
  const [open, setOpen] = useState(false)
  // const [subscribed,setSubscribed]=useState(subValue)

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {  // Ensure it's a valid alignment value
      setAlignment(newAlignment);
    }
  };



  // console.log(login)

  const handleOpenClose = () => {
    if (open === false) {
      setOpen(true)
    } if (open === true) {
      setOpen(false)
    }
  }





  const authUser = JSON.parse(localStorage.getItem("auth"));
  const activeRoute = useLocation();

  console.log('active route', activeRoute.pathname)
  const myDecodedToken = authUser ? decodeToken(authUser.accessToken) : null;
  // console.log('myDecodedToken',myDecodedToken);

  var routePathName = activeRoute.pathname

  const subValue = localStorage.getItem("isSubscribed") === "true"; // Converts to boolean
  const [subscribed, setSubscribed] = useState(subValue)
  console.log(subValue, "subscribedValue")
  useEffect(() => {

    if (myDecodedToken?.role === 'superadmin') {
      setAlignment(routePathName);
    } else {
      setAlignment(routePathName);
    }
  }, [routePathName, myDecodedToken]);  // Ensure proper dependencies


  return (
    <>
      {myDecodedToken.role === "superadmin" ?
        (
          <div className={Styles.SidebarContanerWithDrawer}>
            <button className={Styles.SidebarDrawerLeftArrowButton} onClick={() => handleOpenClose()}>{open === false ? <img src={LeftArrow} alt="" /> : <img src={RightArrow} alt="" />}</button>
            <div className={Styles.SidebarMainContainer}>
              <div className={Styles.SidebarMainLogoContainer}>
                {open === false ? <img src={WetflixLogo} alt="" className={Styles.SidebarMainLogo} /> : <img src={WetflixLogo} alt="" className={Styles.SidebarMainLogoMobile} />}
              </div>

              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                orientation="vertical"
                onChange={handleChange}
                aria-label="Platform"
                className={Styles.SidebarToggleButtonsContainer}
              >
                <CustomToggleButton value="/admin_dashboard" selected={alignment === '/admin_dashboard'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to="/admin_dashboard"><DashBoardIcon className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Dashboard</p> : ""}</CustomToggleButton >
                <CustomToggleButton value="/users_and_devices" selected={alignment === '/users_and_devices'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to="/users_and_devices"><DeviceManagement className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>User & Device management</p> : ""}</CustomToggleButton >
                <CustomToggleButton value="/profile" selected={alignment === '/profile'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to='/profile'><BookingIcon className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}> Profile & Admin management</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/payment_history" selected={alignment === '/payment_history'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to="/payment_history"><PaymentIcon className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Accounting & Payments</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/advertisement_payment" selected={alignment === '/advertisement_payment'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to='/advertisement_payment'><DeviceInstallationIcon className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Advertisement Management</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/map_and_geolocation" selected={alignment === '/map_and_geolocation'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to='/map_and_geolocation'><MapAndGeo className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Map & Geolocation</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/customer_booking" selected={alignment === '/customer_booking'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to="/customer_booking"><CustomerBook className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Customer Bookings</p> : ""}</CustomToggleButton >

              </ToggleButtonGroup>


              <ToggleButtonGroup>
                <div color="primary"
                  value={alignment}
                  exclusive
                  orientation="vertical"
                  onChange={handleChange}
                  aria-label="Platform" className={Styles.SidebarOpenCloseButtonContainer}>
                  {/* <button className={Styles.SidebarOpenCloseButton} onClick={handleOpenClose}>
                <span className={open === false ? Styles.iconOnly : "" && Styles.SidebarOpenCloseButton}>
                  <ToggleSideBarIcon className={Styles.icon} />
                </span>
                {open === true && <span className={Styles.buttonText}>Toggle sidebar</span>} 
                </button> */}
                </div></ToggleButtonGroup>


            </div>
          </div>
        ) : (
          <div className={Styles.SidebarContanerWithDrawer}>
            <button className={Styles.SidebarDrawerLeftArrowButton} onClick={() => handleOpenClose()}>{open === false ? <img src={LeftArrow} alt="" /> : <img src={RightArrow} alt="" />}</button>
            <div className={Styles.SidebarMainContainer}>
              <div className={Styles.SidebarMainLogoContainer}>
                {open === false ? <img src={WetflixLogo} alt="" className={Styles.SidebarMainLogo} /> : <img src={WetflixLogo} alt="" className={Styles.SidebarMainLogoMobile} />}
              </div>
              {/* <div className={Styles.SidebarProfileContainer}>
          <img src={ProfileImage} alt="" className={Styles.SidebarProfileImage}/>
         {open === false ? <div className={Styles.SidebarProfileContent}>
                  <p className={Styles.SidebarProfileContentUser}>Daniel Tulloch</p>
                  <p className={Styles.SidebarProfileContentUserProfile}>View profile
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                  <path d="M7 13.5L10 10.5L7 7.5" stroke="#86909D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  </p>
          </div>:""}
      </div> */}
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                orientation="vertical"
                onChange={handleChange}
                aria-label="Platform"
                className={Styles.SidebarToggleButtonsContainer}


              >
                <CustomToggleButton value="/user_dashboard" selected={alignment === '/user_dashboard'} className={Styles.SidebarToggleButtons} component={Link} to="/user_dashboard"><DashBoardIcon />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Dashboard</p> : ""}</CustomToggleButton >
                <CustomToggleButton value="/device_management" selected={alignment === '/device_management'} className={Styles.SidebarToggleButtons} component={Link} to="/device_management"><DeviceManagement />{open === false ? <p className={Styles.SidebarToggleButtonsText}> Device Management</p> : ""}</CustomToggleButton>

                {/* <CustomToggleButton  value="device_management" selected={alignment === '/device_management'} className={Styles.SidebarToggleButtons}  component={Link} to="/device_management"><DeviceManagement/>{open === false ?<p className={Styles.SidebarToggleButtonsText}>Device Management</p>:""}</CustomToggleButton > */}
                <CustomToggleButton
                  value={subscribed ? "/payment" : "/change_plan"}
                  selected={alignment === (subscribed ? "/payment" : "/change_plan")}
                  className={Styles.SidebarToggleButtons}
                  component={Link}
                  to={subscribed ? "/payment" : "/change_plan"}
                >
                  <PaymentIcon />
                  {open === false ? <p className={Styles.SidebarToggleButtonsText}> Payment & Subscription</p> : ""}
                </CustomToggleButton>


                <CustomToggleButton value="/bookings" selected={alignment === '/bookings'} className={Styles.SidebarToggleButtons} component={Link} to="/bookings"><BookingIcon />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Book a Technician</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/quick_setup_guide" selected={alignment === '/quick_setup_guide'} className={Styles.SidebarToggleButtons} component={Link} to="/quick_setup_guide"><DeviceInstallationIcon />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Device Installation guidance</p> : ""}</CustomToggleButton>
                {/* <CustomToggleButton value="Settings" className={Styles.SidebarToggleButtons} ><SettingsIcon/>{open === false ?<p className={Styles.SidebarToggleButtonsText}>Settings</p>:""}</CustomToggleButton> */}
              </ToggleButtonGroup>
              <ToggleButtonGroup>
                <div color="primary"
                  value={alignment}
                  exclusive
                  orientation="vertical"
                  onChange={handleChange}
                  aria-label="Platform" className={Styles.SidebarOpenCloseButtonContainer}>
                  {/* <button className={Styles.SidebarOpenCloseButton} onClick={handleOpenClose}>
                <span className={open === false ? Styles.iconOnly : "" && Styles.SidebarOpenCloseButton}>
                  <ToggleSideBarIcon className={Styles.icon} />
                </span>
                {open === true && <span className={Styles.buttonText}>Toggle sidebar</span>} 
                </button> */}
                </div></ToggleButtonGroup>

            </div>
          </div>
        )
      }
    </>
  )
};

export default Sidebar;
