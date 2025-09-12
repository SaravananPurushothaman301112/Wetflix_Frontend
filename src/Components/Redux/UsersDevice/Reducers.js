import {GET_ALL_DEVICES_RESPONSE} from './ActionTypes'

const initialState = {
    error:"",
    deviceResponse:""
}

const Device = (device=initialState, action) => {
    switch(action.type){
        case GET_ALL_DEVICES_RESPONSE:
            device = {
                ...device,
                deviceResponse : action.payload
            };
            break;
            default:
                device = {...device};
                break;
    }
    return device
}

export default Device