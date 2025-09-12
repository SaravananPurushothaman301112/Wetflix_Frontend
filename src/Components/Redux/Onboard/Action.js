import { GET_USERS_ONBOARDED } from "./ActionTypes";
import { GET_USERS_ONBOARDED_REPONSE } from "./ActionTypes";

export const getUsersOnboard = (getUsersOnboard ) => ({
    type:GET_USERS_ONBOARDED,
    payload:getUsersOnboard 
})

export const getUsersOnboardResponse = (getUsersOnboardResponse ) => ({
    type:GET_USERS_ONBOARDED_REPONSE,
    payload:getUsersOnboardResponse 
})