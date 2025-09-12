import { OTP } from "./ActionTypes";
import { OTP_RESPONSE } from "./ActionTypes";
import { MOBILE_OTP } from "./ActionTypes";
import { MOBILE_OTP_RESPONSE } from "./ActionTypes";
// import{REGISTRATION_RESPONSE_CLEAR} from "./ActionTypes"
import { REGISTRATION_RESPONSE_CLEAR } from "./ActionTypes";

import { RESEND_OTP } from "./ActionTypes";
import { RESEND_OTP_RESPONSE } from "./ActionTypes";

export const OTPVerify = (OTPCredentials) => ({
    type: OTP,
    payload: OTPCredentials,
  });
  
 

  export const OTPResponse = (OTPResponse) => ({
    type: OTP_RESPONSE,
    payload: OTPResponse,
  });

  export const ResendOTP = (ResendOTPCredentials) => ({
    type: RESEND_OTP,
    payload: ResendOTPCredentials,
  });

  export const ResendOTPResponse = (ResendOTPResponse) => ({
    type: RESEND_OTP_RESPONSE,
    payload: ResendOTPResponse,
  });

  export const MobileOTPVerify = (MobileOTPCredentials) => ({
    type: MOBILE_OTP,
    payload: MobileOTPCredentials,
  });
  
  export const clearCreateResponse = () => ({
    type: REGISTRATION_RESPONSE_CLEAR,
    
  });
  
  
  export const MobileOTPResponse = (MobileOTPResponse) => ({
    type: MOBILE_OTP_RESPONSE,
    payload: MobileOTPResponse,
  });