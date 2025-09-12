import {GET_ALL_DEVICES_RESPONSE} from './ActionTypes'
import {GET_ALL_DEVICES} from './ActionTypes'

export const getAllDevices = (getAllDevices ) => ({
    type:GET_ALL_DEVICES,
    payload:getAllDevices 
})

export const getAllDevicesResponse = (getAllDevicesResponse ) => ({
    type:GET_ALL_DEVICES_RESPONSE,
    payload:getAllDevicesResponse
})