import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import Styles from "./DeviceManagement.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDeviceListById,
  getDeviceDelete,
  getDeviceDataByDeviceID,
  updateDeviceById //  Make sure this is included
} from "../../../Redux/Actions";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import InputAdornment from "@mui/material/InputAdornment";
import { IconButton, InputAdornment } from "@mui/material";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import Dayjs adapter
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";

const style = {
  position: 'absolute',
  top: '50%',

  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "95%",
  bgcolor: 'background.paper',
  border: '1px solid #ECF0F4',
  borderRadius: "8px",
  boxShadow: 4,
  p: 4,
};

// Utility function to calculate time ago
function timeAgo(inputDate) {
  const now = new Date();
  const pastDate = new Date(inputDate);
  const diffInMs = now - pastDate; // Difference in milliseconds

  // Time calculations
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

export default function DeviceManagementTable() {
  const dispatch = useDispatch();
  const deviceList = useSelector((device) => device.DeviceList.deviceDetails);
  const authUser = JSON.parse(localStorage.getItem("auth"));



  // const getA

  const [selectedData, setSelectedData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertEdit, setOpenAlertEdit] = useState(false);
  const [editData, setEditData] = useState({
    DeviceName: "",
    lastRefill: "",
    lastMaintanace: "",
    TankCapacity: "",
    TankType: "",
  });

  const [menuAnchorEls, setMenuAnchorEls] = useState({});

  const handleClickMenu = (event, device) => {
    setMenuAnchorEls((prev) => ({ ...prev, [device.deviceid]: event.currentTarget }));
    setSelectedData(device);
  };

  const handleCloseMenu = (deviceId) => {
    setMenuAnchorEls((prev) => ({ ...prev, [deviceId]: null }));
  };

  const handleOpenAlertEdit = () => {
    setOpenAlertEdit(true);
    setEditData({
      DeviceName: selectedData.devicename || " ",
      lastRefill: selectedData.lastrefill || " ",
      lastMaintanace: selectedData.lastmaintanance || " ",
      TankCapacity: selectedData.tankcapacity || " ",
      TankType: selectedData.tanktype || " ",
    });
  };

  // const handleUpdateDevice = async () => {
  //   try {
  //     const updatedDevice = {
  //       deviceid: selectedData.deviceid,
  //       devicename: editData.DeviceName,
  //       lastrefill: editData.lastRefill,
  //       lastmaintanance: editData.lastMaintanace,
  //       tankcapacity: editData.TankCapacity,
  //       tanktype: editData.TankType,
  //     };

  //     await dispatch(getDeviceDataByDeviceID(updatedDevice)); // Update the device
  //     await dispatch(getAllDeviceListById(authUser?.userId)); // Refresh list

  //     setOpenAlertEdit(false); // Close modal
  //   } catch (error) {
  //     console.error("Error updating device:", error);
  //   }
  // };
  const handleUpdateDevice = async (event) => {
    event?.preventDefault();  // Prevent default form submission
    try {
      const updatedDevice = {
        deviceid: selectedData.deviceid,
        devicename: editData.DeviceName,
        lastrefill: editData.lastRefill,
        lastmaintanance: editData.lastMaintanace,
        tankcapacity: editData.TankCapacity,
        tanktype: editData.TankType,
      };

      console.log("Updating Device with Data:", updatedDevice);

      const response = await dispatch(updateDeviceById(updatedDevice));
      if (!response?.payload) {
        console.error("Update failed, skipping further operations.");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100)); // Ensure state settles

      await dispatch(getAllDeviceListById(authUser?.userId));

      const updatedResponse = await dispatch(getDeviceDataByDeviceID(selectedData.deviceid));
      if (updatedResponse.payload) {
        setEditData(updatedResponse.payload);
      }

      setOpenAlertEdit(false);
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = () => setOpenAlert(false);
  const handleCloseAlertEdit = () => setOpenAlertEdit(false);
  const [refresh, setRefresh] = useState(false);
  const handleDeleteDevice = async () => {
    console.log('selected id', selectedData);
    try {
      await dispatch(getDeviceDelete(selectedData.deviceid)); // Delete device
      await dispatch(getAllDeviceListById(authUser?.userId)); // Fetch updated list

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };
  function formatDate(dateInput) {
    const date = new Date(dateInput);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    dispatch(getAllDeviceListById(authUser?.userId));
  }, [authUser?.userId]);

  const data = {
    columns: [
      { label: "S.No", field: "s_no", sort: "enabled", width: 250 },
      { label: "Device Name", field: "name", sort: "enabled", width: 150 },
      { label: "WATER LEVEL", field: "waterLevel", sort: "enabled", width: 200 },
      { label: "LAST UPDATED", field: "lastUpdated", sort: "enabled", width: 100 },
      { label: "STATUS", field: "status", sort: "enabled", width: 270 },
      { label: "LAST REFILL", field: "lastRefil", sort: "enabled", width: 100 },
      { label: "LAST MAINTENANCE", field: "lastMaintanace", sort: "enabled", width: 150 },
      { field: "action", sort: "disabled" },
    ],
    rows: (deviceList?.data ?? []).filter(device => device.devicestatus === "ACTIVE")

      .map((device, index) => ({
        s_no: index + 1,
        name: device.devicename,
        // waterLevel: ${device.actualVolume !== null ? device.actualVolume :0}/${device.tankcapacity}, 
        waterLevel: device.actualVolume !== null && device.actualVolume !== undefined
          ? `${device.actualVolume}/${device.tankcapacity} G`
          : `N/A/${device.tankcapacity}`, status: (
            <div
              style={{
                color: device.devicestatus === "ACTIVE" ? "#0D894F" : "#545F71",
                backgroundColor: device.devicestatus === "ACTIVE" ? "#E7F4EE" : "#EEF1F4",
                width: "fit-content",
                borderRadius: "100px",
                padding: "4px 12px",
                textAlign: "center",
              }}
            >
              <div>{device.devicestatus}</div>
            </div>
          ),
        lastRefil: formatDate(device.lastrefill),
        lastMaintanace: formatDate(device.lastmaintanance),

        lastUpdated: timeAgo(device.lastrefill), // Shows "time ago"
        action: (
          <div>
            <Button onClick={(event) => handleClickMenu(event, device)}>
              <MoreVertIcon />
            </Button>
            <Menu
              anchorEl={menuAnchorEls[device.deviceid] || null}
              open={Boolean(menuAnchorEls[device.deviceid])}
              onClose={() => handleCloseMenu(device.deviceid)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >


              <MenuItem onClick={() => { handleOpenAlertEdit(); handleCloseMenu(device.deviceid); }}>
                Edit Device details
              </MenuItem>
              <MenuItem onClick={() => { handleOpenAlert(); handleCloseMenu(device.deviceid); }} sx={{ color: "#AA0000" }}>
                Delete Device
              </MenuItem>
            </Menu>
            <Modal open={openAlert}
              onClose={handleCloseAlert}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modelPopDeviceManagent">
                <Typography sx={{ mt: 2 }}>Do you want to delete the device {selectedData.devicename}?</Typography>
                <div className="modelPopDeviceManagentButtonContainer">
                  <button className="deviceDeletePopCancleButton" onClick={() => handleCloseAlert()}>Cancel</button>
                  <button className="deviceDeletePopDDeleteButton" onClick={() => { handleDeleteDevice(); handleCloseAlert() }}>Delete</button>
                </div>
              </Box>
            </Modal>
            <Modal open={openAlertEdit} onClose={handleCloseAlertEdit}>
              <Box className="modelPopDeviceManagent">
                <Typography sx={{ mt: 2 }} className="updateTitle">Update Device</Typography>
                <div>
                  <TextField
                    id="DeviceName"
                    label="Device Name"
                    value={editData.DeviceName}
                    onChange={(e) => setEditData({ ...editData, DeviceName: e.target.value })}
                    fullWidth
                    margin="normal"
                   
                    InputLabelProps={{
                      sx: {
                        color: 'black', // optional: sets label color
                      },
                    }}
                  />



<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Last Refill"
    value={editData.lastRefill ? dayjs(editData.lastRefill) : null}
    onChange={(newDate) =>
      setEditData({
        ...editData,
        lastRefill: newDate ? newDate.format("YYYY-MM-DD") : "",
      })
    }
    renderInput={(props) => (
      <TextField
        {...props}
        fullWidth
        margin="normal"
        InputProps={{
          ...props.InputProps, // 🔥 This is important to avoid losing default adornments!
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    )}
  />
</LocalizationProvider>



<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Last Maintenance"
    value={editData.lastMaintanace ? dayjs(editData.lastMaintanace) : null}
    onChange={(newDate) =>
      setEditData({
        ...editData,
        lastMaintanace: newDate?.format("YYYY-MM-DD") || "",
      })
    }
    renderInput={(props) => (
      <TextField
        {...props}
        fullWidth
        margin="normal"
        InputProps={{
          ...props.InputProps, // Keep default input adornments and functionality
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    )}
  />
</LocalizationProvider>




                  <TextField
                    id="TankCapacity"
                    label="Tank Capacity"
                    value={editData.TankCapacity}
                    onChange={(e) => setEditData({ ...editData, TankCapacity: e.target.value })}
                    fullWidth
                    margin="normal"
                    
                    InputLabelProps={{
                      sx: {
                        color: 'black', // optional: sets label color
                      },
                    }}
                  />

                  <TextField
                    id="TankType"
                    label="Tank Type"
                    value={editData.TankType}
                    onChange={(e) => setEditData({ ...editData, TankType: e.target.value })}
                    fullWidth
                    margin="normal"
                    
                    InputLabelProps={{
                      sx: {
                        color: 'black', // optional: sets label color
                      },
                    }}
                  />

                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", alignItems: "self-end" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      color: "black", // Black text
                      border: "1px solid #D1D5DB", // Light grey border
                      borderRadius: "8px", // Smooth rounded corners
                      padding: "10px 20px", // Proper padding for a balanced look
                      fontSize: "16px", // Match the font size
                      fontWeight: "500", // Medium weight for readability
                      textTransform: "none", // Keep text as "Cancel"
                      "&:hover": {
                      },
                    }}
                    onClick={handleCloseAlertEdit}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#3B82F6", // Blue button
                      color: "white", // White text
                      borderRadius: "8px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "500",
                      marginLeft: "12px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#2563EB", // Darker blue on hover
                      },
                    }}
                    onClick={handleUpdateDevice}
                  >
                    Update
                  </Button>



                </div>
              </Box>
            </Modal>
          </div>
        ),
      })),
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.header}>
        <h4 className="heading">Device List</h4>
      </div>
      <MDBDataTable data={data} />
    </div>
  );
}
