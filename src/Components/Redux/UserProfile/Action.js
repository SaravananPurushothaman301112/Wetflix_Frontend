import { GET_USER_DETAILS } from "./ActionTypes";
import { GET_USER_DETAILS_RESPONSE } from "./ActionTypes";
import { UPDATE_USER_PROFILE_DETAILS } from "./ActionTypes";
import { UPDATE_USER_PROFILE_DETAILS_RESPONSE } from "./ActionTypes";


export const getUsetDetails= (getUserDetailsInfo) => ({
  type: GET_USER_DETAILS,
  payload: getUserDetailsInfo,
});

export const getUsetDetailsResponse = (getUserDetailsResponse) => ({
  type: GET_USER_DETAILS_RESPONSE,
  payload: getUserDetailsResponse,
});

export const updateUserProfileDetails = (UpdateUserProfileDetails) => ({
  type: UPDATE_USER_PROFILE_DETAILS,
  payload: UpdateUserProfileDetails,
});

export const updateUserProfileDetailsResponse = (UpdateUserProfileResponse) => ({
  type: UPDATE_USER_PROFILE_DETAILS_RESPONSE,
  payload: UpdateUserProfileResponse,
});

