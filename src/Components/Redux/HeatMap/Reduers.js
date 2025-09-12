import {GET_ALL_MAPS_RESPONSE} from './ActionTypes'

const initialState = {
    error:"",
    mapResponse:""
}

const Map = (map=initialState, action) => {
    switch(action.type){
        case GET_ALL_MAPS_RESPONSE:
            map = {
                ...map,
                mapResponse : action.payload
            };
            break;
            default:
                map = {...map};
                break;
    }
    return map
}

export default Map