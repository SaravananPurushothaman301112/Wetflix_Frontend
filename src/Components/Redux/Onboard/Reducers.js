import { GET_USERS_ONBOARDED_REPONSE } from "./ActionTypes";

const initialState = {
    error:"",
    onboardSuccessfull:""
}

const getUsersOnboarded = (state=initialState , action) => {
    switch (action.type){
        case GET_USERS_ONBOARDED_REPONSE:
            state={
                ...state,
                onboardSuccessfull:action.payload
            };
            break;
            default :
            state = {...state};
            break;
    }
    return state
}

export default getUsersOnboarded