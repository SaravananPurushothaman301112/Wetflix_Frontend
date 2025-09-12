import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import EditIcon from "../../../assets/images/EditIcon.png"
import BookingDetailsImage from "../../../assets/images/BookingDetailsImage.png";
import { Modal, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getViewBooking,
  getBookingUpdateResponse,
  getBookingStatusCancel,
  getBookingUpdate,
  getAllBooking,
  getBookingUpdateRespClear
} from "../../../Redux/Actions";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import dayjs from "dayjs";
import "./BookingDetails.scss";
import Typography from "@mui/material/Typography";
import {
  Container,
  FormControl,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as AccountHumanIcon } from "../../../assets/SvgIcons/AccountHumanIcon.svg";
import { ReactComponent as HomeIcon } from "../../../assets/SvgIcons/HomeIcon.svg";
import { ReactComponent as LocationIcon } from "../../../assets/SvgIcons/LocationIcon.svg";
import { ReactComponent as LocationLocateIcon } from "../../../assets/SvgIcons/LocationLocateIcon.svg";
import { ReactComponent as SuccessBookingHomeIcon } from "../../../assets/SvgIcons/SuccessBookingHomeIcon.svg";
import { ReactComponent as SuccessBookingDateIcon } from "../../../assets/SvgIcons/SuccessBookingDateIcon.svg";
import { ReactComponent as SuccessBookingTimeIcon } from "../../../assets/SvgIcons/SuccessBookingTimeIcon.svg";
import MuiPhoneNumber from "material-ui-phone-number";
import SuccessImage from "../../../assets/images/SuccessImage.png";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Firstcard from "../../../assets/images/Firstcard.png";
import secondcardTwo from "../../../assets/images/secondcardTwo.png";
import thirdcard from "../../../assets/images/thirdcard.png";
import secondcard from "../../../assets/images/secondcard.png";
import Calendar from "react-calendar";
import { createBooking, addBooking } from "../../../Redux/Actions";
import { LinkTwoTone, Today } from "@mui/icons-material";
import axios from "axios";
import bookingTechnicianImage from "../../../assets/images/bookingTechnician.png";
import orderTruck from "../../../assets/images/orderTruck.png";
import waterTank from "../../../assets/images/waterTank.png";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// import { getAllBooking, getViewBooking } from '../../../Redux/Actions';
// import BookingDetails from '../bookingDetails/BookingDetails';






dayjs.extend(utc);
dayjs.extend(timezone);

const style = {
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


const BookingDetails = () => {
  const BookingId = localStorage.getItem("Booking Id");
  console.log('BookingId', BookingId);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAdminCreateBooking(userID));
  // }, [userID, dispatch]);


  // const handleStatusChange = (bookingId, newStatus) => {
  //   const bookingUpdateInfo = {
  //     userid: 98,
  //     bookingtype: "technicalVisit",
  //     bookingdatetime:"2024-12-24T16:53:03.133Z",
  //     description: "Technical visit for device",
  //     bookingid: 3,
  //     technicianname : "Madhavan"
  //   };
  //   dispatch(getBookingUpdate(bookingUpdateInfo)); // Dispatching the update action with new status
  // };


  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item
  const [openModel, setOpenMadel] = useState(false);
  const [modelSteps, setModelSteps] = useState("firstStep");








  const handleOpenModel = () => {
    setOpenMadel(true);
    dispatch(getViewBooking(BookingId));
  };
  const handleCloseModel = () => {
    setOpenMadel(false);
  };

  const [alignment, setAlignment] = useState("");
  const [openChild, setOpenChild] = useState(false);
  const haandleOpen = () => {
    setOpenChild(true);
  };
  const haandleClose = () => {
    setOpenChild(false);
  };


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
  const [userID, setUserID] = useState(authUser?.userId);

  // useEffect(() => {
  //   dispatch(getAllBooking(userID));
  // }, [userID, dispatch]);


  const [modelData, SetModelData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    description: "test",
    address: "",
    bookingdatetime: dayjs(),
    selectTime: alignment,
    // selectedDate: "",
    bookingtype: "",
    bookingid: +BookingId,
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

  const handleContinue = () => {
    // let isValid = true;

    // if (!modelData.firstName) {
    //   setFirstNameError(true);
    //   isValid = false;
    // } else {
    //   setFirstNameError(false);
    // }

    // if (!modelData.lastName) {
    //   setLastNameError(true);
    //   isValid = false;
    // } else {
    //   setLastNameError(false);
    // }

    // if (!modelData.phone) {
    //   setPhoneError(true);
    //   isValid = false;
    // } else {
    //   setPhoneError(false);
    // }

    // if (!modelData.address) {
    //   setAddressError(true);
    //   isValid = false;
    // } else {
    //   setAddressError(false);
    // }


    setModelSteps("secondStep");

  };

  useEffect(() => {
    SetModelData({
      ...modelData,
      selectTime: alignment,
    });
  }, [alignment]);


  // Function to handle time selection and convert to 24-hour format
  // Function to handle time selection and convert to 24-hour format
  const handleTimeSelection = (selectedTime) => {
    setExactTime(selectedTime);
    const selectedDate = modelData.bookingdatetime; // Date the user selected

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
        .second(0);

      // Store the updated date and time directly in 24-hour format without UTC conversion
      SetModelData({
        ...modelData,
        bookingdatetime: updatedDateTime, // Store date and time directly
        selectTime: selectedTime, // Save selected time as well
      });

      console.log('Selected Time in 24-hour format:', updatedDateTime.format('YYYY-MM-DD HH:mm:ss'));

    }
  };

  const formatBookingType = (type) => {
    switch (type?.toLowerCase()) {
      case 'servicevisit':
        return 'Service Visit';
      case 'disposalvisit':
        return 'Disposal Visit';
      case 'technicalvisit':
        return 'Technical Visit';
      default:
        return type?.charAt(0).toUpperCase() + type?.slice(1);
    }
  };
  

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "px solid #ECF0F4",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const navigate = useNavigate();

  const bookingDetails = useSelector((state) => state.ViewBooking.viewBookingSuccess);
  const bookingUpdateResp = useSelector((state) => state?.Booking?.getBookingUpdateDetails);
  const bookingId = useSelector((state) => state.Booking.bookingId);
  const bookingUpdate = useSelector((state) => state.Booking.getBookingStatusCancelDetails);

  const [openModal, setOpenModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const bookingStatus = {
    bookingstatus: "CANCELLED",
    bookingid: BookingId,
    userid: authUser.userId,
  };
  console.log("bookingStatusbookingStatus", bookingStatus.bookingid);


  // const currentBookingId = JSON.parse(localStorage.getItem("Booking Id"));
  // console.log('currentBookingId',currentBookingId);
  useEffect(() => {
    dispatch(getViewBooking(BookingId));
  }, [bookingUpdateResp]);

  const handleCancelClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleCloseModelBooking = () => {
    dispatch(getBookingUpdate(modelData));    
    setOpenMadel(false);
    setModelSteps("firstStep");
  };



  const BookingStatusUpdation = () => {
    setIsProcessing(true);
    dispatch(getBookingStatusCancel(bookingStatus),[]);
 
  };

  const [exactTime, setExactTime] = useState("");
  const [exactDate, setExactDate] = useState(null);

  useEffect(() => {
    const dateTime = bookingDetails?.data?.bookingdatetime;

    // Convert to Trinidad and Tobago time
    const trinidadTime = dayjs.utc(dateTime).tz("America/Port_of_Spain").format('YYYY-MM-DD hh:mm:ss A');

    // Split the date and time
    const dateTimeTrim = trinidadTime.split(' ');
    const fullTime = dateTimeTrim[1].split(':');

    // Format the exact time as 'hh:mmAM/PM'
    const formattedExactTime = fullTime[0] + ':' + fullTime[1] + dateTimeTrim[2];
    console.log('formattedExactTime', formattedExactTime);

    setExactTime(formattedExactTime);  // Set the exact time

    // Get the exact date from the API response
    const datefromApi = dateTimeTrim[0];  // 'YYYY-MM-DD'
    setExactDate(dayjs(datefromApi));  // Set the exact date using dayjs

    console.log("formattedExactdate", datefromApi);
    console.log('Trinidad and Tobago Time:', trinidadTime);

    if (bookingDetails) {
      SetModelData({
        ...modelData,
        firstName: bookingDetails?.data?.firstname,
        lastName: bookingDetails?.data?.lastname,
        phone: bookingDetails?.data?.phonenumber,
        address: bookingDetails?.data?.bookingaddress,
        bookingtype: bookingDetails?.data?.bookingtype,
      });
    }
  }, [bookingDetails]);


  useEffect(() => {
    if (bookingUpdate) {
      setIsProcessing(false);
      if (bookingUpdate.statusCode === 200) {

        toast.success(bookingUpdate.message);
        navigate("/bookings");
        setUserID(authUser.userId);

        // const getAllBookingDetails = useSelector(booking => booking.Booking.getAllBookingDetails);
        // console.log('test booking',getAllBookingDetails)
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
        dispatch(getBookingUpdateRespClear());
      } else {
        toast.error(bookingUpdate.message);
        handleCloseModal();
      }
    }
  }, [bookingUpdate, navigate]);

  // useEffect(() => {
  //   return (dispatch(getViewBooking(BookingId)))
  // }, [])
 

  return (
    <div className={Styles.BookingDetailsContainer}>
      <p className={Styles.BookingDetailsContainerTitle}>Booking details</p>
      <div className={Styles.BookingDetailsContent}>
        <div className={Styles.BookingDetailsConformationNumberAndServiceContent}>
          <div className={Styles.BookingDetailsConformationNumberContent}>
            <p className={Styles.BookingDetailsConformationNumberContentHeader}>Confirmation number</p>
            <p className={Styles.BookingDetailsConformationNumberContentValue}>#{bookingDetails?.data?._id}</p>
          </div>
          <div className={Styles.BookingDetailsConformationNumberContent}>
            <p className={Styles.BookingDetailsConformationNumberContentHeader}>Service</p>
            <p className={Styles.BookingDetailsConformationNumberContentValue}>
              {formatBookingType(bookingDetails?.data?.bookingtype)}
            </p>
          </div>
        </div>
        <div className={Styles.BookingDetailsConformationNumberAndServiceContent}>
          <div className={Styles.BookingDetailsConformationNumberContent}>
            <p className={Styles.BookingDetailsConformationNumberContentHeader}>Appointment address</p>
            {/* {bookingDetails?.data?.bookingaddress === technicalVisit?} */}
            <p className={Styles.BookingDetailsConformationNumberContentValue}>{bookingDetails?.data?.bookingaddress}</p>
          </div>
          <div className={Styles.BookingDetailsConformationNumberContent}>
            <p className={Styles.BookingDetailsConformationNumberContentHeader}>Date & Time:</p>
            <p className={Styles.BookingDetailsConformationNumberContentValue}>
              {dayjs(bookingDetails?.data?.bookingdatetime).tz('America/Port_of_Spain').format('YYYY-MM-DD hh:mm A')}
            </p>
          </div>
        </div>
        <img src={BookingDetailsImage} alt="" />
        <div className={Styles.BookingDetailsTimeLineAndCancelContainer}>
          <div className={Styles.BookingDetailsCancelContainer}>
            <p className={Styles.BookingDetailsCancelContainerText}>Cancellation policy</p>
            <p className={Styles.BookingDetailsCancelContainerTextContent}>
              If you cancel less than 24 hours before your booking, you may incur a fee.
            </p>
          </div>
          {bookingDetails?.data?.bookingstatus === "CANCELLED" ? (
            <button className={Styles.BookingDetailsCancelledContainerButton} >
              Cancelled
            </button>
          ) : bookingDetails?.data?.bookingstatus === "COMPLETED"?(
            <button className={Styles.BookingDetailsCompletedContainerButton}>
              Completed
            </button>
          ):(
            <button className={Styles.BookingDetailsCancelContainerButton} onClick={handleCancelClick}>
              Cancel booking
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={openModal}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            setOpenModal(false);
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={Styles.modalContainer}>
            <h2 className={Styles.modalTitle}>Are you sure you want to cancel your booking?</h2>
            <p className={Styles.modalDescription}>
              If you cancel less than 24 hours before your booking, Vulputate condimentum lacus venenatis sem imperdiet accumsan eleifend sem eu.
            </p>
            <div className={Styles.modalActions}>
              <Button
                variant="outlined"
                // onClick={handleCloseModal} // Close the modal
                onClick={() => {
                  handleCloseModal();
                  handleOpenModel();
                  SetModelData({
                    ...modelData,
                    description: "technicalVisit",
                  });
                  SetModelData({
                    ...modelData,
                    bookingtype: "technicalVisit",
                  });
                }}

              >
                <img src={EditIcon} />
                Modify Booking

              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={BookingStatusUpdation} // Trigger the booking cancellation

              >

                Cancel Booking
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* booking modal */}
      <div>
        <div className="Booking">


          <div className="Bottom">
            <div className="Popup">
              <Modal
                open={openModel}
                onClose={handleCloseModel}
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
                                name="firstName"
                                onChange={(e) =>
                                  SetModelData({
                                    ...modelData,
                                    firstName: e.target.value,
                                  })
                                }
                                placeholder="First name"
                                value={modelData.firstName}
                              //  error={firstNameError}
                              />
                            </FormControl>
                            {/* {firstNameError && (
                           <p style={{ color: "red" }}>
                            First Name is required.
                           </p>
                         )} */}
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
                                name="lastName"
                                onChange={(e) =>
                                  SetModelData({
                                    ...modelData,
                                    lastName: e.target.value,
                                  })
                                }
                                placeholder="Last name"
                                value={modelData.lastName}
                              //  error={lastNameError}
                              />
                            </FormControl>
                            {/* {lastNameError && (
                           <p style={{ color: "red" }}>Last Name is required.</p>
                         )} */}
                          </div>
                        </div>
                      </div>
                      <div className="PhoneNumberDropdown">
                        <div className="cellNumber">
                          <label>Phone:</label>
                          <div
                            className="PhoneNumber"
                            style={{ marginTop: "10px" }}
                          >
                            <MuiPhoneNumber
                              sx={{
                                '& .MuiInputBase-root': {
                                  borderBottom: 'none', // Removes the bottom border
                                },
                                '& .MuiInputBase-root:before': {
                                  borderBottom: 'none', // Removes the #1976d2 line before focus
                                },
                                '& .MuiInputBase-root:after': {
                                  borderBottom: 'none', // Removes the #1976d2 line after focus
                                },
                                '& .MuiInputBase-root:hover:not(.Mui-disabled):before': {
                                  borderBottom: 'none', // Ensures no line appears on hover
                                },
                              }}
                              placeholder="Mobile number"
                              value={modelData.phone}
                              defaultCountry={"tt"}
                              name="phone"
                              onChange={(value) =>
                                SetModelData({ ...modelData, phone: value })
                              }
                              required
                              error={phoneError}
                            />
                          </div>
                          {/* {phoneError && (
                         <p style={{ color: "red" }}>Phone is required.</p>
                       )} */}
                        </div>

                        <div className="bookingTypeFilled">
                          <label>Booking type:</label> <br />
                          <div className="Dropdown" style={{ marginTop: "10px" }}>
                            <TextField
                              sx={{ width: "100%" }}
                              id="filled-select-currency"
                              //  variant="filled"
                              value={bookingDetails?.data?.bookingtype}
                              //  disabled
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
                              name="address"
                              value={modelData.address}
                              onChange={(e) =>
                                SetModelData({
                                  ...modelData,
                                  address: e.target.value,
                                })
                              }
                              placeholder="Urna urna sem, sodales nibh laoreet aliquam adipiscing pulvinar arcu."

                              endAdornment={
                                <InputAdornment position="end">
                                  <LocationLocateIcon />
                                </InputAdornment>
                              }

                            //  error={addressError}
                            />
                          </FormControl>
                          {/* {addressError && (
                         <p style={{ color: "red" }}>Address is required.</p>
                       )} */}
                        </div>
                      </div>
                      <div
                        className="StepOneButtons"
                        style={{
                          // marginTop: "48px",
                          display: "flex",

                          gap: "12px",
                        }}
                      >
                        <div  className="cancelAndSubButtons">
                          <div className="CancelButton">
                            <Button
                             
                              onClick={() => handleCloseModel()}
                            >
                              Cancel
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
                    </div>
                  ) : modelSteps === "secondStep" ? (
                    <Container >
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateCalendar
                                value={exactDate || dayjs(modelData.bookingdatetime)} // Display the date from the state or modelData
                                onChange={(newValue) => {
                                  const selectedDate = dayjs(newValue).format('YYYY-MM-DD'); // Format the selected date
                                  const currentTime = dayjs(modelData.bookingdatetime).format('HH:mm:ss'); // Keep the time part unchanged

                                  // Combine selected date with the existing time
                                  const combinedDateTime = dayjs(`${selectedDate} ${currentTime}`);

                                  // Convert combined date-time to UTC
                                  const utcDate = combinedDateTime.utc();
                                  console.log('Combined UTC DateTime:', utcDate);

                                  // Update modelData with the combined UTC date-time
                                  SetModelData({
                                    ...modelData,
                                    bookingdatetime: utcDate, // Store the combined date and time in UTC
                                  });

                                  // Update the local state for the date
                                  setExactDate(newValue);
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
                                // value={bookingDetails?.data?.bookingdatetime}
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
                                  value="10:00AM"
                                  style={{ backgroundColor: exactTime === '10:00AM' ? '#1976d2' : '', color: exactTime === '10:00AM' ? 'white' : '' }}
                                  disabled={isPastTime("10:00AM", modelData.bookingdatetime)}
                                >
                                  10:00AM
                                </ToggleButton>
                                <ToggleButton
                                  value="10:30AM"
                                  style={{ backgroundColor: exactTime === '10:30AM' ? '#1976d2' : '', color: exactTime === '10:30AM' ? 'white' : '' }} // Inline style 
                                  disabled={isPastTime("10:30AM", modelData.bookingdatetime)}
                                >
                                  10:30AM
                                </ToggleButton>
                                <ToggleButton
                                  value="11:00AM"
                                  style={{ backgroundColor: exactTime === '11:00AM' ? '#1976d2' : '', color: exactTime === '11:00AM' ? 'white' : '' }}
                                  disabled={isPastTime("11:00AM", modelData.bookingdatetime)}
                                >
                                  11:00AM
                                </ToggleButton>
                                <ToggleButton
                                  style={{ backgroundColor: exactTime === '11:30AM' ? '#1976d2' : '', color: exactTime === '11:30AM' ? 'white' : '' }}
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
                                // value={bookingDetails?.data?.bookingdatetime}
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
                                  style={{ backgroundColor: exactTime === '12:00PM' ? '#1976d2' : '', color: exactTime === '12:00PM' ? 'white' : '' }}
                                  disabled={isPastTime("12:00PM", modelData.bookingdatetime)}
                                >
                                  12:00PM
                                </ToggleButton>
                                <ToggleButton
                                  value="12:30PM"
                                  style={{ backgroundColor: exactTime === '12:30PM' ? '#1976d2' : '', color: exactTime === '12:30PM' ? 'white' : '' }}
                                  disabled={isPastTime("12:30PM", modelData.bookingdatetime)}
                                >
                                  12:30PM
                                </ToggleButton>
                                <ToggleButton
                                  value="01:00PM"
                                  style={{ backgroundColor: exactTime === '01:00PM' ? '#1976d2' : '', color: exactTime === '01:00PM' ? 'white' : '' }}
                                  disabled={isPastTime("01:00PM", modelData.bookingdatetime)}
                                >
                                  01:00PM
                                </ToggleButton>
                                <ToggleButton
                                  value="01:30PM"
                                  style={{ backgroundColor: exactTime === '01:30PM' ? '#1976d2' : '', color: exactTime === '01:30PM' ? 'white' : '' }}
                                  disabled={isPastTime("01:30PM", modelData.bookingdatetime)}
                                >
                                  01:30PM
                                </ToggleButton>
                                <ToggleButton
                                  value="02:00PM"
                                  style={{ backgroundColor: exactTime === '02:00PM' ? '#1976d2' : '', color: exactTime === '02:00PM' ? 'white' : '' }}
                                  disabled={isPastTime("02:00PM", modelData.bookingdatetime)}
                                >
                                  02:00PM
                                </ToggleButton>
                                <ToggleButton
                                  value="02:30PM"
                                  style={{ backgroundColor: exactTime === '02:30PM' ? '#1976d2' : '', color: exactTime === '02:30PM' ? 'white' : '' }}
                                  disabled={isPastTime("02:30PM", modelData.bookingdatetime)}
                                >
                                  02:30PM
                                </ToggleButton>
                                <ToggleButton
                                  value="03:00PM"
                                  style={{ backgroundColor: exactTime === '03:00PM' ? '#1976d2' : '', color: exactTime === '03:00PM' ? 'white' : '' }}
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
                                // value={bookingDetails?.data?.bookingdatetime}
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
                                  style={{ backgroundColor: exactTime === '05:00PM' ? '#1976d2' : '', color: exactTime === '05:00PM' ? 'white' : '' }}
                                  disabled={isPastTime("05:00PM", modelData.bookingdatetime)}
                                >
                                  05:00PM
                                </ToggleButton>

                                <ToggleButton
                                  value="05:30PM"
                                  style={{ backgroundColor: exactTime === '05:30PM' ? '#1976d2' : '', color: exactTime === '05:30PM' ? 'white' : '' }}
                                  disabled={isPastTime("05:30PM", modelData.bookingdatetime)}
                                >
                                  05:30PM
                                </ToggleButton>

                                <ToggleButton
                                  value="06:00PM"
                                  style={{ backgroundColor: exactTime === '06:00PM' ? '#1976d2' : '', color: exactTime === '06:00PM' ? 'white' : '' }}
                                  disabled={isPastTime("06:00PM", modelData.bookingdatetime)}
                                >
                                  06:00PM
                                </ToggleButton>

                                <ToggleButton
                                  value="06:30PM"
                                  style={{ backgroundColor: exactTime === '06:30PM' ? '#1976d2' : '', color: exactTime === '06:30PM' ? 'white' : '' }}
                                  disabled={isPastTime("06:30PM", modelData.bookingdatetime)}
                                >
                                  06:30PM
                                </ToggleButton>

                                <ToggleButton
                                  value="07:00PM"
                                  style={{ backgroundColor: exactTime === '07:00PM' ? '#1976d2' : '', color: exactTime === '07:00PM' ? 'white' : '' }}
                                  disabled={isPastTime("07:00PM", modelData.bookingdatetime)}
                                >
                                  07:00PM
                                </ToggleButton>

                                <ToggleButton
                                  value="07:30PM"
                                  style={{ backgroundColor: exactTime === '07:30PM' ? '#1976d2' : '', color: exactTime === '07:30PM' ? 'white' : '' }}
                                  disabled={isPastTime("07:30PM", modelData.bookingdatetime)}
                                >
                                  07:30PM
                                </ToggleButton>

                                <ToggleButton
                                  value="08:00PM"
                                  style={{ backgroundColor: exactTime === '08:00PM' ? '#1976d2' : '', color: exactTime === '08:00PM' ? 'white' : '' }}
                                  disabled={isPastTime("08:00PM", modelData.bookingdatetime)}
                                >
                                  08:00PM
                                </ToggleButton>



                              </ToggleButtonGroup>

                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="PreNexButtonSecondModal">
                        <Button
                        
                          variant="outlined"
                          onClick={() => setModelSteps("firstStep")}
                        >
                          Go Back
                        </Button>{" "}
                        {/* Add Go Back button */}
                        <Button
                          
                          variant="outlined"
                          onClick={() => setModelSteps("")}
                        >
                          Confirm
                        </Button>
                      </div>
                    </Container>
                  ) : (
                    <Container>
                      <div style={{ textAlign: "center" }}>
                        <img src={SuccessImage} alt="Success" />
                        <h3>Your service request has been modified</h3>
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
                                ? modelData.bookingdatetime.format("YYYY-MM-DD")
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
                              <p>{modelData.address}</p>
                              <Button onClick={haandleOpen}>
                                Edit Address
                                {/* <EditIcon />  */}
                                {" "}
                              </Button>
                              <Modal
                                open={openChild}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                              >
                                <Box className="boxStyle">
                                  <div>
                                    <label>Edit Address</label>
                                    <div
                                      className="FirstName"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <FormControl sx={{ width: "43ch" }}>
                                        <OutlinedInput
                                          value={modelData.address}
                                          placeholder="EditAddress"
                                          name="address"
                                          onChange={(e) =>
                                            SetModelData({
                                              ...modelData,
                                              address: e.target.value,
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
      </div>
    </div>
  );
};

export default BookingDetails;
