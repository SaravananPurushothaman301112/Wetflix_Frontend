import { GET_VIEW_BOOKING } from "./ActionTypes";
import { GET_VIEW_BOOKING_RESPONSE } from "./ActionTypes";

export const getViewBooking = (getViewBooking) => ({
    type:GET_VIEW_BOOKING,
    payload:getViewBooking
})

export const getViewBookingResponse = (getViewBookingResponse) => ({
    type:GET_VIEW_BOOKING_RESPONSE,
    payload:getViewBookingResponse
})