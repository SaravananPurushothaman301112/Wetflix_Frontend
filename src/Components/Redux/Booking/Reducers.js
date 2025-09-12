import {
    CREATE_BOOKING_RESPONSE,
    GET_ALL_BOOKING_RESPONSE,
    GET_ALL_UPCOMMING_RESPONSE,
    GET_ALL_INPROGRESS_RESPONSE,
    GET_ALL_SUCCESSFULL_RESPONSE,
    GET_BOOKING_STATUS_UPDATE_RESPONSE,

    GET_BOOKING_UPDATE_RESPONSE,
    CREATE_BOOKING_RESPONSE_CLEAR,
    GET_ADMIN_BOOKING_RESPONSE,
    GET_ADMIN_CREATE_BOOKING_RESPONSE,
    GET_ADMIN_INPROGRESS_BOOKING_RESPONSE,
    GET_ADMIN_CLOSE_BOOKING_RESPONSE,

    GET_BOOKING_STATUS_CANCEL_RESPONSE,
    GET_BOOKING_UPDATE_RESPONSE_CLEAR,
} from "./ActionTypes";

const initialState = {
    error: "",
    createBookingDetails: "",
    getAllBookingDetails: "",
    getAllInProgressDetails: "",
    getAllSuccessfullDetails: "",
    getBookingStatusUpdateDetails: "",

    getBookingUpdateDetails:"",

    getAdminBookingDetails: "",
    getAdminBookingCreateDetails: "",
    getAdminBookingInpogressDetails: "",
    getAdminBookingCloseDetails:"",

    getBookingStatusCancelDetails:"",
};

const Booking = (booking = initialState, action) => {
    switch (action.type) {
        case CREATE_BOOKING_RESPONSE:
            booking = {
                ...booking,
                createBookingDetails: action.payload,
            };
            break;
        case CREATE_BOOKING_RESPONSE_CLEAR:
            booking = {
                ...booking,
                createBookingDetails:'',
            };
            break;
        case GET_ALL_BOOKING_RESPONSE:
            booking = {
                ...booking,
                getAllBookingDetails: action.payload,
            };
            break;
        case GET_ALL_UPCOMMING_RESPONSE:
            booking = {
                ...booking,
                getAllUpcommingDetails: action.payload,
            };
            break;
        case GET_ALL_INPROGRESS_RESPONSE:
            booking = {
                ...booking,
                getAllInProgressDetails: action.payload,
            };
            break;
        case GET_ALL_SUCCESSFULL_RESPONSE:
            booking = {
                ...booking,
                getAllSuccessfullDetails: action.payload,
            };
            break;
        case GET_BOOKING_STATUS_UPDATE_RESPONSE:
            booking = {
                ...booking,
                getBookingStatusUpdateDetails: action.payload,
            };
            break;

            case GET_BOOKING_UPDATE_RESPONSE:
                booking = {
                    ...booking,
                    getBookingUpdateDetails: action.payload,
                };
                break;
            case GET_BOOKING_UPDATE_RESPONSE_CLEAR:
                booking = {
                    ...booking,
                    getBookingStatusCancelDetails: '',
                };
                break;

            case GET_BOOKING_STATUS_CANCEL_RESPONSE:
            booking = {
                ...booking,
                getBookingStatusCancelDetails: action.payload,
            };
            break;

        case GET_ADMIN_BOOKING_RESPONSE:
            booking = {
                ...booking,
                getAdminBookingDetails: action.payload,
            };
            break;
        case GET_ADMIN_CREATE_BOOKING_RESPONSE:
            booking = {
                ...booking,
                getAdminBookingCreateDetails: action.payload,
            };
            break;
        case GET_ADMIN_INPROGRESS_BOOKING_RESPONSE:
            booking = {
                ...booking,
                getAdminBookingInpogressDetails: action.payload,
            };
            break;
            case GET_ADMIN_CLOSE_BOOKING_RESPONSE:
                booking = {
                    ...booking,
                    getAdminBookingCloseDetails: action.payload,
                };
                break;
        default:
            booking = { ...booking };
            break;
    }
    return booking;
};

export default Booking;

