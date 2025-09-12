import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import Styles from './UpCommingTable.scss';
import { ReactComponent as MyBookingsTableRightIcon } from '../../../../assets/SvgIcons/MyBookingsTableRightIcon.svg';
import Rectangle from '../../../../assets/images/Rectangle.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUpcomming } from '../../../../Redux/Actions';

const UpCommingTable = () => {
    const dispatch = useDispatch();
    const getAllUpCommingDetails = useSelector(booking => booking.Booking.getAllUpcommingDetails);

    const authUser = JSON.parse(localStorage.getItem("auth"));
    console.log("authUserauthUserauthUser",authUser?.userId)

       // Function to handle row click and get the _id of the clicked row
       const handleRowClick = (id) => {
        console.log('Clicked booking _id:', id);
          
      const BookingId = localStorage.setItem("Booking Id",id);
      console.log('BookingId',BookingId);
        // dispatch(getViewBooking(BookingId));
        // <BookingDetails id={id} />;
    
        console.log('checked');
        
      };
    

    const [userUpCommingID, setUserUpCommingID] = useState({
        bookingstatus: "INPROGRESS",
        userid: authUser?.userId
    });

    useEffect(() => {
        dispatch(getAllUpcomming(userUpCommingID));
    }, [userUpCommingID, dispatch]);

    // Prepare data for MDBDataTable
    const data = {
        columns: [
            { label: 'Booking', field: 'description', sort: 'asc', width: 200,attributes: { style: { textAlign: 'left' } }  },
            // { label: 'Technician Name', field: 'technicianName', sort: 'asc', width: 200,attributes: { style: { textAlign: 'center' } }  },
            { label: 'Booking Date', field: 'bookingDate', sort: 'asc', width: 200,attributes: { style: { textAlign: 'left' } }  },
            { label: 'Ref ID', field: 'refId', sort: 'asc', width: 100,attributes: { style: { textAlign: 'left' } }  },
            { label: 'Status', field: 'status', sort: 'asc', width: 150,attributes: { style: { textAlign: 'center' } }  },
            { label: 'Action', field: 'action', sort: 'asc', width: 150,attributes: { style: { textAlign: 'left' } }  }
        ],
        rows: getAllUpCommingDetails?.data?.map((data) => ({
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
                        color: data.bookingstatus === 'INPROGRESS' ? '#FFCD4D' : '#545F71',
                        backgroundColor: data.bookingstatus === 'INPROGRESS' ? '#FEFCF5' : '#EEF1F4',
                        borderRadius: '100px',
                        padding: '4px 12px',
                        textAlign: 'center',
                        margin: '0 0.5rem'
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

export default UpCommingTable;
