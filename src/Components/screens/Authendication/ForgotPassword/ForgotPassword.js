import React, { useRef, useState, useEffect } from "react";
import Styles from "./Index.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as MailIcon } from "../../../assets/SvgIcons/MailIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import LoginImage from "../../../assets/images/LoginImage.png";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import {
  clearResetPasswordResponse,
  changePassword,
  MobileOTPVerify,
  OTPVerify,
  forgotpassword,
  ResendOTP
} from "../../../Redux/Actions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [forgotPassword, setForgotPassword] = useState({ email: "", phonenumber: "" });
  const forgotPasswordResponse = useSelector((state) => state.Login.forgotpassword);
  const emailOTPResponse = useSelector((state) => state.OTPVerification.OTPvalidation);
  const mobileOTPResponse = useSelector((state) => state.OTPVerification.MobileOTPValidation);
  // console.log("mobileOtpRes",mobileOTPResponse)

  const resetPassword = useSelector((state) => state.Login.changePassword);

  const [open, setOpen] = useState("forgotpassword");
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [emailPhone, setEmailPhone] = useState(false)
  const [errorMessages, setErrorMessages] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // const [min, setMin] = useState(0)
  // const [sec, setSec] = useState(20)
  const [endTime, setEndTime] = useState(null);
const [timeRemaining, setTimeRemaining] = useState(0);
  const [passwordUpdate, setPasswordUpdate] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    phonenumber: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmshowPassword, setConfirmShowPassword] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    password: "",
    confirmpassword: "",
  });

  // const resendOTP = async () => {
  //   setLoading(true);
  //   await dispatch(forgotpassword(forgotPassword));
  //   setLoading(false);
  // };


  useEffect(() => {
    if (forgotPasswordResponse?.statusCode === 200) {
      setOpen("otp");
      setErrorMessage("");
    } else if (forgotPasswordResponse?.statusCode === 400) {
      setErrorMessage(forgotPasswordResponse.message);
    }
  }, [forgotPasswordResponse]);

  useEffect(() => {
    if (emailOTPResponse?.statusCode === 200) {
      setOpen("");
      setOtpErrorMessage("");
    } else if (emailOTPResponse?.statusCode === 400) {
      setOtpErrorMessage(emailOTPResponse.message);
    }
  }, [emailOTPResponse]);

  useEffect(() => {
    console.log('mobile resp1',mobileOTPResponse)
    if (mobileOTPResponse?.statusCode === 200) {
      setOpen("");
      setOtpErrorMessage("");
    } else if (mobileOTPResponse?.statusCode === 400) {
      setOtpErrorMessage(mobileOTPResponse.message);
    }
  }, [mobileOTPResponse]);

  const handleEmailClick = () => {
    setEmailPhone(false)
    console.log("checked")
  }
  const handlePhoneClick = () => {
    setEmailPhone(true)

    console.log("picked")
  }

  // useEffect(() => {
  //   if (resetPassword?.statusCode === 200) {
  //     console.log("Password updated successfully, navigating...");
  //     navigate("/");
  //     toast.success(resetPassword.message); 
  //   } else if (resetPassword?.statusCode === 400) {
  //     setValidationErrors({
  //       ...validationErrors,
  //       password: resetPassword.message, 
  //     });
  //     toast.error(resetPassword.message); 
  //   }
  // }, [resetPassword, navigate, validationErrors]);

  useEffect(() => {
    let timer;
  
    if (endTime) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.max(0, endTime - now);
  
        if (remaining <= 0) {
          clearInterval(timer);
          setIsResendVisible(true); // Show "Resend OTP"
          setEndTime(null); // Stop the timer
        }
  
        setTimeRemaining(remaining);
      }, 1000);
    }
  
    return () => clearInterval(timer); // Cleanup on component unmount
  }, [endTime]);
  
  const startTimer = (durationInSeconds) => {
    const now = new Date().getTime();
    setEndTime(now + durationInSeconds * 1000); // Set the end time
    setTimeRemaining((durationInSeconds - 1) * 1000); 
    setIsResendVisible(false); // Hide "Resend OTP"
  };
  
  const resendOTP = async () => {
    setLoading(true);
    await dispatch(ResendOTP(forgotPassword));
    setLoading(false);
    startTimer(300); // Start a 5-minute timer
  };


  const handlePhoneNumberChange = (value) => {
    setForgotPassword({ ...forgotPassword, phonenumber: value });

    if (!value) {
      setErrorMessages({ ...errorMessages, phonenumber: "Phone number is required" });
    } else {
      // Clear the error when  starts typing
      setErrorMessages({ ...errorMessages, phonenumber: "" });
    }
  };

  const validatePasswords = () => {
    const errors = {};
    if (passwordUpdate.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    if (passwordUpdate.password !== passwordUpdate.confirmpassword) {
      errors.confirmpassword = "Passwords do not match.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const changePasswordUser = async () => {
    if (validatePasswords()) {
      setLoading(true);
      try {
        await dispatch(changePassword(passwordUpdate));
      } catch (error) {
        console.error("An error occurred while updating the password", error);
      } finally {
        setLoading(false);
      }
    }


  };

  useEffect(() => {
    if (resetPassword?.statusCode === 200) {
      console.log("Password updated successfully, navigating...");
      navigate("/");
      toast.success(resetPassword.message);
    } else if (resetPassword?.statusCode === 400) {
      setValidationErrors({
        ...validationErrors,
        password: resetPassword.message,
      });
      toast.error(resetPassword.message);
    }
  }, [resetPassword, navigate])

  useEffect(() => {
    return () => {
      dispatch(clearResetPasswordResponse());
    };
  }, [dispatch]);

  const [emailotp, SetEmailotp] = useState({ email: "", emailotp: "" });
  const [mobileotp, setMobileotp] = useState({ phonenumber: "", mobileotp: "" })
  const otpRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef()
  ];

  const addOtp = () => {
    const otpValue = otpRefs.map(ref => ref.current.value).join('');
    SetEmailotp({ ...emailotp, emailotp: otpValue });
    setMobileotp({ ...mobileotp, mobileotp: otpValue })
  };

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    e.target.value = value;

    // Move focus to next input
    if (value.length > 0 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    } else if (index === otpRefs.length - 1) {
      addOtp();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpRefs[index - 1].current.focus();
      otpRefs[index - 1].current.value = ''; // Clear previous input if backspace is pressed
    }
  };

  const handlePaste = (event) => {
    const paste = event.clipboardData.getData("Text"); // Get pasted text Otp
    const otpValue = paste.replace(/[^0-9]/g, "");

    if (otpValue.length === 6) {
      otpRefs.forEach((ref, index) => {
        ref.current.value = otpValue[index] || '';
      });
      SetEmailotp({ ...emailotp, emailotp: otpValue });
      setMobileotp({ ...mobileotp, mobileotp: otpValue })
    }
  };


  const emailOTPValidation = async () => {
    setLoading(true);
    await dispatch(OTPVerify(emailotp));
    // await dispatch(OTPVerify(phoneotp));
    setLoading(false);
  };
  const phoneOTPValidation = async () => {
    setLoading(true);
    // await dispatch(OTPVerify(emailotp));
    await dispatch(MobileOTPVerify(mobileotp));
    setLoading(false);
  };


  const ForgotPasswordLink = async () => {
    setLoading(true);
    await dispatch(forgotpassword(forgotPassword));
    SetEmailotp({ ...emailotp, email: forgotPassword.email });
    setMobileotp({ ...mobileotp, phonenumber: forgotPassword.phonenumber })

    setLoading(false);
    startTimer(300); 
  };

  // Utility to format time as MM:SS
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  useEffect(() => {
    setForgotPassword({ email: "", phonenumber: "" });
    setOpen("forgotpassword");
    setErrorMessage("");
    setOtpErrorMessage("");
    setLoading(false);
    setPasswordUpdate({ email: "", password: "", confirmpassword: "" });
    setValidationErrors({ password: "", confirmpassword: "" });
    SetEmailotp({ email: "", emailotp: "" });
    setMobileotp({ phonenumber: "", mobileotp: "" })
  }, []);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowConfirmPassword = () => setConfirmShowPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  return (
    <div className={Styles.ForgotPasswordMainContainer}>
      <img src={LoginImage} alt="" />
      {open === "forgotpassword" ? (
        <div className={Styles.ForgotPasswordContant}>
          <div className={Styles.ForgotPasswordTitleContant}>
            <p className={Styles.ForgotPasswordContantTitleText}>
              Forgot your password?
            </p>
            <p className={Styles.ForgotPasswordContantTitleDescription}>
              We’ll send a link that will sign you into the app instantly.
            </p>
          </div>
          <div className={Styles.ForgotPasswordEmailOrMobileContent}>
            <div className={Styles.emailAndPhone}>
            <p className={Styles.LoginEmailOrMobileLable} onClick={() => { handleEmailClick() }} style={{
              // backgroundColor: !emailPhone ? "blue" : "transparent",
              color: !emailPhone ? "#347FE5" : "black",
              borderBottom: !emailPhone ? "1px solid #347FE5" : "",
              // borderRadius: "4px",
              padding: "5px 10px",
            }}>
              {" "}
              Email{" "}
            </p>
            <p className={Styles.LoginEmailOrMobileLable} onClick={() => { handlePhoneClick() }} style={{
              // backgroundColor: emailPhone ? "blue" : "transparent",
              color: emailPhone ? "#347FE5" : "black",
              borderBottom: emailPhone ? "1px solid #347FE5" : "",
              // borderRadius: "4px",
              padding: "5px 10px",
            }}>
              {" "}
              Phone Number{" "}
            </p>
            </div>
            {emailPhone === false ? (
              <TextField
                id="outlined-start-adornment"
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                }}
                name="email"
                placeholder={"Enter your email or phone"}
                onChange={(e) =>
                  setForgotPassword({ ...forgotPassword, email: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <MuiPhoneNumber
                defaultCountry={"tt"}
                name="phonenumber"
                variant="outlined"
                required
                enableLongNumbers
                onChange={handlePhoneNumberChange}
                sx={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #E9EDF2",
                  borderRadius: "8px",
                }}
                placeholder={"Enter your Phone Number"}
                className={Styles.RegistrationPageMobileNumber}
              />
            )}
            {forgotPasswordResponse?.statusCode === 400 && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                <span style={{ color: 'red', marginRight: '5px' }}>*</span>
                {forgotPasswordResponse.message}
              </p>
            )}
          </div>
          <button
            className={Styles.ForgotPasswordSubmitButton}
            onClick={async () => {
              await ForgotPasswordLink();
            }}
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </div>
      ) : open === "otp" ? (
        <div className={Styles.ForgotPasswordContant}>
          <div className={Styles.ResetPasswordTitleContainer}>
            <p className={Styles.ResetPasswordTitleText}>Password reset</p>
            <p className={Styles.ResetPasswordTitleDescription}>
              We’ve sent a 6 digit code to {forgotPassword.email}
            </p>
            <div className={Styles.ResetPasswordOTPContainer}
              onPaste={handlePaste}
            >
              {otpRefs.map((ref, index) => (
                <input
                  key={index}
                  className={Styles.ForgotPasswordOTPInput}
                  maxLength="1"
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  ref={ref}
                />
              ))}
            </div>
            {otpErrorMessage && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                <span style={{ color: 'red', marginRight: '5px' }}>*</span>
                {otpErrorMessage}
              </p>
            )}
          </div>
          <button
            className={Styles.emailOTPSubmitButton}
            onClick={async () => {
              if (emailPhone === false) {
                // If the user is using email
                await emailOTPValidation();
              } else {
                // If the user is using phone number
                await phoneOTPValidation();
              }
              setPasswordUpdate({
                ...passwordUpdate,
                email: forgotPassword.email,
                phonenumber: forgotPassword.phonenumber,
              });
            }}
          >
            {loading ? "Validating..." : "Continue"}
          </button>

          <p>
            Time Remaining:
            <span style={{ color: "#3480E5" }}>
            {formatTime(timeRemaining)}
            </span>
          </p>



          <div className={Styles.ForgotPasswordResendOTPLinkContent}>

            {isResendVisible && (
              <>
                <p className={Styles.ForgotPasswordResendOTPText}>
                  Didn’t receive the link?
                </p>
                <p
                  className={Styles.ForgotPasswordResendOTPTLink}
                  onClick={async () => {
                    await resendOTP();
                  }}
                >
                  Click to resend
                </p>
              </>
            )}
          </div>

        </div>
      ) : (
        <div className={Styles.ChangePasswordContant}>
          <div className={Styles.ForgotPasswordTitleContant}>
            <p className={Styles.ForgotPasswordContantTitleText}>
              Create a password
            </p>
            <p className={Styles.ForgotPasswordContantTitleDescription}>
              Must be at least 8 characters
            </p>
          </div>
          <div className={Styles.changePasswordContent}>
            <p className={Styles.changePasswordLable}> Password </p>
            <FormControl
              sx={{
                width: "100%",
                background: "#F8FAFC",
                border: "1px solid #E9EDF2",
                borderRadius: "8px",
              }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={"Enter your password"}
                onChange={(e) => {
                  const value = e.target.value;
                  setPasswordUpdate({
                    ...passwordUpdate,
                    password: value,
                  });
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            {validationErrors.password && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                <span style={{ color: 'red', marginRight: '5px' }}>*</span>
                {validationErrors.password}
              </p>
            )}
          </div>
          <div className={Styles.changePasswordContent}>
            <p className={Styles.changePasswordLable}> Confirm password </p>
            <FormControl
              sx={{
                width: "100%",
                background: "#F8FAFC",
                border: "1px solid #E9EDF2",
                borderRadius: "8px",
              }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-adornment-confirmpassword"
                type={confirmshowPassword ? "text" : "password"}
                name="confirmpassword"
                placeholder={"Confirm password"}
                onChange={(e) =>
                  setPasswordUpdate({
                    ...passwordUpdate,
                    confirmpassword: e.target.value,
                  })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {confirmshowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
            {validationErrors.confirmpassword && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                <span style={{ color: 'red', marginRight: '5px' }}>*</span>
                {validationErrors.confirmpassword}
              </p>
            )}
          </div>
          <button
            className={Styles.ForgotPasswordSubmitButton}
            onClick={async () => {
              await changePasswordUser();
            }}
          >
            {loading ? "Updating..." : "Confirm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;