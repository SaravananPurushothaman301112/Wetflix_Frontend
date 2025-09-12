import {GET_ALL_MAPS_RESPONSE} from './ActionTypes'
import {GET_ALL_MAPS} from './ActionTypes'

export const getAllMaps = (getAllMaps ) => ({
    type:GET_ALL_MAPS,
    payload:getAllMaps 
})

export const getAllMapsResponse = (getAllMapsResponse ) => ({
    type:GET_ALL_MAPS_RESPONSE,
    payload:getAllMapsResponse
})