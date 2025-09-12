import { GET_USER_PLAN } from "./ActionTypes";
import { GET_USER_PLAN_RESPONSE } from "./ActionTypes";

export const getUserPlan = (getUserPlan) => ({
    type:GET_USER_PLAN,
    payload:getUserPlan
})

export const getUserPlanResponse = (getUserPlanResponse) => ({
    type:GET_USER_PLAN_RESPONSE,
    payload:getUserPlanResponse
})