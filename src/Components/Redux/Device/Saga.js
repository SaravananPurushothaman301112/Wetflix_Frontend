import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_DEVICE_BY_ID,
  GET_ALL_DEVICE_DATA,
  GET_DEVICE_APPROVED,
  GET_DEVICED_DATA_BY_SERIAL_NUMBER,
  GET_DEVICE_REJECTED,
  DELETE_DEVICE,
  GET_DEVICE_DATA_BY_DEVICE_ID,
  UPDATE_DEVICE_BY_ID,
  GET_FORCOST_DEVICE_DATA,
  GET_USUAGE_DEVICE_DATA,
} from "./ActionType";
import { Service } from "../../screens/Services/Helper";
import {
  getAllDeviceListByIdResponse,
  getDeviceListBySerialNumberResponse,
  getDeviceApprovedResponse,
  getDeviceRejectedResponse,
  getDeviceDeleteResponse,
  getDeviceDataByDeviceIDResponse,
  updateDeviceByIdResponse, 
  getDeviceDataByDeviceID ,
  getUseageDeviceDataResponse,
  getForcostDeviceDataResponse
} from "./Action";
function* updateDeviceDataByDeviceId({ payload }) {
  try {
      const response = yield call(
          Service.commonFetch,
          `/device/updateDeviceDataByDeviceId?deviceid=${payload.deviceid}`,
          "PATCH",
          payload,
          true
      );

      console.log("API Response after update:", response);

      // Ensure response contains updated details
      if (response && response.deviceid) {
          yield put(updateDeviceByIdResponse(response));
      }

  } catch (error) {
      console.error("Error updating device:", error);
  }
}



function* getDeviceListUserById({ payload: deviceId }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/device/getUserDeviceByUserId?userid=${deviceId}`,
      "GET",
      null,
      true
    );

    if (response?.statusCode === 200) {
      yield put(getAllDeviceListByIdResponse(response));
    } else {
      console.error("API Error:", response);
      yield put(getAllDeviceListByIdResponse(response)); // Handle all errors in one place
    }
  } catch (error) {
    console.error("API Call Failed:", error?.response?.data || error?.message || error);
    yield put(getAllDeviceListByIdResponse({ error: "Unexpected error occurred" }));
  }
}

function* getDeviceApproved({ payload: DeviceApproved }) {
  try {
    const response = yield call(
      Service.commonFetch,
      "/device/deviceApprove",
      "POST",
      DeviceApproved,
      true
    );

    // const response = yield call(
      
    //   "http://localhost:8000/api/v1/device/deviceApprove",
    //   "POST",
    //   DeviceApproved,
    //   true
    // );

    yield put(getDeviceApprovedResponse(response));

    console.log(DeviceApproved, "DeviceApproved");
  } catch (error) {
    console.log(error);
  }
}
function* getDeviceListBySerialNumber({ payload: deviceSrialNumber }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/device/getUserDeviceByDeviceSerialNum?deviceserialnumber=${deviceSrialNumber}`,
      "GET",
      null,
      true
    );

    yield put(getDeviceListBySerialNumberResponse(response));

    // console.error(response)
  } catch (error) {
    console.log(error);
  }
}

function* getDeviceDataByDeviceId({ payload }) {
  try {
    // Ensure payload is properly formatted
    const deviceId = typeof payload === "object" ? payload.deviceId : payload;

    if (!deviceId) {
      throw new Error("Invalid deviceId: Payload is missing or incorrect");
    }

    const response = yield call(
      Service.commonFetch,
      `/device/getDeviceDataByDeviceId?deviceid=${encodeURIComponent(deviceId)}`,
      "GET",
      null,
      true
    );

    yield put(getDeviceDataByDeviceIDResponse(response));
  } catch (error) {
    console.error("API Call Failed:", error?.response?.data || error?.message || error);
    yield put(getDeviceDataByDeviceIDResponse({ error: "Failed to fetch device data" }));
  }
}


function* getDeviceRejected({ payload: DeviceRejected }) {
  try {
    const response = yield call(
      Service.commonFetch,
      "/device/deviceReject",
      "POST",
      DeviceRejected,
      true
    );

    yield put(getDeviceRejectedResponse(response));
  } catch (error) {
    console.log(error);
  }
}

function* deviceDelete({ payload: DeviceDelete }) {
  try {
    const requestData = {
      deviceid: DeviceDelete,
    };
    const response = yield call(
      Service.commonFetch,
      `/device/deleteUserDeviceByDeviceId`,
      "POST",
      requestData,
      true
    );

    yield put(getDeviceDeleteResponse(response));
  } catch (error) {
    console.log(error);
  }
}


function* getForcostDevicedata({ payload: forcostDeviceDataId }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/device/forecast?userid=${forcostDeviceDataId.userid}&deviceid=${forcostDeviceDataId.deviceid}&option=${forcostDeviceDataId.option}&noOfPeriods=${forcostDeviceDataId.noOfPeriods}`,
      "GET",
      null,
      true
    );

    yield put(getForcostDeviceDataResponse(response));

  } catch (error) {
    console.log(error);
  }
}

function* getUseageDevicedata({ payload: useageDeviceDataId }) {
  
  try {
    const response = yield call(
      Service.commonFetch,
      `/device/waterLevelUsage?deviceid=${useageDeviceDataId.deviceid}&userid=${useageDeviceDataId.userid}&option=${useageDeviceDataId.option}&noOfPeriods=${useageDeviceDataId.noOfPeriods}`,
      "GET",
      null,
      true
    );

    yield put(getUseageDeviceDataResponse(response));

  } catch (error) {
    console.log(error);
  }
}


function* deviceList() {
  // yield takeEvery(GET_ALL_DEVICE_DATA, getDeviceList);
  yield takeEvery(GET_DEVICE_BY_ID, getDeviceListUserById);
  yield takeEvery(GET_DEVICE_APPROVED, getDeviceApproved);
  yield takeEvery(
    GET_DEVICED_DATA_BY_SERIAL_NUMBER,
    getDeviceListBySerialNumber
  );
  yield takeEvery(UPDATE_DEVICE_BY_ID, updateDeviceDataByDeviceId);

  yield takeEvery(GET_DEVICE_REJECTED, getDeviceRejected);
  yield takeEvery(DELETE_DEVICE, deviceDelete);
  yield takeEvery(GET_DEVICE_DATA_BY_DEVICE_ID, getDeviceDataByDeviceId);
  yield takeEvery(GET_FORCOST_DEVICE_DATA, getForcostDevicedata);
  yield takeEvery(GET_USUAGE_DEVICE_DATA, getUseageDevicedata);


}

export default deviceList;
