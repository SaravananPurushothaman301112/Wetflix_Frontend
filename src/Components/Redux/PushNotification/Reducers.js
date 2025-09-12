import { GET_NOTIFICATION_RESPONSE } from "./ActionTypes";

const initialState = {
    error:"",
    notificationSuccess:""
}

const Notify = (state=initialState,action) => {
   switch(action.type){
    case GET_NOTIFICATION_RESPONSE:
        state={
            ...state,
            notificationSuccess:action.payload
        };
        break;
        default:{
            state={...state}
        };
        break;
   }
   return state
}

export default Notify