import {
    ADD_BOOKING_RESPONSE,
  } from "./ActionTypes";
  
  const initialState = {
    error: "",
    addBookingSuccessfull: "",
  };
  
  const SetMoreBooking = (booking = initialState, action) => {
          switch (action.type) {
              case ADD_BOOKING_RESPONSE :
              booking = {
                  ...booking,
                  addBookingSuccessfull: action.payload,
              };
              break;
              default:
              booking = { ...booking };
              break;
          }
          return booking;
  };
  
  export default SetMoreBooking;
  