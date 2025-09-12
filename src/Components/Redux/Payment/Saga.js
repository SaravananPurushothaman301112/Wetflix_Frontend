import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_PAYMENT, GET_TRANSACTION_HISTORY } from "./ActionTypes";
import { getPaymentResponse,getTransactionHistoryResponse } from "./Action";
import { Service } from "../../screens/Services/Helper.js"
import { useDispatch } from "react-redux";




function* getPayment({ payload: paymentInfo }) {
  try {
    const response = yield call(
        Service.commonFetch,
      `/transaction/getFygarojwt?amount=${paymentInfo.amount}&currency=${paymentInfo.currency}&custom_reference=${paymentInfo.custom_reference}&exp=${paymentInfo.exp}&nbf=${paymentInfo.nbf}&userid=${paymentInfo.userid}`,
      "GET",
      null,
      true
    );
    yield put(getPaymentResponse(response));
    console.log(response)
    
  } catch (error) {

  }
}


function* getTransactionHistory({ payload: transcationInfo }) {
  try {
    const response = yield call(
        Service.commonFetch,
      `/transaction/getTransactionByUserId?userid=${transcationInfo}`,
      "GET",
      null,
      true
    );
    yield put(getTransactionHistoryResponse(response));
    console.log(response)
    
  } catch (error) {

  }
}



function* payment() {
  yield takeEvery(GET_PAYMENT, getPayment);
  yield takeEvery(GET_TRANSACTION_HISTORY,getTransactionHistory)
}

export default payment;
