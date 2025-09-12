import {GET_DEVICE_BY_ID_RESPONSE,
    GET_DEVICE_APPROVED_RESPONSE,
    GET_DEVICED_DATA_BY_SERIAL_NUMBER_RESPONSE,
    GET_DEVICE_REJECTED_RESPONSE,
    CLEAR_DEVICE_REJECTED,
    DELETE_DEVICE_RESPONSE,
    GET_DEVICE_DATA_BY_DEVICE_ID_RESPONSE,
    GET_FORCOST_DEVICE_DATA_RESPONSE,
    GET_USUAGE_DEVICE_DATA_RESPONSE,
    UPDATE_DEVICE_BY_ID_RESPONSE,
    CLEAR_DEVICE_APPROVED
} from "./ActionType"

const initialState = {
    deviceDetails: "",
    getDeviceApproved:"",
    getDeviceSerialNumber:"",
    getDeviceRejected:"",
    deleteDevice:"",
    deviceDataByDeviceId:"",
    getForcostDeviceData:"",
    getUseageDeviceData:"",
}

const DeviceList = (device = initialState, action) => {

    switch (action.type) {
        case GET_DEVICE_BY_ID_RESPONSE:
            device = {
                ...device,
                deviceDetails: action.payload
            }                           
            break;
            case GET_DEVICE_APPROVED_RESPONSE:
            device = {
                ...device,
                getDeviceApproved: action.payload
            }
            break;
            case CLEAR_DEVICE_APPROVED:
  device = {
    ...device,
    getDeviceApproved: null, // or null if that's what you prefer
  };
  break;

            case GET_DEVICED_DATA_BY_SERIAL_NUMBER_RESPONSE:
            device = {
                ...device,
                getDeviceSerialNumber: action.payload
            }
            break;
            case GET_DEVICE_REJECTED_RESPONSE:
                device = {
                    ...device,
                    getDeviceRejected: action.payload
                }
            break;
            case CLEAR_DEVICE_REJECTED:
            device = {
                ...device,
                getDeviceRejected: null // Clear the rejected device data
            }
            break;
            
            case DELETE_DEVICE_RESPONSE:
                device = {
                    ...device,
                    deleteDevice: action.payload
                }
            break;
            case GET_DEVICE_DATA_BY_DEVICE_ID_RESPONSE:
                device = {
                    ...device,
                    deviceDataByDeviceId: action.payload
                }
            break;
            case GET_FORCOST_DEVICE_DATA_RESPONSE:
                device = {
                    ...device,
                    getForcostDeviceData: action.payload
                }
            break;
            case GET_USUAGE_DEVICE_DATA_RESPONSE:
                device = {
                    ...device,
                    getUseageDeviceData: action.payload
                }
            break;
            case UPDATE_DEVICE_BY_ID_RESPONSE:
    console.log("Reducer updating state with:", action.payload);
    return {
        ...device,
        deviceDetails: Array.isArray(device.deviceDetails)
            ? device.deviceDetails.map(dev =>
                dev.deviceid === action.payload.deviceid
                    ? { ...dev, ...action.payload } 
                    : dev
            )
            : [],
    };


             


                
            

//             case UPDATE_DEVICE_BY_ID_RESPONSE:
//   device = {
//     ...device,
//     deviceDetails: device.deviceDetails?.data?.map(dev =>
//       dev.deviceid === action.payload?.deviceid ? action.payload : dev
//     ) || [],
//   };
//   break;

    
            default:
                device = { ...device };
                break;
        }
        return device;
    
    

}

export default DeviceList