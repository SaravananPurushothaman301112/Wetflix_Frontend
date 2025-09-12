import { GET_REVENUE_RESPONSE } from "./ActionTypes";

const initialState = {
    error:"",
    revenueSuccess:""
}

const Revenue = (state=initialState,action) => {
   switch(action.type){
    case GET_REVENUE_RESPONSE:
        state={
            ...state,
            revenueSuccess:action.payload
        };
        break;
        default:{
            state={...state}
        };
        break;
   }
   return state
}

export default Revenue