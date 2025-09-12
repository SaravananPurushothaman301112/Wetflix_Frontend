import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { TextField, FormControl, InputAdornment, MenuItem, Select, colors } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./popup.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { ReactComponent as LocationIcon } from "../../assets/SvgIcons/LocationIcon.svg";
import { ReactComponent as LocationLocateIcon } from "../../assets/SvgIcons/LocationLocateIcon.svg";
import { useSelector } from "react-redux";
import WetflixLogo from "../../assets/images/WetflixLogo.png";
import { ReactComponent as WetflixxLogo } from "../../assets/SvgIcons/LoginImage.svg"
import { getDeviceApproved, clearDeviceApproved } from "../../Redux/Actions"
import { useNavigate } from "react-router-dom";
import { getDeviceRejected, clearDeviceRejected } from "../../Redux/Actions";
import {
  getDeviceDataByDeviceID,
  getAllDeviceListByIdResponse,
  getForcostDeviceData,
  getUseageDeviceData,
  getUserPlan
} from "../../Redux/Actions";
import { toast } from "react-toastify";

function PopUp({ onClose, onSuccess }) {

  const devicelocationRef = useRef();
  const deviceNameRef = useRef();
  const installerNameRef = useRef();
  const deviceaddressRef = useRef();
  const tankCapacityRef = useRef();
  const numberOfTanksRef = useRef();
  const disFloorToSensorRef = useRef();
  const disFloorToWaterMarkRef = useRef();
  const disSensorToWaterSurfaceRef = useRef();
  // const [tankType, setTankType] = React.useState("");

  const [lastRefillDate, setLastRefillDate] = React.useState(null);
  const [lastTankCleaningDate, setLastTankCleaningDate] = React.useState(null);
  const [devicelocation, setDevicelocation] = React.useState("");
  // const [age, setAge] = React.useState("");
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const approvedResponse = useSelector(
    (state) => state?.DeviceList?.getDeviceApproved
  );

  useEffect(() => {
    if (approvedResponse) {
      console.log("Device approval response:", approvedResponse);

      if (approvedResponse?.statusCode === 200) {
        onClose();       // Close the popup
        onSuccess?.();   // Notify the parent (HomePage) to refresh the data
      }
    }
  }, [approvedResponse]);



  const UserIDDataHome = JSON.parse(localStorage.getItem("auth"));

 
  const handleLocateClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationStr = `${latitude}, ${longitude}`;
        setDevicelocation(locationStr);

        const isValid = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(locationStr.trim());
        setLocationFormatError(!isValid);
        setErrors((prev) => ({
          ...prev,
          deviceLocation: !isValid,
        }));
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  };

  // const dispatch = useDispatch();
  // const [isPopupOpen, setPopupOpen] = useState(true);
  const rejectResponse = useSelector(state => state.DeviceList.getDeviceRejected);
 

  //   if (rejectResponse) {
  //     console.log("Reject Response: ", rejectResponse);  // Should log { rejectid: "dfjhigfer" }

  //     // You can also use rejectResponse.rejectid here
  //     if (rejectResponse.rejectid) {
  //       console.log("Reject ID: ", rejectResponse.rejectid);  // Logs 'dfjhigfer'
  //     }
  //   }
  // }, [rejectResponse]);

  const handleDenyClick = () => {
    const deviceid = deviceIdFromMessage;
    const userid = UserIDDataHome.userId.toString(); // 👈 Convert to string

    const payload = {
      deviceid,
      userid, // now it's a string
    };

    // Dispatch the action (saga will handle the async part)
    dispatch(getDeviceRejected(payload));
  };

  useEffect(() => {
    if (rejectResponse) {
      console.log("Reject Response: ", rejectResponse);

      // Check if the statusCode is 200 and show the API message
      if (rejectResponse.statusCode === 200) {
        // Show success toast with the message from the API
        toast.success(rejectResponse.message || "Device rejected successfully!");
        onClose();
        // Close the popup if rejection is successful
        // setPopupOpen(false);
      } else {
        // Show error toast with the message from the API (if available)
        toast.error(rejectResponse.message || "Device rejection failed.");
      }
      dispatch(clearDeviceRejected());
    }
  }, [rejectResponse]); // Dependency on rejectResponse





  const handleChange = (event) => {
    const value = event.target.value;
    // setAge(value);
    // setNumberOfTanks(Number(e.target.value));
    // Clear tankType error if value is selected
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tankType: false,
      }));
    }
  };


  const notificationList = useSelector(
    (state) => state?.Notification?.getNotificationSuccessfull
  );

  const notificationMessage = notificationList?.data?.find((item) =>
    /^The device with ID .+ has been created\/updated\.$/.test(item.message)
  )?.message;
  const deviceIdFromMessage = notificationMessage?.match(/ID (.+) has been created\/updated\./)?.[1];

  useEffect(() => {
    const deviceName = notificationList?.data?.find((item) =>
      /^The device with ID .+ has been created\/updated\.$/.test(item.message)
    )?.deviceInfo?.devicename;

    if (deviceNameRef.current && deviceName) {
      deviceNameRef.current.value = deviceName;
    }
  }, [notificationList]);




  const popperModifiers = [
    {
      name: "zIndex",
      enabled: true,
      phase: "write",
      fn: ({ state }) => {
        state.styles.popper.zIndex = "20000";
      },
    },
  ];

  const dispatch = useDispatch();
  const deviceApprovedData = useSelector(state => state.DeviceList.getDeviceApproved);

  // const handleAcceptClick = async (e) => {

  //   console.log("working");
  //       e.preventDefault();

    
  //   const isNumberOfTanksEmpty =
  //     !numberOfTanksRef.current?.value ||
  //     isNaN(numberOfTanksRef.current?.value) ||
  //     Number(numberOfTanksRef.current?.value) <= 0;

  //   const isTankCapacityEmpty = !tankCapacityRef.current?.value;
  //   const isdisFloorToSensor = !disFloorToSensorRef.current?.value;
  //   const isdisFloorToWaterMark = !disFloorToWaterMarkRef.current?.value;
  //   const isdisSensorToWaterSurface = !disSensorToWaterSurfaceRef.current?.value
  //   const isTankTypeEmpty = !age;
  //   const isDeviceLocationEmpty = !devicelocation;


   
  //   const newErrors = {
  //     numberOfTanks: isNumberOfTanksEmpty,
  //     tankCapacity: isTankCapacityEmpty,
  //     tankType: isTankTypeEmpty,
  //     deviceLocation: isDeviceLocationEmpty,
  //     disFloorToSensor: isdisFloorToSensor,
  //     disFloorToWaterMark: isdisFloorToWaterMark,
  //     disSensorToWaterSurface: isdisSensorToWaterSurface
  //   };

  //   setErrors(newErrors);

  //   const hasError = Object.values(newErrors).some((err) => err === true);
  //   if (hasError) return;

  //   const deviceid = deviceIdFromMessage;
  //   const userid = UserIDDataHome.userId;

  //   console.log(disSensorToWaterSurfaceRef.current?.value,"disSensorToWaterSurfaceRef.current?.value");

  //   const payload = {
  //     deviceid,
  //     userid,
  //     deviceName: deviceNameRef.current?.value,
  //     installerName: installerNameRef.current?.value,
  //     deviceaddress: deviceaddressRef.current?.value,
  //     tankcapacity: tankCapacityRef.current?.value,
  //     tankcount: numberOfTanksRef.current?.value,
  //     tanktype: age,
  //     lastRefillDate: lastRefillDate?.format("YYYY-MM-DD"),
  //     lastTankCleaningDate: lastTankCleaningDate?.format("YYYY-MM-DD"),
  //     devicelocation,
  //     disFloorToSensor : disFloorToSensorRef.current?.value,
  //     disFloorToWaterMark: disFloorToWaterMarkRef.current?.value,
  //     disSensorToWaterSurface: disSensorToWaterSurfaceRef.current?.value

  //   };
  //   console.log(payload,"Payload data");
    

  //   // const response = await dispatch(getDeviceApproved(payload));
  //   // console.log(response,"response");


  // };


  const handleAcceptClick = async (e) => {
  try {
    e.preventDefault(); // Prevent page reload if inside a form
    console.log("working - Button Clicked");

    // ✅ Step 1: Validate form fields
    const isNumberOfTanksEmpty =
      !numberOfTanksRef.current?.value ||
      isNaN(numberOfTanksRef.current?.value) ||
      Number(numberOfTanksRef.current?.value) <= 0;

    const isTankCapacityEmpty = !tankCapacityRef.current?.value;
    const isdisFloorToSensor = !disFloorToSensorRef.current?.value;
    const isdisFloorToWaterMark = !disFloorToWaterMarkRef.current?.value;
    const isdisSensorToWaterSurface = !disSensorToWaterSurfaceRef.current?.value;
    // const isTankTypeEmpty = !age;
    const isDeviceLocationEmpty = !devicelocation;

    const newErrors = {
      numberOfTanks: isNumberOfTanksEmpty,
      tankCapacity: isTankCapacityEmpty,
      // tankType: isTankTypeEmpty,
      deviceLocation: isDeviceLocationEmpty,
      disFloorToSensor: isdisFloorToSensor,
      disFloorToWaterMark: isdisFloorToWaterMark,
      disSensorToWaterSurface: isdisSensorToWaterSurface,
    };

    // ✅ Update error state
    setErrors(newErrors);

    // ✅ Debug which fields failed
    const hasError = Object.values(newErrors).some((err) => err === true);
    if (hasError) {
      console.log("Validation failed. Errors found:", newErrors);
      return;
    }

    // ✅ Step 2: Double-check refs before building payload
    console.log("Ref values check:", {
      tankCapacity: tankCapacityRef.current?.value,
      numberOfTanks: numberOfTanksRef.current?.value,
      disFloorToSensor: disFloorToSensorRef.current?.value,
      disFloorToWaterMark: disFloorToWaterMarkRef.current?.value,
      disSensorToWaterSurface: disSensorToWaterSurfaceRef.current?.value,
    });

    // ✅ Step 3: Build payload
    const payload = {
      deviceid: deviceIdFromMessage,
      userid: UserIDDataHome?.userId,
      deviceName: deviceNameRef.current?.value,
      installerName: installerNameRef.current?.value,
      deviceaddress: deviceaddressRef.current?.value,
      tankcapacity: tankCapacityRef.current?.value,
      tankcount: numberOfTanksRef.current?.value,
      // tanktype: age,
      lastRefillDate: lastRefillDate?.format("YYYY-MM-DD") || null,
      lastTankCleaningDate: lastTankCleaningDate?.format("YYYY-MM-DD") || null,
      devicelocation,
      disFloorToSensor: disFloorToSensorRef.current?.value,
      disFloorToWaterMark: disFloorToWaterMarkRef.current?.value,
      disSensorToWaterSurface: disSensorToWaterSurfaceRef.current?.value,
    };

    console.log("Payload data ready to submit:", payload);

    // ✅ Step 4: Dispatch API call
    // Uncomment when ready
    // const response = await dispatch(getDeviceApproved(payload));
    // console.log("API Response:", response);

  } catch (error) {
    console.error("Error inside handleAcceptClick:", error);
  }
};

  useEffect(() => {
    if (deviceApprovedData?.statusCode === 200) {
      toast.success(deviceApprovedData.message);
      dispatch(clearDeviceApproved()); // clear after success
    } else if (deviceApprovedData?.statusCode === 400) {
      toast.error(deviceApprovedData.message);
      dispatch(clearDeviceApproved()); // clear after error
    } else if (deviceApprovedData?.message) {
      toast.error(deviceApprovedData.message);
      dispatch(clearDeviceApproved());
    }
  }, [deviceApprovedData, dispatch]);



  const [errors, setErrors] = React.useState({
    numberOfTanks: false,
    tankCapacity: false,
    tankType: false,
    deviceLocation: false,
    deviceLocationFormat: false,
    disFloorToSensor: false,
    disFloorToWaterMark:false,
    disSensorToWaterSurface:false
  });
  const isValidCoordinate = (value) => {
    const regex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/; // Matches "lat, lng" with optional decimals
    return regex.test(value.trim());
  };

  const deviceList = useSelector((device) => device.DeviceList.deviceDetails);

  



  const [locationFormatError, setLocationFormatError] = React.useState(false);
  return (
    <div className="modalOverlay">
      <div className="popupForm">
        <div className="innerPopup">
          <div className="popupLogoContainer">
            <WetflixxLogo />
          </div>


          <div className="firstRow">
            <div className="deviceNameProps">
              <p>Device name </p>
              <TextField
                inputRef={deviceNameRef}
                className="deviceNameFeild"
                name="name"
                placeholder="Enter device name"
                InputProps={{ readOnly: true }}
                disabled
              />

            </div>



            <div className="startDate" onClick={() => startDateRef.current?.focus()}>
              <p>Last refill</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={lastRefillDate}
                  onChange={(newValue) => setLastRefillDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      inputRef: startDateRef,
                      InputProps: {
                        style: {
                          backgroundColor: "#F8FAFC",
                          borderRadius: "5px",
                          border: "1px solid #E9EDF2",
                        },
                      },
                    },
                    popper: {
                      modifiers: popperModifiers,
                      placement: "bottom-start",
                      container: () => document.body,
                    },
                  }}
                />

              </LocalizationProvider>
            </div>

            <div className="endDate" onClick={() => endDateRef.current?.focus()}>
              <p>Last Tank Cleaning</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={lastTankCleaningDate}
                  onChange={(newValue) => setLastTankCleaningDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      inputRef: endDateRef,
                      InputProps: {
                        style: {
                          backgroundColor: "#F8FAFC",
                          borderRadius: "5px",
                          border: "1px solid #E9EDF2",
                        },
                      },
                    },
                    popper: {
                      modifiers: popperModifiers,
                      placement: "bottom-start",
                      container: () => document.body,
                    },
                  }}
                />

              </LocalizationProvider>
            </div>
          </div>

          <div className="secondRow">
            <div className="deviceNameProps">
              <p>Number of Tanks <span style={{ color: 'red' }}>*</span></p>
              <TextField
                inputRef={numberOfTanksRef}
                className="deviceNameFeild"
                name="numberOfTanks"
                placeholder="Enter number of tanks"
                type="number"
                error={errors.numberOfTanks}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only numeric input
                  if (!isNaN(value)) {
                    numberOfTanksRef.current.value = value;

                    // Clear error if the input becomes valid
                    if (value && Number(value) > 0) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        numberOfTanks: false, // <-- corrected this line
                      }));
                    }
                  }
                }}
              />

              {errors.numberOfTanks && (
                <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                  * Please enter a valid number of tanks.
                </p>
              )}

            </div>

            <div className="installerName">
              <p>Installer name</p>
              <TextField
                inputRef={installerNameRef}
                className="deviceNameFeild"
                name="name"
                placeholder="Enter Installer name"
              />
            </div>

            <div className="installerName">
              <p>Device address</p>
              <TextField
                inputRef={deviceaddressRef}
                className="deviceNameFeild"
                name="name"
                placeholder="Enter Device address"
              />
            </div>
          </div>

          <div className="thirdRow">
            <div className="deviceNameProps">
              <p className="titleAddress">Device location <span style={{ color: 'red' }}>*</span></p>
              <FormControl
                sx={{ width: "100%", background: "#F8FAFC" }}
                error={errors.deviceLocation}
              >
                <OutlinedInput
                  value={devicelocation}
                  readOnly
                  onClick={handleLocateClick}
                  startAdornment={
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <LocationLocateIcon style={{ cursor: "pointer" }} onClick={handleLocateClick} />
                    </InputAdornment>
                  }
                />


              </FormControl>
              {/* {errors.deviceLocation && (
                <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                  * Device location is required.
                </p>
              )} */}
              {errors.deviceLocation && (
                <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                  {locationFormatError
                    ? "* Invalid format. Use: latitude, longitude"
                    : "* Device location is required."}
                </p>
              )}

            </div>
            <div className="tankCapacity">
              <p>Tank capacity  <span style={{ color: 'red' }}>*</span></p>
              <TextField
                inputRef={tankCapacityRef}
                className="deviceNameFeild"
                name="tankCapacity"
                placeholder="Enter Tank capacity"
                type="number"
                error={errors.tankCapacity}
                inputProps={{ min: 1 }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  if (e.target.value && Number(e.target.value) > 0) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      tankCapacity: false,
                    }));
                  }
                }}
              />

              {errors.tankCapacity && (
                <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                  * Tank capacity is required.
                </p>
              )}

            </div>

{/* 
            <div className="tankType">
              <p>Tank type <span style={{ color: 'red' }}>*</span></p>

              <FormControl
                sx={{ minWidth: "100%", backgroundColor: "#F8FAFC" }}
                error={errors.tankType}
              >
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Select tank type</em>
                  </MenuItem>
                  <MenuItem value="type_a">Type A</MenuItem>
                  <MenuItem value="type_b">Type B</MenuItem>
                </Select>

              </FormControl>
              {errors.tankType && (
                <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                  * Tank type is required.
                </p>
              )}

            </div> */}

            <div className="tankCapacity">
              <p>Distance from floor to sensor  <span style={{ color: 'red' }}>*</span></p>
              <TextField
                inputRef={disFloorToSensorRef}
                className="deviceNameFeild"
                name="disFloorToSensor"
                placeholder="Enter Distance from floor to sensor"
                type="number"
                error={errors.disFloorToSensor}
                inputProps={{ min: 1 }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  if (e.target.value && Number(e.target.value) > 0) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      disFloorToSensor: false,
                    }));
                  }
                }}
              />

              {errors.disFloorToSensor && (
                <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                  *Distance from floor to sensor is required.
                </p>
              )}

            </div>

            {/*  */}

            <div className="tankCapacity">
              <p> Distance from floor to full water mark  <span style={{ color: 'red' }}>*</span></p>
              <TextField
                inputRef={disFloorToWaterMarkRef}
                className="deviceNameFeild"
                name="disFloorToWaterMark"
                placeholder="Enter Distance from floor to full water mark"
                type="number"
                error={errors.disFloorToWaterMark}
                inputProps={{ min: 1 }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  if (e.target.value && Number(e.target.value) > 0) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      disFloorToWaterMark: false,
                    }));
                  }
                }}
              />

              {errors.disFloorToWaterMark && (
                <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                  * Distance from floor to full water mark is required.
                </p>
              )}

            </div>

{/*  */}
            <div className="tankCapacity">
              <p> Distance from sensor to water surface <span style={{ color: 'red' }}>*</span></p>
              <TextField
                inputRef={disSensorToWaterSurfaceRef}
                className="deviceNameFeild"
                name="disSensorToWaterSurface"
                placeholder="Enter Distance from sensor to water surface"
                type="number"
                error={errors.disSensorToWaterSurface}
                inputProps={{ min: 1 }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  if (e.target.value && Number(e.target.value) > 0) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      disSensorToWaterSurface: false,
                    }));
                  }
                }}
              />

              {errors.disSensorToWaterSurface && (
                <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                  * Distance from floor to full water mark is required.
                </p>
              )}

            </div>

          </div>

          <div className="buttons">
            <button className="denyButton" onClick={handleDenyClick}>Deny</button>

            <button className="acceptButton" onClick={handleAcceptClick}>
              Accept
            </button>          
            </div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
