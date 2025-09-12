import { GET_VIEW_BOOKING_RESPONSE } from "./ActionTypes";

const initialState = {
    error:"",
    viewBookingSuccess:""
}

const ViewBooking = (state=initialState,action) => {
   switch(action.type){
    case GET_VIEW_BOOKING_RESPONSE:
        state={
            ...state,
            viewBookingSuccess:action.payload
        };
        break;
        default:{
            state={...state}
        };
        break;
   }
   return state
}

export default ViewBooking