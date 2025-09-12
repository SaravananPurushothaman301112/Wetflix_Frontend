import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {  ADD_SUBSCRIPTION } from "./ActionTypes";
import { addSubscriptionResponse } from "./Action";
import { Service } from "../../screens/Services/Helper.js"

function* addSubscription({ payload: addSubscriptionInfo }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/subscription/createSubscription",
      "POST",
      addSubscriptionInfo,
      true
    );
    yield put(addSubscriptionResponse(response));
    console.log(response)
  } catch (error) {

  }
}

function* subscription() {
  yield takeEvery(ADD_SUBSCRIPTION, addSubscription);
 
}

export default subscription;
