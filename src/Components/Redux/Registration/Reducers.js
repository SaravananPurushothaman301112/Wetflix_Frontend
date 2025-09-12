import { REGISTRATION_RESPONSE, REGISTRATION_RESPONSE_CLEAR } from "./ActionTypes";

const initialState = {
  RegistrationDetails: null,
};

const Registration = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_RESPONSE:
      return {
        ...state,
        RegistrationDetails: action.payload, // Store response data
      };
    // case REGISTRATION_RESPONSE_CLEAR:
    //   return {
    //     ...state,
    //     RegistrationDetails: null, // Clear response data
    //   };
    default:
      return state;
  }
};

export default Registration;
