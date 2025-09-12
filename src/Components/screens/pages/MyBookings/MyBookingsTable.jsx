import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
// import './MyBookingsTable.scss';
import Styles from "./../../pages/DeviceManagement/DeviceManagement.css";
import { ReactComponent as MyBookingsTableRightIcon } from '../../../assets/SvgIcons/MyBookingsTableRightIcon.svg';
import Rectangle from '../../../assets/images/Rectangle.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooking, getViewBooking } from '../../../Redux/Actions';
import BookingDetails from '../bookingDetails/BookingDetails';

const MyBookingsTable = () => {

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
            description: data.bookingtype,
            // technicianName: 'John', // Replace with actual technician name
            bookingDate: new Date(data.bookingdatetime).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'America/Port_of_Spain' // Trinidad and Tobago time zone
              }),
            refId: data._id,
            status: (
                <div
                    style={{
                        color: data.bookingstatus === 'CANCELLED' ? '#A9281E' : data.bookingstatus === 'COMPLETED' ? '#0D894F' :  data.bookingstatus === 'CREATED' ? '#154F9E': data.bookingstatus === 'INPROGRESS' ? '#FFCD4D' : '#545F71',
                        backgroundColor: data.bookingstatus === 'CANCELLED' ? '#FDEDEC' : data.bookingstatus === 'COMPLETED' ? '#EAFBF0' :data.bookingstatus === 'CREATED' ? '#3480E54D' :data.bookingstatus === 'INPROGRESS' ? '#FEFCF5' : '#EEF1F4',
                        borderRadius: '100px',
                        padding: '4px 12px',
                        textAlign: 'center',
                        width:"fit-content",
                        // margin: '0 0.5rem'
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
        }))
         // Sort bookings by id
         .sort((a, b) => b.refId - a.refId)
    };

    return (
        <div className={Styles.activeTable}>
          <MDBDataTable responsive data={data} entries={10} />
        </div>
    );
  }

export default MyBookingsTable;
