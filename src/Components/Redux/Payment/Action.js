import { GET_PAYMENT } from "./ActionTypes";
import { GET_PAYMENT_RESPONSE } from "./ActionTypes";
import { GET_TRANSACTION_HISTORY } from "./ActionTypes";
import { GET_TRANSACTION_HISTORY_RESPONSE } from "./ActionTypes";


export const getPayment = (paymentInfo) => ({
  type: GET_PAYMENT,
  payload: paymentInfo,
});

export const getPaymentResponse = (paymentDetails) => ({
  type: GET_PAYMENT_RESPONSE,
  payload: paymentDetails,
});

export const getTransactionHistory = (transcationInfo) => ({
  type: GET_TRANSACTION_HISTORY,
  payload: transcationInfo,
});

export const getTransactionHistoryResponse = (transcationDetails) => ({
  type: GET_TRANSACTION_HISTORY_RESPONSE,
  payload: transcationDetails,
});




  
