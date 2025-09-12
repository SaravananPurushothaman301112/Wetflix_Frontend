import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { CHANGE_PASSWORD, EMAIL_OTP, FORGOT_PASSWORD, LOGIN } from "./ActionTypes";
import { changePasswordResponse, emailOTPResponse, forgotpasswordResponse, userLoginResponse } from "./Action";
import { Service } from "../../screens/Services/Helper.js"
import { useDispatch } from "react-redux";

function* userLogin({ payload: loginCredentials }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/user/login",
      "POST",
      loginCredentials,
      null
    );
    yield put(userLoginResponse(response));
    console.log(response)

    if (response?.statusCode == 200) {
      const authInfo = JSON.stringify({
        userId: response?.data.userId,
        accessToken: response?.data.authToken,
        refreshToken: response?.data.refreshToken
       
      })
      localStorage.setItem("auth", authInfo)
      yield put(userLoginResponse(response));
    } else if (response?.statusCode == 400) {
      yield put(userLoginResponse(response));
    } else if (response?.statusCode == 500) {
      yield put(userLoginResponse(response));
    }
    
  } catch (error) {
    localStorage.clear()
  }
}

function* forgotpassword({ payload: ForgotPasswordCredentials }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/user/forgotPassword",
      "POST",
      ForgotPasswordCredentials,
      null
    );
    yield put(forgotpasswordResponse(response));
    console.log(response)
    
  } catch (error) {

  }
}

// function* emailOTP({ payload: emailOTPCredentials }) {
//   try {
//     const response = yield call(
//         Service.commonFetch,
//       "/user/emailOtpVerfication",
//       "POST",
//       emailOTPCredentials,
//       null
//     );
//     yield put(emailOTPResponse(response));
//     console.log(response)
    
//   } catch (error) {

//   }
// }

function* changePassword({ payload: changePasswordCredentials }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/user/resetPassword",
      "POST",
      changePasswordCredentials,
      null
    );
    yield put(changePasswordResponse(response));
    console.log(response)
    
  } catch (error) {

  }
}



function* login() {
  yield takeEvery(LOGIN, userLogin);
  yield takeEvery(FORGOT_PASSWORD, forgotpassword);
  // yield takeEvery(EMAIL_OTP, emailOTP);
  yield takeEvery(CHANGE_PASSWORD, changePassword);

}

export default login;
