import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ReactComponent as MyBookingsTableRightIcon } from "../../../../../assets/SvgIcons/MyBookingsTableRightIcon.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminInporogrssBooking, getBookingStatusUpdate } from "../../../../../Redux/Actions";
import Styles from "./../../../../pages/DeviceManagement/DeviceManagement.css";
import { ReactComponent as LeftArrow } from "../../../../../assets/SvgIcons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../../../../assets/SvgIcons/RightArow.svg"

const AdminBookingInporgress = () => {
  const dispatch = useDispatch();

  // Fetch data from Redux store
  const getAllBookingDetails = useSelector(
    (booking) => booking.Booking.getAdminBookingInpogressDetails
  );

  const [localBookingDetails, setLocalBookingDetails] = useState([]);

  const [userIID, setUserIID] = useState();
  const [userID, setUserID] = useState({
    bookingstatus: "INPROGRESS",
  });

  useEffect(() => {
    dispatch(getAdminInporogrssBooking(userID));
  }, [userID, dispatch]);

  // When the Redux data changes, update local state
  useEffect(() => {
    if (getAllBookingDetails?.data) {
      setLocalBookingDetails(getAllBookingDetails.data);
    }
  }, [getAllBookingDetails]);

  const handleStatusChange = (bookingId, newStatus, userid) => {
    setUserIID(userid);

    // Update the status in local state to reflect changes immediately in UI
    const updatedBookings = localBookingDetails?.map((booking) => {
      if (booking._id === bookingId) {
        return { ...booking, bookingstatus: newStatus };
      }
      return booking;
    });

    setLocalBookingDetails(updatedBookings);

    const bookingStatusUpdateInfo = {
      bookingid: bookingId, // API expects bookingid
      bookingstatus: newStatus,
      userid: parseInt(userid),
    };

    // Dispatch the status update to Redux store
    dispatch(getBookingStatusUpdate(bookingStatusUpdateInfo));
  };

  // Prepare data for MDBDataTable
  const data = {
    columns: [
      { label: "Device Name", field: "deviceName", sort: "asc", width: 200 },
      { label: "Customer Name", field: "customerName", sort: "asc", width: 200 },
      { label: "Service", field: "service", sort: "asc", width: 200 },
      { label: 'Ref ID', field: 'refId', sort: 'asc', width: 200  },
      { label: "Booking Date", field: "bookingDate", sort: "asc", width: 200 },
      { label: "Status", field: "status", sort: "asc", width: 200 },
    ],
    rows: localBookingDetails?.map((data) => ({
      deviceName: data.description,
      customerName: data.firstname,
      service: data.description,
      refId: data._id,
      bookingDate: new Date(data.bookingdatetime).toLocaleDateString("en-GB", {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'America/Port_of_Spain',
      }),
      
      status: (
        <div
          style={{
            textAlign: "right",
            backgroundColor:
              data.bookingstatus === "CREATED"
                ? "#F7FEF5"
                : data.bookingstatus === "INPROGRESS"
                ? "#FEFCF5"
                : data.bookingstatus === "COMPLETED"
                ? "#FEF7F5"
                : data.bookingstatus === "CANCELLED"
                ? "#FEF7F5"
                : "#EEF1F4",
            width: "fit-content",
            borderRadius: "100px",
            padding: "4px 12px",
            textAlign: "left",
            position: "relative",
          }}
        >
          <select
            value={data.bookingstatus}
            onChange={(e) =>
              handleStatusChange(data._id, e.target.value, data.userid)
            }
            style={{
              appearance: "none",
              border: "none",
              background: "transparent",
              padding: "4px 12px",
              fontSize: "14px",
              outline: "none",
              cursor: "pointer",
              width: "100px",
              fontWeight: "bold",
              color:
                data.bookingstatus === "CREATED"
                  ? "#28a745"
                  : data.bookingstatus === "INPROGRESS"
                  ? "#ffc107"
                  : data.bookingstatus === "COMPLETED"
                  ? "#dc3545"
                  : "#000", // fallback
            }}
          >
            <option value="CREATED" style={{ color: "#28a745" }}>Created</option>
            <option value="INPROGRESS" style={{ color: "#ffc107" }}>InProgress</option>
            <option value="COMPLETED" style={{ color: "#dc3545" }}>Closed</option>
            {/* {/ Optional: Add this if needed /} */}
            {/* {/ <option value="CANCELLED" style={{ color: "red" }}>Cancelled</option> /} */}
          </select>
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              fontSize: "12px",
            }}
          >
            &#9662;
          </span>
        </div>
      )
      
    })),
  };

  return (
    <div className={Styles.activeTable}>
      <MDBDataTable responsive data={data} entries={10} paginationLabel={[
        <LeftArrow style={{ height: '15px', }} />,
        <RightArrow style={{ height: '15px' }} />
      ]} />
    </div>
  );
};

export default AdminBookingInporgress;
