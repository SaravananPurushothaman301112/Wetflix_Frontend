import { OTP_RESPONSE,MOBILE_OTP_RESPONSE, REGISTRATION_RESPONSE_CLEAR, RESEND_OTP_RESPONSE } from "./ActionTypes";

const initialState = {
  OTPvalidation: "",
  MobileOTPValidation:"",
  ResendOtpResponse:"",
};

const OTPVerification = (state = initialState, action) => {
  switch (action.type) {
    case OTP_RESPONSE:
      state = {
        ...state,
        OTPvalidation: action.payload,
      };
      break;

      case RESEND_OTP_RESPONSE:
      state = {
        ...state,
        ResendOtpResponse: action.payload,
      };
      break;

    case MOBILE_OTP_RESPONSE:
        state = {
          ...state,
          MobileOTPValidation: action.payload,
        };
        break;
         case REGISTRATION_RESPONSE_CLEAR:
              state= {
                ...state,
                MobileOTPValidation: null, // Clear response data
              };
              break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default OTPVerification;
