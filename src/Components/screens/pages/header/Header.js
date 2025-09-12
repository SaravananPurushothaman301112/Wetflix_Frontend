import React, { useEffect, useState, useRef } from "react";
import Styles from "./Index.module.css";
import { ReactComponent as MyTankFillIcon } from "../../../assets/SvgIcons/MyTankFillIcon.svg";
import { ReactComponent as MyTankEmptyIcon } from "../../../assets/SvgIcons/MyTankEmptyIcon.svg";
import { ReactComponent as MyTankOverFlowIcon } from "../../../assets/SvgIcons/MyTankOverFlowIcon.svg";
import { ReactComponent as LeftArrowIcon } from "../../../assets/SvgIcons/LeftArrowIcon.svg";
import { Link } from "react-router-dom";
// import Styles from "../../sideBar/Index.module.css"
import WetflixLogo from "../../../assets/images/WetflixLogo.png";
import dayjs from "dayjs";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import { Link } from "react-router-dom";
import { ReactComponent as DashBoardIcon } from "../../../assets/SvgIcons/DashBoardIcon.svg";
import { ReactComponent as DeviceManagement } from "../../../assets/SvgIcons/DeviceManagement.svg";
import { ReactComponent as PaymentIcon } from "../../../assets/SvgIcons/PaymentIcon.svg";
import { ReactComponent as BookingIcon } from "../../../assets/SvgIcons/BookingIcon.svg";
import { ReactComponent as DeviceInstallationIcon } from "../../../assets/SvgIcons/DeviceInstallationIcon.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/SvgIcons/SettingsIcon.svg";
import { ReactComponent as ToggleSideBarIcon } from "../../../assets/SvgIcons/ToggleSideBarIcon.svg";
import {ReactComponent as MapAndGeo} from "../../../assets/SvgIcons/MapAndGeo.svg"
import {ReactComponent as CustomerBook} from "../../../assets/SvgIcons/people.svg";
import LeftArrow from "../../../assets/images/LeftArrow.png";
import { styled } from "@mui/material/styles";
import { ToggleButtonGroup, ToggleButton, } from '@mui/material'
import { decodeToken } from "react-jwt";
// import WetflixLogo from "../../../assets/images/WetflixLogo.png";
import RightArrow from "../../../assets/images/RightArrow.png";
import MapAndGeoIcon from "../../../assets/images/MapAndGeoIcon.png"
import CustomerBooking from "../../../assets/images/customerBooking.png"
import MenuIcon from "../../../assets/images/MenuIcon.png";
// import WetflixLogo from "../../../assets/images/WetflixLogo.png";
import ProfileImage from "../../../assets/images/ProfileImage.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
// import NotificationsIcon from '@mui/icons-material/Notifications'; 
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification, getDeviceApproved, getDeviceListBySerialNumber, getDeviceRejected, getAllNotificationRead } from "../../../Redux/Actions";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Notification from "../TestNotification/Notification";
import TextField from "@mui/material/TextField";
import { ReactComponent as AccountHumanIcon } from "../../../assets/SvgIcons/AccountHumanIcon.svg";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as LocationLocateIcon } from "../../../assets/SvgIcons/LocationLocateIcon.svg";
import { getUsetDetails, } from "../../../Redux/Actions";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '1px solid #c8c5c5',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const CustomToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: '#4d8bff',
    textTransform: "capitalize",
  },
});
const SidebarToggleButton = ({ openn, selected, ...props }) => (
  <CustomToggleButton
    {...props}
    selected={selected}
    className={Styles.SidebarToggleButtons}
  >
    <DashBoardIcon className={Styles.SidebarToggleIcon} />
  </CustomToggleButton>
);

const Header = () => {
  const now = new Date();
  let dispatch = useDispatch();

  const formattedDate = now.toLocaleString("en-US", {
    month: "short",
    weekday: "long",
    day: "numeric",
    timeZone: "America/Port_of_Spain"
  });
  const [isActive, setIsActive] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const handleHamburger = () => {
    setShowBar(!showBar);
  };

  const notificationList = useSelector((notification) => notification?.Notification?.getNotificationSuccessfull)
  console.log("notificationList", notificationList.data)
  const notificationID = notificationList?.data
  const notificationIDS = notificationID?.map((notify) => (notify._id))
  console.log(notificationList, "dgbhdf")
  const notificationRead = notificationList?.data?.length > 0 ? notificationList?.data?.[0]?.isread : true;
  console.log(notificationRead, "nrr")
  // console.log(notificationID,"yyyy")


  const getAllUserDeviceListById = useSelector(
    (device) => device.DeviceList.getDeviceApproved
  );
  console.log("user device details ", getAllUserDeviceListById)

  const [userid, setUserID] = useState(94)
  const [notificationLength, setNotificationLength] = useState()
  const [notificationListData, setNotificationListData] = useState()
  console.log("NOTII", notificationListData)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const alertBoxRef = useRef(null); // Reference for the alert box
  const [lastNotificationTime, setLastNotificationTime] = useState("");
  const [showNotificationDot, setShowNotificationDot] = useState(false);

  const [read, setRead] = useState(notificationRead)

  console.log(read, "fsfewrs")




  const getMostRecentDate = (array) => {
    return array?.reduce((latest, current) => {
      const currentDate = new Date(current.createddate);
      return currentDate > latest ? currentDate : latest;
    }, new Date(0)); // Initialize with the earliest possible date
  };

  const recentDate = getMostRecentDate(notificationList?.data)
  const latestNoteTime = localStorage.getItem('latestNotification');

  useEffect(() => {
    console.log('update list', notificationList)
  }, [notificationList])
  useEffect(() => {
    // const storedNotificationCount = localStorage.getItem("NotificationCount") || 0;
    dispatch(getAllNotification(authUserDataHeader.userId));
    if (notificationList?.statusCode == 200) {
      getMostRecentDate(notificationList?.data)
      if (recentDate == latestNoteTime) {
        setShowNotificationDot(false);
        localStorage.setItem('latestNotification', recentDate);
      }
      else {
        setShowNotificationDot(true);
      }
      // const newCount = notificationList.data.length;
      // setNotificationListData(notificationList.data);
      // setNotificationLength(newCount);

      // if (newCount > storedNotificationCount) {
      //   setShowNotificationDot(true); // Show red dot for new notifications
      //   localStorage.setItem("NotificationCount", newCount); // Update stored count
      // } else {
      //   setShowNotificationDot(false); // No new notifications
      // } 
    }
  }, [latestNoteTime]);

const hideSidebar = () => {
  if (isSidebarOpen) {
    setIsSidebarOpen(false);
  }
};

  const toggleSidebar = () => {
    console.log('test value', isSidebarOpen)
    setIsSidebarOpen(!isSidebarOpen);
  };
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertBoxRef.current && !alertBoxRef.current.contains(event.target) || sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsActive(false); // Close the alert box
        hideSidebar();
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // setIsActive(false); // Close the alert box
        hideSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  let loginResponse = useSelector((state) => state.UserProfile.getUserInformation);

  // let loginResponseData = useSelector((state) => state.Login.loginSuccessfull);

  // const [userIdData , setUserIdData] = useState(loginResponseData?.data?.userId)

  const authUserDataHeader = JSON.parse(localStorage.getItem("auth"));
  console.log("authUserDataHeader", authUserDataHeader.userId)

  // Sort by date and limit to top 3
  const topThreeNotifications = notificationList?.data
    ?.sort((a, b) => new Date(b.createddate) - new Date(a.createddate))
    .slice(0, 3);

  const [getAllUserDeviceList, setGetAllUserDeviceList] = useState()


  const OldNotificationCount = localStorage.getItem('NotificationCount', notificationListData?.length)

  useEffect(() => {
    dispatch(getUsetDetails(authUserDataHeader.userId))

  }, [])

  const TestVariable = notificationListData?.length

  useEffect(() => {
    // handleOpeNotification()

    if (notificationList?.statusCode === 200) {
      setNotificationListData(notificationList.data)
      setNotificationLength(notificationList.data?.length)
      setGetAllUserDeviceList(notificationList.data.slice(-1))

    }
    if (OldNotificationCount == "") {
      // alert('come')
    } if (OldNotificationCount == notificationLength) {
      // alert('data')  
    } if (OldNotificationCount < notificationLength) {
      localStorage.setItem('NotificationCount', notificationLength)
      handleOpeNotification()
    }

  }, [notificationList])


  // const [userListMap, setUserListMap] = useState("this week");

  //   useEffect(() => {
  //     dispatch(getUsersOnboard(userListMap));
  //     //   setUserID(loginResponse?.data)
  //   }, [userListMap]);

  const handleNotification = () => {
    setIsActive(!isActive);
    setRead(true);
  
    // Mark notification as read in Redux and update UI
    if (notificationIDS?.length > 0) {
      const notificationId = notificationIDS[0];
      dispatch(getAllNotificationRead({ notificationId, isRead: true }));
  
      setShowNotificationDot(false); // Hide red dot after marking as read
    }
  };
  



  const [userDeviceSerialNum, setUserDeviceSerialNum] = useState("000127")


  useEffect(() => {
    dispatch(getDeviceListBySerialNumber(userDeviceSerialNum))
  }, [userDeviceSerialNum])


  const [useDeviceApproved, setUseDeviceApproved] = useState(
    {
      userid: "96",
      deviceid: "30",
      geolocation: "13.0827° N, 80.2707° E",

    }
  )

  const [notificationopen, setNotificationopen] = useState(false);
  const handleOpeNotification = () => {
    setNotificationopen(true);
  }
  const handleCloseNotification = () => setNotificationopen(false);

  const DeviceApprovedData = () => {
    dispatch(getDeviceApproved(useDeviceApproved));
    setNotificationopen(false);

  }


  const DeviceRejectyedData = () => {
    dispatch(getDeviceRejected(useDeviceApproved));
    setNotificationopen(false);
  }


  const [imageError, setImageError] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };

  const LogoutHandleClose = () => {
    localStorage.clear();
    setAnchorEl(null);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.clear(); // Clear session storage
    // Reset any other relevant state if necessary
    // navigate("/"); // Redirect to home page or login page
  };

  useEffect(() => {
    dispatch(getAllNotification(authUserDataHeader.userId));
  }, [authUserDataHeader.userId]);

  const [newNotification, setNewNotification] = useState()
  // const handleNewNotify = () =>{
  //   if(topThreeNotifications)
  // }
  const [geoLocatrionData, setGeoLocatrionData] = useState("");
  const GetGeoLocationBasedonUSer = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setGeoLocatrionData("Geolocation is not supported by this browser.")
    }

    function showPosition(position) {
      setGeoLocatrionData(position.coords.latitude + "," + position.coords.longitude)
    }
  }

  useEffect(() => {
    if (notificationList?.data?.length > 0) {
      const latestNotification = notificationList.data[0]; // Get the latest notification
      if (latestNotification.isread === false || latestNotification.isread === null) {
        setShowNotificationDot(true); // Show red dot for unread notification
      } else {
        setShowNotificationDot(false); // Hide red dot if read
      }
    }
  }, [notificationList]); // Runs whenever notificationList updates
  
  useEffect(() => {
    const fetchNotifications = () => {
      dispatch(getAllNotification(authUserDataHeader.userId));
    };
  
    fetchNotifications(); // Fetch once immediately
    // const interval = setInterval(fetchNotifications, 5000); // Check every 5 seconds
  
    // return () => clearInterval(interval); // Cleanup on unmount
  }, [authUserDataHeader.userId]);

  let loginResponsee = useSelector((state) => state.Login.loginSuccessfull);
  // console.log("jkhgfxcfdhvfbgergihgvhgvh",loginResponsee)
  const [alignment, setAlignment] = useState('dashboard');

  const [openn, setOpenn] = useState(false)

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log("hello")
  }

  // console.log(login)

  const handleOpenClose = () => {
    if (openn === false) {
      setOpenn(true)
    } if (openn === true) {
      setOpenn(false)
    }
  }





  const authUser = JSON.parse(localStorage.getItem("auth"));

  const myDecodedToken = decodeToken(authUser?.accessToken);
  console.log('myDecodedToken', myDecodedToken);

 const subValue = localStorage.getItem("isSubscribed") === "true"; // Converts to boolean
  const [subscribed, setSubscribed] = useState(subValue)
  console.log(subValue, "subscribedValue")

  return (
    <>
      <div className={Styles.HeaderMainContainer}>
        <p className={Styles.HeaderWelComeText}>
          Welcome {loginResponse?.data?.firstname}
        </p>
        <div className={Styles.HeaderWelComeProfileContainer}>
          {/* */}


          {myDecodedToken.role === "superadmin" ? ("") : (
            <p
              className={Styles.HeaderWelComeProfileNotification}
              onClick={() => {
                setIsActive(!isActive);
                // setShowNotificationDot(false); // Clear red dot on viewing
                handleNotification()

              }}
            ><Badge variant={showNotificationDot ? "dot" : ""} color="error">
                <NotificationsNoneOutlinedIcon color="action" />
              </Badge>




            </p>
          )}
          <div>
          <Button
  id="basic-button"
  aria-controls={open ? "basic-menu" : undefined}
  aria-haspopup="true"
  aria-expanded={open ? "true" : undefined}
  onClick={handleClick}
>
  <div className={Styles.HeaderProfileImage}>
    {loginResponse?.data?.imagedata && !imageError ? (
      <img
        src={loginResponse.data.imagedata}
        alt="Profile"
        onError={() => setImageError(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
      />
    ) : (
      <AccountCircleIcon style={{ fontSize: "37px" }} />
    )}
  </div>
</Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose} className={Styles.ProfileLink}>
                <Link to="/profile">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                component={Link}
                reloadDocument
                to="/"
                className={Styles.ProfileLink}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
          <p className={Styles.HeaderWelComeProfileTimeAndDay}>
            {formattedDate}
          </p>
        </div>
        <div
          ref={alertBoxRef}
          className={Styles.DropDownHeaderMainContainerContent}
          style={{ display: isActive ? "block" : "none" }}
        >



          <div
            className={Styles.DropDownHeaderMainContainer}
            onClick={() => setIsActive(!isActive)}
          >
            <p className={Styles.DropDownHeaderMainContainerHeader}>
              Alerts & Notifications
            </p>

            {topThreeNotifications?.length > 0 ? (
              topThreeNotifications?.map((notification, index) => (
                <div className={Styles.HeaderPageNotificationCart} key={index}>
                  <div className={Styles.HeaderPageNotificationDetails}>
                    <div className={Styles.HeaderPageNotificationDetailsHeaderContent}>
                      <p
                        className={Styles.HeaderPageNotificationDetailsHeaderContentMyTank}
                      >
                        {notification.deviceInfo.devicename || "My tank"}
                      </p>
                      <p
                        className={
                          Styles.HeaderPageNotificationDetailsHeaderContentMyTankLevel
                        }
                      >
                        {notification.message}
                      </p>
                    </div>
                    <p className={Styles.HeaderPageNotificationDetailsDescription}>
                      {notification.message}
                    </p>
                  </div>
                  <p className={Styles.HeaderPageNotificationCartTime}>
                    {dayjs(notification.createddate).format("hh:mm A, DD-MM-YYYY")}
                  </p>
                </div>
              ))) : (<h6>No Notifications</h6>)}

            <Link to="/notification_component" className={Styles.HeaderViewLink}>
              <button className={Styles.HeaderPageNotificationCartButton}>
                <p className={Styles.HeaderPageNotificationCartButtonText}>
                  View all <LeftArrowIcon />
                </p>
              </button>
            </Link>
          </div>




        </div>
      </div>
      <div className={Styles.MobileResponsiveHeaderContent}>
        <div className={Styles.MobileResponsiveHeaderContainer}>
          <div className="hamburger" onClick={toggleSidebar} >
            <img src={MenuIcon} alt="Menu" />
          </div>
          <img
            src={WetflixLogo}
            alt=""
            className={Styles.MobileResponsiveHeaderContainerImage}
          />
          {myDecodedToken.role === "superadmin" ? (
            <>
             <p
              // className={Styles.HeaderWelComeProfileNotification}
              // onClick={(e) => {
              //   setIsActive(!isActive);
              // }}
            ></p>
            </>
          ) : (
            <p
              className={Styles.HeaderWelComeProfileNotificationMobile}
              onClick={(e) => {
                setIsActive(!isActive);
              }}
            >
              <Badge variant="dot" color="error">
                <NotificationsNoneOutlinedIcon color="action" />
              </Badge>
            </p>
          )}
        </div>
        {/* <div className={Styles.MobileResponsiveHeaderContainerUserNameContent}>
          <p className={Styles.MobileResponsiveHeaderContainerUserName}>
            Welcome {loginResponse?.data?.firstname}
          </p>
        </div> */}
      </div>
      {isSidebarOpen && (
        <div >
          <>
            {myDecodedToken.role === "superadmin" ? (
              <div ref={sidebarRef} className={Styles.SidebarContanerWithDrawer}>
                <button
                  className={Styles.SidebarDrawerLeftArrowButton}
                  onClick={() => handleOpenClose()}
                >
                  {openn === false ? (
                    <img src={LeftArrow} alt="" />
                  ) : (
                    <img src={RightArrow} alt="" />
                  )}
                </button>
                <div id="hamburger" className={Styles.SidebarMainContainer}>
                 
                  <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    orientation="vertical"
                    onChange={handleChange}
                    aria-label="Platform"
                    className={Styles.SidebarToggleButtonsContainer}
                  >
                    <CustomToggleButton value="/admin_dashboard" selected={alignment === '/admin_dashboard'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to="/admin_dashboard"   onClick={hideSidebar}><DashBoardIcon className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Dashboard</p> : ""}</CustomToggleButton >
                <CustomToggleButton value="/users_and_devices" selected={alignment === '/users_and_devices'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to="/users_and_devices"   onClick={hideSidebar}><DeviceManagement className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>User & Device management</p> : ""}</CustomToggleButton >
                <CustomToggleButton value="/profile" selected={alignment === '/profile'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to='/profile'   onClick={hideSidebar}><BookingIcon className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}> Profile & Admin management</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/payment_history" selected={alignment === '/payment_history'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to="/payment_history"   onClick={hideSidebar}><PaymentIcon className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Accounting & Payments</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/advertisement_payment" selected={alignment === '/advertisement_payment'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to='/advertisement_payment'   onClick={hideSidebar}><DeviceInstallationIcon className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Advertisement Management</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/map_and_geolocation" selected={alignment === '/map_and_geolocation'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to='/map_and_geolocation'   onClick={hideSidebar}><MapAndGeo className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Map & Geolocation</p> : ""}</CustomToggleButton>
                <CustomToggleButton value="/customer_booking" selected={alignment === '/customer_booking'} open={true} icon={DashBoardIcon} className={Styles.SidebarToggleButtons} component={Link} to="/customer_booking"   onClick={hideSidebar}><CustomerBook className={Styles.SidebarToggleIcon} />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Customer Bookings</p> : ""}</CustomToggleButton >

                    {/* {/ {/ <CustomToggleButton value="Settings" className={Styles.SidebarToggleButtons} ><SettingsIcon/>{openn === false ?<p className={Styles.SidebarToggleButtonsText}>Settings</p>:""}</CustomToggleButton> /} /} */}
                  </ToggleButtonGroup>

                  <ToggleButtonGroup>
                    <div
                      color="primary"
                      value={alignment}
                      exclusive
                      orientation="vertical"
                      onChange={handleChange}
                      aria-label="Platform"
                      className={Styles.SidebarOpenCloseButtonContainer}
                    >
                      {/* <button className={Styles.SidebarOpenCloseButton} onClick={handleOpenClose}>
                <span className={open === false ? Styles.iconOnly : "" && Styles.SidebarOpenCloseButton}>
                  <ToggleSideBarIcon className={Styles.icon} />
                </span>
                {open === true && <span className={Styles.buttonText}>Toggle sidebar</span>} 
                </button> */}
                    </div>
                  </ToggleButtonGroup>
                </div>
              </div>
            ) : (
              <div ref={sidebarRef} className={Styles.SidebarContanerWithDrawer}>
                <button
                  className={Styles.SidebarDrawerLeftArrowButton}
                  onClick={() => handleOpenClose()}
                >
                  {openn === false ? (
                    <img src={LeftArrow} alt="" />
                  ) : (
                    <img src={RightArrow} alt="" />
                  )}
                </button>
                <div className={Styles.SidebarMainContainer}>
                  <div className={Styles.SidebarMainLogoContainer}>
                    {openn === false ? (
                      <img
                        // src={""}
                        alt=""
                        className={Styles.SidebarMainLogo}
                      />
                    ) : (
                      <img
                        // src={WetflixLogo}
                        alt=""
                        className={Styles.SidebarMainLogoMobile}
                      />
                    )}
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
                    <CustomToggleButton value="/user_dashboard" selected={alignment === '/user_dashboard'} className={Styles.SidebarToggleButtons} component={Link} to="/user_dashboard" onClick={hideSidebar}><DashBoardIcon />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Dashboard</p> : ""}</CustomToggleButton >
                <CustomToggleButton value="/device_management" selected={alignment === '/device_management'} className={Styles.SidebarToggleButtons} component={Link} to="/device_management" onClick={hideSidebar}><DeviceManagement />{open === false ? <p className={Styles.SidebarToggleButtonsText}> Device Management</p> : ""}</CustomToggleButton>

                {/* <CustomToggleButton  value="device_management" selected={alignment === '/device_management'} className={Styles.SidebarToggleButtons}  component={Link} to="/device_management"><DeviceManagement/>{open === false ?<p className={Styles.SidebarToggleButtonsText}>Device Management</p>:""}</CustomToggleButton > */}
                <CustomToggleButton
                  value={subscribed ? "/payment" : "/change_plan"}
                  selected={alignment === (subscribed ? "/payment" : "/change_plan")}
                  className={Styles.SidebarToggleButtons}
                  component={Link}
                  onClick={hideSidebar}
                  to={subscribed ? "/payment" : "/change_plan"}
                >
                  <PaymentIcon />
                  {open === false ? <p className={Styles.SidebarToggleButtonsText}> Payment & Subscription</p> : ""}
                </CustomToggleButton>


                <CustomToggleButton  onClick={hideSidebar} value="/bookings" selected={alignment === '/bookings'} className={Styles.SidebarToggleButtons} component={Link} to="/bookings"><BookingIcon />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Book a Technician</p> : ""}</CustomToggleButton>
                <CustomToggleButton  onClick={hideSidebar} value="/quick_setup_guide" selected={alignment === '/quick_setup_guide'} className={Styles.SidebarToggleButtons} component={Link} to="/quick_setup_guide"><DeviceInstallationIcon />{open === false ? <p className={Styles.SidebarToggleButtonsText}>Device Installation guidance</p> : ""}</CustomToggleButton>
                    {/* <CustomToggleButton value="Settings" className={Styles.]s} ><SettingsIcon/>{openn === false ?<p className={Styles.SidebarToggleButtonsText}>Settings</p>:""}</CustomToggleButton> */}
                  </ToggleButtonGroup>
                  <div
                    color="primary"
                    value={alignment}
                    exclusive
                    orientation="vertical"
                    onChange={handleChange}
                    aria-label="Platform"
                    className={Styles.SidebarOpenCloseButtonContainer}
                    onClick={hideSidebar}

                  >
                    {/* <button className={Styles.SidebarOpenCloseButton} onClick={handleOpenClose}> */}
                    {/* <span className={open === true ? Styles.iconOnly : ""}>
                  <ToggleSideBarIcon className={Styles.icon} />
                </span>
                {open === false && <span className={Styles.buttonText}>Toggle sidebar</span>} */}

                    {/* </button>  */}
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      )}

      {/* <Modal
        open={notificationopen}
        onClose={handleCloseNotification}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={Styles.ModdelPageForDeviceApproved}>
          <p>Your new Device Waiting for your Conformation,</p>
          <div className={Styles.ModelPageForGettingDeviceDetailsContainer}>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Device name
              </p>
              <TextField
                id="outlined-start-adornment"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                  margin: "0.5rem 0rem",
                }}
                name="email"
                placeholder={"Enter device name"}
                // onChange={(e) => setLogin({ ...login, email: e.target.value })}
                InputProps={
                  {
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <MailIcon />
                    //   </InputAdornment>
                    // ),
                  }
                }
              />
            </div>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Last refill
              </p>
              <TextField
                id="outlined-start-adornment"
                type="date"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                  margin: "0.5rem 0rem",
                }}
                name="email"
                // onChange={(e) => setLogin({ ...login, email: e.target.value })}
                InputProps={
                  {
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <MailIcon />
                    //   </InputAdornment>
                    // ),
                  }
                }
              />
            </div>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Last Tank Cleaning
              </p>
              <TextField
                id="outlined-start-adornment"
                type="date"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                  margin: "0.5rem 0rem",
                }}
                name="email"
                // onChange={(e) => setLogin({ ...login, email: e.target.value })}
                InputProps={
                  {
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <MailIcon />
                    //   </InputAdornment>
                    // ),
                  }
                }
              />
            </div>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Number of Tanks{" "}
                <span
                  className={
                    Styles.HeaderModelPageInputFieldContentTextImportent
                  }
                >
                  *
                </span>
              </p>
              <TextField
                id="outlined-start-adornment"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                  margin: "0.5rem 0rem",
                }}
                name="email"
                placeholder={"This is an input field"}
                // onChange={(e) => setLogin({ ...login, email: e.target.value })}
                InputProps={
                  {
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <MailIcon />
                    //   </InputAdornment>
                    // ),
                  }
                }
              />
            </div>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Installer name
              </p>
              <TextField
                id="outlined-start-adornment"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                  margin: "0.5rem 0rem",
                }}
                name="email"
                placeholder={"Enter a name"}
                // onChange={(e) => setLogin({ ...login, email: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountHumanIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Device location{" "}
                <span
                  className={
                    Styles.HeaderModelPageInputFieldContentTextImportent
                  }
                >
                  *
                </span>
              </p>
              <TextField
                id="outlined-start-adornment"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                  margin: "0.5rem 0rem",
                }}
                value={geoLocatrionData}
                name="email"
                placeholder={"13.0827°N, 80.219°E"}
                // onChange={(e) => setLogin({ ...login, email: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationLocateIcon
                        onClick={() => GetGeoLocationBasedonUSer()}
                        className={Styles.gettingGeoLocatoin}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Device address{" "}
                <span
                  className={
                    Styles.HeaderModelPageInputFieldContentTextImportent
                  }
                >
                  *
                </span>
              </p>
              <TextField
                id="outlined-start-adornment"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                  margin: "0.5rem 0rem",
                }}
                name="email"
                placeholder={"Enter Device Address"}
                // onChange={(e) => setLogin({ ...login, email: e.target.value })}
                InputProps={
                  {
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <MailIcon />
                    //   </InputAdornment>
                    // ),
                  }
                }
              />
            </div>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Tank capacity{" "}
                <span
                  className={
                    Styles.HeaderModelPageInputFieldContentTextImportent
                  }
                >
                  *
                </span>
              </p>
              <TextField
                id="outlined-start-adornment"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                  margin: "0.5rem 0rem",
                }}
                name="email"
                placeholder={"Enter Tank capacity"}
                // onChange={(e) => setLogin({ ...login, email: e.target.value })}
                InputProps={
                  {
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <MailIcon />
                    //   </InputAdornment>
                    // ),
                  }
                }
              />
            </div>
            <div className={Styles.HeaderModelPageInputFieldContent}>
              <p className={Styles.HeaderModelPageInputFieldContentText}>
                Tank type
              </p>
              <select
                className={Styles.usernameInputBox}
                name="DeviceTiming"
                id="DeviceTiming"
              >
                <option value="TypeOne">Type 1</option>
                <option value="TypeTwo">Type 2</option>
                <option value="TypeThree">Type 3</option>
                <option value="TypeFour">Type 4</option>
              </select>
            </div>
          </div>
          <div className={Styles.ModdelPageForDeviceApprovedButtonContainer}>
            <button
              className={Styles.ModdelPageForDeviceApprovedButtonDeny}
              onClick={() => DeviceRejectyedData()}
            >
              Deny
            </button>
            <button
              className={Styles.ModdelPageForDeviceApprovedButton}
              onClick={() => DeviceApprovedData()}
            >
              Accept
            </button>
          </div>
        </Box>
      </Modal> */}
      {/* <Notification/> */}
    </>
  );
};
export default Header;
