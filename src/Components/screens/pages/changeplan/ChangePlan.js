import React, { useEffect, useRef } from "react";
import Styles from "./Index.module.css";
import PaymentWaySuccess from "../../../assets/images/PaymentWaySuccess.png";
import TricleImage from "../../../assets/images/TricleImage.png";
import SplashImage from "../../../assets/images/SplashImage.png";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import SuccessImage from "../../../assets/images/SuccessImage.png";
import phone from "../../../assets/images/icons8-phone-50.png";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addSubscription, getPayment, getPaymentResponse, getUserPlan } from "../../../Redux/Actions";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { algo } from "crypto-js";
import SkyTrickle from "../../../assets/images/VioletTrickle.png"
import { ReactComponent as CallIcon } from "../../../assets/SvgIcons/callIcon.svg";

const CustomTooltip = styled(({ className, ...props }) => (


  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "15px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000",
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "40%",
  bgcolor: "background.paper",
  border: "px solid  #ECF0F4",
  // overflow: "auto",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "px solid  #ECF0F4",
  // overflow: "auto",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};


const INITIAL_COUNT = 300;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const twoDigits = (num) => String(num).padStart(2, "0");

const ChangePlan = () => {
  let dispatch = useDispatch();

  const getPaymentResponse = useSelector(
    (payment) => payment.GetPayment.paymentdetails

  );
  // console.log("Payment reposne ",getPaymentResponse)

  const [open, setOpen] = useState(false);
  const [reOpen, setReOpen] = useState(false);

  const dtStr = Math.floor(new Date().getTime() / 1000);
  const expTime = dtStr + 3600;

  const [progress, setProgress] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  // const UserIDDataHome = JSON.parse(localStorage.getItem("auth"));

  // useEffect(() => {
  //   // Replace the URL with your backend endpoint that handles the webhook
  //   fetch('http://localhost:3000/fygaro-webhook')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPaymentStatus(data);
  //     })
  //     .catch((error) => {
  //       setError('Failed to fetch payment status');
  //     });
  // }, []);

  useEffect(() => {
    if (open) {
      setSelectedValue(""); // reset selection when modal opens
    }
  }, [open]);

  const handleClose = () => { setOpen(false) };
  const handleReOpen = () => {
    setReOpen(open)
  }
  const handleReClose = () => {
    setReOpen(false)
  }
  const handleContinueToPayment = () => {
    switch (subscription) {
      case "Drip":
        handleOpen();
        break;
      case "Trickle":
        handleOpenTricle();
        break;
      case "Splash":
        handleOpenSplash();
        break;
      case "Maas":
        handleOpenMaas();
        break;
      default:
        setProgress(false);
        break;
    }
    // handleChanges();
  };

  const handleOpen = () => {
    dispatch(getPayment(getPaymentRequestData));
    setOpen(true);
    setProgress(false);
  };
  const handleOpenTricle = () => {
    dispatch(getPayment(getPaymentRequestDataTrickle));
    setOpen(true);
    setProgress(false);
  };
  const handleOpenSplash = () => {
    dispatch(getPayment(getPaymentRequestDataSplach));
    setOpen(true);
    setProgress(false);
  };
  const handleOpenMaas = () => {
    dispatch(getPayment(getPaymentRequestDataMaas));
    setOpen(true);
    setProgress(false);
  };

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US");

  //   timmer

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);

  const [status, setStatus] = useState(STATUS.STOPPED);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  useEffect(() => {
    setStatus(STATUS.STARTED);
  }, [status]);

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );

  const [alignment, setAlignment] = useState("Monthly");
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setBillingPeriod(newAlignment.toLowerCase());
    }
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const [subscription, setSubscription] = useState("Drip");

  const handleChanges = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    let amount;
    if (subscription === "Drip") {
      if (alignment === 'Monthly') {
        amount = value === "option1" ? 0.1 : 10.0;
        setGetPaymentRequestData((prevState) => ({
          ...prevState,
          amount,
        }));
      }
      else {
        amount = value === "option1" ? 90.0 : 100.0;
        setGetPaymentRequestDataYearly((prevState) => ({
          ...prevState,
          amount,
        }));
      }
      // amount = value === "option1" ? 9.0 : 10.0;
      // setGetPaymentRequestData((prevState) => ({
      //   ...prevState,
      //   amount,
      // }));
    } else if (subscription === "Trickle") {
      if (alignment === 'Monthly') {
        amount = value === "option1" ? 12.0 : 13.0;
        setGetPaymentRequestDataTrickle((prevState) => ({
          ...prevState,
          amount,
        }));
      } else {
        amount = value === "option1" ? 120.0 : 130.0;
        setGetPaymentRequestDataTrickleYearly((prevState) => ({
          ...prevState,
          amount,
        }));
      }
    }
    else if (subscription === "Splash") {
      if (alignment === "Monthly") {
        amount = value === "option1" ? 15.0 : 16.0;
        setGetPaymentRequestDataSplach((prevState) => ({
          ...prevState,
          amount,
        }));
      } else {
        amount = value === "option1" ? 150.0 : 160.0;
        setGetPaymentRequestDataSplachYearly((prevState) => ({
          ...prevState,
          amount,
        }));
      }
    } else if (subscription === "Maas") {
      if (alignment === "Monthly") {
        if (value === "option1") amount = 90.0;
        else if (value === "option2") amount = 150.0;
        else amount = 200.0;

        setGetPaymentRequestDataMaas((prevState) => ({
          ...prevState,
          amount,
        }));
      } else {
        if (value === "option1") amount = 900.0;
        else if (value === "option2") amount = 1500.0;
        else amount = 2000.0;

        setGetPaymentRequestDataMaasYearly((prevState) => ({
          ...prevState,
          amount,
        }));
      }
    }
  };

  // const bookingDetails = useSelector((state) => state.UserPlan.userPlanSuccess);
  // console.log(bookingDetails.data,"userPlandetails")

  const authUser = JSON.parse(localStorage.getItem("auth"));
  // console.log("authUserauthUserauthUser",authUser.userId)

  // useEffect(()=>{
  //   dispatch(getUserPlan(authUser.userId))
  // })

  // const userPlanData = localStorage.setItem("Booking Id",JSON.stringify(bookingDetails));
  // console.log('userPlanData',userPlanData);
  const authUserr = JSON.parse(localStorage.getItem("Booking Id"));
  // console.log(authUserr,"authUserrauthUserr")

  const [getPaymentRequestData, setGetPaymentRequestData] = useState(() => {
    let amount;

    if (selectedValue == "option1") {
      amount = 0.1;
    } else {
      amount = 10.0;
    }

    const period = "M";
    const subscriptionname = "Drip"
    return {
      amount,
      currency: "TTD",
      custom_reference: JSON.stringify({ subscriptionname, period }),
      exp: expTime,
      nbf: dtStr,
      userid: authUser.userId,
    };
  });

  const [getPaymentRequestDataTrickle, setGetPaymentRequestDataTrickle] =
    useState(() => {
      let amount;

      if (selectedValue == "option1") {
        amount = 12.0;
      } else {
        amount = 13.0;
      }

      const period = "M";
      const subscriptionname = "Tric"
      return {
        amount,
        currency: "TTD",
        custom_reference: JSON.stringify({ subscriptionname, period }),
        exp: expTime,
        nbf: dtStr,
        userid: authUser.userId,
      };
    });

  const [getPaymentRequestDataSplach, setGetPaymentRequestDataSplach] =
    useState(() => {
      let amount;

      if (selectedValue == "option1") {
        amount = 15.0;
      } else {
        amount = 16.0;
      }

      const period = "M";
      const subscriptionname = "Spla"
      return {
        amount,
        currency: "TTD",
        custom_reference: JSON.stringify({ subscriptionname, period }),
        exp: expTime,
        nbf: dtStr,
        userid: authUser.userId,
      };
    });
  // console.log("alignment",alignment)
  const [getPaymentRequestDataMaas, setGetPaymentRequestDataMaas] = useState(
    () => {
      let amount;

      if (selectedValue == "option1") {
        amount = 90.0;
      } else if (selectedValue == "option2") {
        amount = 150.0;
      } else if (selectedValue == "option3") {
        amount = 200.0;
      }

      const period = "M";
      const subscriptionname = "Maas"
      return {
        amount,
        currency: "TTD",
        custom_reference: JSON.stringify({ subscriptionname, period }),
        exp: expTime,
        nbf: dtStr,
        userid: authUser.userId,
      };
    }
  );

  const [getPaymentRequestDataYearly, setGetPaymentRequestDataYearly] = useState(() => {
    let amount;

    if (selectedValue == "option1") {
      amount = 90.0;
    } else {
      amount = 100.0;
    }
    const period = "Y";
    const subscriptionname = "Drip"
    return {
      amount,
      currency: "TTD",
      custom_reference: JSON.stringify({ subscriptionname, period }),
      exp: expTime,
      nbf: dtStr,
      userid: authUser.userId,
    };
  });

  const [getPaymentRequestDataTrickleYearly, setGetPaymentRequestDataTrickleYearly] =
    useState(() => {
      let amount;

      if (selectedValue == "option1") {
        amount = 120.0;
      } else {
        amount = 130.0;
      }

      const period = "Y";
      const subscriptionname = "Tric"
      return {
        amount,
        currency: "TTD",
        custom_reference: JSON.stringify({ subscriptionname, period }),
        exp: expTime,
        nbf: dtStr,
        userid: authUser.userId,
      };
    });

  const [getPaymentRequestDataSplachYearly, setGetPaymentRequestDataSplachYearly] =
    useState(() => {
      let amount;

      if (selectedValue == "option1") {
        amount = 150.0;
      } else {
        amount = 160.0;
      }

      const period = "Y";
      const subscriptionname = "Spla"
      return {
        amount,
        currency: "TTD",
        custom_reference: JSON.stringify({ subscriptionname, period }),
        exp: expTime,
        nbf: dtStr,
        userid: authUser.userId,
      };
    });

  const [getPaymentRequestDataMaasYearly, setGetPaymentRequestDataMaasYearly] = useState(
    () => {
      let amount;

      if (selectedValue == "option1") {
        amount = 900.0;
      } else if (selectedValue == "option2") {
        amount = 1500.0;
      } else if (selectedValue == "option3") {
        amount = 2000.0;
      }

      const period = "Y";
      const subscriptionname = "Maas"
      return {
        amount,
        currency: "TTD",
        custom_reference: JSON.stringify({ subscriptionname, period }),
        exp: expTime,
        nbf: dtStr,
        userid: authUser.userId,
      };
    }
  );

  useEffect(() => {
    if (open && alignment === "Monthly") {
      // Logic to dispatch the right payment details only when state is updated
      switch (subscription) {
        case "Drip":
          dispatch(getPayment(getPaymentRequestData));
          break;
        case "Trickle":
          dispatch(getPayment(getPaymentRequestDataTrickle));
          break;
        case "Splash":
          dispatch(getPayment(getPaymentRequestDataSplach));
          break;
        case "Maas":
          dispatch(getPayment(getPaymentRequestDataMaas));
          break;
        default:
          break;
      }
    }
  }, [
    getPaymentRequestData,
    getPaymentRequestDataTrickle,
    getPaymentRequestDataSplach,
    getPaymentRequestDataMaas,
    subscription,
    open,
  ], []);

  useEffect(() => {
    if (open && alignment === "Yearly") {
      // Logic to dispatch the right payment details only when state is updated
      switch (subscription) {
        case "Drip":
          dispatch(getPayment(getPaymentRequestDataYearly));
          break;
        case "Trickle":
          dispatch(getPayment(getPaymentRequestDataTrickleYearly));
          break;
        case "Splash":
          dispatch(getPayment(getPaymentRequestDataSplachYearly));
          break;
        case "Maas":
          dispatch(getPayment(getPaymentRequestDataMaasYearly));
          break;
        default:
          break;
      }
    }
  }, [
    getPaymentRequestDataYearly,
    getPaymentRequestDataTrickleYearly,
    getPaymentRequestDataSplachYearly,
    getPaymentRequestDataMaasYearly,
    subscription,
    open,
  ], []);

  useEffect(() => {
    if (INITIAL_COUNT === 0) {
      handleReClose(); // Close the modal when time reaches zero
    }
  }, [INITIAL_COUNT]);

  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const [isExpired, setIsExpired] = useState(false);

  const handlePaymentClick = () => {
    setSecondModalOpen(true);
    setIsExpired(false);
    setTimeLeft(300); // Reset to 5 minutes
    handleContinueToPayment();
  };

  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    if (secondModalOpen && !isExpired) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsExpired(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [secondModalOpen, isExpired]);
  // console.log( getPaymentRequestData.amount, "getPaymentRequestData")
  // console.log( getPaymentRequestDataTrickle.amount, "getPaymentRequestDataTrickle")
  // console.log( getPaymentRequestDataSplash.amount, "getPaymentRequestDataSplash")
  // console.log( getPaymentRequestDataMaas.amount, "getPaymentRequestDataMaas.amount")
  // console.log('selectedValue option ',selectedValue);

  // var endDate = bookingDetails?.data?.enddate
  // var endDateSplit= endDate.split("T");
  // var endSplittedDate = endDateSplit[0]
  // console.log(endSplittedDate,"endSplitDate")

  var endDate = authUserr?.data?.enddate;

  var endSplittedDate = endDate ? endDate.split("T")[0] : null;

  // console.log(endSplittedDate, "endSplitDate");

  return (
    <div className={Styles.ChangePlanContainer}>
      <div className={Styles.ChangePlan}>
        <div className={Styles.ChangePlan2}>
          <p className={Styles.ChangePlanText}>Change plan</p>
          <ToggleButtonGroup
            className={Styles.ChangePlanContentToggleButton}
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="Monthly"
              style={{
                padding: "8px 30px",
                border: "none",

                borderRadius: "5px",
                color: alignment === "Monthly" ? "#fff" : "#000",
                backgroundColor:
                  alignment === "Monthly" ? "#4d8bff" : "#ededed",
              }}
            >
              Monthly
            </ToggleButton>
            <CustomTooltip
              title="2 months introductory offer"
              placement="top"
              open={alignment === "Yearly"}
              arrow
            >
              <ToggleButton
                value="Yearly"
                style={{
                  padding: "8px 30px",
                  border: "none",
                  borderRadius: "5px",

                  color: alignment === "Yearly" ? "#fff" : "#000",
                  backgroundColor:
                    alignment === "Yearly" ? "#4d8bff" : "#ededed",
                }}
              >
                Yearly
              </ToggleButton>
            </CustomTooltip>
          </ToggleButtonGroup>
        </div>
        <div className={Styles.ChangePlanContent}>
          <div className={Styles.ChangePlanContentDripContainer}>
            <div className={Styles.ChangePlanContentDripHeaderContainer}>
              <p className={Styles.ChangePlanContentDripHeaderContainerTitle}>
                Drip
              </p>
              <p className={Styles.ChangePlanContentDripHeaderContainerText}>
                DOMESTIC
              </p>
              <p className={Styles.ChangePlanContentDripHeaderContainerText2}>
                Upto 4 Tanks
              </p>
            </div>
            <div className={Styles.ChangePlanContentDripHeaderContainer}>
              <div className={Styles.ChangePlanContentDripHeaderContent}>
                <p className={Styles.ChangePlanContentDripHeaderContentAmount}>
                  ${alignment === "Monthly" ? "9.00" : "90.00"}

                </p>
                <p className={Styles.ChangePlanContentDripHeaderContentTTD}>
                  TTD
                </p>
              </div>
              <p className={Styles.ChangePlanContentDripHeaderContainerText}>
                {billingPeriod} + installation
              </p>
            </div>
            <div className={Styles.ChangePlanContentDripListContainer}>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={PaymentWaySuccess} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Real-time water level indication
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={PaymentWaySuccess} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Mobile alerts - leaks & overflow
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={PaymentWaySuccess} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Annual tank cleaning alert
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={PaymentWaySuccess} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Order truck borne water
                </p>
              </div>
            </div>
            <span className={Styles.ChangePlanContentDripListActiveContainer}>
              <p
                className={
                  Styles.ChangePlanContentTrickleListActiveContainerText
                }
              >
                Exceeds 4 Tanks
              </p>
              <p
                className={
                  Styles.ChangePlanContentDripListActiveContainerAmount
                }
              >
                ${alignment === "Monthly" ? "10.00" : "100.00"}

              </p>
            </span>
            {authUserr?.data?.subscriptionid === "1" ? (
              <>
                <button
                  className={Styles.ChangePlanContentSplashChoosePlanButtonColor}
                  onClick={() => {
                    setSubscription("Drip");
                    setOpen(true);
                  }}
                >
                  Upgrade plan
                </button>
                <div
                  className={
                    Styles.ChangePlanContentSplashChoosePlanButtonActiveContainer
                  }
                >
                  <p
                    className={
                      Styles.ChangePlanContentSplashChoosePlanButtonActiveContainerText
                    }
                  >
                    {" "}
                    Active upto
                  </p>
                  <p
                    className={
                      Styles.ChangePlanContentSplashChoosePlanButtonActiveContainerDate
                    }
                  >
                    {" "}
                    {endSplittedDate}
                  </p>
                </div></>
            ) : (
              <button
                className={Styles.ChangePlanContentSplashChoosePlanButton}
                onClick={() => {
                  setSubscription("Drip");
                  setOpen(true);
                }}
              >
                Choose this plan
              </button>
            )}
          </div>
          <div className={Styles.ChangePlanContentTrickleContainer}>
            <div className={Styles.ChangePlanContentDripHeaderContainer}>
              <p className={Styles.ChangePlanContentDripHeaderContainerTitle}>
                Trickle
              </p>
              <p className={Styles.ChangePlanContentDripHeaderContainerText}>
                DOMESTIC
              </p>
              <p className={Styles.ChangePlanContentDripHeaderContainerText2}>
                Upto 4 Tanks
              </p>
            </div>
            <div className={Styles.ChangePlanContentDripHeaderContainer}>
              <div className={Styles.ChangePlanContentDripHeaderContent}>
                <p className={Styles.ChangePlanContentDripHeaderContentAmount}>
                  ${alignment === "Monthly" ? "12.00" : "120.00"}
                </p>
                <p className={Styles.ChangePlanContentDripHeaderContentTTD}>
                  TTD
                </p>
              </div>
              <p className={Styles.ChangePlanContentDripHeaderContainerText}>
                {billingPeriod} + installation
              </p>
            </div>
            <div className={Styles.ChangePlanContentDripListContainer}>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={TricleImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Real-time water level indication
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={TricleImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Mobile alerts - leaks & overflow
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={TricleImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Annual tank cleaning alert
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={TricleImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Order truck borne water
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={TricleImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Monthly usage report and analysis
                </p>
              </div>
            </div>
            <span
              className={Styles.ChangePlanContentTrickleListActiveContainer}
            >
              <p
                className={
                  Styles.ChangePlanContentTrickleListActiveContainerText
                }
              >
                Exceeds 4 Tanks
              </p>
              <p
                className={
                  Styles.ChangePlanContentTrickleListActiveContainerAmount
                }
              >
                ${alignment === "Monthly" ? "13.00" : "130.00"}

              </p>
            </span>
            {authUserr?.data?.subscriptionid === "2" ? (
              <>
                <button
                  className={Styles.ChangePlanContentSplashChoosePlanButtonColor}
                  onClick={() => {
                    setSubscription("Trickle");
                    setOpen(true);
                  }}
                >
                  Upgrade plan
                </button>
                <div
                  className={
                    Styles.ChangePlanContentSplashChoosePlanButtonActiveContainer
                  }
                >
                  <p
                    className={
                      Styles.ChangePlanContentSplashChoosePlanButtonActiveContainerText
                    }
                  >
                    {" "}
                    Active upto
                  </p>
                  <p
                    className={
                      Styles.ChangePlanContentSplashChoosePlanButtonActiveContainerDate
                    }
                  >
                    {" "}
                    {endSplittedDate}
                  </p>
                </div></>
            ) : (
              <button
                className={Styles.ChangePlanContentSplashChoosePlanButton}
                onClick={() => {
                  setSubscription("Trickle");
                  setOpen(true);
                }}
              >
                Choose this plan
              </button>
            )}
          </div>
          <div className={Styles.ChangePlanContentSplashContainer}>
            <div className={Styles.ChangePlanContentDripHeaderContainer}>
              <p className={Styles.ChangePlanContentDripHeaderContainerTitle}>
                Splash
              </p>
              <p className={Styles.ChangePlanContentDripHeaderContainerText}>
                DOMESTIC
              </p>
              <p className={Styles.ChangePlanContentDripHeaderContainerText2}>
                Upto 4 Tanks
              </p>
            </div>
            <div className={Styles.ChangePlanContentDripHeaderContainer}>
              <div className={Styles.ChangePlanContentDripHeaderContent}>
                <p className={Styles.ChangePlanContentDripHeaderContentAmount}>
                  ${alignment === "Monthly" ? "15.00" : "150.00"}
                </p>
                <p className={Styles.ChangePlanContentDripHeaderContentTTD}>
                  TTD
                </p>
              </div>
              <p className={Styles.ChangePlanContentDripHeaderContainerText}>
                {billingPeriod} + installation
              </p>
            </div>
            {/* <div className={Styles.ChangePlanContentSplashChoosePlanButtonActive}>
                            <hr className={Styles.ChangePlanContentSplashChoosePlanButtonLine}/>
                           
                        </div> */}
            <div className={Styles.ChangePlanContentDripListContainer}>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SplashImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Real-time water level indication
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SplashImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Mobile alerts - leaks & overflow
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SplashImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Annual tank cleaning alert
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SplashImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Order truck borne water
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SplashImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Monthly usage report and analysis
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SplashImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Annual system check up
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SplashImage} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Free derelict tank disposal
                </p>
              </div>
            </div>
            <span
              className={Styles.ChangePlanContentTrickleListActiveContainer}
            >
              <p
                className={
                  Styles.ChangePlanContentTrickleListActiveContainerText
                }
              >
                Exceeds 4 Tanks
              </p>
              <p
                className={
                  Styles.ChangePlanContentTrickleListActiveContainerAmount
                }
              >
                ${alignment === "Monthly" ? "16.00" : "160.00"}

              </p>
            </span>
            {/* <div className={Styles.ChangePlanContentSplashChoosePlanButtonActive}> */}
            {/* <hr className={Styles.ChangePlanContentSplashChoosePlanButtonLine}/> */}
            {/* </div> */}

            {authUserr?.data?.subscriptionid === "3" ? (
              <>
                <button
                  className={Styles.ChangePlanContentSplashChoosePlanButtonColor}
                  onClick={() => {
                    setSubscription("Splash");
                    setOpen(true);
                  }}
                >
                  Upgrade plan
                </button>
                <div
                  className={
                    Styles.ChangePlanContentSplashChoosePlanButtonActiveContainer
                  }
                >
                  <p
                    className={
                      Styles.ChangePlanContentSplashChoosePlanButtonActiveContainerText
                    }
                  >
                    {" "}
                    Active upto
                  </p>
                  <p
                    className={
                      Styles.ChangePlanContentSplashChoosePlanButtonActiveContainerDate
                    }
                  >
                    {" "}
                    {endSplittedDate}
                  </p>
                </div></>
            ) : (
              <button
                className={Styles.ChangePlanContentSplashChoosePlanButton}
                onClick={() => {
                  setSubscription("Splash");
                  setOpen(true);
                }}
              >
                Choose this plan
              </button>
            )}
          </div>
          <div className={Styles.ChangePlanContentMassContainer}>
            <div className={Styles.ChangePlanContentDripHeaderContainer}>
              <p className={Styles.ChangePlanContentDripHeaderContainerTitle}>
                Maas
              </p>
              <p className={Styles.ChangePlanContentDripHeaderContainerText}>
                NON-DOMESTIC
              </p>
              <p className={Styles.ChangePlanContentMassHeaderContainerText2}>
                Upto 4 Tanks
              </p>
            </div>
            <div className={Styles.ChangePlanContentMassHeaderContainer}>
              <div className={Styles.ChangePlanContentDripHeaderContent}>
                {/* <p className={Styles.ChangePlanContentDripHeaderContentAmount}>
                  ${alignment === "Monthly" ? "15.00" : "150.00"}
                </p> */}
                <p className={Styles.ChangePlanContentDripHeaderContentTTD}>
                  TTD
                </p>
              </div>
              <p className={Styles.ChangePlanContentDripHeaderContainerText}>
                {billingPeriod} + installation
              </p>
            </div>
            {/* <div className={Styles.ChangePlanContentSplashChoosePlanButtonActive}>
                            <hr className={Styles.ChangePlanContentSplashChoosePlanButtonLine}/>
                           
                        </div> */}
            <div className={Styles.ChangePlanContentDripListContainer}>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SkyTrickle} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Real-time water level indication
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SkyTrickle} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Mobile alerts - leaks & overflow
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SkyTrickle} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Annual tank cleaning alert
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SkyTrickle} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Order truck borne water
                </p>
              </div>
              <div className={Styles.ChangePlanContentDripListContent}>
                <img src={SkyTrickle} alt="" />
                <p className={Styles.ChangePlanContentDripListContentText}>
                  Monthly usage report and analysis
                </p>
              </div>
            </div>

            <span
              className={Styles.ChangePlanContentTrickleListActiveContainer}
            >
              <p
                className={
                  Styles.ChangePlanContentTrickleListActiveContainerText
                }
              >
                Contact us for Pricing
              </p>
              {/* <p
                className={
                  Styles.ChangePlanContentTrickleListActiveContainerAmount
                }
              >
                $ 13.00 TTD
              </p> */}
            </span>
            {/* <div className={Styles.ChangePlanContentSplashChoosePlanButtonActive}> */}
            {/* <hr className={Styles.ChangePlanContentSplashChoosePlanButtonLine}/> */}
            {/* </div> */}


            <button
              className={Styles.ChangePlanContentSplashChoosePlanButton}
              onClick={() => {
                setSubscription("Splash");
                // setOpen(true);
              }}
            >
              <CallIcon />
              <a href="tel:+91-868-294-3549" className={Styles.ChangePlanContentSplashChoosePlanButto}>8682943549</a>

            </button>

          </div>
        </div>

      </div>

      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Styles.SubscriptionPopUpMadelBox}>
          <div className={Styles.SubscriptionPopUpMadelContainer}>
            <div className={Styles.SubscriptionPopUpMadelContainerTitle}>
              <p className={Styles.SubscriptionPopUpMadelContainerTitleText}>
                Are you sure you want to choose this plan instead?
              </p>
              {alignment === "Monthly" ? (
                <p
                  className={Styles.SubscriptionPopUpMadelContainerDescription}
                >
                  Your new plan starts now. You’ll pay{" "}
                  <span
                    className={
                      Styles.SubscriptionPopUpMadelContainerDescriptionMoney
                    }
                  >
                    {subscription === "Drip"
                      ? "$9.00"
                      : subscription === "Trickle"
                        ? "$13.00"
                        : subscription === "Splash" ?
                          "$15.00"
                          // : subscription === "Maas"?"$90.00"
                          : ""}
                    /month
                  </span>{" "}
                  starting {formattedDate}. You agree that your Wetflix
                  membership will continue and that we will charge the updated
                  monthly fee until you cancel.
                </p>
              ) : (
                <p
                  className={Styles.SubscriptionPopUpMadelContainerDescription}
                >
                  Your new plan starts now. You’ll pay{" "}
                  <span
                    className={
                      Styles.SubscriptionPopUpMadelContainerDescriptionMoney
                    }
                  >
                    {subscription === "Drip"
                      ? "$90.00"
                      : subscription === "Trickle"
                        ? "$130.00"
                        : subscription === "Splash" ?
                          "$150.00"
                          // : subscription === "Maas"?"$90.00"
                          : ""}
                    /year
                  </span>{" "}
                  starting {formattedDate}. You agree that your Wetflix
                  membership will continue and that we will charge the updated
                  monthly fee until you cancel.
                </p>
              )}
            </div>
            <div className={Styles.SubscriptionPopUpContent}>
              <span className={Styles.SubscriptionPopUpContentHeader}>
                <p>Upto 4 Tanks</p>
              </span>
              <div
                className={Styles.SubscriptionPopUpContentFirstTwoColumn}
                onClick={() => handleChanges({ target: { value: "option1" } })}
                style={{ cursor: "pointer" }} // Optional: makes it clear that it's clickable
              >
                <div className={Styles.SubscriptionPopUpContentTitleFeild}>
                  <p className={Styles.SubscriptionPopUpContentTitleFeildText}>
                    {subscription === "Drip"
                      ? "Drip"
                      : subscription === "Trickle"
                        ? "Trickle"
                        : subscription === "Splash"
                          ? "Splash"
                          : ""}
                  </p>
                  <p className={Styles.SubscriptionPopUpContentTitleFeildDescription}>
                    Lectus dapibus odio velit
                  </p>
                </div>
                <div className={Styles.SubscriptionPopUpContentMoneyFeild}>
                  <p className={Styles.SubscriptionPopUpContentMoneyFeildPayment}>
                    {alignment === "Monthly"
                      ? subscription === "Drip"
                        ? "$9.00"
                        : subscription === "Trickle"
                          ? "$12.00"
                          : subscription === "Splash"
                            ? "$15.00"
                            : "$0.00"
                      : subscription === "Drip"
                        ? "$90.00"
                        : subscription === "Trickle"
                          ? "$120.00"
                          : subscription === "Splash"
                            ? "$150.00"
                            : "$0.00"}
                    <span
                      className={
                        Styles.SubscriptionPopUpContentMoneyFeildPaymentCountry
                      }
                    >
                      TTD
                    </span>
                  </p>
                  <p className={Styles.SubscriptionPopUpContentMoneyFeildTime}>
                    {alignment === "Monthly"
                      ? "monthly + installation"
                      : "Yearly + installation"}
                  </p>
                </div>
                <div>
                  <RadioGroup value={selectedValue} onChange={handleChanges}>
                    <FormControlLabel
                      value="option1"
                      control={
                        <Radio
                          sx={{
                            color: "#d5d5d5",
                            "&.Mui-checked": {
                              color: "#5BD1DC",
                            },
                            "&:hover": {
                              boxShadow: "none",
                            },
                          }}
                          icon={<CheckCircleIcon />}
                          checkedIcon={<CheckCircleIcon />}
                        />
                      }
                    />
                  </RadioGroup>
                </div>
              </div>

              <div className={Styles.SubscriptionPopUpContentPlanFeild}>
                {subscription === "Drip" ? (
                  <>
                    <div className={Styles.ChangePlanContentDripListContent}>
                      <img src={PaymentWaySuccess} alt="" />
                      <p
                        className={
                          Styles.ChangePlanContentDripListContentText
                        }
                      >
                        Real-time water level indication
                      </p>
                    </div>
                    <div className={Styles.ChangePlanContentDripListContent}>
                      <img src={PaymentWaySuccess} alt="" />
                      <p
                        className={
                          Styles.ChangePlanContentDripListContentText
                        }
                      >
                        Mobile alerts - leaks & overflow
                      </p>
                    </div>
                    <div className={Styles.ChangePlanContentDripListContent}>
                      <img src={PaymentWaySuccess} alt="" />
                      <p
                        className={
                          Styles.ChangePlanContentDripListContentText
                        }
                      >
                        Annual tank cleaning alert
                      </p>
                    </div>
                    <div className={Styles.ChangePlanContentDripListContent}>
                      <img src={PaymentWaySuccess} alt="" />
                      <p
                        className={
                          Styles.ChangePlanContentDripListContentText
                        }
                      >
                        Order truck borne water
                      </p>
                    </div>
                  </>
                ) : subscription === "Trickle" ? (
                  <>
                    <div
                      className={Styles.ChangePlanContentDripListContainer}
                    >
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={TricleImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Real-time water level indication
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={TricleImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Mobile alerts - leaks & overflow
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={TricleImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Annual tank cleaning alert
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={TricleImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Order truck borne water
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={TricleImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Monthly usage report and analysis
                        </p>
                      </div>
                    </div>
                  </>
                ) : subscription === "Splash" ? (
                  <>
                    <div
                      className={Styles.ChangePlanContentDripListContainer}
                    >
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Real-time water level indication
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Mobile alerts - leaks & overflow
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Annual tank cleaning alert
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Order truck borne water
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Monthly usage report and analysis
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Annual system check up
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Free derelict tank disposal
                        </p>
                      </div>
                    </div>
                  </>
                ) : subscription === "Maas" ? (
                  <>
                    <div
                      className={Styles.ChangePlanContentDripListContainer}
                    >
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Real-time water level indication
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Mobile alerts - leaks & overflow
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Annual tank cleaning alert
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Order truck borne water
                        </p>
                      </div>
                      <div
                        className={Styles.ChangePlanContentDripListContent}
                      >
                        <img src={SplashImage} alt="" />
                        <p
                          className={
                            Styles.ChangePlanContentDripListContentText
                          }
                        >
                          Monthly usage report and analysis
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <h1>dvgdcgcv</h1>
                )}
              </div>
            </div>
            <div className={Styles.SubscriptionPopUpContent}>
              <span className={Styles.SubscriptionPopUpContentHeader}>
                <p>
                  {subscription === "Maas"
                    ? "5 to 7 Tanks"
                    : "Exceeds 4 Tanks"}
                </p>
              </span>
              <div
                className={Styles.SubscriptionPopUpContentFirstTwoColumn}
                onClick={() => handleChanges({ target: { value: "option2" } })}
                style={{ cursor: "pointer" }} // Optional for user clarity
              >
                <div className={Styles.SubscriptionPopUpContentTitleFeild}>
                  <p className={Styles.SubscriptionPopUpContentTitleFeildText}>
                    {subscription === "Drip"
                      ? "Drip"
                      : subscription === "Trickle"
                        ? "Trickle"
                        : subscription === "Splash"
                          ? "Splash"
                          : subscription === "Maas"
                            ? "Maas"
                            : ""}
                  </p>
                  <p className={Styles.SubscriptionPopUpContentTitleFeildDescription}>
                    Lectus dapibus odio velit
                  </p>
                </div>

                <div className={Styles.SubscriptionPopUpContentMoneyFeild}>
                  <p className={Styles.SubscriptionPopUpContentMoneyFeildPayment}>
                    {alignment === "Monthly"
                      ? subscription === "Drip"
                        ? "$10.00"
                        : subscription === "Trickle"
                          ? "$13.00"
                          : subscription === "Splash"
                            ? "$16.00"
                            : subscription === "Maas"
                              ? "$150.00"
                              : "$0.00"
                      : subscription === "Drip"
                        ? "$100.00"
                        : subscription === "Trickle"
                          ? "$130.00"
                          : subscription === "Splash"
                            ? "$160.00"
                            : subscription === "Maas"
                              ? "$1500.00"
                              : "$0.00"}
                    <span
                      className={
                        Styles.SubscriptionPopUpContentMoneyFeildPaymentCountry
                      }
                    >
                      TTD
                    </span>
                  </p>
                  <p className={Styles.SubscriptionPopUpContentMoneyFeildTime}>
                    {alignment === "Monthly"
                      ? "monthly + installation"
                      : "Yearly + installation"}
                  </p>
                </div>

                <div>
                  <RadioGroup value={selectedValue} onChange={handleChanges}>
                    <FormControlLabel
                      value="option2"
                      control={
                        <Radio
                          sx={{
                            color: "#d5d5d5",
                            "&.Mui-checked": {
                              color: "#5BD1DC",
                            },
                            "&:hover": {
                              boxShadow: "none",
                            },
                          }}
                          icon={<CheckCircleIcon />}
                          checkedIcon={<CheckCircleIcon />}
                        />
                      }
                    />
                  </RadioGroup>
                </div>
              </div>

              <div className={Styles.SubscriptionPopUpContentPlanFeild}></div>
            </div>
            {subscription === "Maas" && (
              <div className={Styles.SubscriptionPopUpContent}>
                <span className={Styles.SubscriptionPopUpContentHeader}>
                  <p>8 to 10 Tanks</p>
                </span>
                <div
                  className={Styles.SubscriptionPopUpContentFirstTwoColumn}
                  onClick={() => {
                    setSelectedValue("option3");
                    setSubscription("Splash");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className={Styles.SubscriptionPopUpContentTitleFeild}>
                    <p className={Styles.SubscriptionPopUpContentTitleFeildText}>
                      {subscription === "Drip"
                        ? "Drip"
                        : subscription === "Trickle"
                          ? "Trickle"
                          : subscription === "Splash"
                            ? "Splash"
                            : subscription === "Maas"
                              ? "Maas"
                              : ""}
                    </p>
                    <p className={Styles.SubscriptionPopUpContentTitleFeildDescription}>
                      Lectus dapibus odio velit
                    </p>
                  </div>

                  <div className={Styles.SubscriptionPopUpContentMoneyFeild}>
                    <p className={Styles.SubscriptionPopUpContentMoneyFeildPayment}>
                      {alignment === "Monthly"
                        ? subscription === "Drip"
                          ? "$10.00"
                          : subscription === "Trickle"
                            ? "$13.00/"
                            : subscription === "Splash"
                              ? "$15.00/"
                              : subscription === "Maas"
                                ? "$200.00/"
                                : "$0.00"
                        : subscription === "Drip"
                          ? "$10.00"
                          : subscription === "Trickle"
                            ? "$13.00/"
                            : subscription === "Splash"
                              ? "$15.00/"
                              : subscription === "Maas"
                                ? "$2000.00/"
                                : "$0.00"}
                      <span className={Styles.SubscriptionPopUpContentMoneyFeildPaymentCountry}>
                        TTD
                      </span>
                    </p>
                    <p className={Styles.SubscriptionPopUpContentMoneyFeildTime}>
                      {alignment === "Monthly"
                        ? "monthly + installation"
                        : "Yearly + installation"}
                    </p>
                  </div>

                  <div onClick={(e) => e.stopPropagation()}>
                    <RadioGroup value={selectedValue} onChange={handleChanges}>
                      <FormControlLabel
                        value="option3"
                        control={
                          <Radio
                            sx={{
                              color: "#d5d5d5",
                              "&.Mui-checked": {
                                color: "#5BD1DC",
                              },
                              "&:hover": {
                                boxShadow: "none",
                              },
                            }}
                            icon={<CheckCircleIcon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                        }
                      />
                    </RadioGroup>
                  </div>
                </div>

                <div
                  className={Styles.SubscriptionPopUpContentPlanFeild}
                ></div>
              </div>
            )}

            <div className={Styles.SubscriptionPopUpContentButtonContainer}>
              <button
                className={Styles.SubscriptionPopUpContentButton}
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className={Styles.SubscriptionPopUpContentContinueButton}
                onClick={() => {
                  handleContinueToPayment();
                  handleReOpen();
                  handlePaymentClick()
                }}
              >
                <Link
                  to={`https://www.fygaro.com/en/pb/cd3c7f29-f5f6-4589-a7a9-c1342bb6182f/?jwt=${getPaymentResponse?.data?.jwtToken}`}
                  target="_blank"
                  className={Styles.paymentLiink}
                >
                  Continue to payment
                </Link>
              </button>
            </div>
          </div>

        </Box>
      </Modal>
      {reOpen ? (
        <Modal open={secondModalOpen} Mobile Number
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              setSecondModalOpen(false)
            }
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBox}>
            <div className={Styles.paymentTimmerContainer}>
              {!isExpired ? (
                <>
                  <h2 className={Styles.paymentTimmerContainerText}>Payment in Progress</h2>
                  {" "}
                  <CircularProgress />
                  {" "}
                  <p className={Styles.paymentTimmerContainerText}>Time left to complete the payment: {formatTimeLeft(timeLeft)}</p>
                </>
              ) : (
                <>
                  <p className={Styles.paymentTimmerContainerText}>Payment session has expired. Please try again.</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSecondModalOpen(false)}
                  >
                    Close
                  </Button>
                </>
              )}
            </div>
          </Box>
        </Modal>) : ("")}
    </div>
  );
};
export default ChangePlan;
