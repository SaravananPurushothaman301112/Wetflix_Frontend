import {
    ADD_SUBSCRIPTION_RESPONSE,
  } from "./ActionTypes";
  
  const initialState = {
    error: "",
    addSubsriptionSuccessfull: "",
  };
  
  const Subscription = (subsription = initialState, action) => {
          switch (action.type) {
              case ADD_SUBSCRIPTION_RESPONSE:
              subsription = {
                  ...subsription,
                  addSubsriptionSuccessfull: action.payload,
              };
              break;
              default:
              subsription = { ...subsription };
              break;
          }
          return subsription;
  };
  
  export default Subscription;
  