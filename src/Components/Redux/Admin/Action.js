import {METRICS} from './ActionTypes'
import {METRICS_RESPONSE} from './ActionTypes'


export const metricsData = (metricsData) => ({
    type: METRICS,   // "Start fetching metrics"
    payload: metricsData, // Data sent with this action
});

export const metricsResponseData = (metricsResponseData) => ({
    type: METRICS_RESPONSE,   // "Received metrics response"
    payload: metricsResponseData, // Data from API response
});
//send data obj to redux