import React from 'react'
import Booking from '../Booking/Booking'
import MyBookings from '../MyBookings/MyBookings'

const BookTechnician = () => {
  return (
    <div className='BookTechnician'>
        <Booking />
        <MyBookings />
    </div>
  )
}

export default BookTechnician