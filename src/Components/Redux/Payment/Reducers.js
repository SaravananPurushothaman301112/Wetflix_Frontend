import {
    GET_PAYMENT_RESPONSE,  
    GET_TRANSACTION_HISTORY_RESPONSE,
  } from "./ActionTypes";
  
  const initialState = {
    error: "",
    paymentdetails: "",
    transactionDetails:"",
  };
  
  const getPayment = (payment = initialState, action) => {
          switch (action.type) {
              case GET_PAYMENT_RESPONSE:
                payment = {
                  ...payment,
                  paymentdetails: action.payload,
              };
              break;
                case GET_TRANSACTION_HISTORY_RESPONSE:
                  payment = {
                    ...payment,
                    transactionDetails: action.payload,
                };
                break;
              
              default:
                payment = { ...payment };
              break;
          }
          return payment;
  };
  
  export default getPayment;
  