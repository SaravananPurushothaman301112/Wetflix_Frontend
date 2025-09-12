import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { ReactComponent as MyBookingsTableRightIcon } from '../../../../assets/SvgIcons/MyBookingsTableRightIcon.svg';
import Rectangle from '../../../../assets/images/Rectangle.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminBooking, getBookingStatusUpdate } from "../../../../Redux/Actions";
import { toast } from "react-toastify";
import Styles from "./../../../pages/DeviceManagement/DeviceManagement.css";
import { ReactComponent as LeftArrow } from "../../../../assets/SvgIcons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../../../assets/SvgIcons/RightArow.svg"

const MyCustomerBookings = () => {
  const dispatch = useDispatch();
  const getAllBookingDetails = useSelector(
    (booking) => booking.Booking.getAdminBookingDetails
  );
  const [localBookingDetails, setLocalBookingDetails] = useState([]);

  useEffect(() => {
    dispatch(getAdminBooking());
  }, [dispatch]);

  // Sync local state with Redux store when getAllBookingDetails changes
  useEffect(() => {
    if (getAllBookingDetails?.data) {
      setLocalBookingDetails(getAllBookingDetails.data);
    }
  }, [getAllBookingDetails]);

  const handleStatusChange = (bookingId, newStatus, userid) => {
    const updatedBookings = localBookingDetails?.map((booking) => {
      if (booking._id === bookingId) {
        return { ...booking, bookingstatus: newStatus };
      }
      return booking;
    });

    setLocalBookingDetails(updatedBookings);
    console.log(updatedBookings, "hvgfghv")



    const bookingStatusUpdateInfo = {
      bookingid: bookingId, // API expects bookingid
      bookingstatus: newStatus,
      userid: parseInt(userid),
    };

    dispatch(getBookingStatusUpdate(bookingStatusUpdateInfo));
  };

  const data = {
    columns: [
      { label: 'Device Name', field: 'deviceName', sort: 'asc', width: 200 },
      { label: 'Customer Name', field: 'customerName', sort: 'asc', width: 200 },
      { label: 'Service', field: 'service', sort: 'asc', width: 200 },
      { label: 'Ref ID', field: 'refId', sort: 'asc', width: 200  },
      { label: 'Booking Date', field: 'bookingDate', sort: 'asc', width: 200 },
      { label: 'Status', field: 'status', sort: 'asc', width: 200 },
    ],
    rows: localBookingDetails?.map((data) => ({
      deviceName: data.description,
      customerName: data.firstname,
      service: data.bookingtype,
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
            color:
              data.bookingstatus === 'CREATED'
                ? '#28a745'
                : data.bookingstatus === 'INPROGRESS'
                  ? '#ffc107'
                  : data.bookingstatus === 'COMPLETED'
                    ? '#dc3545'
                    : data.bookingstatus === 'CANCELLED'
                      ? 'red'
                      : 'transparent',
            backgroundColor:
              data.bookingstatus === 'CREATED'
                ? '#F7FEF5'
                : data.bookingstatus === 'INPROGRESS'
                  ? '#FEFCF5'
                  : data.bookingstatus === 'COMPLETED'
                    ? '#FEF7F5'
                    : data.bookingstatus === 'CANCELLED'
                      ? '#FEF7F5'
                      : 'transparent',
            width: 'fit-content',
            borderRadius: '100px',
            padding: '4px 12px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <select
            value={data.bookingstatus}
            onChange={(e) =>
              handleStatusChange(data._id, e.target.value, data.userid)
            }
            style={{
              appearance: 'none',
              border: 'none',
              background: 'transparent',
              padding: '4px 12px',
              fontSize: '14px',
              color: 'inherit',
            }}
            disabled={data.bookingstatus === 'CANCELLED'} // Disables dropdown for CANCELLED
          >
            <option value="CREATED">Created</option>
            <option value="INPROGRESS">InProgress</option>
            <option value="COMPLETED">Closed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
      
          {/* Show dropdown icon only if status is NOT CANCELLED */}
          {data.bookingstatus !== 'CANCELLED' && (
            <span
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: '12px',
              }}
            >
              &#9662;
            </span>
          )}
        </div>
      ),
      
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

export default MyCustomerBookings;
