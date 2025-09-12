import {
    GET_DEVICE_BY_ID,
    GET_DEVICE_BY_ID_RESPONSE,
    GET_DEVICED_DATA_BY_SERIAL_NUMBER,
    GET_DEVICED_DATA_BY_SERIAL_NUMBER_RESPONSE,
    GET_DEVICE_APPROVED ,
    GET_DEVICE_APPROVED_RESPONSE,
    CLEAR_DEVICE_APPROVED,
    GET_DEVICE_REJECTED,
    GET_DEVICE_REJECTED_RESPONSE,
    DELETE_DEVICE,
    DELETE_DEVICE_RESPONSE,
    GET_DEVICE_DATA_BY_DEVICE_ID,
    GET_DEVICE_DATA_BY_DEVICE_ID_RESPONSE,
    GET_FORCOST_DEVICE_DATA,
    GET_FORCOST_DEVICE_DATA_RESPONSE,
    GET_USUAGE_DEVICE_DATA,
    GET_USUAGE_DEVICE_DATA_RESPONSE,
    UPDATE_DEVICE_BY_ID,
    
    UPDATE_DEVICE_BY_ID_RESPONSE
} from "./ActionType.js";

export const getAllDeviceListById = (deviceId) => ({
    type: GET_DEVICE_BY_ID,
    payload: deviceId,
});

export const getAllDeviceListByIdResponse = (deviceInfo) => ({
    type: GET_DEVICE_BY_ID_RESPONSE,
    payload: deviceInfo,
});

export const getDeviceApproved = (DeviceApproved) => ({
    type: GET_DEVICE_APPROVED,
    payload: DeviceApproved,
});

export const getDeviceApprovedResponse = (DeviceApprovedResponse) => ({
    type: GET_DEVICE_APPROVED_RESPONSE,
    payload: DeviceApprovedResponse,
});

export const clearDeviceApproved = () => ({
    type: CLEAR_DEVICE_APPROVED,
  });

  
export const getDeviceListBySerialNumber = (deviceSrialNumber) => ({
    type: GET_DEVICED_DATA_BY_SERIAL_NUMBER,
    payload: deviceSrialNumber,
});

export const getDeviceListBySerialNumberResponse = (deviceSerialNNumberInfo) => ({
    type: GET_DEVICED_DATA_BY_SERIAL_NUMBER_RESPONSE,
    payload: deviceSerialNNumberInfo,
});

export const getDeviceRejected = (DeviceRejected) => ({
    type: GET_DEVICE_REJECTED,
    payload: DeviceRejected,
});

export const getDeviceRejectedResponse = (DeviceRejectedResponse) => ({
    type: GET_DEVICE_REJECTED_RESPONSE,
    payload: DeviceRejectedResponse,
});

// In your actions.js or the respective action file
export const clearDeviceRejected = () => ({
    type: 'CLEAR_DEVICE_REJECTED',
  });

  
  
export const getDeviceDelete = (DeviceDelete) => ({
    type: DELETE_DEVICE,
    payload: DeviceDelete,
});

export const getDeviceDeleteResponse = (DeviceDeleteResponse) => ({
    type: DELETE_DEVICE_RESPONSE,
    payload: DeviceDeleteResponse,
});

export const getDeviceDataByDeviceID = (DeviceDataByDeviceId) => ({
    type: GET_DEVICE_DATA_BY_DEVICE_ID,
    payload: DeviceDataByDeviceId,
});

export const getDeviceDataByDeviceIDResponse = (DeviceDataByDeviceIdResponse) => ({
    type: GET_DEVICE_DATA_BY_DEVICE_ID_RESPONSE,
    payload: DeviceDataByDeviceIdResponse,
});
export const getForcostDeviceData = (forcostDeviceDataId) => ({
    type: GET_FORCOST_DEVICE_DATA,
    payload : forcostDeviceDataId,
})
export const getForcostDeviceDataResponse = (forcostDeviceData) => ({
    type: GET_FORCOST_DEVICE_DATA_RESPONSE,
    payload : forcostDeviceData,
})
export const getUseageDeviceData = (useageDeviceDataId) => ({
    type: GET_USUAGE_DEVICE_DATA,
    payload : useageDeviceDataId,
})
export const getUseageDeviceDataResponse = (useageDeviceData) => ({
    type: GET_USUAGE_DEVICE_DATA_RESPONSE,
    payload : useageDeviceData,
})
export const updateDeviceById = (deviceData) => ({
    type: UPDATE_DEVICE_BY_ID,
    payload: deviceData,
});
export const updateDeviceByIdResponse = (updatedDeviceData) => ({
    type: UPDATE_DEVICE_BY_ID_RESPONSE,
    payload: updatedDeviceData,
    
});
