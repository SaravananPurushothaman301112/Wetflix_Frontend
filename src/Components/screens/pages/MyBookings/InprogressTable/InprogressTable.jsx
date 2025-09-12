import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import Styles from './InprogressTable.scss';
import { ReactComponent as MyBookingsTableRightIcon } from '../../../../assets/SvgIcons/MyBookingsTableRightIcon.svg';
import Rectangle from '../../../../assets/images/Rectangle.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInprogerss } from '../../../../Redux/Actions';

const InprogressTable = () => {
    const dispatch = useDispatch();
    const getAllInProgressDetails = useSelector(booking => booking.Booking.getAllInProgressDetails);

    const authUser = JSON.parse(localStorage.getItem("auth"));
    console.log("authUserauthUserauthUser",authUser?.userId)
    const handleRowClick = (id) => {
        console.log('Clicked booking _id:', id);
          
      const BookingId = localStorage.setItem("Booking Id",id);
      console.log('BookingId',BookingId);
        // dispatch(getViewBooking(BookingId));
        // <BookingDetails id={id} />;
    
        console.log('checked');
        
      };
    

    const [userInprogressID, setUserInprogressID] = useState({
        bookingstatus: "INPROGRESS",
        userid: authUser?.userId
    });

    useEffect(() => {
        dispatch(getAllInprogerss(userInprogressID));
    }, [userInprogressID, dispatch]);

    // Prepare data for MDBDataTable
    const data = {
        columns: [
            { label: 'Booking', field: 'description', sort: 'asc', width: 200,attributes: { style: { textAlign: 'left' } }  },
            // { label: 'Technician Name', field: 'technicianName', sort: 'asc', width: 200 },
            { label: 'Booking Date', field: 'bookingDate', sort: 'asc', width: 200,attributes: { style: { textAlign: 'left' } }  },
            { label: 'Ref ID', field: 'refId', sort: 'asc', width: 100,attributes: { style: { textAlign: 'left' } }  },
            { label: 'Status', field: 'status', sort: 'asc', width: 150,attributes: { style: { textAlign: 'center' } }  },
            { label: 'Action', field: 'action', sort: 'asc', width: 150,attributes: { style: { textAlign: 'left' } }  }
        ],
        rows: getAllInProgressDetails?.data?.map((data) => ({
            description: data.bookingtype,
            technicianName: 'John', // Replace with actual technician name
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
                    color:
                      data.bookingstatus === 'CLOSED'
                        ? '#A9281E' // red
                        : data.bookingstatus === 'CREATED'
                        ? '#147138' // green
                        : data.bookingstatus === 'INPROGRESS'
                        ? '#BD630A' // yellow
                        : '#545F71',
                    backgroundColor:
                      data.bookingstatus === 'CLOSED'
                        ? '#FDEDEC' // light red
                        : data.bookingstatus === 'CREATED'
                        ? '#E7F4EE' // light green
                        : data.bookingstatus === 'INPROGRESS'
                        ? '#FEF2E7' // light yellow
                        : '#EEF1F4',
                    borderRadius: '100px',
                    padding: '4px 12px',
                    textAlign: 'center',
                    margin: '0 0.5rem',
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
            <MDBDataTable
                responsive
                data={data}
                entries={10}
                noBottomColumns
            />
        </div>
    );
}

export default InprogressTable;
