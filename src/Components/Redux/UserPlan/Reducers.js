import { GET_USER_PLAN_RESPONSE } from "./ActionTypes";

const initialState = {
    error:"",
    userPlanSuccess:""
}

const UserPlan = (state=initialState,action) => {
   switch(action.type){
    case GET_USER_PLAN_RESPONSE:
        state={
            ...state,
            userPlanSuccess:action.payload
        };
        break;
        default:{
            state={...state}
        };
        break;
   }
   return state
}

export default UserPlan