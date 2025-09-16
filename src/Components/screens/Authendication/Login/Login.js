import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersLogin, userLoginResponse, clearLoginResponse, clearCreateResponse } from "../../../Redux/Actions";
import { useState } from "react";
import Styles from "./Index.module.css";
// import LoginImage from "../../../assets/images/LoginImage.png";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as MailIcon } from "../../../assets/SvgIcons/MailIcon.svg";
import { ReactComponent as LoginImage } from "../../../assets/SvgIcons/LoginImage.svg";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as LockIcon } from "../../../assets/SvgIcons/LockIcon.svg";
import { toast } from 'react-toastify';
import Sidebar from "../../sideBar/SideBar";
import { isExpired, decodeToken } from "react-jwt";
import ChangePlan from "../../pages/changeplan/ChangePlan";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Height } from "@mui/icons-material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80% !importent",
  Height: "70vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Login = () => {


  let dispatch = useDispatch();
  const navigate = useNavigate();

  let loginResponse = useSelector((state) => state.Login.loginSuccessfull);
  const [errorMessages, setErrorMessages] = useState({});
  const [login, setLogin] = useState({ email: "", password: "", phonenumber: "" });

  const initialErrorMessage = { email: "", password: "", phonenumber: "" };

  const [error, setError] = useState(initialErrorMessage);

  const [emailPhone, setEmailPhone] = useState(false)


  const authUser = JSON.parse(localStorage.getItem("auth"));
  console.log("authUserauthUserauthUser", authUser)

  const myDecodedToken = decodeToken(authUser?.accessToken);

  console.log(myDecodedToken, "loginResponse")

  const Validation = () => {
    let a = { email: "", password: "", phonenumber: "" };
    setError(a);

    const emailRegex = /^[a-z]+\S+@\S+\.\S+/;
    const phoneRegex = /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6,15}[0-9]{1}$/;

    let updatedLogin = { email: "", password: login.password, phonenumber: "" };

    if (!login.email && !login.phonenumber) {
      a.email = "*Please enter the Email or Phone number";
    } else {
      if (!emailPhone && emailRegex.test(login.email)) {
        updatedLogin.email = login.email;
      } else if (emailPhone && phoneRegex.test(login.phonenumber)) {
        updatedLogin.phonenumber = login.phonenumber;
      } else {
        a.email = "Invalid email or phone number.";
      }
    }

    if (!login.password) {
      a.password = "*Please enter the Password";
    }

    if (Object.values(a).every((el) => el === "")) {
      dispatch(usersLogin(updatedLogin));
    } else {
      setError(a); // Set the error message if validation fails
    }
  };

  localStorage.setItem("email", myDecodedToken?.email);
  localStorage.setItem("isSubscribed", myDecodedToken?.isSubscribed)
  localStorage.setItem("subscriptionName",myDecodedToken?.subscriptionName)


  useEffect(() => {
    if (loginResponse?.statusCode == 200) {
      const authUser = JSON.parse(localStorage.getItem("auth"));
      const myDecodedToken = decodeToken(authUser?.accessToken);

      if (myDecodedToken?.role === "superadmin") {
        toast.success("Login successful !!!...");
        navigate("/admin_dashboard");
      } else {
        toast.success("Login successful !!!...");
        navigate("/user_dashboard");
      }
    } else if (loginResponse?.message) {
      toast.error(loginResponse?.message); // Display error message if login fails
    }
  }, [loginResponse, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearLoginResponse()); // This will clear the loginResponse state
      dispatch(clearCreateResponse());
    };
  }, [dispatch]);



  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailClick = () => {
    setEmailPhone(false)
    console.log("checked")
  }
  const handlePhoneClick = () => {
    setEmailPhone(true)

    console.log("picked")
  }

  const handlePhoneNumberChange = (value) => {
    setLogin({ ...login, phonenumber: value });

    if (!value) {
      setErrorMessages({ ...errorMessages, phonenumber: "Phone number is required" });
    } else {
      // Clear the error when  starts typing
      setErrorMessages({ ...errorMessages, phonenumber: "" });
    }
  };
  return (
    <div className={Styles.LoginMainContainerWithLogo}>
      <div className={Styles.LoginMainContainer}>
        {/* <img src={LoginImage} alt="" /> */}
        <LoginImage />
        <div className={Styles.LoginMainContent}>
          <p className={Styles.LoginMainContentLoginText}>Login</p>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // stops page refresh
              Validation();
            }}>
          <div className={Styles.LoginEmailOrMobileContent} >
            <div className={Styles.EmailAndPhoneFeild}>
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
                placeholder={"Enter your email"}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
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
          </div>
          {error?.email && (
            <span className={Styles.registerErrormsg}>{error?.email}</span>
          )}
          <div className={Styles.LoginEmailOrMobileContent}>
            <p className={Styles.LoginEmailOrMobileLable}> Password </p>
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
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
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

              />
            </FormControl>
          </div>
          {error?.password && (
            <span className={Styles.registerErrormsg}>{error?.password}</span>
          )}
          <div className={Styles.LoginPageRememberAndForgetPasswordContent}>
            <div className={Styles.LoginPageRememberContent}>
              <Checkbox />
              <p className={Styles.LoginPageRememberContentText}>Remember me</p>
            </div>
            <p className={Styles.LoginPageForgotPasswordContent}>
              <Link to="/forgot_password">Forgot Password?</Link>
            </p>
          </div>
          <button
            type="submit"
            className={Styles.LoginPageSubmitButton}
            // onClick={() => {
            //   Validation();
            // }}
          >
            {" "}
            Continue
          </button></form>
          <div className={Styles.LoginPageSignUpLinkContainer}>
            <p className={Styles.LoginPageSignUpLinkContainerText}>New here?</p>
            <Link to="/signup">
              <p className={Styles.LoginPageSignUpLinkContainerTextLink}>
                Sign up
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className={Styles.LoginLogoMainContainer}></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={Styles.ModelPopUpContainer}>
          <ChangePlan />
          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
