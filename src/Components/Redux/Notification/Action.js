import { GET_ALL_NOTIFICATION  } from "./ActionTypes";
import { GET_ALL_NOTIFICATION_RESPONSE } from "./ActionTypes";
import { GET_ALL_NOTIFICATION_READ } from "./ActionTypes";
import { GET_ALL_NOTIFICATION_READ_RESPONSE } from "./ActionTypes";

export const getAllNotification = (getAllNotification) => ({
  type: GET_ALL_NOTIFICATION ,
  payload: getAllNotification,
});

export const getAllNotificationResponse = (getAllNotificationResponse) => ({
  type: GET_ALL_NOTIFICATION_RESPONSE,
  payload: getAllNotificationResponse,
});

export const getAllNotificationRead = (getAllNotificationRead)=>({
  type:GET_ALL_NOTIFICATION_READ,
  payload: getAllNotificationRead
})

export const getAllNotificationReadResponse =(getAllNotificationReadResponse)=>({
  type:GET_ALL_NOTIFICATION_READ_RESPONSE,
  payload:getAllNotificationReadResponse
})
