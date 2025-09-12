import { ADD_BOOKING } from "./ActionTypes";
import { ADD_BOOKING_RESPONSE } from "./ActionTypes";


export const addBooking = (addBookingInfo) => ({
  type: ADD_BOOKING,
  payload: addBookingInfo,
});

export const addBookingResponse = (addBookingResponse) => ({
  type: ADD_BOOKING_RESPONSE,
  payload: addBookingResponse,
});