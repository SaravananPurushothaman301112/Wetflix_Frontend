import React, { useState } from "react";
// import "./MyBookings.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MyCustomerBookings from "./MyCustomerBookings";
import AdminBookingCreate from "./AdminBookingCreate/AdminBookingCreate";
import AdminBookingInporgress from "./AdminBookingInporgress/AdminBookingInporgress";
import AdminBookingClose from "./AdminBookingClose/AdminBookingClose";
// import MyBookingsTable from "./MyBookingsTable";
// import InprogressTable from "./InprogressTable/InprogressTable";
// import SuccessfulBooking from "./SuccessfulBooking/SuccessfulBooking";

const CustomTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const   CustomerBooking = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="MyBookings">
      <div className="HeadText">Customers Bookings</div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "480px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All" {...a11yProps(0)} className="MyBookingTabs" />
            <Tab label="Created" {...a11yProps(1)} className="MyBookingTabs" />
            <Tab
              label="InProgress"
              {...a11yProps(2)}
              className="MyBookingTabs"
            />
            <Tab
              label="Closed"
              {...a11yProps(3)}
              className="MyBookingTabs"
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <MyCustomerBookings />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AdminBookingCreate/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AdminBookingInporgress/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <AdminBookingClose/> 
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default CustomerBooking;
