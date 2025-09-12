import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css"
import ImageUploader from "react-image-upload"
import "react-image-upload/dist/index.css"
import TextField from "@mui/material/TextField";
import { ReactComponent as MailIcon } from "../../../assets/SvgIcons/MailIcon.svg";
import MuiPhoneNumber from "material-ui-phone-number";
import {    FormControl,} from "@mui/material";
  import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as LocationIcon } from "../../../assets/SvgIcons/LocationIcon.svg";
import { ReactComponent as LocationLocateIcon } from "../../../assets/SvgIcons/LocationLocateIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUsetDetails ,} from "../../../Redux/Actions";

const UserProfile=()=>{
  let dispatch = useDispatch();

  const [userID,setUserID]=useState(96)

  useEffect(()=>{
    dispatch(getUsetDetails(userID))
  },[userID])

    function getImageFileObject(imageFile) {
        console.log({ onAdd: imageFile })
      }
      function runAfterImageDelete(file) {
        console.log({ onDele: file })
      }

    return(
        <div className={Styles.UserProfileMainContainer}>
                <ImageUploader
                    onFileAdded={img => getImageFileObject(img)}
                    onFileRemoved={img => runAfterImageDelete(img)}
                />
                <div className={Styles.UserProfileContainer}>
                <TextField
                    id="outlined-start-adornment"
                    sx={{
                        width: "100%",
                        background: "#F8FAFC",
                        border: "1px solid #E9EDF2",
                        borderRadius: "8px",
                        margin:"1rem 0rem"

                    }}
                    name="email"
                    placeholder={"Enter your email or phone"}
                    //   onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <MailIcon />
                        </InputAdornment>
                        ),
                    }}
                />
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
                    //   onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <MailIcon />
                        </InputAdornment>
                        ),
                    }}
                />

                <MuiPhoneNumber
                    defaultCountry={"in"}
                    name="phonenumber"
                    variant="outlined"
                    required
                    enableLongNumbers
                    // onChange={(value) =>
                    // setRegistration({ ...registration, phonenumber: value })
                    // }
                    sx={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #E9EDF2",
                    borderRadius: "8px",
                    margin:"1rem 0rem"
                    }}
                    placeholder={"Enter your Phone Number"}
                    className={Styles.RegistrationPageMobileNumber}
                />
                <FormControl sx={{ width: "100%",background: "#fff" }}>
                        <OutlinedInput
                          startAdornment={
                            <InputAdornment position="start">
                              <LocationIcon />
                            </InputAdornment>
                          }
                          name="address"
                        //   onChange={(e) =>
                        //     SetModelData({
                        //       ...modelDdata,
                        //       address: e.target.value,
                        //     })
                        //   }
                          placeholder="Urna urna sem, sodales nibh laoreet aliquam adipiscing pulvinar arcu."
                          endAdornment={
                            <InputAdornment position="end">
                              <LocationLocateIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <button className={Styles.UserProfileSummitButton} >Update</button>
                </div>
                
        </div>
    )
}

export default UserProfile