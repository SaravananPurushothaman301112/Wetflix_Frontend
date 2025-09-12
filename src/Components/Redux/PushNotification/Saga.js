import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {  GET_NOTIFICATION } from "./ActionTypes";
import { getNotificationResponse } from "./Action";
import { Service } from "../../screens/Services/Helper.js"

function* addNotification({ payload: getNotification }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/notification/notificationRegister",
      "POST",
      getNotification,
      true
    );
    yield put(getNotificationResponse(response));
    console.log(response)
  } catch (error) {

  }
}

function* pushnotification() {
  yield takeEvery(GET_NOTIFICATION, addNotification);
 
}

export default pushnotification;
