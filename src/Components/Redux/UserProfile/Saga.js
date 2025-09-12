import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {  GET_USER_DETAILS, UPDATE_USER_PROFILE_DETAILS } from "./ActionTypes";
import { getUsetDetailsResponse, updateUserProfileDetailsResponse } from "./Action";
import { Service } from "../../screens/Services/Helper.js"

function* getUserProfile({ payload: getUserDetailsInfo }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/userauth/getUserById?userid=${getUserDetailsInfo}`,
      "GET",
      null,
      true,

    );
    yield put(getUsetDetailsResponse(response));
    console.log(response)
  } catch (error) {

  }
}

function* UpdateUserProfileDetails({payload: UpdateUserProfileDetailsx}) {
  try {
    const response = yield call (
        Service.commonFetch,
        "/userauth/updateProfileImage",
        "POST",
        UpdateUserProfileDetailsx,
        true,
       
      
        
        
    );
    yield put(updateUserProfileDetailsResponse(response))
  } catch (error){
    console.log(error);

  }
}

function* UserProfile() {
  yield takeEvery(GET_USER_DETAILS, getUserProfile);
  yield takeEvery(UPDATE_USER_PROFILE_DETAILS, UpdateUserProfileDetails);
}

export default UserProfile;
