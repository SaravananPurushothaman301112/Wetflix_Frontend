import React, { useEffect, useState } from 'react';
import "./MyBookings.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MyBookingsTable from "./MyBookingsTable";
import UpCommingTable from "./UpcommingTable/UpCommingTable";
import InprogressTable from "./InprogressTable/InprogressTable";
import SuccessfulBooking from "./SuccessfulBooking/SuccessfulBooking";
import { MDBDataTable } from 'mdbreact';
// import './MyBookingsTable.scss';
import Styles from "./../../pages/DeviceManagement/DeviceManagement.css";
import { ReactComponent as MyBookingsTableRightIcon } from '../../../assets/SvgIcons/MyBookingsTableRightIcon.svg';
import Rectangle from '../../../assets/images/Rectangle.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooking, getViewBooking } from '../../../Redux/Actions';
import BookingDetails from '../bookingDetails/BookingDetails';
import  {ReactComponent as LeftArrow} from "../../../assets/SvgIcons/LeftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/SvgIcons/RightArow.svg"

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

const   BasicTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const dispatch = useDispatch();
  const getAllBookingDetails = useSelector(booking => booking.Booking.getAllBookingDetails);


  const authUser = JSON.parse(localStorage.getItem("auth"));


  const [userID, setUserID] = useState(authUser?.userId);

  useEffect(() => {
      dispatch(getAllBooking(userID));
  }, [userID, dispatch]);

  // Function to handle row click and get the _id of the clicked row
const handleRowClick = (id) => {
  console.log('Clicked booking _id:', id);
    
const BookingId = localStorage.setItem("Booking Id",id);
console.log('BookingId',BookingId);
  // dispatch(getViewBooking(BookingId));
  // <BookingDetails id={id} />;

  console.log('checked');
  
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
      return type;
  }
};
  // Prepare data for MDBDataTable
  const data = {
      columns: [
          { label: 'Booking', field: 'description', sort: 'asc', width: 200,attributes: { style: { textAlign: 'left' } }  },
          // { label: 'Technician Name', field: 'technicianName', sort: 'asc', width: 200 },
          { label: 'Booking Date', field: 'bookingDate', sort: 'asc', width: 200,attributes: { style: { textAlign: 'left' } }  },
          { label: 'Ref ID', field: 'refId', sort: 'asc', width: 100,attributes: { style: { textAlign: 'left' } }  },
          { label: 'Status', field: 'status', sort: 'asc', width: 150,attributes: { style: { textAlign: 'left' } }  },
          { label: 'Action', field: 'action', sort: 'asc', width: 150,attributes: { style: { textAlign: 'left' } }  }
      ],
      rows: getAllBookingDetails?.data?.map((data) => ({
        description: formatBookingType(data.bookingtype), // ✅ Formatted booking type
        bookingDate: (() => {
          const date = new Date(data.bookingdatetime);
          const day = date.getDate(); // No padStart for day
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const month = monthNames[date.getMonth()];
          const year = date.getFullYear();
          return `${day} ${month} ${year}`;
        })(),
        
        
        refId: data._id,
        status: (
          <div
            style={{
              color: data.bookingstatus === 'CANCELLED' ? '#A9281E' :
                     data.bookingstatus === 'COMPLETED' ? '#0D894F' :
                     data.bookingstatus === 'CREATED' ? '#154F9E' :
                     data.bookingstatus === 'INPROGRESS' ? '#FFCD4D' :
                     '#545F71',
              backgroundColor: data.bookingstatus === 'CANCELLED' ? '#FDEDEC' :
                               data.bookingstatus === 'COMPLETED' ? '#EAFBF0' :
                               data.bookingstatus === 'CREATED' ? '#3480E54D' :
                               data.bookingstatus === 'INPROGRESS' ? '#FEFCF5' :
                               '#EEF1F4',
              borderRadius: '100px',
              padding: '4px 12px',
              textAlign: 'center',
              width: "fit-content"
            }}
          >
            {data.bookingstatus}
          </div>
        ),
        action: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/booking_details" className="LinkedBookingDetails" style={{ color: '#4D8BFF' }}>View booking</Link>
            <MyBookingsTableRightIcon />
          </div>
        ),
        clickEvent: () => handleRowClick(data._id)
      })).sort((a, b) => b.refId - a.refId)
    };


  return (
    <div className="MyBookings">
      <div className="HeadText">My Bookings</div>
      <Box sx={{ width: "100%", overflow:"auto" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "480px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All" {...a11yProps(0)} className="MyBookingTabs" />
            <Tab label="Upcoming" {...a11yProps(1)} className="MyBookingTabs" />
            <Tab
              label="Cancelled"
              {...a11yProps(2)}
              className="MyBookingTabs"
            />
            <Tab
              label="Successful"
              {...a11yProps(3)}
              className="MyBookingTabs"
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        <div className={Styles.activeTable}>
          <MDBDataTable responsive data={data} entries={10}   paginationLabel={[
    <LeftArrow style={{height: '15px', }} />, 
    <RightArrow style={{ height: '15px' }} />
  ]}/>
        </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
  <MDBDataTable
    responsive
    data={{
      columns: data.columns,
      rows: data.rows?.filter((row) => row.status.props.children === "INPROGRESS"), 
    }}
    entries={10}
    paginationLabel={[
      <LeftArrow style={{height: '15px', }} />, 
      <RightArrow style={{ height: '15px' }} />
    ]}
  />
</CustomTabPanel>

<CustomTabPanel value={value} index={2}>
  <MDBDataTable
    responsive
    data={{
      columns: data.columns,
      rows: data.rows?.filter((row) => row.status.props.children === "CANCELLED"), 
    }}
    entries={10}
    paginationLabel={[
      <LeftArrow style={{height: '15px', }} />, 
      <RightArrow style={{ height: '15px' }} />
    ]}
  />
</CustomTabPanel>
<CustomTabPanel value={value} index={3}>
  <MDBDataTable
    responsive
    data={{
      columns: data.columns,
      rows: data.rows?.filter((row) => row.status.props.children === "COMPLETED"), 
    }}
    entries={10}
     paginationLabel={[
    <LeftArrow style={{height: '15px', }} />, 
    <RightArrow style={{ height: '15px' }} />
  ]}
  />
</CustomTabPanel>
      </Box>
    </div>
  );
};

export default BasicTabs;
