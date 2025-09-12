import React, { useEffect, useState } from "react";
import Wave from "react-wavify";
import Styles from "./Index.module.css";
import waterdrop from "../../../assets/videos/Waterdrop1.mp4";
// import Styles from "../DeviceManagement/DeviceManagement.scss"
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DataTable from "./DataTable";
import { Link } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import TooltpWaterLevel from "../../../assets/images/TooltpWaterLevel.png";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wifi0 from "../../../assets/images/wifi0.png";
import {
  getDeviceDataByDeviceID,
  getAllDeviceListById,
  getAllDeviceListByIdResponse,
  getForcostDeviceData,
  getUseageDeviceData,
  getUserPlan
} from "../../../Redux/Actions";
import { getAllNotification } from "../../../Redux/Actions";
import { useLocation } from "react-router-dom";
import DownArrow from "../../../assets/images/DownArrow.png";
import CarouselContent from "./CarouselContent";
// import waterdrop from "../../../assets/videos/waterdropGIF.gif";
// import waterdrop from "../../../assets/videos/Wow-gif.gif"
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
// import { select } from "redux-saga/effects";
import Battery1 from "../../../assets/images/Artboard 1@4x.png";
import Battery2 from "../../../assets/images/Artboard 2@4x.png";
import Battery3 from "../../../assets/images/Artboard 3@4x.png";
import Battery4 from "../../../assets/images/Artboard 4@4x.png";
import Battery5 from "../../../assets/images/Artboard 5@4x.png";
import Battery6 from "../../../assets/images/Artboard 6@4x.png";
import Battery7 from "../../../assets/images/Artboard 7@4x.png";
import Battery8 from "../../../assets/images/Artboard 8@4x.png";
import Battery9 from "../../../assets/images/Artboard 9@4x.png";
import Battery10 from "../../../assets/images/Artboard 10@4x.png";
import Wifi4 from "../../../assets/images/wifi4.png";
import Wifi2 from "../../../assets/images/wifi2.png";
import Wifi1 from "../../../assets/images/wifi1.png";
import Wifi3 from "../../../assets/images/wifi3.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as Tool } from "recharts";
import { format, parseISO, isValid } from "date-fns";
import Downdd from "../../../assets/SvgIcons/Iconsdd.svg";
import PopUp from "../../PopUpPage/PopUp";

const CustomToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#4d8bff",
    textTransform: "capitalize",
  },
});
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    border: "1px solid var(--neutrals-100, #ECF0F4)",
    background: "var(--neutral-white, #FFF)",
    boxShadow:
      "0px 11px 15px -4px rgba(16, 26, 40, 0.03), 0px 7px 6px -3px rgba(16, 26, 40, 0.04)",
    borderRadius: "8px",
  },
}));


const HomePage = () => {

  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);

  const notificationList = useSelector(
    (notification) => notification?.Notification?.getNotificationSuccessfull
  );
  console.log("notificationListinhomepage", notificationList?.data);

  useEffect(() => {
    dispatch(getAllNotification(authUser.userId));
  }, [location.pathname]); // triggers on route change to this component

  useEffect(() => {
    const notifications = notificationList?.data || [];

    const hasCreatedUpdatedMessage = notifications.some((item) =>
      /^The device with ID .+ has been created\/updated\.$/.test(item.message)
    );

    setShowPopup(hasCreatedUpdatedMessage);
  }, [notificationList]);


  const CustomDropdownIcon = () => (
    <img
      src={Downdd}
      className="DropDD"
      alt="Dropdown Icon"
      style={{
        width: '20x',
        marginleft: '20px',
        display: 'none'
      }}
    />
  );
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState("Level");
  const [deviceLastUpdate, setDeviceLastUpdate] = useState();

  const getAllDeviceListByIdResponse = useSelector(
    (device) => device.DeviceList.deviceDataByDeviceId
  );

  console.log(getAllDeviceListByIdResponse, "deviceDataByDeviceId");

  const deviceList = useSelector((device) => device.DeviceList.deviceDetails);

  const ForeCostData = useSelector(
    (device) => device.DeviceList.getForcostDeviceData
  );

  const UseageData = useSelector(
    (device) => device.DeviceList.getUseageDeviceData
  );

  const UserIDDataHome = JSON.parse(localStorage.getItem("auth"));

  // const getAllDeviceListByIdResponse = useSelector(
  //   (device) => device.DeviceList.deviceDataByDeviceId
  // );

  // const getAllUserDeviceListById = useSelector(
  //   (device) => device.DeviceList.getDeviceApproved
  // );

  // const notificationList=useSelector((notification) => notification.Notification.getNotificationSuccessfull)

  const [liveData, setLiveData] = useState();
  const [menuItem, setMenuItem] = useState();

  var date = new Date();
  console.log(liveData?.batterystatus, "live data ");
  const [initialDeviceId, setinItialDeviceId] = useState();
  const dataID = initialDeviceId?.map((data) => data.deviceid);
  console.log("dataID", dataID);


  const InitialDeviceIdData = dataID?.toLocaleString();
  console.log("InitialDeviceIdData", InitialDeviceIdData);

  const [deviceId, setDeviceId] = useState();
  // alert(deviceId)

  console.log(InitialDeviceIdData, "deviceIID check ");

  const dataLastUpdate = date.getMinutes();
  // const [notificatiionListDashboard,setNotificatiionListDashboard ]=useState()

  // console.log(notificatiionListDashboard,'notificationList')
  var errorMessage = '';

  useEffect(() => {
    if (
      getAllDeviceListByIdResponse &&
      getAllDeviceListByIdResponse?.statusCode == 200
    ) {
      setLiveData(getAllDeviceListByIdResponse.data);
      const calculateTimeSinceUpdate = (lastUpdate) => {
        const lastUpdateDate = new Date(lastUpdate * 1000); // Convert Unix timestamp to JavaScript Date object
        const currentDate = new Date();
        const diffInMilliseconds = currentDate - lastUpdateDate;
        const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // Convert milliseconds to minutes

        if (diffInMinutes < 60) {
          return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""}`;
        } else if (diffInMinutes < 1440) {
          // 1440 minutes in a day
          const diffInHours = Math.floor(diffInMinutes / 60);
          return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""}`;
        } else {
          const diffInDays = Math.floor(diffInMinutes / 1440);
          return `${diffInDays} day${diffInDays !== 1 ? "s" : ""}`;
        }
      };
      setDeviceLastUpdate(
        calculateTimeSinceUpdate(getAllDeviceListByIdResponse.data.createdtime)
      );
      // setNotificatiionListDashboard(notificationList.data.slice(-1)?.deviceinfo)
    }
    if (getAllDeviceListByIdResponse?.statusCode == 400) {
      setLiveData(null);
      setTankWaterMesument(480);
      setDeviceLastUpdate(null)
      // toast.error(getAllDeviceListByIdResponse?.message)  
    }
  });

  const authUser = JSON.parse(localStorage.getItem("auth"));
  console.log("authUserauthUserauthUser", authUser.userId)

  useEffect(() => {
    dispatch(getUserPlan(authUser.userId))
  }, [dispatch])

  const bookingDetails = useSelector((state) => state.UserPlan.userPlanSuccess);
  console.log(bookingDetails.data, "userPlandetails")

  localStorage.setItem("Booking Id", JSON.stringify(bookingDetails));


  // const authUser = JSON.parse(localStorage.getItem("Booking Id"));
  // console.log("authUserauthUserauthUser",authUser?.data?.subscriptionid)

  useEffect(() => {
    if (deviceList?.data?.length > 0) {
      const firstDeviceId = deviceList.data[0].deviceid;
      setDeviceId(firstDeviceId);
      setUseAndForeCostData((prevData) => ({
        ...prevData,
        deviceid: firstDeviceId,
      }));
      // dispatch(getDeviceDataByDeviceID(firstDeviceId));
    }
  }, [deviceList]);

  useEffect(() => {
    if (deviceId) {
      dispatch(getDeviceDataByDeviceID(deviceId));
    }
  }, [deviceId]);

  console.log(deviceId, "liveDataliveDataliveData");

  const [takDataAnalytics, setTakDataAnalytics] = useState("Level");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setTakDataAnalytics(newAlignment);
    if (newAlignment === "Usage" || newAlignment === "Forecast") {
      setUseAndForeCostData((prevData) => ({
        ...prevData,
        deviceid: deviceId,
      }));
    }
  };

  const [tankWaterMesurement, setTankWaterMesument] = useState();
  console.log("List of tanks (devices):", deviceList?.data);


  const [useAndForeCostData, setUseAndForeCostData] = useState({
    userid: UserIDDataHome?.userId,
    deviceid: InitialDeviceIdData,
    option: "",
    noOfPeriods: "",
  });
  const usgaeAndForecast = (event) => {
    if (event.target.value === "1 Week") {
      setUseAndForeCostData({
        ...useAndForeCostData,
        option: "weekly",
        noOfPeriods: "1",
      });
    }
    if (event.target.value === "1 month") {
      setUseAndForeCostData({
        ...useAndForeCostData,
        option: "monthly",
        noOfPeriods: "1",
      });
    }
    if (event.target.value === "3 month") {
      setUseAndForeCostData({
        ...useAndForeCostData,
        option: "monthly",
        noOfPeriods: "3",
      });
    }
    if (event.target.value === "6 month") {
      setUseAndForeCostData({
        ...useAndForeCostData,
        option: "monthly",
        noOfPeriods: "6",
      });
    }

    // setUseAndForeCostData(event.target.value)
  };

  const getDeviceIdFromHomePage = (event) => {
    const selectedDeviceId = event.target.value;
    setDeviceId(selectedDeviceId);
    setLiveData(null); // Clear previous device's data immediately
    setUseAndForeCostData({
      ...useAndForeCostData,
      deviceid: selectedDeviceId,
    });
    // dispatch(getDeviceDataByDeviceID(selectedDeviceId));
  };

  // Optional useEffect to set `InitialDeviceIdData`
  useEffect(() => {
    setinItialDeviceId(menuItem?.slice(0, 1));
  }, [menuItem]);

  useEffect(() => {
    // setDeviceId(InitialDeviceIdData);

    // if (deviceId === "undefined") {
    //   setDeviceId(InitialDeviceIdData);
    //   setDeviceId(deviceList?.data[0].deviceid);
    // }

    if (
      useAndForeCostData.option === "" &&
      useAndForeCostData.noOfPeriods == ""
    ) {
      setUseAndForeCostData({
        ...useAndForeCostData,
        option: "weekly",
        noOfPeriods: "1",
      });
    }
    setMenuItem(deviceList?.data);
    setinItialDeviceId(menuItem?.slice(0, 1));
  }, [deviceList, useAndForeCostData]);

  useEffect(() => {
    if (
      liveData?.waterlevelPercentage > 0 &&
      liveData?.waterlevelPercentage <= 3
    ) {
      setTankWaterMesument(440);
    }
    else if (
      liveData?.waterlevelPercentage > 3 &&
      liveData?.waterlevelPercentage <= 5
    ) {
      setTankWaterMesument(430)
    }
    else if (
      liveData?.waterlevelPercentage > 5 &&
      liveData?.waterlevelPercentage <= 8
    ) {
      setTankWaterMesument(405);
    } else if (
      liveData?.waterlevelPercentage > 8 &&
      liveData?.waterlevelPercentage <= 10
    ) {
      setTankWaterMesument(385)
    }
    else if (
      liveData?.waterlevelPercentage > 10 &&
      liveData?.waterlevelPercentage <= 13
    ) {
      setTankWaterMesument(360);
    } else if (
      liveData?.waterlevelPercentage > 13 &&
      liveData?.waterlevelPercentage <= 15
    ) {
      setTankWaterMesument(350);
    } else if (
      liveData?.waterlevelPercentage > 15 &&
      liveData?.waterlevelPercentage <= 18
    ) {
      setTankWaterMesument(335);
    } else if (
      liveData?.waterlevelPercentage > 18 &&
      liveData?.waterlevelPercentage <= 20
    ) {
      setTankWaterMesument(310);
    } else if (
      liveData?.waterlevelPercentage > 20 &&
      liveData?.waterlevelPercentage <= 25
    ) {
      setTankWaterMesument(290);
    } else if (
      liveData?.waterlevelPercentage > 25 &&
      liveData?.waterlevelPercentage <= 30
    ) {
      setTankWaterMesument(280);
    } else if (
      liveData?.waterlevelPercentage > 30 &&
      liveData?.waterlevelPercentage <= 35
    ) {
      setTankWaterMesument(260);
    } else if (
      liveData?.waterlevelPercentage > 35 &&
      liveData?.waterlevelPercentage <= 40
    ) {
      setTankWaterMesument(240);
    } else if (
      liveData?.waterlevelPercentage > 40 &&
      liveData?.waterlevelPercentage <= 45
    ) {
      setTankWaterMesument(220);
    } else if (
      liveData?.waterlevelPercentage > 45 &&
      liveData?.waterlevelPercentage <= 50
    ) {
      setTankWaterMesument(200);
    } else if (
      liveData?.waterlevelPercentage > 50 &&
      liveData?.waterlevelPercentage <= 55
    ) {
      setTankWaterMesument(190);
    } else if (
      liveData?.waterlevelPercentage > 55 &&
      liveData?.waterlevelPercentage <= 60
    ) {
      setTankWaterMesument(170);
    } else if (
      liveData?.waterlevelPercentage > 60 &&
      liveData?.waterlevelPercentage <= 65
    ) {
      setTankWaterMesument(140);
    } else if (
      liveData?.waterlevelPercentage > 65 &&
      liveData?.waterlevelPercentage <= 70
    ) {
      setTankWaterMesument(120);
    } else if (
      liveData?.waterlevelPercentage > 70 &&
      liveData?.waterlevelPercentage <= 75
    ) {
      setTankWaterMesument(110);
    } else if (
      liveData?.waterlevelPercentage > 75 &&
      liveData?.waterlevelPercentage <= 80
    ) {
      setTankWaterMesument(90);
    } else if (
      liveData?.waterlevelPercentage > 80 &&
      liveData?.waterlevelPercentage <= 85
    ) {
      setTankWaterMesument(60);
    } else if (
      liveData?.waterlevelPercentage > 85 &&
      liveData?.waterlevelPercentage <= 90
    ) {
      setTankWaterMesument(50);
    } else if (
      liveData?.waterlevelPercentage > 90 &&
      liveData?.waterlevelPercentage <= 95
    ) {
      setTankWaterMesument(20);
    } else if (
      liveData?.waterlevelPercentage > 95 &&
      liveData?.waterlevelPercentage <= 99
    ) {
      setTankWaterMesument(5);
    } else if (
      liveData?.waterlevelPercentage > 99 &&
      liveData?.waterlevelPercentage <= 100
    ) {
      const maxMeasurement = -0;
      const fluctuation = 100 - liveData.waterlevelPercentage;
      setTankWaterMesument(-20);
    } else if (liveData?.waterlevelPercentage >= 0) {
      setTankWaterMesument(480);
    }
  }, [liveData]);

  const [gallons, setGallons] = useState(false);

  const handleChangeGallons = (event) => {
    if (event.target.value === "volvo") {
      setGallons(true);
    } else {
      setGallons(false);
    }
  };

  console.log(useAndForeCostData, "useAndForeCostData - useAndForeCostData");
  useEffect(() => {
    if (takDataAnalytics === "Forecast") {
      dispatch(getForcostDeviceData(useAndForeCostData));
    }
    if (takDataAnalytics === "Usage") {
      dispatch(getUseageDeviceData(useAndForeCostData));
    }
  }, [takDataAnalytics, useAndForeCostData]);


  const handleDeviceApproved = () => {
    const authUser = JSON.parse(localStorage.getItem("auth"));
    dispatch(getAllNotification(authUser.userId));
    dispatch(getDeviceDataByDeviceID(deviceId));
    dispatch(getAllDeviceListById(authUser.userId));
  };

  const subscribedPlan = localStorage.getItem("subscriptionName")
  console.log(subscribedPlan, "subscr")
  return (


    <div>

      <div>
        {showPopup && <PopUp onSuccess={handleDeviceApproved} onClose={() => setShowPopup(false)} />} {/* optional close handler */}

      </div>


      <div className={Styles.HomePageContainer}>
        <div className={Styles.HomePageMyTankContainer}>
          <div className={Styles.HomePageMyTankContainerHeader}>
            <Box sx={{ minWidth: 160 }}>
              <FormControl fullWidth>
                <NativeSelect
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  onChange={getDeviceIdFromHomePage}
                >
                  {menuItem
                    ?.filter((device) => device.devicestatus === "ACTIVE")
                    .map((device) => (
                      <option key={device.deviceid} value={device.deviceid}>
                        {device.devicename}
                      </option>
                    ))}
                </NativeSelect>
              </FormControl>
              <p>
                Last updated: {deviceLastUpdate}
              </p>
            </Box>

            {alignment !== "Level" && (
              <Box sx={{ minWidth: 100 }}>
                <FormControl
                  fullWidth
                  className={Styles.useageAndForecostDropDown}
                >

                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <NativeSelect
                      inputProps={{
                        id: "uncontrolled-native",
                        style: {
                          border: 'none',
                          outline: 'none',
                          appearance: 'none',
                          padding: '10px',
                        },
                      }}
                      onChange={usgaeAndForecast}
                      defaultValue={"1 Week"}
                      className={`${Styles.DRopDownListTankDetailsdata}`}
                      // IconComponent={CustomDropdownIcon} 
                      sx={{
                        '&:focus': {
                          border: 'none',
                          outline: 'none',
                        },
                        '&:before': {
                          display: 'none',
                        },
                        '&:after': {
                          display: 'none',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <option value={"1 Week"}>1 Week</option>
                      <option value={"1 month"}>1 month</option>
                      <option value={"3 month"}>3 month</option>
                      <option value={"6 month"}>6 month</option>
                    </NativeSelect>
                  </div>
                  {/* <img src={Downdd} alt="Dropdown Icon"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            width: '20px',
            height: '20px',
          }}
        /> */}
                </FormControl>
              </Box>
            )}

{subscribedPlan === "Drip" ? (
  <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={subscribedPlan === "Drip" ? null : handleChange}
             className={Styles.HomePageToggleButtonsContainer}
           >
             <CustomToggleButton
               value="Level"
               className={Styles.HomePageToggleButtons}
               disabled={subscribedPlan === "Drip"}
             >
               Level
             </CustomToggleButton>
           
             {subscribedPlan !== "Drip" && (
               <CustomToggleButton
                 value="Week"
                 className={Styles.HomePageToggleButtons}
               >
                 Week
               </CustomToggleButton>
             )}
           </ToggleButtonGroup>
            
            ) :  subscribedPlan === "Trickle" || subscribedPlan === "Splash" || subscribedPlan === "Maas" ? (
  <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={handleChange}
    aria-label="Platform"
    className={Styles.HomePageToggleButtonsContainer}
  >
    <CustomToggleButton
      value="Level"
      className={Styles.HomePageToggleButtons}
    >
      Level
    </CustomToggleButton>
    <CustomToggleButton
      value="Usage"
      className={Styles.HomePageToggleButtons}
    >
      Usage
    </CustomToggleButton>
    <CustomToggleButton
      value="Forecast"
      className={Styles.HomePageToggleButtons}
    >
      Forecast
    </CustomToggleButton>
  </ToggleButtonGroup>
) : subscribedPlan === "" ? (
  <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={handleChange}
    aria-label="Platform"
    className={Styles.HomePageToggleButtonsContainer}
  >
    <CustomToggleButton
      value="Level"
      className={Styles.HomePageToggleButtons}
    >
      Level
    </CustomToggleButton>
  </ToggleButtonGroup>
) : (
  ""
)}

          </div>


          {/* {getAllDeviceListByIdResponse?.data && getAllDeviceListByIdResponse.data?.map((data) => {
            return(  */}

          <>
            <div className={Styles.HomePageHeaderTankAndQuickDetails}>
              {takDataAnalytics === "Level" ? (
                <>
                  <LightTooltip
                    title={
                      <div
                        className={Styles.homepageTankContainerTooltipContent}
                      >
                        <img src={TooltpWaterLevel} alt="" />
                        <div
                          className={
                            Styles.homepageTankContainerTooltipWaterlevelTextContent
                          }
                        >
                          <p
                            className={
                              Styles.homepageTankContainerTooltipWaterlevelTextContentText
                            }
                          >
                            Current level
                          </p>
                          {liveData?.waterlevelPercentage >= 0 && liveData?.waterlevelPercentage <= 33 ? (
                            <p
                              className={
                                Styles.homepageTankContainerTooltipWaterlevelTextContentTextStatus
                              }
                            >
                              Low
                            </p>
                          ) : liveData?.waterlevelPercentage >= 34 && liveData?.waterlevelPercentage <= 66 ? (
                            <p
                              className={
                                Styles.homepageTankContainerTooltipWaterlevelTextContentTextStatus
                              }
                            >
                              Medium
                            </p>
                          ) : (
                            <p
                              className={
                                Styles.homepageTankContainerTooltipWaterlevelTextContentTextStatus
                              }
                            >
                              High
                            </p>
                          )}
                        </div>
                        <div
                          className={
                            Styles.homepageTankContainerTooltipWaterlevelNumberContainer
                          }
                        >
                          <p
                            className={
                              Styles.homepageTankContainerTooltipWaterlevelNumberContainerText
                            }
                          >
                            {Math.floor(liveData?.waterlevel)} mm

                          </p>
                          <p
                            className={
                              Styles.homepageTankContainerTooltipWaterlevelNumberContainerPercentage
                            }
                          >
                            {Math.floor(liveData?.waterlevelPercentage)}%
                          </p>
                        </div>
                      </div>
                    }
                    arrow
                    followCursor
                  >
                    <div className={Styles.HomePageTankContainer}>
                      <div className={Styles.HomePageChartLines}>
                        <p className={Styles.HomePageChartLinesLine}>100% </p>
                        <p className={Styles.HomePageChartLinesLine}>
                          80%{" "}
                          <span
                            className={
                              Styles.HomePageChartLinesLineMesurementMinimum
                            }
                          />
                        </p>
                        <p className={Styles.HomePageChartLinesLine}>
                          60%{" "}
                          <span
                            className={Styles.HomePageChartLinesLineMesurementOne}
                          />
                        </p>
                        <p className={Styles.HomePageChartLinesLine}>
                          40%{" "}
                          <span
                            className={Styles.HomePageChartLinesLineMesurementTwo}
                          />
                        </p>
                        <p className={Styles.HomePageChartLinesLine}>
                          20%{" "}
                          <span
                            className={Styles.HomePageChartLinesLineMesurementThree}
                          />
                        </p>
                        <p className={Styles.HomePageChartLinesLine}>
                          10%{" "}
                          <span
                            className={Styles.HomePageChartLinesLineMesurementFour}
                          />
                        </p>
                        <p className={Styles.HomePageChartLinesLine}>
                          0%{" "}
                          <span
                            className={Styles.HomePageChartLinesLineMesurementFive}
                          />
                        </p>
                      </div>

                      <div className={Styles.TankModelContent}>
                        <p class={Styles.HomePageTankCloser}></p>
                        <p class={Styles.HomePageTankBody}>
                          <Wave
                            mask="url(#mask)"
                            fill="#4D8BFF"
                            options={{
                              points: 15,
                              speed: 0.2,
                              amplitude: 15,
                              height: tankWaterMesurement,
                            }}
                            className={Styles.TankWaves}
                          >
                            <defs>
                              <linearGradient
                                id="gradient"
                                gradientTransform="rotate(90)"
                              >
                                <stop offset="0.6" stopColor="#4D8BFF" />
                                <stop offset="1" stopColor="white" />
                              </linearGradient>
                              <mask id="mask">
                                <rect
                                  x="0"
                                  y="0"
                                  width="2000"
                                  height="520"
                                  fill="url(#gradient)"
                                />
                              </mask>
                            </defs>
                          </Wave>
                        </p>
                      </div>
                    </div>
                  </LightTooltip>
                  <div className={Styles.HomePageQuickStats}>
                    <div className={Styles.HomepageLitersAndGallonsContainer}>
                      <p className={Styles.HomePageQuickStatsText}>
                        Quick stats:
                      </p>
                      <select
                        name="cars"
                        id="cars"
                        className={Styles.HomepageLitersAndGallonsContent}
                        onChange={handleChangeGallons}
                      >
                        <option value="saab" onClick={() => setGallons(true)}>
                          Gallons
                        </option>
                        <option Value="volvo" onClick={() => setGallons(false)}>
                          liters
                        </option>
                      </select>
                    </div>
                    <div
                      className={
                        Styles.HomePageAverageDailyUsageOfWaterContainer
                      }
                    >
                      <p
                        className={
                          Styles.HomePageAverageDailyUsageOfWaterContainerIcon
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                        >
                          <path
                            d="M7 17C10.3136 17 13 14.3136 13 11C13 5.4 7 1 7 1C7 1 1 5.4 1 11C1 14.3136 3.6864 17 7 17Z"
                            stroke="#4D8BFF"
                            stroke-width="1.59995"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1 11.0001C1 14.3137 3.6864 17.0001 7 17.0001C10.3136 17.0001 13 14.3137 13 11.0001C13 11.0001 9.4 12.2001 7 11.0001C4.6 9.80013 1 11.0001 1 11.0001Z"
                            stroke="#4D8BFF"
                            stroke-width="1.59995"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </p>
                      <div className={Styles.HomePageAverageBox}>
                        <p className={Styles.HomePageAverageBoxText}>
                          Current Water Level
                        </p>
                        <p
                          className={Styles.HomePageAverageBoxAveragePercentage}
                        >
                          {/* {gallons === false ? <>{Math.floor(liveData?.waterlevelPercentage)}%</> : <p className={Styles.literstoGallonsConvertion}>{Math.floor(liveData?.waterlevelPercentage)}%</p>}
                            
                             */}
                          {liveData?.waterlevelPercentage == null ? (
                            <p>Data not available</p>
                          ) : liveData?.waterlevelPercentage ? (
                            gallons === false ? (
                              <>{Math.floor(liveData.waterlevelPercentage)}%</>
                            ) : (
                              <>
                                {Math.floor(liveData.waterlevelPercentage)}%
                              </>
                            )
                          ) : (
                            ""
                          )}
                          <span
                            className={
                              Styles.HomePageAverageBoxCurrentWaterLevel
                            }
                          >
                            {liveData?.actualVolume ? (
                              gallons === false ? (
                                <>
                                  ({Math.floor(liveData?.actualVolume)}/
                                  {liveData?.tankcapacity}G)
                                </>
                              ) : (
                                // <p className={Styles.literstoGallonsConvertion}>
                                <>
                                  ({Math.floor(liveData?.actualVolume * 3.7)}
                                  /3700L)
                                </>
                                // </p>
                              )
                            ) : (
                              "" // Empty output if actualVolume is not present
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        Styles.HomePageAverageDailyUsageOfWaterContainer
                      }
                    >
                      <p
                        className={
                          Styles.HomePageAverageDailyUsageOfWaterContainerIcon
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                        >
                          <path
                            d="M7 17C10.3136 17 13 14.3136 13 11C13 5.4 7 1 7 1C7 1 1 5.4 1 11C1 14.3136 3.6864 17 7 17Z"
                            stroke="#4D8BFF"
                            stroke-width="1.59995"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1 11.0001C1 14.3137 3.6864 17.0001 7 17.0001C10.3136 17.0001 13 14.3137 13 11.0001C13 11.0001 9.4 12.2001 7 11.0001C4.6 9.80013 1 11.0001 1 11.0001Z"
                            stroke="#4D8BFF"
                            stroke-width="1.59995"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </p>
                      <div className={Styles.HomePageAverageBox}>
                        <p className={Styles.HomePageAverageBoxText}>
                          Estimated Time To Empty
                        </p>
                        <p
                          className={Styles.HomePageAverageBoxAveragePercentage}
                        >
                          {/* {/ Check if liveData is being fetched /} */}
                          {liveData === undefined || liveData === null ? (
                            <p>Data not available</p> // Display an empty value if liveData is undefined or null
                          ) : (
                            <>
                              {/* {/ Show liveData.estimatedUsage, even if it is 0 /} */}
                              {gallons === false ? (
                                <>{Math.floor(liveData.estimatedUsage)}</>
                              ) : (
                                <>
                                  {Math.floor(liveData.estimatedUsage)}
                                </>
                              )}

                              {/* {/ Show "Days left" as long as liveData.estimatedUsage is not undefined or null /} */}
                              <span
                                className={
                                  Styles.HomePageAverageBoxEstimatedUsage
                                }
                              >
                                Days left
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        Styles.HomePageAverageDailyUsageOfWaterContainer
                      }
                    >
                      <p
                        className={
                          Styles.HomePageAverageDailyUsageOfWaterContainerIcon
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                        >
                          <path
                            d="M7 17C10.3136 17 13 14.3136 13 11C13 5.4 7 1 7 1C7 1 1 5.4 1 11C1 14.3136 3.6864 17 7 17Z"
                            stroke="#4D8BFF"
                            stroke-width="1.59995"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1 11.0001C1 14.3137 3.6864 17.0001 7 17.0001C10.3136 17.0001 13 14.3137 13 11.0001C13 11.0001 9.4 12.2001 7 11.0001C4.6 9.80013 1 11.0001 1 11.0001Z"
                            stroke="#4D8BFF"
                            stroke-width="1.59995"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </p>
                      <div className={Styles.HomePageAverageBox}>
                        <p className={Styles.HomePageAverageBoxText}>
                          Average Daily Use
                        </p>
                        <p
                          className={Styles.HomePageAverageBoxAveragePercentage}
                        >
                          {liveData?.averageDailyUse ? (
                            // gallons === false ? (
                            //   <>
                            //     ({Math.floor(liveData?.actualVolume)}/
                            //     {liveData?.tankcapacity}G)
                            //   </>
                            // ) : (
                            //   <>
                            //     ({Math.floor(liveData?.actualVolume * 3.7)}
                            //     /3700L)
                            //   </>
                            // )
                            <>{liveData?.averageDailyUse}{" "}% </>
                          ) : (
                            <p>Data not available </p> // Empty output if actualVolume is not present
                          )}

                          {/* <span */}
                            {/* className={ */}
                              {/* Styles.HomePageAverageBoxAveragePercentageAdvance */}
                            {/* } */}
                          {/* > */}
                            {/* {averageDailyUse}% */}
                            {/* {gallons === false ? <>{liveData?.averageDailyUse}%</> : <p className={Styles.literstoGallonsConvertion}>{Math.floor(liveData?.averageDailyUse)}%</p>} */}
                          {/* </span> */}
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </>
              ) : takDataAnalytics === "Usage" ? (


                <AreaChart
                  width={600}
                  height={400}
                  data={UseageData.data}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(str) => {
                      const date = parseISO(str);
                      if (isValid(date)) {
                        return format(date, "MMM d");
                      }
                      return 'Invalid Date'; // Fallback if the date is invalid
                    }}
                  />
                  <YAxis domain={[0, 'auto']} />
                  <Tool
                    labelFormatter={(str) => {
                      const date = parseISO(str);
                      if (isValid(date)) {
                        return format(date, "MMM d, yyyy");
                      }
                      return 'Invalid Date'; // Fallback if the date is invalid
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#5BD1DC"
                    fill="#abe8eb"
                    isAnimationActive={false}
                  />
                </AreaChart>
              ) : (
                <AreaChart
                  width={600}
                  height={400}
                  data={ForeCostData.data}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="usage" />
                  <Tool />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="rgb(53, 162, 255)"
                    fill="rgba(53, 162, 235, 0.5)"
                  />
                </AreaChart>
              )}
            </div>
            <div className={Styles.HomePageMyTankSignalAndBatteryContainer}>
              <div className={Styles.HomePageMyTankSignalAndBatteryCart}>
                <div
                  className={
                    Styles.HomePageMyTankSignalAndBatteryCartIconContent
                  }
                >
                  <p
                    className={
                      Styles.HomePageMyTankSignalAndBatteryCartIconTitle
                    }
                  >
                    Battery Status
                  </p>
                  <p
                    className={
                      Styles.HomePageMyTankSignalAndBatteryCartIconText
                    }
                  >
                    {liveData?.batterystatus == null || Number(liveData?.batterystatus) === 0 ? (
                      <p>Data not available</p>
                    ) : (
                      <>
                        {liveData?.batterystatus}
                        {Number(liveData?.batterystatus) > 1 &&
                          Number(liveData?.batterystatus) <= 10
                          ? ""
                          : Number(liveData?.batterystatus) > 10 &&
                            Number(liveData?.batterystatus) <= 20
                            ? ""
                            : Number(liveData?.batterystatus) > 20 &&
                              Number(liveData?.batterystatus) <= 30
                              ? ""
                              : Number(liveData?.batterystatus) > 30 &&
                                Number(liveData?.batterystatus) <= 40
                                ? ""
                                : Number(liveData?.batterystatus) > 40 &&
                                  Number(liveData?.batterystatus) <= 50
                                  ? ""
                                  : Number(liveData?.batterystatus) > 50 &&
                                    Number(liveData?.batterystatus) <= 60
                                    ? ""
                                    : Number(liveData?.batterystatus) > 60 &&
                                      Number(liveData?.batterystatus) <= 70
                                      ? ""
                                      : Number(liveData?.batterystatus) > 70 &&
                                        Number(liveData?.batterystatus) <= 80
                                        ? ""
                                        : Number(liveData?.batterystatus) > 80 &&
                                          Number(liveData?.batterystatus) <= 90
                                          ? ""
                                          : Number(liveData?.batterystatus) > 90 &&
                                            Number(liveData?.batterystatus) <= 100
                                            ? ""
                                            : null}
                      </>
                    )}
                  </p>
                </div>
                <p className={Styles.HomePageMyTankSignalAndBatteryCartIcon}>

                  <div className={Styles.BatteryStatusBox}>
                    {liveData?.batterystatus == null || Number(liveData?.batterystatus) === 0 ? (
                      <p></p>
                    ) : (
                      <>
                        {liveData?.batterystatus > "1%" && liveData?.batterystatus <= "10%" ? (
                          <img src={Battery1} className={Styles.Battery} />
                        ) : liveData?.batterystatus > "10%" && liveData?.batterystatus <= "20%" ? (
                          <img src={Battery2} className={Styles.Battery} />
                        ) : liveData?.batterystatus > "20%" && liveData?.batterystatus <= "30%" ? (
                          <img src={Battery3} className={Styles.Battery} />
                        ) : liveData?.batterystatus > "30%" && liveData?.batterystatus <= "40%" ? (
                          <img src={Battery4} className={Styles.Battery} />
                        ) : liveData?.batterystatus > "40%" && liveData?.batterystatus <= "50%" ? (
                          <img src={Battery5} className={Styles.Battery} />
                        ) : liveData?.batterystatus > "50%" && liveData?.batterystatus <= "60%" ? (
                          <img src={Battery6} className={Styles.Battery} />
                        ) : liveData?.batterystatus > "60%" && liveData?.batterystatus <= "70%" ? (
                          <img src={Battery7} className={Styles.Battery} />
                        ) : liveData?.batterystatus > "70%" && liveData?.batterystatus <= "80%" ? (
                          <img src={Battery8} className={Styles.Battery} />
                        ) : liveData?.batterystatus > "80%" && liveData?.batterystatus <= "90%" ? (
                          <img src={Battery9} className={Styles.Battery} />
                        ) : liveData?.batterystatus > 90 && liveData?.batterystatus <= 100 ? (
                          <img src={Battery10} className={Styles.Battery} />
                        ) : (
                          <img src={Battery10} className={Styles.Battery} />
                        )}
                      </>
                    )}
                  </div>

                </p>
              </div>
              <div className={Styles.HomePageMyTankSignalAndBatteryCart}>
                <div
                  className={
                    Styles.HomePageMyTankSignalAndBatteryCartIconContent
                  }
                >
                  <p
                    className={
                      Styles.HomePageMyTankSignalAndBatteryCartIconTitle
                    }
                  >
                    Signal Strength
                  </p>
                  <p
                    className={
                      Styles.HomePageMyTankSignalAndBatteryCartIconText
                    }
                  >
                    {liveData?.wifistatus == null ? (
                      <p>Data not available</p>
                    ) : (
                      <>
                        {liveData?.wifistatus}
                        {liveData?.wifistatus === "Okay"
                          ? ""
                          : liveData?.wifistatus === "Amazing"
                            ? ""
                            : liveData?.wifistatus === "Very Good"
                              ? ""
                              : liveData?.wifistatus === "Not Good"
                                ? ""
                                : liveData?.wifistatus === "Unusable"
                                  ? ""
                                  : null}
                      </>
                    )}

                  </p>
                </div>
                <p className={Styles.HomePageMyTankSignalAndBatteryCartIcon}>
                  {liveData?.wifistatus === "Okay" ? (
                    <img src={Wifi2} className={Styles.Battery} />
                  ) : liveData?.wifistatus === "Amazing" ? (
                    <img src={Wifi4} className={Styles.Battery} />
                  ) : liveData?.wifistatus === "Very Good" ? (
                    <img src={Wifi3} className={Styles.Battery} />
                  ) : liveData?.wifistatus === "Not Good" ? (
                    <img src={Wifi1} className={Styles.Battery} />
                  ) : liveData?.wifistatus === "Unusable" ? (
                    <img src={Wifi0} className={Styles.Battery} />
                  ) : ("")}
                </p>
              </div>
            </div>
          </>
          {/* );
          })} */}
        </div>
        <div
          className={
            Styles.HomePageDeviceManagementAndHardwareInformationContainer
          }
        >
          <div className={Styles.HomePageDeviceManagement}>
            <div className={Styles.QuickSetUpVideo}>
              <video
                className={Styles.QuickSetUpVideoVideo}
                src={waterdrop}
                controls
                autoPlay
                loop
                muted
              />

            </div>
          </div>

          <CarouselContent />
        </div>
      </div>
      <div className={Styles.homePageTableData}>
        <div className={Styles.homePageTableDataNav}>
          <p className={Styles.homePageTableDataNavText}>Device list</p>
          <Link to="/device_management" className={Styles.LinkDeviceManagement}>
            <button className={Styles.homePageTableDataNavTextViewAll}>
              View all
            </button>
          </Link>
        </div>
        <DataTable />
      </div>
    </div>
  );
};
export default HomePage;
