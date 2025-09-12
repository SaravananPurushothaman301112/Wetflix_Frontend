import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { ReactComponent as MyBookingsTableRightIcon } from "../../../../../assets/SvgIcons/MyBookingsTableRightIcon.svg";
import Rectangle from "../../../../../assets/images/Rectangle.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminCreateBooking, getBookingStatusUpdate } from "../../../../../Redux/Actions";
import Styles from "./../../../../pages/DeviceManagement/DeviceManagement.css";
import { ReactComponent as LeftArrow } from "../../../../../assets/SvgIcons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../../../../assets/SvgIcons/RightArow.svg"

const AdminBookingCreate = () => {
  const dispatch = useDispatch();
  const getAllBookingDetails = useSelector(
    (booking) => booking.Booking.getAdminBookingCreateDetails
  );
  const [userIID, setUserIID] = useState();
  const [userID, setUserID] = useState({
    bookingstatus: "CREATED",
    // userid: "94"
  });
  useEffect(() => {
    if (Array.isArray(getAllBookingDetails?.data)) {
      setLocalBookingDetails(getAllBookingDetails.data);
    } else {
      setLocalBookingDetails([]); // Set to empty array if data is not an array
    }
  }, [getAllBookingDetails]);
  

  useEffect(() => {
    dispatch(getAdminCreateBooking(userID));
  }, [userID, dispatch]);
  const [localBookingDetails, setLocalBookingDetails] = useState([]);

  const handleStatusChange = (bookingId, newStatus, userid) => {
    // Immediately update the status in the local state (UI)
    const updatedBookingDetails = localBookingDetails?.map((booking) =>
      booking._id === bookingId
        ? { ...booking, bookingstatus: newStatus }
        : booking
    );

    setLocalBookingDetails(updatedBookingDetails); // Update local state

    // Dispatch the action to update the booking status in the backend
    const bookingStatusUpdateInfo = {
      bookingid: bookingId,
      bookingstatus: newStatus,
      userid: parseInt(userid),
    };
    dispatch(getBookingStatusUpdate(bookingStatusUpdateInfo));
  };
  useEffect(() => {
    if (getAllBookingDetails?.data) {
      setLocalBookingDetails(getAllBookingDetails.data); // Sync local state with Redux state
    }
  }, [getAllBookingDetails]);


  // Format the data for MDBDataTable
  const data = {
    columns: [
      { label: "Device Name", field: "deviceName", sort: "asc", width: 200 },
      {
        label: "Customer Name",
        field: "customerName",
        sort: "asc",
        width: 200,
      },
      { label: "Service", field: "service", sort: "asc", width: 200 },
      { label: 'Ref ID', field: 'refId', sort: 'asc', width: 200  },
      { label: "Booking Date", field: "bookingDate", sort: "asc", width: 200 },
      { label: "Status", field: "status", sort: "asc", width: 200 },
    ],
    rows: Array.isArray(localBookingDetails) 
  ? localBookingDetails.map((booking) => ({
      deviceName: booking.description || "N/A",
      customerName: booking.firstname || "N/A",
      service: booking.description || "N/A",
      refId: booking._id,
      bookingDate: booking.bookingdatetime 
  ? new Date(booking.bookingdatetime).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "America/Port_of_Spain",
    })
  : "N/A",

          status: (
          <div
            style={{
              color:
                booking.bookingstatus === "CREATED"
                  ? "#28a745"
                  : booking.bookingstatus === "INPROGRESS"
                    ? "#ffc107"
                    : booking.bookingstatus === "COMPLETED"
                      ? "#dc3545"
                      : booking.bookingstatus === "CANCELLED"
                        ? "red"
                        : "#545F71",
              backgroundColor:
                booking.bookingstatus === "CREATED"
                  ? "#F7FEF5"
                  : booking.bookingstatus === "INPROGRESS"
                    ? "#FEFCF5"
                    : booking.bookingstatus === "COMPLETED"
                      ? "#FEF7F5"
                      : booking.bookingstatus === "CANCELLED"
                        ? "#FEF2F2"
                        : "#EEF1F4",
              width: "fit-content",
              borderRadius: "100px",
              padding: "4px 12px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <select
              value={booking.bookingstatus}
              onChange={(e) =>
                handleStatusChange(booking._id, e.target.value, booking.userid)
              }
              style={{
                appearance: "none",
                border: "none",
                background: "transparent",
                padding: "4px 12px",
                fontSize: "14px",
                fontWeight: "bold",
                color:
                  booking.bookingstatus === "CREATED"
                    ? "#28a745"
                    : booking.bookingstatus === "INPROGRESS"
                      ? "#ffc107"
                      : booking.bookingstatus === "COMPLETED"
                        ? "#dc3545"
                        : booking.bookingstatus === "CANCELLED"
                          ? "red"
                          : "#545F71",
                cursor: "pointer",
              }}
            >
              <option value="CREATED" style={{ color: "#28a745" }}>Created</option>
              <option value="INPROGRESS" style={{ color: "#ffc107" }}>InProgress</option>
              <option value="COMPLETED" style={{ color: "#dc3545" }}>Closed</option>
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
    }))
  : [],

  };


  return (
    <div className={Styles.activeTable}>
      <MDBDataTable responsive data={data} entries={10}
        paginationLabel={[
          <LeftArrow style={{ height: '15px', }} />,
          <RightArrow style={{ height: '15px' }} />
        ]} />
    </div>
  );
};

export default AdminBookingCreate;
