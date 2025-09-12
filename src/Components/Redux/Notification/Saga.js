import { call, put, takeLatest } from "redux-saga/effects";
import { 
  GET_ALL_NOTIFICATION, 
  GET_ALL_NOTIFICATION_READ 
} from "./ActionTypes";
import { 
  getAllNotificationResponse, 
  getAllNotificationReadResponse 
} from "./Action";
import { Service } from "../../screens/Services/Helper.js";

function* getNotification({ payload: userId }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/notification/notificationByUserId?userid=${userId}`, 
      "GET",
      null,
      true
    );

    yield put(getAllNotificationResponse(response));
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
}

function* getNotificationRead({ payload: { notificationId, isRead } }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/notification/updateNotificationReadStatus?notificationId=${notificationId}&isRead=${isRead}`, //  Dynamically pass isRead
      "PATCH",
     {},
      true
    );

    yield put(getAllNotificationReadResponse(response));
    console.log(`Notification ${notificationId} marked as ${isRead ? "read" : "unread"}`);
  } catch (error) {
    console.error("Error updating notification status:", error);
  }
}

function* notificationSaga() {
  yield takeLatest(GET_ALL_NOTIFICATION, getNotification);
  yield takeLatest(GET_ALL_NOTIFICATION_READ, getNotificationRead); //  Handles PATCH API
}

export default notificationSaga;
