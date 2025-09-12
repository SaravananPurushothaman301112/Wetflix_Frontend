import React, { useEffect, useRef } from "react";
import MarkerIcon from "../../../../assets/images/MapIcon1.png";
import "./mapandgeolocation.css";
import Styles from "./Index.module.css";
import CarouselContent from "../../../pages/homePage/CarouselContent";
import { useDispatch, useSelector } from "react-redux";
import { getAllMaps } from "../../../../Redux/Actions";
import { useState } from "react";
import Wave from "react-wavify";
// import Styles from "./Index.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import DataTable from "./DataTable";
import { Link } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import TooltpWaterLevel from "../../../../assets/images/TooltpWaterLevel.png";
import { styled } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
import { getDeviceDataByDeviceID } from "../../../../Redux/Actions";
import DownArrow from "../../../../assets/images/DownArrow.png";
// import CarouselContent from "./CarouselContent";
import waterdrop from "../../../../assets/videos/waterdropGIF.gif";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
// import { select } from "redux-saga/effects";
import Battery1 from "../../../../assets/images/Artboard 1@4x.png";
import Battery2 from "../../../../assets/images/Artboard 2@4x.png";
import Battery3 from "../../../../assets/images/Artboard 3@4x.png";
import Battery4 from "../../../../assets/images/Artboard 4@4x.png";
import Battery5 from "../../../../assets/images/Artboard 5@4x.png";
import Battery6 from "../../../../assets/images/Artboard 6@4x.png";
import Battery7 from "../../../../assets/images/Artboard 7@4x.png";
import Battery8 from "../../../../assets/images/Artboard 8@4x.png";
import Battery9 from "../../../../assets/images/Artboard 9@4x.png";
import Battery10 from "../../../../assets/images/Artboard 10@4x.png";
import Wifi4 from "../../../../assets/images/wifi4.png";
import Wifi2 from "../../../../assets/images/wifi2.png";
import Wifi1 from "../../../../assets/images/wifi1.png";
import Wifi3 from "../../../../assets/images/wifi3.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 13.0843,
  lng: 80.2705,
};

const UserIDDataHome = JSON.parse(localStorage.getItem("auth"));

function MapAndGeolocation() {
  const [useAndForeCostData, setUseAndForeCostData] = useState({
    userid: UserIDDataHome?.userId,
    deviceid: "",
    option: "",
    noOfPeriods: "",
  });
  // const [deviceId, setDeviceId] = useState();
  const [takDataAnalytics, setTakDataAnalytics] = useState("Level");
  const [empty, setEmpty] = useState("")
  const [gallons, setGallons] = useState(false);
  const [tankWaterMesurement, setTankWaterMesument] = useState();
  const [alignment, setAlignment] = useState("Level");
  const [deviceLastUpdate, setDeviceLastUpdate] = useState();
  const [tankCleanUp, setTankCleanUp] = useState([]);
  useEffect(() => {
    if (getAllDeviceListByIdResponse.statusCode === 200) {
      function daysRemaining(futureDate) {
        const targetDate = new Date(futureDate);
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
      }
      // setReplaceFilter(daysRemaining(getAllDeviceListByIdResponse.data.filterReplace))
      setTankCleanUp(daysRemaining(getAllDeviceListByIdResponse.data.tankCleanup))
    }
  })

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
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setTakDataAnalytics(newAlignment);
  };

  const handleChangeGallons = (event) => {
    if (event.target.value === "volvo") {
      setGallons(true);
    } else {
      setGallons(false);
    }
  };

  const getDeviceIdFromHomePage = (event) => {
    setDeviceId(event.target.value);
    setUseAndForeCostData({
      ...useAndForeCostData,
      deviceid: event.target.value,
    });
  };

  const dispatch = useDispatch();
  const heatList = useSelector((heatdata) => heatdata.Map.mapResponse);
  const devicedata = useSelector(
    (deviceData) => deviceData.DeviceList.deviceDataByDeviceId
  );

  const [deviceId, setDeviceId] = useState();
  const getAllDeviceListByIdResponse = useSelector(
    (device) => device.DeviceList.deviceDataByDeviceId
  );
  console.log(
    "getAllDeviceListByIdResponsegetAllDeviceListByIdResponse",
    getAllDeviceListByIdResponse
  );
  useEffect(() => {
    dispatch(getDeviceDataByDeviceID(deviceId));
  }, [deviceId]);

  console.log("devicedata", devicedata);

  console.log("heatList", heatList);

  // console.log("huckhuck",huck)
  useEffect(() => {
    dispatch(getAllMaps());
  }, [dispatch]);

  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 10,
      });

      heatList.data?.forEach((card) => {
        console.log(card, "rkhferwguer")
        // Extract latitude and longitude from devicelocation
        const [latStr, lngStr] = card.devicelocation.split(", ");

        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);

        if (!isNaN(lat) && !isNaN(lng)) {
          // Ensure lat and lng are valid numbers
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
            icon: {
              url: MarkerIcon,
              scaledSize: new window.google.maps.Size(50, 50),
            },
          });

          const contentString = `
            <div style="width:248px;gap: 8px;">
              <h3 style=" height: 18px;font-size: 18px;font-weight: 800;line-height: 18px;text-align: left;color:#181C20">${card.devicename}</h3>
              <p style="font-family: Figtree;font-size: 10px;font-weight: 400;line-height: 16px;text-align: left;color: #6A7A8A;">${card.createdtime}</p>
              <div style="display:flex; justify-content: space-between; ">
                <div style="width:85px;height:24px;padding: 4px 12px 4px 12px;gap: 8px;border-radius: 100px;opacity: 0px;background: #EAFBF0;"><p style="width: 61px;height: 16px;gap: 0px;opacity: 0px;font-size: 12px;font-weight: 400;line-height: 16px;text-align: center;color: #147138;">${card.deviceStatus}</p></div>
                <div style="width:106px;height:36px;gap: 4px;opacity: 0px;margin-top:-0.5rem">
                  <p style="width: 106px;height: 16px;width: 106px;height: 16px;;color:#6A7A8A;">Last updated</p>
                  <p style="width: 93px;height: 16px;gap: 0px;opacity: 0px;color:#181C20;margin-top:-0.5rem">${card.createdtime}</p>
                </div>
              </div>
              <hr style="margin-top:1rem">
              <div style="display:flex; justify-content: space-between;margin-top:-1rem ">
                <p style="width: 141px;height: 16px;font-size: 12px;font-weight: 400;line-height: 16px;text-align: left;color:#6A7A8A">Water level</p>
                <p style="font-family: Figtree;font-size: 12px;font-weight: 400;line-height: 16px;text-align: left;width: 105px;height: 16px;gap: 0px;opacity: 0px;color:#181C20">${card.waterlevel}</p>
              </div>
              <div style="display:flex; justify-content: space-between;margin-top:-0.5rem  ">
                <p style="width: 151px;height: 16px;gap: 0px;opacity: 0px;width: 171px;height: 16px;gap: 0px;opacity: 0px;color:#6A7A8A">Next cleaning date</p>
                <p style="width: 109px;height: 16px;gap: 0px;opacity: 0px;font-family: Figtree;font-size: 12px;font-weight: 400;line-height: 16px;text-align: left;color:#181C20">${card.nextmaintence}</p>
              </div>
            </div>
          `;

          const infowindow = new window.google.maps.InfoWindow({
            content: contentString,
          });

          marker.addListener("click", () => {
            infowindow.open(map, marker);
            console.log("Marker clicked:", heatList);
            console.log("Marker Clicked 2 :", card);
            setDeviceId(card.deviceid);
          });
        }
      });
    }
  }, [heatList, dispatch]);

  // import { useEffect } from 'react';

  // useEffect(() => {
  //   const response = getAllDeviceListByIdResponse?.data;
  //   const percentage = response?.waterlevelPercentage;

  //   console.log(getAllDeviceListByIdResponse, "getAllDeviceListByIdResponse");

  //   // ✅ 1. Check if there is an error in the API response
  //   if (getAllDeviceListByIdResponse?.statusCode === 400) {
  //     console.warn('API error: Tank information not found');
  //     setTankWaterMesument(500);  // or your "empty tank" height
  //     return;
  //   }


  //   // ✅ 2. Check for invalid or missing data
  //   if (
  //     percentage === undefined ||
  //     percentage === null ||
  //     isNaN(percentage)
  //   ) {
  //     console.warn('Invalid or missing water level data:', percentage);
  //     setTankWaterMesument(0);  // Reset water level to 0% if data is invalid or missing
  //     return;
  //   }

  //   // ✅ 3. Define mapping of percentage ranges to tank measurements
  //   const waterLevelToMeasurement = [
  //     { min: 0, max: 5, value: 500 },   // almost empty
  //     { min: 5, max: 10, value: 480 },
  //     { min: 10, max: 15, value: 460 },
  //     { min: 15, max: 20, value: 440 },
  //     { min: 20, max: 25, value: 420 },
  //     { min: 25, max: 30, value: 400 },
  //     { min: 30, max: 35, value: 380 },
  //     { min: 35, max: 40, value: 360 },
  //     { min: 40, max: 45, value: 340 },
  //     { min: 45, max: 50, value: 320 },
  //     { min: 50, max: 55, value: 300 },
  //     { min: 55, max: 60, value: 280 },
  //     { min: 60, max: 65, value: 260 },
  //     { min: 65, max: 70, value: 240 },
  //     { min: 70, max: 75, value: 220 },
  //     { min: 75, max: 80, value: 200 },
  //     { min: 80, max: 85, value: 180 },
  //     { min: 85, max: 90, value: 160 },
  //     { min: 90, max: 95, value: 140 },
  //     { min: 95, max: 99, value: 120 },
  //     { min: 99, max: 100, value: 100 }, // full tank
  //   ];


  //   // ✅ 4. Handle 99% to 100% case with fluctuation
  //   if (percentage >= 99 && percentage <= 100) {
  //     const maxMeasurement = 0; // You mentioned -0, but let's just use 0
  //     const fluctuation = 100 - percentage; // e.g., 1% fluctuation at 99%
  //     setTankWaterMesument(maxMeasurement + fluctuation);
  //     return;
  //   }

  //   // ✅ 5. Match using the lookup table
  //   const matched = waterLevelToMeasurement.find(
  //     (range) => percentage > range.min && percentage <= range.max
  //   );

  //   if (matched) {
  //     setTankWaterMesument(matched.value);
  //   } else {
  //     // Optional fallback (0 or unknown value)
  //     setTankWaterMesument(0);
  //     console.warn('No matching range found, using fallback for:', percentage);
  //   }
  // }, [getAllDeviceListByIdResponse?.data]);


  useEffect(() => {
    const percentage = getAllDeviceListByIdResponse?.data?.waterlevelPercentage;

    console.log(getAllDeviceListByIdResponse, "getAllDeviceListByIdResponse");

    if (getAllDeviceListByIdResponse?.statusCode === 400) {
      console.warn('API error: Tank information not found');
      setTankWaterMesument(480); // Show empty tank
      return;
    }

    if (
      percentage === undefined ||
      percentage === null ||
      isNaN(percentage)
    ) {
      console.warn('Invalid or missing water level data:', percentage);
      setTankWaterMesument(480); // Show empty tank
      return;
    }

    if (percentage > 0 && percentage <= 3) {
      setTankWaterMesument(390);
    } else if (percentage > 3 && percentage <= 5) {
      setTankWaterMesument(370);
    } else if (percentage > 5 && percentage <= 8) {
      setTankWaterMesument(350);
    } else if (percentage > 8 && percentage <= 10) {
      setTankWaterMesument(335);
    } else if (percentage > 10 && percentage <= 13) {
      setTankWaterMesument(310);
    } else if (percentage > 13 && percentage <= 15) {
      setTankWaterMesument(300);
    } else if (percentage > 15 && percentage <= 18) {
      setTankWaterMesument(280);
    } else if (percentage > 18 && percentage <= 20) {
      setTankWaterMesument(270);
    } else if (percentage > 20 && percentage <= 25) {
      setTankWaterMesument(260);
    } else if (percentage > 25 && percentage <= 30) {
      setTankWaterMesument(250);
    } else if (percentage > 30 && percentage <= 35) {
      setTankWaterMesument(230);
    } else if (percentage > 35 && percentage <= 40) {
      setTankWaterMesument(210);
    } else if (percentage > 40 && percentage <= 45) {
      setTankWaterMesument(190);
    } else if (percentage > 45 && percentage <= 50) {
      setTankWaterMesument(175);
    } else if (percentage > 50 && percentage <= 55) {
      setTankWaterMesument(160);
    } else if (percentage > 55 && percentage <= 60) {
      setTankWaterMesument(140);
    } else if (percentage > 60 && percentage <= 65) {
      setTankWaterMesument(125);
    } else if (percentage > 65 && percentage <= 70) {
      setTankWaterMesument(110);
    } else if (percentage > 70 && percentage <= 75) {
      setTankWaterMesument(95);
    } else if (percentage > 75 && percentage <= 80) {
      setTankWaterMesument(75);
    } else if (percentage > 80 && percentage <= 85) {
      setTankWaterMesument(60);
    } else if (percentage > 85 && percentage <= 90) {
      setTankWaterMesument(45);
    } else if (percentage > 90 && percentage <= 95) {
      setTankWaterMesument(25);
    } else if (percentage > 95 && percentage <= 99) {
      setTankWaterMesument(5);
    } else if (percentage > 99 && percentage <= 100) {
      const fluctuation = 100 - percentage; // e.g., 0.5% fluctuation
      setTankWaterMesument(-20); // Fully full — adjust if needed visually
    } else if (percentage === 0) {
      setTankWaterMesument(480); // Completely empty tank
    }
  }, [getAllDeviceListByIdResponse?.data]);


  return (
    <>
      <div>
        <div style={containerStyle} ref={mapRef} />
      </div>
      <div className={Styles.HomePageContainer}>
        <div className={Styles.HomePageMyTankContainer}>
          <div className={Styles.HomePageMyTankContainerHeader}>
            <Box sx={{ minWidth: 160 }}>
              <h2> {getAllDeviceListByIdResponse?.data?.devicename}</h2>
            </Box>

            {/* <Box sx={{ minWidth: 100 }}>
              <FormControl
                fullWidth
                className={Styles.useageAndForecostDropDown}
              >
                <NativeSelect
                  inputProps={{
                    id: "uncontrolled-native",
                  }}
                  onChange={usgaeAndForecast}
                  defaultValue={"1 Week"}
                  className={Styles.DRopDownListTankDetailsdata}
                >
                  <option value={"1 Week"}>1 Week </option>
                  <option value={"1 month"}>1 month</option>
                  <option value={"3 month"}>3 month</option>
                  <option value={"6 month"}>6 month</option>
                </NativeSelect>
              </FormControl>
            </Box> */}

            {/* <ToggleButtonGroup
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
            </ToggleButtonGroup> */}
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
                          {getAllDeviceListByIdResponse?.data?.waterlevelPercentage >= 0 && getAllDeviceListByIdResponse?.data?.waterlevelPercentage <= 33 ? (
                            <p
                              className={
                                Styles.homepageTankContainerTooltipWaterlevelTextContentTextStatus
                              }
                            >
                              Low
                            </p>
                          ) : getAllDeviceListByIdResponse?.data?.waterlevelPercentage >= 34 && getAllDeviceListByIdResponse?.data?.waterlevelPercentage <= 66 ? (
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
                            {Math.floor(getAllDeviceListByIdResponse?.data?.waterlevel)} mm

                          </p>
                          <p
                            className={
                              Styles.homepageTankContainerTooltipWaterlevelNumberContainerPercentage
                            }
                          >
                            {Math.floor(getAllDeviceListByIdResponse?.data?.waterlevelPercentage)}%
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
                          {getAllDeviceListByIdResponse?.data?.waterlevelPercentage !== null &&
                            getAllDeviceListByIdResponse?.data?.waterlevelPercentage !== undefined ? (
                            gallons === false ? (
                              <>
                                {Math.floor(
                                  getAllDeviceListByIdResponse?.data?.waterlevelPercentage
                                )}
                                %
                                <span className={
                                  Styles.HomePageAverageBoxCurrentWaterLevel
                                }>
                                  ({Math.floor(getAllDeviceListByIdResponse?.data?.actualVolume)}/
                                  {getAllDeviceListByIdResponse?.data?.tankcapacity}G)
                                </span>
                              </>
                            ) : (
                              <>
                                {Math.floor(
                                  getAllDeviceListByIdResponse?.data?.waterlevelPercentage
                                )}
                                %
                                <span className={
                                  Styles.HomePageAverageBoxCurrentWaterLevel
                                }>
                                  ({Math.floor(getAllDeviceListByIdResponse?.data?.actualVolume * 3.7)}
                                  /3700L)
                                </span>
                                {/* </> */}
                              </>
                            )
                          ) : (
                            "-"
                          )}

                          <span
                            className={
                              Styles.HomePageAverageBoxCurrentWaterLevel
                            }
                          >

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
                          {getAllDeviceListByIdResponse?.data === undefined ||
                            getAllDeviceListByIdResponse?.data === null ? (
                            "-" // Display an empty value if liveData is undefined or null */}
                          ) : (
                            <>
                              {/* {/ Show liveData.estimatedUsage, even if it is 0 /} */}
                              {gallons === false ? (
                                <>
                                  {Math.floor(
                                    getAllDeviceListByIdResponse?.data
                                      ?.estimatedUsage
                                  )}
                                </>
                              ) : (
                                <>
                                  {Math.floor(
                                    getAllDeviceListByIdResponse?.data
                                      ?.estimatedUsage
                                  )}
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
                          {getAllDeviceListByIdResponse?.data?.averageDailyUse ? (
                            <>{getAllDeviceListByIdResponse?.data?.averageDailyUse}{" "}% </>
                          ) : (
                            "-" // Empty output if actualVolume is not present
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
                  // data={UseageData.data}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis dataKey="usage" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#5BD1DC"
                    fill="#abe8eb"
                  />
                </AreaChart>
              ) : (
                <AreaChart
                  width={600}
                  height={400}
                  // data={ForeCostData.data}
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
                  <Tooltip />
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
                  className={Styles.HomePageMyTankSignalAndBatteryCartIconContent}
                >
                  <p
                    className={Styles.HomePageMyTankSignalAndBatteryCartIconTitle}
                  >
                    Battery Status
                  </p>
                  <p
                    className={Styles.HomePageMyTankSignalAndBatteryCartIconText}
                  >
                    {getAllDeviceListByIdResponse?.data?.batterystatus
                      ? getAllDeviceListByIdResponse.data.batterystatus
                      : '-'}
                  </p>
                </div>

                <p className={Styles.HomePageMyTankSignalAndBatteryCartIcon}>

                  {getAllDeviceListByIdResponse?.data?.batterystatus > "0%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <= "10%" ? (
                    <img src={Battery1} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "10%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "20%" ? (
                    <img src={Battery2} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "20%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "30%" ? (
                    <img src={Battery3} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "30%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "40%" ? (
                    <img src={Battery4} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "40%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "50%" ? (
                    <img src={Battery5} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "50%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "60%" ? (
                    <img src={Battery6} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "60%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "70%" ? (
                    <img src={Battery7} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "70%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "80%" ? (
                    <img src={Battery8} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "80%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "90%" ? (
                    <img src={Battery9} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.batterystatus >
                    "90%" &&
                    getAllDeviceListByIdResponse?.data?.batterystatus <=
                    "100%" ? (
                    <img src={Battery10} className={Styles.Battery} />
                  ) : (
                    ""
                  )}{""}
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
                    {getAllDeviceListByIdResponse?.data?.wifistatus ? getAllDeviceListByIdResponse?.data?.wifistatus : "-"}
                  </p>
                </div>
                <p className={Styles.HomePageMyTankSignalAndBatteryCartIcon}>
                  {getAllDeviceListByIdResponse?.data?.wifistatus === "Okay" ? (
                    <img src={Wifi2} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.wifistatus ===
                    "Amazing" ? (
                    <img src={Wifi4} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.wifistatus ===
                    "Very Good" ? (
                    <img src={Wifi3} className={Styles.Battery} />
                  ) : getAllDeviceListByIdResponse?.data?.wifistatus ===
                    "Not Good" ? (
                    <img src={Wifi1} className={Styles.Battery} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </>
          {/* );
          })} */}
        </div>
        <div className="devicemain">
          <div
            className={
              Styles.HomePageDeviceManagementAndHardwareInformationContainer
            }
          >
            <div className={Styles.HomePageDeviceManagement}>
              <div className={Styles.HomePageDeviceManagementHeaderContent}>
                <p className={Styles.HomePageDeviceManagementText}>
                  Device Maintenance
                </p>
              </div>
              <div className={Styles.HomePageDeviceManagementTextContent}>
                <div className={Styles.HomePageDeviceManagementContentData}>
                  <p
                    className={Styles.HomePageDeviceManagementContentDataCircle}
                  ></p>
                  <p className={Styles.HomePageDeviceManagementContentDataText}>
                    Replace filter
                  </p>
                  <p
                    className={
                      Styles.HomePageDeviceManagementContentDataTextWork
                    }
                  >
                    in every
                  </p>
                </div>
                <div>
                  <p className={Styles.ReplaceFilter}>{`${"180"}`} Days</p>
                </div>
              </div>
              <div className={Styles.HomePageDeviceManagementTextContent}>
                <div className={Styles.HomePageDeviceManagementContentData}>
                  <p
                    className={Styles.HomePageDeviceManagementContentDataCircle}
                  ></p>
                  <p className={Styles.HomePageDeviceManagementContentDataText}>
                    Tank cleanup
                  </p>
                  <p
                    className={
                      Styles.HomePageDeviceManagementContentDataTextWork
                    }
                  >
                    in
                  </p>
                </div>
                <p
                  className={
                    Styles.HomePageDeviceManagementContentDataTextWorkDays
                  }
                >
                  {getAllDeviceListByIdResponse.data?.tankCleanupRemainingDays}{" "}Days
                  {/* {getAllDeviceListByIdResponse?.data?.tankCleanup}Days */}
                </p>
              </div>

              <div className={Styles.HomePageDeviceManagementTextContentLine}>
                <div className={Styles.HomePageDeviceManagementContentData}>
                  <p
                    className={Styles.HomePageDeviceManagementContentDataCircle}
                  ></p>
                  <p className={Styles.HomePageDeviceManagementContentDataText}>
                    Lorem ipsum dolor sit amet consectetur. Id placerat libero
                    at venenatis congue nascetur elementum.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className={Styles.HomePageDeviceManagement}>

            {/* <div className={Styles.HomePageDeviceManagement}> */}
            <img src={waterdrop} style={{
              width: '100%',
              height: "auto"
              // marginleft: '20px',
              // display:'none'
            }} className={Styles.HomePageDeviceManagement}></img>
          </div>
        </div>

      </div>

      <div></div>
    </>
  );
}

export default MapAndGeolocation;
