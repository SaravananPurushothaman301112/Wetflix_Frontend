import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminClosedBooking,
  getBookingStatusUpdate,
} from "../../../../../Redux/Actions";
import Styles from "./../../../../pages/DeviceManagement/DeviceManagement.css";
import { ReactComponent as LeftArrow } from "../../../../../assets/SvgIcons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../../../../assets/SvgIcons/RightArow.svg"

const AdminBookingClose = () => {
  const dispatch = useDispatch();
  const globalBookingDetails = useSelector(
    (booking) => booking.Booking.getAdminBookingCloseDetails
  );
  const [bookingDetails, setBookingDetails] = useState([]);
  const [userID, setUserID] = useState({
    bookingstatus: "COMPLETED",
  });

  useEffect(() => {
    dispatch(getAdminClosedBooking(userID));
  }, [userID, dispatch]);

  useEffect(() => {
    if (globalBookingDetails?.data) {
      setBookingDetails(globalBookingDetails.data);
    }
  }, [globalBookingDetails]);

  const handleStatusChange = (bookingId, newStatus, userid) => {
    const bookingStatusUpdateInfo = {
      bookingid: bookingId,
      bookingstatus: newStatus,
      userid: parseInt(userid),
    };
    dispatch(getBookingStatusUpdate(bookingStatusUpdateInfo));

    // Optimistically update the local state
    setBookingDetails((prevDetails) =>
      prevDetails.map((booking) =>
        booking._id === bookingId
          ? { ...booking, bookingstatus: newStatus }
          : booking
      )
    );
  };

  const data = {
    columns: [
      { label: "Device Name", field: "deviceName", sort: "asc", width: 200 },
      { label: "Customer Name", field: "customerName", sort: "asc", width: 200 },
      { label: "Service", field: "service", sort: "asc", width: 200 },
      { label: 'Ref ID', field: 'refId', sort: 'asc', width: 200  },
      { label: "Booking Date", field: "bookingDate", sort: "asc", width: 200 },
      { label: "Status", field: "status", sort: "asc", width: 200 },
    ],
    rows: bookingDetails.map((data) => ({
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
      <MDBDataTable responsive data={data} entries={10}
        paginationLabel={[
          <LeftArrow style={{ height: '15px', }} />,
          <RightArrow style={{ height: '15px' }} />
        ]} />
    </div>
  );
};

export default AdminBookingClose;
