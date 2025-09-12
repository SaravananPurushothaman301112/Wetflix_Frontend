import { GET_REVENUE } from "./ActionTypes";
import { GET_REVENUE_RESPONSE } from "./ActionTypes";

export const getRevenue = (getRevenue) => ({
    type:GET_REVENUE,
    payload:getRevenue
})

export const getRevenueResponse = (getRevenueResponse) => ({
    type:GET_REVENUE_RESPONSE,
    payload:getRevenueResponse
})