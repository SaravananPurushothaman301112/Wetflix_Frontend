import React, { useEffect, useState } from "react";
import "./Booking.scss";
import { ReactComponent as PhoneIcon } from "../../../assets/SvgIcons/PhoneIcon.svg";
import { ReactComponent as ImagePlaceHolderIcon } from "../../../assets/SvgIcons/ImagePlaceHolderIcon.svg";
import { ReactComponent as BookNowRightIcon } from "../../../assets/SvgIcons/BookNowRightIcon.svg";
import { ReactComponent as RightArrowIcon } from "../../../assets/SvgIcons/RightArrow.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  getAllBooking
} from "../../../Redux/Actions";
import {
  Container,
  FormControl,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { isValidPhoneNumber } from "libphonenumber-js";
import { ReactComponent as AccountHumanIcon } from "../../../assets/SvgIcons/AccountHumanIcon.svg";
import { ReactComponent as HomeIcon } from "../../../assets/SvgIcons/HomeIcon.svg";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { ReactComponent as LocationIcon } from "../../../assets/SvgIcons/LocationIcon.svg";
import { ReactComponent as LocationLocateIcon } from "../../../assets/SvgIcons/LocationLocateIcon.svg";
import { ReactComponent as SuccessBookingHomeIcon } from "../../../assets/SvgIcons/SuccessBookingHomeIcon.svg";
import { ReactComponent as SuccessBookingDateIcon } from "../../../assets/SvgIcons/SuccessBookingDateIcon.svg";
import { ReactComponent as SuccessBookingTimeIcon } from "../../../assets/SvgIcons/SuccessBookingTimeIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/SvgIcons/EditIcon.svg";
import MuiPhoneNumber from "material-ui-phone-number";
import SuccessImage from "../../../assets/images/SuccessImage.png";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Firstcard from "../../../assets/images/Firstcard.png";
import secondcardTwo from "../../../assets/images/secondcardTwo.png";
import thirdcard from "../../../assets/images/thirdcard.png";
import secondcard from "../../../assets/images/secondcard.png";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, addBooking, createBookingRespClear } from "../../../Redux/Actions";
import { toast } from "react-toastify";
import { LinkTwoTone, Today } from "@mui/icons-material";
import axios from "axios";
import bookingTechnicianImage from "../../../assets/images/bookingTechnician.png";
import TankDisposal from "../../../assets/images/TankDisposal.jpg"
import orderTruck from "../../../assets/images/orderTruck.png";
import waterTank from "../../../assets/images/waterTank.png";
// import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// dayjs.extend(utc);
dayjs.extend(timezone);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",

  height: "90%",
  bgcolor: "background.paper",
  border: "1px solid #c8c5c5",
  boxShadow: 24,

  p: 4,
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
};
const styleChild = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "1px solid #c8c5c5",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const getCurrentTimeInMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// Function to convert time string (e.g., '10:00AM') to minutes
const timeToMinutes = (time) => {
  const [hour, minute] = time.split(":");
  const period = time.slice(-2); // 'AM' or 'PM'
  let hoursIn24Format = parseInt(hour, 10);

  if (period === "PM" && hoursIn24Format !== 12) {
    hoursIn24Format += 12;
  }
  if (period === "AM" && hoursIn24Format === 12) {
    hoursIn24Format = 0;
  }

  return hoursIn24Format * 60 + parseInt(minute, 10);
};

// Function to check if a time slot is in the past
const isPastTime = (time, selectedDate) => {
  const [hours, minutes] = time.split(':');
  const period = time.slice(-2); // 'AM' or 'PM'
  let hoursIn24Format = parseInt(hours, 10);

  if (period === "PM" && hoursIn24Format !== 12) {
    hoursIn24Format += 12;
  }
  if (period === "AM" && hoursIn24Format === 12) {
    hoursIn24Format = 0;
  }

  const timeInMinutes = hoursIn24Format * 60 + parseInt(minutes, 10);
  const now = new Date();
  const nowTimeInMinutes = now.getHours() * 60 + now.getMinutes();
  const selectedDateTime = new Date(selectedDate);
  const selectedDateStr = selectedDateTime.toDateString();
  const nowDateStr = now.toDateString();

  if (selectedDateStr === nowDateStr) {
    return timeInMinutes < nowTimeInMinutes;
  }

  return false;
};





const Booking = () => {
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item

  const handleOpen = (itemId) => {
    setOpen(true);
    setSelectedItemId(itemId); // Store the selected item
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItemId(null); // Clear selected item when closing
  };
  const dispatch = useDispatch();

  const [openModel, setOpenMadel] = useState(false);
  const [modelSteps, setModelSteps] = useState("firstStep");

  const handleOpenModel = () => {
    setOpenMadel(true);
  };

  const handleCloseModel = () => {
    setAlignment("");
    SetModelData({
      firstname: "",
      lastname: "",
      phonenumber: "",
      description: "test",
      bookingaddress: "",
      bookingdatetime: dayjs(),
      selectTime: "",
      bookingtype: "",
      userid: authUser?.userId,
    });

    // Reset validation errors
    setFirstNameError(false);
    setLastNameError(false);
    setPhoneError(false);
    setAddressError(false);
    setBookingdatetimeError(false);
    setBookingtypeError(false);
    setErrorMessage("");

    setOpenMadel(false);
  };



  const [bookingTypeAutoFill, setBookingTypeAutoFill] = useState();

  const createBookingDetails = useSelector(
    (booking) => booking.Booking.createBookingDetails
  );

  const [alignment, setAlignment] = useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [openChild, setOpenChild] = useState(false);
  const haandleOpen = () => {
    setOpenChild(true);
  };
  const haandleClose = () => {
    setOpenChild(false);
    if (!openChild) {
      SetModelData('');
    }
  };

  console.log(createBookingDetails, "createBookingDetails");

  const DateTimeHeaderStyle = {
    color: "#1F1F1F",
    fontFamily: "Figtree",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "24px",
  };

  const MorAftEveStyle = {
    color: "#4D8BFF",
    fontFamily: "Figtree",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "20px",
  };

  const [selectedDate, setSelectedDate] = useState();

  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      <div className="popupImageContainer">
        <img src={Firstcard} alt="" className="popupImage" />{" "}
        <p className="popupImageText">Fill in general information</p>
      </div>
    </Typography>,
    <Typography key="3" color="text.primary">
      <div className="popupImageContainer">
        <img src={secondcardTwo} alt="" className="popupImage" />{" "}
        <p className="popupImageText">Choose Date & Time</p>
      </div>
    </Typography>,
    <Typography key="3" color="text.primary">
      <div className="popupImageContainer">
        <img src={thirdcard} alt="" className="popupImage" />{" "}
        <p className="popupImageText">Book your service</p>
      </div>
    </Typography>,
  ];

  const breadcrumbsData = [
    <Typography key="3" color="text.primary">
      <div className="popupImageContainer">
        <img src={Firstcard} alt="" className="popupImage" />{" "}
        <p className="popupImageText">Fill in general information</p>
      </div>
    </Typography>,
    <Typography key="3" color="text.primary">
      <div className="popupImageContainer">
        <img src={secondcard} alt="" className="popupImage" />{" "}
        <p className="popupImageText">Choose Date & Time</p>
      </div>
    </Typography>,
    <Typography key="3" color="text.primary">
      <div className="popupImageContainer">
        <img src={thirdcard} alt="" className="popupImage" />{" "}
        <p className="popupImageText">Book your service</p>
      </div>
    </Typography>,
  ];


  const authUser = JSON.parse(localStorage.getItem("auth"));
  console.log("authUserauthUserauthUser", authUser?.userId)


  const [modelData, SetModelData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    description: "test",
    bookingaddress: "",
    bookingdatetime: dayjs(),
    selectTime: alignment,
    // selectedDate: "",
    bookingtype: "",
    userid: authUser?.userId,
  });

  const today = dayjs().startOf("day");

  // Function to check if the date is a Sunday
  const isDisabledDate = (date) => {
    return date.day() === 0; // 0 represents Sunday in dayjs
  };

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [bookingdatetimeError, setBookingdatetimeError] = useState(false);
  const [bookingtypeError, setBookingtypeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTimeConfrim = () => {
    if (!alignment) {
      setErrorMessage("Please select a time slot."); // Show error message
      return; // Prevent navigation
    }

  }



  const handleContinue = () => {
    let isValid = true;

    if (!modelData.firstname) {
      setFirstNameError("First Name is required.");
      isValid = false;
    } else if (!nameRegex.test(modelData.firstname)) {
      setFirstNameError("First Name should only contain alphabets.");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Validate Last Name
    if (!modelData.lastname) {
      setLastNameError("Last Name is required.");
      isValid = false;
    } else if (!nameRegex.test(modelData.lastname)) {
      setLastNameError("Last Name should only contain alphabets.");
      isValid = false;
    } else {
      setLastNameError("");
    }

    const phoneValue = modelData.phonenumber.trim();

    if (!phoneValue || phoneValue.length <= 3) {
      // Only country code is entered
      setPhoneError("Phone number is required.");
      isValid = false;
    } else {
      const phoneNumber = parsePhoneNumberFromString(phoneValue);
      if (!phoneNumber || !phoneNumber.isValid()) {
        setPhoneError("Invalid phone number. Please enter a valid number.");
        isValid = false;
      } else {
        setPhoneError(""); // Clear error if valid
      }
    }
    if (!modelData.bookingaddress) {
      setAddressError("Address is required.");
      isValid = false;
    } else if (modelData.bookingaddress.length < 10) {
      setAddressError(" * Address must be at least 10 characters");
      isValid = false;
    } else {
      setAddressError(""); // Clear error if valid
    }

    // Proceed to the next step only if all validations pass
    if (isValid) {
      setModelSteps("secondStep");
    }



    if (isValid) {
      setModelSteps("secondStep");
    }

  };

  useEffect(() => {
    const savedData = localStorage.getItem("modelData");
    if (savedData) {
      SetModelData(JSON.parse(savedData));
    }
  }, []);


  const [date, setData] = useState(new Date());

  useEffect(() => {
    SetModelData({
      ...modelData,
      selectTime: alignment,

    });
  }, [alignment]);


  // Function to handle time selection and convert to 24-hour format
  const handleTimeSelection = (selectedTime) => {
    const selectedDate = modelData.bookingdatetime; // Current booking date as a Day.js object

    if (selectedDate && selectedTime) {
      // Parse selectedTime (e.g., '10:00AM')
      const [time, period] = selectedTime.split(/(AM|PM)/); // Split into time and period
      let [hours, minutes] = time.split(':').map(Number); // Get hours and minutes

      // Convert to 24-hour format
      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      // Combine selected time with the selected date
      const updatedDateTime = dayjs(selectedDate)
        .set('hour', hours)
        .set('minute', minutes)
        .second(0); // Optionally set seconds to 0

      // Log the selected time in 24-hour format
      console.log('Selected Time in 24-hour format:', updatedDateTime.format('YYYY-MM-DD HH:mm:ss'));

      // Update modelData with the updated date and time as a Day.js object
      SetModelData({
        ...modelData,
        bookingdatetime: updatedDateTime, // Store as a Day.js object (no UTC conversion)
        selectTime: selectedTime, // Save selected time as well
      });
    }
  };

  const headers = {
    headers: {
      Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NldG1vcmUuZnVsbGF1dGguY29tIiwiaWF0IjoxNzE0NzMyOTA1LCJwcm9qX2lkIjoib2xkOnNldG1vcmUiLCJ0eXBlIjoidXNlciIsInN1YiI6IjlhZGU5MTQ3LWQ4MzctNGQxZi1iZTNmLTYyMDk5MWEwMGJiYiIsImV4cCI6MTcxNDc0MDEwNSwianRpIjoiZTYxYzk2QjltSlh6ZndpRiJ9.yMdvQV1iFNxlQR_VnCeTaFLkBRStt2pzM_gIS6mxSb0"}`,
    },
    "Content-Type": "application/json",
  };

  const body = {
    staff_key: "data",
    service_key: "tank cleaning",
    customer_key: "92",
    start_time: "2024-05-19T19:00Z",
    end_time: "2024-05-20T20:00Z",
    comment: "Test comment",
    label: "Test Label",
  };

  const Data = [
    {
      id: 1,

      HeadText: "Book a Technician",
      imagePath: bookingTechnicianImage,
      Paragraph:
        "Lorem ipsum dolor sit amet consectetur. Id placerat libero at venenatis congue nascetur elementum.",

      Text: (
        
        <p
          className="BookingPharaText"
          id="technicalBook"
          //to="https://simonfabien.setmore.com/simon" TwoTone className="BookingLink"
          onClick={() => {
            handleOpenModel();
            SetModelData({
              ...modelData,
              description: "Technical Visit",
            });
            SetModelData({
              ...modelData,
              bookingtype: "Technical Visit",
            });
          }}
        >
          Book now{" "}
        </p>
      ),
    },
    {
      id: 2,

      HeadText: "Order truck borne water",
      imagePath: waterTank,
      Paragraph:
        "Lorem ipsum dolor sit amet consectetur. Id placerat libero at venenatis congue nascetur elementum.",
      Text: (
        <a href="https://wasa.gov.tt/WASA_home.html" className="BookingLink" target="_blank" rel="noopener noreferrer" id="watertankBook">
          Book now
        </a>

      ),
    },
    {
      id: 3,
      HeadText: "Book Tank cleaning service",
      imagePath: orderTruck,
      Paragraph:
        "Lorem ipsum dolor sit amet consectetur. Id placerat libero at venenatis congue nascetur.",
      Text: (
        <p
          className="BookingPharaText"
          id="serviceBook"
          //to="https://simonfabien.setmore.com/simon" className="BookingLink"
          onClick={() => {
            handleOpenModel();
            SetModelData({
              ...modelData,
              description: "Service Visit",
            });
            SetModelData({
              ...modelData,
              bookingtype: "Service Visit",
            });
          }}
        >
          Book now
        </p>
      ),
    },
    {
      id: 4,

      HeadText: "Derelict Tank Disposal",
      imagePath: TankDisposal,
      Paragraph:
        "Lorem ipsum dolor sit amet consectetur. Id placerat libero at venenatis congue nascetur elementum.",

      Text: (
        <p
          className="BookingPharaText"
          id="disposalBook"
          //to="https://simonfabien.setmore.com/simon" TwoTone className="BookingLink"
          onClick={() => {
            handleOpenModel();
            SetModelData({
              ...modelData,
              description: "Disposal Visit",
            });
            SetModelData({
              ...modelData,
              bookingtype: "Disposal Visit",
            });
          }
          }
        >
          Book now{" "}
        </p>
      ),
    },
  ];

  useEffect(() => {
    if (createBookingDetails && createBookingDetails?.statusCode === 200) {
      toast.success(createBookingDetails.message);
      setOpenMadel(false);
      setModelSteps("firstStep");
      dispatch(getAllBooking(authUser?.userId), []);
      dispatch(createBookingRespClear());
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000); 
    }
    if (createBookingDetails && createBookingDetails?.statusCode === 400) {
      toast.error(createBookingDetails.message);
      setOpenMadel(false);
      setModelSteps("firstStep");
      dispatch(createBookingRespClear())
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000); 
    }

  }, [createBookingDetails])


  const handleCloseModelBooking = () => {
    console.log('model data', modelData)
    dispatch(createBooking(modelData));
    setOpenMadel(false);
    setModelSteps("firstStep");

    if (createBookingDetails && createBookingDetails?.statusCode === 200) {
      toast.success(createBookingDetails.message);
      setOpenMadel(false);
      setModelSteps("firstStep");

    }
    if (createBookingDetails && createBookingDetails?.statusCode === 400) {
      toast.error(createBookingDetails.message);
      setOpenMadel(false);
      setModelSteps("firstStep");
      dispatch(createBookingRespClear())

    }

    setAlignment("");
    SetModelData({
      firstname: "",
      lastname: "",
      phonenumber: "",
      description: "test",
      bookingaddress: "",
      bookingdatetime: dayjs(),
      selectTime: "",
      bookingtype: "",
      userid: authUser?.userId,
    });

    // Reset validation errors
    setFirstNameError(false);
    setLastNameError(false);
    setPhoneError(false);
    setAddressError(false);
    setBookingdatetimeError(false);
    setBookingtypeError(false);
    setErrorMessage("");

  };

  const nameRegex = /^[A-Za-zÀ-ÿ]+(?:[-' ][A-Za-zÀ-ÿ]+)*$/; // Allows alphabets, hyphens, spaces, and apostrophes.

  const handleInputChange = (field, value) => {
    // Restrict input to alphabets only for First Name and Last Name
    if (field === "firstname" || field === "lastname") {
      if (!/^[A-Za-zÀ-ÿ\s-]*$/.test(value)) return; // Prevent numbers from being typed
    }

    SetModelData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation for required fields
    if ((field === "firstname" || field === "lastname") && /[0-9]/.test(value)) {
      alert("Name should only contain alphabets.");
      return; // Prevent further input
    }

    SetModelData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation for required fields
    if (field === "firstname") {
      if (!value.trim()) {
        setFirstNameError("First Name is required.");
      } else if (!nameRegex.test(value.trim())) {
        setFirstNameError("First Name should only contain alphabets.");
      } else {
        setFirstNameError("");
      }
    }

    if (field === "lastname") {
      if (!value.trim()) {
        setLastNameError("Last Name is required.");
      } else if (!nameRegex.test(value.trim())) {
        setLastNameError("Last Name should only contain alphabets.");
      } else {
        setLastNameError("");
      }
    }

    if (field === "bookingaddress") {
      setAddressError(!value.trim() ? "Address is required." : "");
    }

    // Validate phone number properly
    if (field === "phonenumber") {
      if (!value.trim() || value.length <= 3) {
        setPhoneError("Phone number is required.");
      } else {
        setPhoneError(""); // Clear error as user types
      }
    }
  }

  useEffect(() => {
    console.log("Component mounted");
  }, []);



  return (
    <div className="Booking">
      <div className="Top">
        <div className="HeadTextBooking">
          <div className="HeadText">
            <p>Book Technician or Plumber</p>
          </div>
          <div className="AddButton">
            <button>
              <PhoneIcon style={{ marginRight: "10px" }} />
              <a href="tel:+91-868-294-3549" style={{ color: "#fff" }}>8682943549</a>
            </button>
          </div>
        </div>
      </div>
      <div className="Center">
        <div className="Cards">
          {Data.map((data) => (
            <div className="One" key={data.id}>
              <div className="Top">
              <img
  src={data.imagePath}
  alt="Logo"
  loading="eager"
  style={{ maxWidth: "100%", height: "auto" }}
/>


                {/* <ImagePlaceHolderIcon /> */}
              </div>
              <div className="Bottom">
                <div className="HeadText">{data.HeadText}</div>
                <div className="Paragraph">{data.Paragraph}</div>
                <div className="BookingArrow">
                  {data.Text} <RightArrowIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="Bottom">
        <div className="Popup">
          <Modal
            open={openModel}
            onClose={(event, reason) => {
              if (reason === "backdropClick") return; // Prevent closing on outside click
              handleCloseModel();
            }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className="boxStyle">
              {modelSteps === "firstStep" ? (
                <div>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                  >
                    {breadcrumbs}
                  </Breadcrumbs>
                  <div className="FirstNameLastName">
                    <div className="initialName">
                      <label>First Name:</label>
                      <div className="FirstName" style={{ marginTop: "10px" }}>
                        <FormControl sx={{ width: "100%" }}>
                          <OutlinedInput
                            startAdornment={
                              <InputAdornment position="start">
                                <AccountHumanIcon />
                              </InputAdornment>
                            }
                            name="firstname"
                            onChange={(e) => handleInputChange("firstname", e.target.value)}
                            value={modelData.firstname || ""}
                            placeholder="First name"
                            error={firstNameError}
                          />
                        </FormControl>
                        {firstNameError && (
                          <p style={{ color: "red" }}>
                            First Name is required.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="finalName">
                      <label>Last Name:</label>
                      <div className="LastName" style={{ marginTop: "10px" }}>
                        <FormControl sx={{ width: "100%" }}>
                          <OutlinedInput
                            startAdornment={
                              <InputAdornment position="start">
                                <AccountHumanIcon />
                              </InputAdornment>
                            }
                            name="lastname"
                            onChange={(e) => handleInputChange("lastname", e.target.value)}
                            value={modelData.lastname || ""}
                            placeholder="Last name"
                            error={lastNameError}
                          />
                        </FormControl>
                        {lastNameError && (
                          <p style={{ color: "red" }}>Last Name is required.</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="PhoneNumberDropdown">
                    <div className="cellNumber">
                      <label>Phone:</label>
                      <div className="PhoneNumber" style={{ marginTop: "10px" }}>
                        <MuiPhoneNumber
                          defaultCountry={"tt"} // Change as needed
                          name="phonenumber"
                          value={modelData.phonenumber || ""}
                          onChange={(value) => handleInputChange("phonenumber", value)}
                          error={!!phoneError} // Convert error message to boolean
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          sx={{
                            "& .MuiInputBase-root::before": {
                              borderBottom: "none !important",
                            },
                            "& .MuiInputBase-root::after": {
                              borderBottom: "none !important",
                            },
                            "& .MuiInputBase-root:hover:not(.Mui-disabled)::before": {
                              borderBottom: "none",
                            },
                          }}
                        />
                      </div>
                      {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
                    </div>



                    <div className="bookingTypeFilled">
                      <label>Booking type:</label> <br />
                      <div className="Dropdown" style={{ marginTop: "10px" }}>
                        <TextField
                          sx={{ width: "100%" }}
                          //  id="filled-select-currency"
                          variant="filled"
                          value={modelData.bookingtype}
                          disabled
                          //   select
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <HomeIcon />
                              </InputAdornment>
                            ),
                          }}
                          name="bookingType"
                        // onChange={(e) =>
                        //   SetModelData({
                        //     ...modelData,
                        //     bookingType: e.target.value,
                        //   })
                        // }
                        >
                          {/* <MenuItem value="TechnicalVisit">
                             Technical visit 
                           </MenuItem>
                           <MenuItem value="ServiceVisit">
                             Service visit
                           </MenuItem> */}
                        </TextField>
                      </div>
                    </div>
                  </div>
                  <div className="AddressContainer">
                    <label>Address:</label>
                    <div className="Address" style={{ marginTop: "10px" }}>
                      <FormControl sx={{ width: "100%" }}>
                        <OutlinedInput
                          startAdornment={
                            <InputAdornment position="start">
                              <LocationIcon />
                            </InputAdornment>
                          }
                          name="bookingaddress"
                          value={modelData.bookingaddress}
                          onChange={(e) => {
                            const value = e.target.value;

                            // Allow only valid characters
                            if (/^[A-Za-z0-9\s,./#-]*$/.test(value)) {
                              SetModelData({ ...modelData, bookingaddress: value });
                              setAddressError(""); // Reset error while typing
                            } else {
                              setAddressError("Invalid address format.");
                            }
                          }}


                          placeholder="Urna urna sem, sodales nibh laoreet aliquam adipiscing pulvinar arcu."
                          error={!!addressError}
                        />
                      </FormControl>
                      {addressError && <p style={{ color: "red" }}>{addressError}</p>}
                    </div>
                  </div>

                  <div
                    className="StepOneButtons"

                  >

                    <div className="CancelButton">
                      <Button

                        onClick={() => handleCloseModel()}
                      >
                        cancel
                      </Button>
                    </div>
                    <div className="ContinueButton">
                      <Button
                        onClick={handleContinue}

                      >
                        Continue
                      </Button>
                    </div>

                  </div>
                </div>
              ) : modelSteps === "secondStep" ? (
                <Container>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                  >
                    {breadcrumbsData}
                  </Breadcrumbs>
                  <div className="DateTimePicker">
                    <div className="DatePicker">
                      {/* <div style={DateTimeHeaderStyle}>Select a date:</div> */}
                      <div className="Date">
                        <div>Select a date:</div>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateCalendar
                            value={dayjs(modelData.bookingdatetime)} // Ensure it's in Day.js format
                            onChange={(newValue) => {
                              const formattedDate = dayjs(newValue).format('YYYY-MMMM-DD'); // Ensure month is in words
                              console.log("Formatted Date:", formattedDate); // Debugging step
                              SetModelData({
                                ...modelData,
                                bookingdatetime: formattedDate, // Store formatted date
                              });
                            }}
                            disablePast
                            minDate={today}
                            shouldDisableDate={isDisabledDate}
                          />
                        </LocalizationProvider>


                      </div>
                    </div>
                    <div className="TimePicker">
                      <div style={DateTimeHeaderStyle}>Select a time slot:</div>
                      <div className="MrngAfnEve">
                        <div className="Morning">
                          <div style={MorAftEveStyle}>Morning</div>
                          <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={(event, selectedTime) => {
                              setAlignment(selectedTime);
                              handleTimeSelection(selectedTime); // Convert selected time to 24-hour format and update state
                            }}
                            aria-label="Time Selection"
                            sx={{
                              marginTop: "12px",
                              display: "flex",
                              flexWrap: "nowrap",
                            }}
                          >
                            <ToggleButton
                              value="10:00AM"
                              disabled={isPastTime("10:00AM", modelData.bookingdatetime)}
                            >
                              10:00AM
                            </ToggleButton>
                            <ToggleButton
                              value="10:30AM"
                              disabled={isPastTime("10:30AM", modelData.bookingdatetime)}
                            >
                              10:30AM
                            </ToggleButton>
                            <ToggleButton
                              value="11:00AM"
                              disabled={isPastTime("11:00AM", modelData.bookingdatetime)}
                            >
                              11:00AM
                            </ToggleButton>
                            <ToggleButton
                              value="11:30AM"
                              disabled={isPastTime("11:30AM", modelData.bookingdatetime)}
                            >
                              11:30AM
                            </ToggleButton>
                          </ToggleButtonGroup>

                        </div>
                        <div className="Morning">
                          <div style={MorAftEveStyle}>Afternoon</div>
                          <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={(event, selectedTime) => {
                              setAlignment(selectedTime);
                              handleTimeSelection(selectedTime); // Convert selected time to 24-hour format and update state
                            }}
                            aria-label="Time Selection"
                            sx={{
                              marginTop: "12px",
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <ToggleButton
                              value="12:00PM"
                              disabled={isPastTime("12:00PM", modelData.bookingdatetime)}
                            >
                              12:00PM
                            </ToggleButton>
                            <ToggleButton
                              value="12:30PM"
                              disabled={isPastTime("12:30PM", modelData.bookingdatetime)}
                            >
                              12:30PM
                            </ToggleButton>
                            <ToggleButton
                              value="01:00PM"
                              disabled={isPastTime("01:00PM", modelData.bookingdatetime)}
                            >
                              01:00PM
                            </ToggleButton>
                            <ToggleButton
                              value="01:30PM"
                              disabled={isPastTime("01:30PM", modelData.bookingdatetime)}
                            >
                              01:30PM
                            </ToggleButton>
                            <ToggleButton
                              value="02:00PM"
                              disabled={isPastTime("02:00PM", modelData.bookingdatetime)}
                            >
                              02:00PM
                            </ToggleButton>
                            <ToggleButton
                              value="02:30PM"
                              disabled={isPastTime("02:30PM", modelData.bookingdatetime)}
                            >
                              02:30PM
                            </ToggleButton>
                            <ToggleButton
                              value="03:00PM"
                              disabled={isPastTime("03:00PM", modelData.bookingdatetime)}
                            >
                              03:00PM
                            </ToggleButton>
                          </ToggleButtonGroup>

                        </div>
                        <div className="Morning">
                          <div style={MorAftEveStyle}>Evening</div>
                          <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={(event, selectedTime) => {
                              setAlignment(selectedTime);
                              handleTimeSelection(selectedTime); // Convert selected time to 24-hour format and update state
                            }}
                            aria-label="Time Selection"
                            sx={{
                              marginTop: "12px",
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >

                            <ToggleButton
                              value="05:00PM"
                              disabled={isPastTime("05:00PM", modelData.bookingdatetime)}
                            >
                              05:00PM
                            </ToggleButton>

                            <ToggleButton
                              value="05:30PM"
                              disabled={isPastTime("05:30PM", modelData.bookingdatetime)}
                            >
                              05:30PM
                            </ToggleButton>

                            <ToggleButton
                              value="06:00PM"
                              disabled={isPastTime("06:00PM", modelData.bookingdatetime)}
                            >
                              06:00PM
                            </ToggleButton>

                            <ToggleButton
                              value="06:30PM"
                              disabled={isPastTime("06:30PM", modelData.bookingdatetime)}
                            >
                              06:30PM
                            </ToggleButton>

                            <ToggleButton
                              value="07:00PM"
                              disabled={isPastTime("07:00PM", modelData.bookingdatetime)}
                            >
                              07:00PM
                            </ToggleButton>

                            <ToggleButton
                              value="07:30PM"
                              disabled={isPastTime("07:30PM", modelData.bookingdatetime)}
                            >
                              07:30PM
                            </ToggleButton>

                            <ToggleButton
                              value="08:00PM"
                              disabled={isPastTime("08:00PM", modelData.bookingdatetime)}
                            >
                              08:00PM
                            </ToggleButton>



                          </ToggleButtonGroup>

                        </div>


                      </div>
                    </div>
                  </div>
                  {errorMessage && ( // Add this block to display error
                    <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
                  )}
                  <div className="PreNexButtonSecondModal">
                    <Button
                      className="gobackButton"
                      variant="outlined"
                      onClick={() => setModelSteps("firstStep")}
                    >
                      Go Back
                    </Button>{" "}
                    {/* Add Go Back button */}
                    <Button
                      className="confirmButton"

                      variant="outlined"
                      onClick={() => {
                        if (!alignment) {
                          setErrorMessage(" * Please select Date and time slot."); // Show error message
                          return; // Prevent navigation
                        }
                        setErrorMessage(""); // Clear the error message
                        setModelSteps(""); // Proceed to next step
                      }}
                    >
                      Confirm
                    </Button>
                  </div>

                </Container>
              ) : (
                <Container>
                  <div style={{ textAlign: "center" }}>
                    <img src={SuccessImage} alt="Success" />
                    <h3>Your service request has been booked</h3>
                    <div>
                      We will reach out to you on your registered mobile number
                      for further communication
                    </div>

                    <div className="addressRow"
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: "36px",
                      }}
                    >
                      <div
                        className="One"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div style={{ height: "60px", width: "60px" }}>
                          <SuccessBookingHomeIcon />
                        </div>{" "}
                        <div style={{ marginLeft: "12px" }}>
                          {modelData.bookingtype}
                        </div>
                      </div>
                      <div
                        className="Two"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div>
                          <SuccessBookingDateIcon />
                        </div>{" "}
                        <div style={{ marginLeft: "12px" }}>
                          {modelData.bookingdatetime
                            ? dayjs(modelData.bookingdatetime).format("YYYY-MMMM-DD") // Full month name
                            : "None"}
                        </div>
                      </div>
                      <div
                        className="Three"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div>
                          <SuccessBookingTimeIcon />
                        </div>
                        <div style={{ marginLeft: "12px" }}>
                          {modelData.selectTime}
                        </div>
                      </div>
                    </div>

                    <div className="AddressandStatus">
                      <div className="Address">
                        <div className="AddressData">
                          <h5>Address</h5>
                          <p>{modelData.bookingaddress}</p>
                          <Button onClick={haandleOpen}>
                            Edit Address <EditIcon />{" "}
                          </Button>
                          <Modal
                            open={openChild}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                          >
                            <Box className="editAddressBox">
                              <div className="labelTitle">
                                <label>Edit Address</label>
                                <div
                                  className="FirstName"
                                  style={{ marginTop: "10px" }}
                                >
                                  <FormControl sx={{ width: "100%" }}>
                                    <OutlinedInput
                                      value={modelData.bookingaddress}
                                      placeholder="EditAddress"
                                      name="bookingaddress"
                                      onChange={(e) =>
                                        SetModelData({
                                          ...modelData,
                                          bookingaddress: e.target.value,
                                        })
                                      }
                                    />
                                  </FormControl>
                                </div>
                              </div>
                              <Button

                                onClick={haandleClose}
                              >
                                Save
                              </Button>
                            </Box>
                          </Modal>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="closeButton"
                      variant="outlined"
                      onClick={() => handleCloseModelBooking()}
                    >
                      Close
                    </Button>
                  </div>
                </Container>
              )}
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Booking;
