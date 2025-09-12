import React, { useEffect, useState, useRef } from "react";
import "./adminUserProfile.css";
import TextField from "@mui/material/TextField";
import MuiPhoneNumber from "material-ui-phone-number";
import { FormControl } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as LocationIcon } from "../../../../assets/SvgIcons/LocationIcon.svg";
import { ReactComponent as LocationLocateIcon } from "../../../../assets/SvgIcons/LocationLocateIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import parsePhoneNumberFromString from "libphonenumber-js";
import {
  getUsetDetails,
  updateUserProfileDetails,
} from "../../../../Redux/Actions";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let loginResponse = useSelector(
    (state) => state.UserProfile.getUserInformation
  );
  const Userr = useSelector((adminn) => adminn.UserProfile.getUserInformation);
  const [userID, setUserID] = useState(Userr?.data?.userid);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessages, setErrorMessages] = useState({}); 
  useEffect(() => {
    if (userID) {
      dispatch(getUsetDetails(userID));
    }
  }, [userID]);

  const [profileDetails, setProfileDetails] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    address: "",
    imagedata: null,
  });

  // Populate form fields when Userr is available
  useEffect(() => {
    if (Userr?.data) {
      setProfileDetails({
        firstname: Userr.data.firstname || "",
        lastname: Userr.data.lastname || "",
        phonenumber: Userr.data.phonenumber || "",
        address: Userr.data.address || "",
        imagedata: Userr.data.imagedata || "",
      });
    }
  }, [Userr]);

  const handlePhoneNumberChange = (value) => {
    let errors = { ...errorMessages };
  
    if (!value.trim()) {
      errors.phonenumber = "* Phone number is required";
    } else {
      const phoneNumber = parsePhoneNumberFromString(value);
      
      if (!phoneNumber || !phoneNumber.isValid()) {
        errors.phonenumber = "* Enter a valid phone number for your country";
      } else {
        errors.phonenumber = "";
      }
    }
  
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      phonenumber: value,
    }));
  
    setErrorMessages(errors);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); 
    let errors = {}; 
  
    if (!profileDetails.firstname.trim()) {
      errors.firstname = "* First name is required";
    }
    if (!profileDetails.lastname.trim()) {
      errors.lastname = "* Last name is required";
    }
    if (!profileDetails.address.trim()) {
      errors.address = "* Address is required";
    } else if (profileDetails.address.trim().length < 10) {
      errors.address = "* Address must be at least 10 characters long";
    }
  
    const phoneNumber = parsePhoneNumberFromString(profileDetails.phonenumber);
  
    if (!profileDetails.phonenumber.trim()) {
      errors.phonenumber = "* Phone number is required";
    } else if (!phoneNumber || !phoneNumber.isValid()) {
      errors.phonenumber = "* Enter a valid phone number for your country";
    }
  
    setErrorMessages(errors);
  
    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }
  
    const updatedProfileDetails = {
      ...profileDetails,
      userid: Userr?.data?.userid,
      roleid: Userr?.data?.roleid || null,
    };
  
    setIsSubmitted(true);
    const response = await dispatch(updateUserProfileDetails(updatedProfileDetails));
  
    if (response?.statusCode === 200 || loginResponse?.statusCode === 200) {
      toast.success("Profile updated successfully!");
      setIsSubmitting(false);
      setTimeout(() => {
        dispatch(getUsetDetails(Userr?.data?.userid));
        setIsSubmitted(false);
      }, 1000);
    } else {
      toast.error("Failed to update profile. Please try again.");
    }
  
    setIsSubmitting(false);
  };
  
  
  const hiddenFileInput = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let errors = { ...errorMessages };
  
    // Regex to allow only alphabets and spaces (no numbers or special characters)
    const nameRegex = /^[A-Za-z\s]+$/;
  
    if (name === "firstname" || name === "lastname") {
      if (!value.trim()) {
        errors[name] = `* ${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      } else if (!nameRegex.test(value)) {
        errors[name] = "* Only alphabets are allowed";
      } else {
        errors[name] = "";
      }
    }
  
    if (name === "address") {
      if (!value.trim()) {
        errors.address = "* Address is required";
      } else if (value.trim().length < 10) {
        errors.address = "* Address must be at least 10 characters";
      } else {
        errors.address = "";
      }
    }
  
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  
    setErrorMessages(errors);
  };
  

  const handleImageUploadClick = () => {
    hiddenFileInput.current.click(); // Simulate a click on the hidden input
  };

  return (
    <div className="UserProfileMainContainer">
      <div className="avatarStyle">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <CameraAltOutlinedIcon
              onClick={handleImageUploadClick}
              style={{
                backgroundColor: "#5BD1DC",
                color: "#fff",
                borderRadius: "50%",
                padding: "4px",
                fontSize: "30px",
                cursor: "pointer",
              }}
            />
          }
        >
          <Avatar
            alt="User Avatar"
            src={profileDetails.imagedata}
            sx={{ width: 125, height: 125 }}
            style={{ cursor: "pointer" }}
          />
        </Badge>
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setProfileDetails((prev) => ({
                ...prev,
                imagedata: reader.result, // Base64 string
              }));
            };
            reader.readAsDataURL(file); // Convert to Base64
          }
        }}
        
        name="imagedata"
      />
      <div className="UserProfileContainer">
        <p className="titleFullName">Full Name</p>
        <TextField
          id="outlined-start-adornment"
          sx={{
            width: "100%",
            border: "1px solid #E9EDF2",
            borderRadius: "8px",
            margin: "1rem 0rem",
          }}
          name="firstname"
          placeholder={"First Name"}
          value={profileDetails.firstname}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
       {errorMessages.firstname && <p style={{ color: "red" }}>{errorMessages.firstname}</p>}


        <p className="titleLastName">Last Name</p>
        <TextField
          id="outlined-start-adornment"
          sx={{
            width: "100%",
            border: "1px solid #E9EDF2",
            borderRadius: "8px",
          }}
          name="lastname"
          placeholder={"Last Name"}
          value={profileDetails.lastname}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
       {errorMessages.lastname && <p style={{ color: "red" }}>{errorMessages.lastname}</p>}

        <p className="titleMobileNumber">Mobile Number</p>
        <MuiPhoneNumber
          defaultCountry={"tt"}
          name="phonenumber"
          variant="outlined"
          required
          enableLongNumbers
          onChange={handlePhoneNumberChange}
          sx={{
            width: "100%",
            border: "1px solid #E9EDF2",
            borderRadius: "8px",
            margin: "1rem 0rem",
          }}
          value={profileDetails.phonenumber}
          placeholder={"Mobile Number"}
          className="RegistrationPageMobileNumber"
        />
       
        {errorMessages.phonenumber && <p style={{ color: "red" }}>{errorMessages.phonenumber}</p>}
        <p className="titleAddress">Address</p>
        <FormControl sx={{ width: "100%", background: "#fff" }}>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <LocationIcon />
              </InputAdornment>
            }
            name="address"
            onChange={handleInputChange}
            placeholder="Enter your address"
            value={profileDetails.address}
          
          />
        </FormControl>
        {errorMessages.address && <p style={{ color: "red" }}>{errorMessages.address}</p>}
        <button 
          className="UserProfileSummitButton" 
          onClick={handleSubmit}
          disabled={isSubmitted} // Disable button if submitting
        >
          {isSubmitted ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
