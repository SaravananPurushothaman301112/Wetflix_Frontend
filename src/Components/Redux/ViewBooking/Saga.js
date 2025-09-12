import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_VIEW_BOOKING } from "./ActionTypes.js";
import { getViewBookingResponse } from "./Action.js";
import { Service } from "../../screens/Services/Helper.js"
import { useDispatch } from "react-redux";

function* getViewBook({payload:getViewBooking}) {
    try{
        const response = yield call(
            Service.commonFetch,
        `/booking/viewBooking?bookingId=${getViewBooking}`,
        "GET",
        null,
        true
        )
        yield put(getViewBookingResponse(response));
        console.log(response)
    }catch(error){

    }
}

function* Books (){
    yield takeEvery(GET_VIEW_BOOKING,getViewBook)
}
export default Books