import React, { useEffect, useRef, useState } from "react";
import Styles from "./Index.module.css";
import LoginImage from "../../../assets/images/LoginImage.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as MailIcon } from "../../../assets/SvgIcons/MailIcon.svg";
import MuiPhoneNumber from "material-ui-phone-number";
import { useDispatch, useSelector } from "react-redux";
import { OTPVerify, userCreate, MobileOTPVerify,clearCreateResponse,ResendOTP } from "../../../Redux/Actions";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { useLocation } from "react-router-dom";  // import this at the top

const Registration = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const userCreateResponse = useSelector(state => state.Registration.RegistrationDetails);
  const emailOTPResponse = useSelector((state) => state.OTPVerification.OTPvalidation);
  const mobileOTPResponse = useSelector((state) => state.OTPVerification.MobileOTPValidation);
    const [isResendVisible, setIsResendVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isTimerRunning, setIsTimerRunning]  = useState(false);
  
    // const [min, setMin] = useState(0)
    // const [sec, setSec] = useState(20)
    const [endTime, setEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const [registration, setRegistration] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    roleid: 1,
    countrycode: "+91",
  });
  const [resendOtp, setResendOtp] = useState({
    email:""
  });
  const [resendMobileOtp, setResendMobileOtp] = useState({
    phonenumber:""
  });
  
  const [errorMessages, setErrorMessages] = useState({}); 
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [registrationOtpOpen, setRegistrationOtpOpen] = useState("Signup");
  const [confirmshowPassword, setConfirmShowPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setConfirmShowPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }
    
    const domain = email.split('@')[1];
    const domainRegex = /^[a-zA-Z0-9.]+$/; 
    
    return domainRegex.test(domain);
  };
  
  
  
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setRegistration({ ...registration, email });
  setResendOtp({...resendOtp,email})
  
    if (!validateEmail(email)) {
      setErrorMessages({ ...errorMessages, email: "Please enter a valid email address" });
    } else {
      setErrorMessages({ ...errorMessages, email: "" });
    }
  };
  
  const location = useLocation(); 

  useEffect(() => {
    if (userCreateResponse?.statusCode === 200) {
      setRegistrationOtpOpen("emailOtp");
      SetEmailotp({ ...emailotp, email: registration.email });
    } else if (userCreateResponse?.statusCode === 400) {
      const errors = {};
      if (Array.isArray(userCreateResponse?.data)) {
        userCreateResponse.data.forEach((errorItem) => {
          errors[errorItem.field] = errorItem.error;
        });
      } else {
        errors.general = userCreateResponse?.message || "An unknown error occurred";
      }
      setErrorMessages(errors);
    }
  }, [userCreateResponse]);
  
  const handlePhoneNumberChange = (value) => {
    setRegistration({ ...registration, phonenumber: value });
    setResendMobileOtp({ ...resendMobileOtp, phonenumber: value });
  
    if (!value) {
      setErrorMessages({ ...errorMessages, phonenumber: "Phone number is required" });
    } else {
      // Clear the error when  starts typing
      setErrorMessages({ ...errorMessages, phonenumber: "" });
    }
  };
  
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
    
    const  resendOTP = async () => {
      setLoading(true);
      await dispatch(ResendOTP(resendOtp));
      setLoading(false);
      startTimer(300); // Start a 5-minute timer
    };
    

    const resendMobileOTP = async () => {
      setLoading(true);
      await dispatch(ResendOTP(resendMobileOtp));
      setLoading(false);
      startTimer(300); // Start a 5-minute timer
    };
  
  const createNewUser = () => {
    const errors = {}; 
    if (!registration.firstname) {
      errors.firstname = "First name is required";
    }
  
    if (!registration.lastname) {
      errors.lastname = "Last name is required";
    }
  
    if (!validateEmail(registration.email)) {
      errors.email = "Please enter a valid email address";
    }
  
    if (!registration.phonenumber) {
      errors.phonenumber = "Phone number is required";
    }
  
    if (registration.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
  
    if (registration.confirmPassword !== registration.password) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors); 
      return; 
    }
  
    setLoading(true);
    dispatch(userCreate(registration));
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
  
  const RegistrationemailOTPVerification = () => {
    setLoading(true);
    dispatch(OTPVerify(emailotp));
    setLoading(false);
    // startTimer(300); 
  };

  useEffect(() => {
    if (emailOTPResponse?.statusCode === 200) {
      SetMobileotp({ ...mobileotp, phonenumber : registration.phonenumber });
      setRegistrationOtpOpen("mobileOtp"); 
      setOtpErrorMessage("")
    }else if (emailOTPResponse?.statusCode === 400) {
      setOtpErrorMessage(emailOTPResponse?.message || "An error occurred");
    }
  }, [emailOTPResponse]);
  

  const [emailotp, SetEmailotp] = useState({
    email: "",
    emailotp: "",
  });
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]{1,}$/; // Only letters, minimum 2 characters
    return nameRegex.test(name);
  };
  

const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  setRegistration({ ...registration, [name]: value });

  setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: "" }));
  
};
const handleInputnameChange = (e) => {
  const { name, value } = e.target;
  
  setRegistration({ ...registration, [name]: value });

  setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: "" }));
  if (!validateName(value)) {
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "Allow only Alphabets",
    }));
  } else {
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }
};

  useEffect(() => {
    setRegistration({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phonenumber: "",
      roleid: 1,
      countrycode: "+91",
    });
    setErrorMessages({});
    setOtpErrorMessage('');
    setRegistrationOtpOpen("Signup");
  }, [location.pathname]); 

  const otp1 = useRef();
  const otp2 = useRef();
  const otp3 = useRef();
  const otp4 = useRef();
  const otp5 = useRef();
  const otp6 = useRef();
  const addOtp = () => {
    let value = otp1.current.value + otp2.current.value + otp3.current.value + otp4.current.value + otp5.current.value + otp6.current.value;
    SetEmailotp({ ...emailotp, emailotp: value });
    SetMobileotp({ ...mobileotp, mobileotp: value });
  };
  

  const handleChange = (index, e) => {
    console.log(e); 
    if (!e.target) return; 
  
    let value = e.target.value.replace(/[^0-9]/, ""); 
    e.target.value = value;
  
    if (value && index < 6) {
      const nextInput = eval(`otp${index + 1}`);
      nextInput.current.focus();
    }
  
    addOtp();
  };
  
  
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (e.target.value === "") {
        if (index > 1) {
          const previousInput = eval(`otp${index - 1}`);
          previousInput.current.focus();
        }
      }
    }
  };
  

  const [mobileotp, SetMobileotp] = useState({
    phonenumber : "",
    mobileotp: "",
  });

  const RegistrationMobileNumberOTPVerification = () => {
    dispatch(MobileOTPVerify(mobileotp));
    // if (mobileOTPResponse?.statusCode === 200) {
    //   navigate("/user_dashboard");
    // }
    // if (mobileOTPResponse?.statusCode === 200) {
    //   toast.success("Registration Successfull !!!")
    //   navigate("/user_dashboard");
     
    // }else if (mobileOTPResponse?.statusCode === 400) {
    //   setOtpErrorMessage(mobileOTPResponse?.message || "An error occurred");
    // }
  };
  useEffect(() => {
    
    if (mobileOTPResponse?.statusCode === 200) {
      toast.success("Registration Successfull !!!")
      navigate("/");
     
    }else if (mobileOTPResponse?.statusCode === 400) {
      setOtpErrorMessage(mobileOTPResponse?.message || "An error occurred");
    }
  }, [mobileOTPResponse]);

  useEffect(()=>{
    dispatch(clearCreateResponse())
  },[dispatch])
  

  return (
    <div className={Styles.RegistrationPageMainContainer}>
      {registrationOtpOpen === "Signup" ? (
        <div className={Styles.RegistrationContainer}>
          <img src={LoginImage} alt="" />
          <div className={Styles.RegistrationMainContent}>
            <p className={Styles.RegistrationMainContentRegistrationText}>
              Sign up
            </p>
            <div className={Styles.RegistrationNameContent}>
              <div className={Styles.RegistrationFirstNameContent}>
                <p className={Styles.RegistrationFirstNameLable}> First name <span style={{ color: 'red' }}>*</span> </p>
                <TextField
                  id="outlined-start-adornment"
                  sx={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #E9EDF2",
                    borderRadius: "8px",
                  }}
                  name="firstname"
                  placeholder={"Enter your first name"}
                  onChange={handleInputnameChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
                {errorMessages.firstname && (
    <p style={{ color: "red" }}>* {errorMessages.firstname}</p>
  )}
              </div>
              <div className={Styles.RegistrationFirstNameContent}>
                <p className={Styles.RegistrationFirstNameLable}> Last name <span style={{ color: 'red' }}>*</span></p>
                <TextField
                  id="outlined-start-adornment"
                  sx={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #E9EDF2",
                    borderRadius: "8px",
                  }}
                  name="lastname"
                  placeholder={"Enter your last name"}
                  onChange={handleInputnameChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
                {errorMessages.lastname && (
    <p style={{ color: "red" }}>* {errorMessages.lastname}</p>
  )}
              </div>
            </div>
            <div className={Styles.RegistrationEmailOrMobileContent}>
      <p className={Styles.RegistrationEmailOrMobileLable}>
        Email address<span style={{ color: 'red' }}> *</span>
      </p>
      <TextField
        // className={Styles.RegistrationPageEmailTextField}
        // id="outlined-start-adornment"
        sx={{
          width: "100%",
          background: "#F8FAFC",
          border: "1px solid #E9EDF2",
          borderRadius: "8px",
        }}
        name="email"
        placeholder={"Enter your email or phone"}
        onChange={handleEmailChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon />
            </InputAdornment>
          ),
        }}
      />
      {errorMessages.email && (
        <p style={{ color: "red" }}>* {errorMessages.email}</p>
      )}
    </div>
            <div className={Styles.RegistrationEmailOrMobileContent}>
              <p className={Styles.RegistrationEmailOrMobileLable}>
                Phone number<span style={{ color: 'red' }}> *</span>
              </p>
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

              {errorMessages.phonenumber && (
    <p style={{ color: "red" }}>* {errorMessages.phonenumber}</p>
  )}
            </div>
            <div className={Styles.RegistrationEmailOrMobileContent}>
              <p className={Styles.RegistrationEmailOrMobileLable}> Password <span style={{ color: 'red' }}> *</span></p>
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
                  onChange={handleInputChange}
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
              {errorMessages.password && (
    <p style={{ color: "red" }}>* {errorMessages.password}</p>
  )}
            </div>
            <div className={Styles.RegistrationEmailOrMobileContent}>
              <p className={Styles.RegistrationEmailOrMobileLable}>
                Confirm password<span style={{ color: 'red' }}> *</span>
              </p>
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
                  id="outlined-adornment-confirm-password"
                  type={confirmshowPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder={"Confirm your password"}
                  onChange={handleInputChange}
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
              {errorMessages.confirmPassword && (
    <p style={{ color: "red" }}>* {errorMessages.confirmPassword}</p>
  )}

            </div>
            {errorMessages.general && (
      <p style={{ color: "red" }}>* {errorMessages.general}</p>
    )}
            {/* <button className={Styles.RegistrationContinueButton} onClick={createNewUser}>
              Continue
            </button> */}
            <button
              className={Styles.RegistrationPageSubmitButton}
              onClick={createNewUser}
            >
               Continue
             </button>
            {/* <p className={Styles.RegistrationTermsText}>
              By signing up, you agree to the Terms of Service and Privacy Policy.
            </p>
            <p className={Styles.RegistrationAlreadyHaveAccountText}>
              Already have an account? <Link to="/login">Sign in</Link>
            </p> */}
            <div className={Styles.RegistrationSignUpLinkContainer}>
             <p className={Styles.RegistrationSignUpLinkContainerText}>Already have an account?</p>
             <Link to="/">
               <p className={Styles.RegistrationSignUpLinkContainerTextLink}>
                 Sign in
             </p>
             </Link>
           </div> 
          </div>
        </div>
      ) : registrationOtpOpen === "emailOtp" ? (
        <div className={Styles.RegistrationOtpVerificationContanier}>
           <img src={LoginImage} alt="" />
           <div className={Styles.RegistrationOtpVerificationTitleContainer}>
           <p className={Styles.RegistrationOtpVerificationTitleText}>OTP Verification</p>
           <p className={Styles.RegistrationOtpVerificationTitleDescription}>
           We’ve sent a 6 digit code to {registration.email}
           </p>
           <OtpInput refs={[otp1, otp2, otp3, otp4, otp5, otp6]} handleChange={handleChange} handleKeyDown={handleKeyDown} addOtp={addOtp} />

          {otpErrorMessage && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                <span style={{ color: 'red', marginRight: '5px' }}>*</span>
                {otpErrorMessage}
              </p>
            )}
          </div>
          <button className={Styles.RegistrationOtpVerificationemailOTPSubmitButton} onClick={RegistrationemailOTPVerification}>
            Continue
          </button>
          <p>Time Remaining : 
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
      ) : null}
      {registrationOtpOpen === "mobileOtp" && (
        // <div className={Styles.RegistrationOtpVerificationContanier}>
        //   <p className={Styles.RegistrationOtpVerificationText}>
        //     Enter the OTP sent to {mobileotp.mobilenumber}
        //   </p>
        //   <OtpInput refs={[otp1, otp2, otp3, otp4, otp5, otp6]} handleChange={handleChange} handleKeyDown={handleKeyDown} />
        //   <button className={Styles.RegistrationOtpVerificationemailOTPSubmitButton} onClick={RegistrationMobileNumberOTPVerification}>
        //     Continue
        //   </button>
        // </div>
        <div className={Styles.RegistrationOtpVerificationContanier}>
        <img src={LoginImage} alt="" />
        <div className={Styles.RegistrationOtpVerificationTitleContainer}>
        <p className={Styles.RegistrationOtpVerificationTitleText}>OTP Verification</p>
        <p className={Styles.RegistrationOtpVerificationTitleDescription}>
        We’ve sent a 6 digit code to  {mobileotp.phonenumber }
        </p>
        <OtpInput refs={[otp1, otp2, otp3, otp4, otp5, otp6]} handleChange={handleChange} handleKeyDown={handleKeyDown} addOtp={addOtp} />

       {otpErrorMessage && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                <span style={{ color: 'red', marginRight: '5px' }}>*</span>
                {otpErrorMessage}
              </p>
            )}
       </div>
       <button className={Styles.RegistrationOtpVerificationemailOTPSubmitButton} onClick={RegistrationMobileNumberOTPVerification}>
         Continue
       </button>
          <p>Time Remaining : 
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
                    await resendMobileOTP();
                  }}
                >
                  Click to resend
                </p>
              </>
            )}
          </div>
     </div>
      )}
    </div>
  );
};

const OtpInput = ({ refs, handleChange, handleKeyDown, addOtp }) => {
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, 6); 
    const otpArray = pastedData.split(""); 

    otpArray.forEach((value, index) => {
      if (index < 6) {
        refs[index].current.value = value;
      }
    });

    addOtp();  // Use addOtp from props
  };

  return (
    <div className={Styles.RegistrationOtpVerificationOTPContainer}>
      {refs.map((ref, index) => (
        <input
          key={index}
          className={Styles.RegistrationOtpVerificationOTPInput}
          maxLength="1"
          onChange={(e) => handleChange(index + 1, e)}
          onKeyDown={(e) => handleKeyDown(index + 1, e)}
          onPaste={handlePaste} // Add onPaste event here
          ref={ref}
        />
      ))}
    </div>
  );
};


export default Registration;
