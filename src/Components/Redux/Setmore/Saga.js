import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {  ADD_BOOKING } from "./ActionTypes";
import { addBookingResponse } from "./Action";
// import { Service } from "../../screens/Services/Helper.js"

function* addBooking({payload: addBookingInfo }) {
  try {
    const response = yield call(
       `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NldG1vcmUuZnVsbGF1dGguY29tIiwiaWF0IjoxNzE0NzEyNzk5LCJwcm9qX2lkIjoib2xkOnNldG1vcmUiLCJ0eXBlIjoidXNlciIsInN1YiI6IjlhZGU5MTQ3LWQ4MzctNGQxZi1iZTNmLTYyMDk5MWEwMGJiYiIsImV4cCI6MTcxNDcxOTk5OSwianRpIjoiOGZjZmE1VUo4RHZjSHJQWSJ9.wdCKCFhCQBgKOJ9tOdSE_3LJDjjPtZrq_cfwCylAlZ8`,
      'https://developer.setmore.com/api/v1/bookingapi/appointment/create',
      "POST",
      addBookingInfo,
      true
    );
    yield put(addBookingResponse(response));
    console.log(response)
  } catch (error) {

  }
}

function* setMoreBooking() {
  yield takeEvery(ADD_BOOKING, addBooking);
 
}

export default setMoreBooking;
