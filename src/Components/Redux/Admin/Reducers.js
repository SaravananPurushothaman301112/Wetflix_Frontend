import {METRICS_RESPONSE} from './ActionTypes'

const initialState = {
    error:"",
    matricesResponse:""
}
// A function that updates the Redux store when an action is receieved
const matrices = (state=initialState, action) => {
    switch(action.type){
        case METRICS_RESPONSE:
            state={                                                                         
                ...state,
                matricesResponse: action.payload
            };  
            break;
            default:
               state = {...state};
               break;
    }
    return state
}

export default matrices