import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { CREATE_BOOKING, GET_ALL_BOOKING, GET_ALL_UPCOMMING,GET_ALL_INPROGRESS,GET_ALL_SUCCESSFULL ,GET_BOOKING_STATUS_UPDATE , GET_BOOKING_UPDATE ,GET_ADMIN_BOOKING,
  GET_ADMIN_CREATE_BOOKING,
  GET_ADMIN_CLOSE_BOOKING,
  GET_ADMIN_INPROGRESS_BOOKING,

  GET_BOOKING_STATUS_CANCEL
} from "./ActionTypes";
import { createBookingResponse, getAllBookingResponse ,getAllUpcommingResponse, getAllInprogerssResponse ,
  getAdminCreateBookingResponse,getAdminBookingResponse,getAllSuccessfullResponse,getBookingStatusUpdateResponse, getBookingUpdateResponse,
  getAdminClosedBookingResponse, 
  getAdminInporogrssBookingResponse,

  getBookingStatusCancelResponse
} from "./Action";
import { Service } from "../../screens/Services/Helper.js";


function* createBooking({ payload: createBookingInfo }) {
    try {
      const response = yield call(
        Service.commonFetch,
        "/booking/createBooking",
        "POST",
        createBookingInfo,
        true
      );
  
      yield put(createBookingResponse(response));
  
    } catch (error) {
      console.log(error);
    }
  }

function* getAllBooking({ payload: bookingInfo }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/booking/getAllBookingByUserId?userid=${bookingInfo}`,
      "GET",
      null,
      true
    );

    yield put(getAllBookingResponse(response));
  } catch (error) {
    console.log(error);
  }
}


function* getAllUpcomming({ payload: upcommingInfo }) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/booking/inprogressBooking?bookingstatus=${upcommingInfo.bookingstatus}&userid=${upcommingInfo.userid}`,
        "GET",
        null,
        true
      );
  
      yield put(getAllUpcommingResponse(response));
    } catch (error) {
      console.log(error);
    }
  }

  function* getAllInProgress({ payload: inProgressInfo }) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/booking/cancelledBooking?bookingstatus=${inProgressInfo.bookingstatus}&userid=${inProgressInfo.userid}`,
        "GET",
        null,
        true
      );
  
      yield put(getAllInprogerssResponse(response));
    } catch (error) {
      console.log(error);
    }
  }

  function* getAllSuccessfull({ payload: SuccessfullInfo }) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/booking/completedBooking?bookingstatus=${SuccessfullInfo.bookingstatus}&userid=${SuccessfullInfo.userid}`,
        "GET",
        null,
        true
      );
  
      yield put(getAllSuccessfullResponse(response));
    } catch (error) {
      console.log(error);
    }
  }

  function* bookingStatusUpdate({ payload: bookingStatusUpdateInfo }) {
    try {
      const response = yield call(
        Service.commonFetch,
        "/booking/updateBookingStatus",
        "POST",
        bookingStatusUpdateInfo,
        true
      );
  
      yield put(getBookingStatusUpdateResponse(response));
  
    } catch (error) {
      console.log(error);
    }
  }


  function* bookingUpdate({ payload: bookingUpdateInfo }) {
    try {
      const response = yield call(
        Service.commonFetch,
        "/booking/updateBooking",
        "POST",
        bookingUpdateInfo,
        true
      );
  
      yield put(getBookingUpdateResponse(response));
  
    } catch (error) {
      console.log(error);
    }
  }


  function* bookingStatusCancel({ payload: bookingStatusCancelDetails }) {
    try {
      const response = yield call(
        Service.commonFetch,
        "/booking/cancelBooking",
        "POST",
        bookingStatusCancelDetails,
        true
      );
  
      yield put(getBookingStatusCancelResponse(response));
  
    } catch (error) {
      console.log(error);
    }
  }

  function* getAllAdminBooking({ payload: getAdminBooking }) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/booking/getAllBooking?userid`,
        "GET",
        null,
        true
      );
  
      yield put(getAdminBookingResponse(response));
    } catch (error) {
      console.log(error);
    }
  }
  function* getAllAdminBookingCreate({ payload: getAdminBookingCreate }) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/booking/createdBooking?bookingstatus=${getAdminBookingCreate.bookingstatus}`,
        "GET",
        getAdminBookingCreate,
        true,
        null
      );
  
      yield put(getAdminCreateBookingResponse(response));
    } catch (error) {
      console.log(error);
    }
  }
  
  function* getAllAdminBookingInpogress({ payload: getAdminBookingInprogress }) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/booking/inprogressBooking?bookingstatus=${getAdminBookingInprogress.bookingstatus}`,
        "GET",
        getAdminBookingInprogress,
        true,
        null
      );
  
      yield put(getAdminInporogrssBookingResponse(response));
    } catch (error) {
      console.log(error);
    }
  }

  function* getAllAdminBookingClose({ payload: getAdminBookingInprogress }) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/booking/completedBooking?bookingstatus=${getAdminBookingInprogress.bookingstatus}`,
        "GET",
        getAdminBookingInprogress,
        true,
        null
      );
  
      yield put(getAdminClosedBookingResponse(response));
    } catch (error) {
      console.log(error);
    }
  }

function* Booking() {
  yield takeEvery(CREATE_BOOKING, createBooking);
  yield takeEvery(GET_ALL_BOOKING, getAllBooking);
  yield takeEvery(GET_ALL_UPCOMMING, getAllUpcomming);
  yield takeEvery(GET_ALL_INPROGRESS, getAllInProgress);
  yield takeEvery(GET_ALL_SUCCESSFULL, getAllSuccessfull);
  yield takeEvery(GET_BOOKING_STATUS_UPDATE, bookingStatusUpdate);

  yield takeEvery(GET_BOOKING_UPDATE, bookingUpdate);

  yield takeEvery(GET_ADMIN_BOOKING, getAllAdminBooking);
  yield takeEvery(GET_ADMIN_CREATE_BOOKING, getAllAdminBookingCreate);
  yield takeEvery(GET_ADMIN_INPROGRESS_BOOKING, getAllAdminBookingInpogress);
  yield takeEvery(GET_ADMIN_CLOSE_BOOKING, getAllAdminBookingClose);

  yield takeEvery(GET_BOOKING_STATUS_CANCEL, bookingStatusCancel);
}

export default Booking;
