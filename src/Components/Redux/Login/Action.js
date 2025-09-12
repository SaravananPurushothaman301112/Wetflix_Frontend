import { LOGIN } from "./ActionTypes";
import { LOGIN_RESPONSE } from "./ActionTypes";
import { FORGOT_PASSWORD } from "./ActionTypes";
import { FORGOT_PASSWORD_RESPONSE } from "./ActionTypes";
// import { EMAIL_OTP } from "./ActionTypes";
// import { EMAIL_OTP_RESPONSE } from "./ActionTypes";
import { CLEAR_LOGIN_RESPONSE } from "./ActionTypes";
import {CHANGE_PASSWORD} from "./ActionTypes";
import {CHANGE_PASSWORD_RESPONSE} from "./ActionTypes";
import { CLEAR_RESETPASSWORD_RESPONSE } from "./ActionTypes";

export const usersLogin = (loginCredentials) => ({
  type: LOGIN,
  payload: loginCredentials,
});

export const userLoginResponse = (loginResponse) => ({
  type: LOGIN_RESPONSE,
  payload: loginResponse,
});
export const clearLoginResponse = () => ({
  type: CLEAR_LOGIN_RESPONSE,
});
export const clearResetPasswordResponse = () => ({
  type: CLEAR_RESETPASSWORD_RESPONSE,
});

export const forgotpassword = (ForgotPasswordCredentials) => ({
  type: FORGOT_PASSWORD,
  payload: ForgotPasswordCredentials,
});

export const forgotpasswordResponse = (ForgotPasswordResponse) => ({
  type: FORGOT_PASSWORD_RESPONSE,
  payload: ForgotPasswordResponse,
});

// export const emailOTP = (emailOTPCredentials) => ({
//   type: EMAIL_OTP,
//   payload: emailOTPCredentials,
// });

// export const emailOTPResponse = (emailOTPResponse) => ({
//   type: EMAIL_OTP_RESPONSE,
//   payload: emailOTPResponse,
// });

export const changePassword = (changePasswordCredentials) => ({
    type: CHANGE_PASSWORD,
    payload: changePasswordCredentials,
  });
  
  export const changePasswordResponse = (changePasswordResponse) => ({
    type: CHANGE_PASSWORD_RESPONSE,
    payload: changePasswordResponse,
  });
  
