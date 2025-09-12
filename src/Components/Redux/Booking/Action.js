import {CREATE_BOOKING,} from "./ActionTypes"
import {CREATE_BOOKING_RESPONSE} from "./ActionTypes"
import {CREATE_BOOKING_RESPONSE_CLEAR} from "./ActionTypes"
import {GET_ALL_BOOKING} from "./ActionTypes"
import {GET_ALL_BOOKING_RESPONSE} from "./ActionTypes"
import {GET_ALL_UPCOMMING} from "./ActionTypes"
import {GET_ALL_UPCOMMING_RESPONSE} from "./ActionTypes"
import {GET_ALL_INPROGRESS} from "./ActionTypes"
import {GET_ALL_INPROGRESS_RESPONSE} from "./ActionTypes"
import {GET_ALL_SUCCESSFULL} from "./ActionTypes"
import {GET_ALL_SUCCESSFULL_RESPONSE} from "./ActionTypes"
import {GET_BOOKING_STATUS_UPDATE} from "./ActionTypes"
import {GET_BOOKING_STATUS_UPDATE_RESPONSE} from "./ActionTypes"

import { GET_BOOKING_UPDATE } from "./ActionTypes"
import { GET_BOOKING_UPDATE_RESPONSE } from "./ActionTypes"
import {GET_BOOKING_UPDATE_RESPONSE_CLEAR} from "./ActionTypes"
import {GET_ADMIN_BOOKING} from "./ActionTypes"
import {GET_ADMIN_BOOKING_RESPONSE} from "./ActionTypes"
import {GET_ADMIN_CREATE_BOOKING} from "./ActionTypes"
import {GET_ADMIN_CREATE_BOOKING_RESPONSE} from "./ActionTypes"
import {GET_ADMIN_INPROGRESS_BOOKING} from "./ActionTypes"
import {GET_ADMIN_INPROGRESS_BOOKING_RESPONSE} from "./ActionTypes"
import {GET_ADMIN_CLOSE_BOOKING} from "./ActionTypes"
import {GET_ADMIN_CLOSE_BOOKING_RESPONSE} from "./ActionTypes"

import {GET_BOOKING_STATUS_CANCEL} from "./ActionTypes"
import {GET_BOOKING_STATUS_CANCEL_RESPONSE} from "./ActionTypes"

export const createBooking =(createBookingInfo)=>({
    type: CREATE_BOOKING,
    payload: createBookingInfo,
})
export const createBookingRespClear =()=>({
    type: CREATE_BOOKING_RESPONSE_CLEAR
})

export const createBookingResponse=(createBookingDetails)=>({
    type:CREATE_BOOKING_RESPONSE,
    payload:createBookingDetails,
})

export const getAllBooking = (bookingInfo)=>({
    type: GET_ALL_BOOKING,
    payload :bookingInfo,
})

export const getAllBookingResponse = (bookingDetails)=>({
    type: GET_ALL_BOOKING_RESPONSE,
    payload :bookingDetails,
})

export const getAllUpcomming = (upcommingInfo)=>({
    type: GET_ALL_UPCOMMING,
    payload :upcommingInfo,
})

export const getAllUpcommingResponse = (upcommingDetails)=>({
    type: GET_ALL_UPCOMMING_RESPONSE,
    payload :upcommingDetails,
})

export const getAllInprogerss = (inProgressInfo)=>({
    type: GET_ALL_INPROGRESS,
    payload : inProgressInfo,
})

export const getAllInprogerssResponse = (inProgressDetails)=>({
    type: GET_ALL_INPROGRESS_RESPONSE,
    payload : inProgressDetails,
})

export const getAllSuccessfull = (SuccessfullInfo)=>({
    type: GET_ALL_SUCCESSFULL,
    payload : SuccessfullInfo,
})

export const getAllSuccessfullResponse = (SuccessfullDetails)=>({
    type: GET_ALL_SUCCESSFULL_RESPONSE,
    payload : SuccessfullDetails,
})

export const getBookingStatusUpdate = (bookingStatusUpdateInfo)=>({
    type: GET_BOOKING_STATUS_UPDATE,
    payload : bookingStatusUpdateInfo,
})

export const getBookingStatusUpdateResponse = (bookingStatusUpdateDetails)=>({
    type: GET_BOOKING_STATUS_UPDATE_RESPONSE,
    payload : bookingStatusUpdateDetails,
})


export const getBookingUpdate = (bookingUpdateInfo)=>({
    type: GET_BOOKING_UPDATE,
    payload : bookingUpdateInfo,
})

export const getBookingUpdateResponse = (bookingUpdateDetails)=>({
    type: GET_BOOKING_UPDATE_RESPONSE,
    payload : bookingUpdateDetails,
})

export const getBookingUpdateRespClear = ()=>({
    type: GET_BOOKING_UPDATE_RESPONSE_CLEAR
})

export const getAdminBooking = (getAdminBooking)=>({
    type: GET_ADMIN_BOOKING,
    payload : getAdminBooking,
})

export const getAdminBookingResponse = (getAdminBookingDetails)=>({
    type: GET_ADMIN_BOOKING_RESPONSE,
    payload : getAdminBookingDetails,
})
export const getAdminCreateBooking = (getAdminBookingCreate)=>({
    type: GET_ADMIN_CREATE_BOOKING,
    payload : getAdminBookingCreate,
})

export const getAdminCreateBookingResponse = (getAdminBookingCreateDetails)=>({
    type: GET_ADMIN_CREATE_BOOKING_RESPONSE,
    payload : getAdminBookingCreateDetails,
})
export const getAdminInporogrssBooking = (getAdminBookingInprogress)=>({
    type: GET_ADMIN_INPROGRESS_BOOKING,
    payload : getAdminBookingInprogress,
})

export const getAdminInporogrssBookingResponse = (getAdminBookingInprogressDetails)=>({
    type: GET_ADMIN_INPROGRESS_BOOKING_RESPONSE,
    payload : getAdminBookingInprogressDetails,
})
export const getAdminClosedBooking = (getAdminBookingClose)=>({
    type: GET_ADMIN_CLOSE_BOOKING,
    payload : getAdminBookingClose,
})

export const getAdminClosedBookingResponse = (getAdminBookingCloseDetails)=>({
    type: GET_ADMIN_CLOSE_BOOKING_RESPONSE,
    payload : getAdminBookingCloseDetails,
})

export const getBookingStatusCancel = (bookingStatusCancelInfo)=>({
    type: GET_BOOKING_STATUS_CANCEL,
    payload : bookingStatusCancelInfo,
})

export const getBookingStatusCancelResponse = (bookingStatusCancelDetails)=>({
    type: GET_BOOKING_STATUS_CANCEL_RESPONSE,
    payload : bookingStatusCancelDetails,
})