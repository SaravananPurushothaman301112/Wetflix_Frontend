import { GET_NOTIFICATION } from "./ActionTypes";
import { GET_NOTIFICATION_RESPONSE } from "./ActionTypes";

export const getNotification = (getNotification) => ({
    type:GET_NOTIFICATION,
    payload:getNotification
})

export const getNotificationResponse = (getNotificationResponse) => ({
    type:GET_NOTIFICATION_RESPONSE,
    payload:getNotificationResponse
})