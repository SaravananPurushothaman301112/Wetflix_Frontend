import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {  OTP,MOBILE_OTP,RESEND_OTP} from "./ActionTypes";
import {  OTPResponse,MobileOTPResponse,ResendOTPResponse } from "./Action";
import { Service } from "../../screens/Services/Helper.js"
import { useDispatch } from "react-redux";


function* OTPVerify({ payload: OTPCredentials }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/user/emailOtpVerfication",
      "POST",
      OTPCredentials,
      null
    );
    yield put(OTPResponse(response));
    console.log(response)
    
  } catch (error) {

  }
}

function* MobileOTPVerify({ payload: MobileOTPCredentials }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/user/mobileOtpVerification",
      "POST",
      MobileOTPCredentials,
      null
    );
    yield put(MobileOTPResponse(response));
    console.log(response)
    
  } catch (error) {

  }
}

function* ResendOTPVerify({ payload: ResendOTPCredentials }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/user/resendOtp",
      "POST",
      ResendOTPCredentials,
      null
    );
    yield put(ResendOTPResponse(response));
    console.log(response)
    
  } catch (error) {

  }
}



function* OTPVerification() {
  yield takeEvery(OTP, OTPVerify);
  yield takeEvery(MOBILE_OTP, MobileOTPVerify);
  yield takeEvery(RESEND_OTP,ResendOTPVerify)

}

export default OTPVerification;
