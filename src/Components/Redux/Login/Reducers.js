import {
  LOGIN_RESPONSE,
  FORGOT_PASSWORD_RESPONSE,
  CLEAR_LOGIN_RESPONSE,
  CHANGE_PASSWORD_RESPONSE,
  CLEAR_RESETPASSWORD_RESPONSE
} from "./ActionTypes";

const initialState = {
  error: "",
  loginSuccessfull: "",
  forgotpassword: "",
  changePassword: "",
};

const Login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_RESPONSE:
      return {
        ...state,
        loginSuccessfull: action.payload,
      };
    
    case FORGOT_PASSWORD_RESPONSE:
      return {
        ...state,
        forgotpassword: action.payload,
      };

    case CLEAR_LOGIN_RESPONSE:
      return {
        ...state,
        loginSuccessfull: null, // Reset the loginSuccessfull value to null
      };
      case CLEAR_RESETPASSWORD_RESPONSE:
      return {
        ...state,
        changePassword: null, // Reset the loginSuccessfull value to null
      };

    case CHANGE_PASSWORD_RESPONSE:
      return {
        ...state,
        changePassword: action.payload,
      };

    default:
      return state;
  }
};

export default Login;
