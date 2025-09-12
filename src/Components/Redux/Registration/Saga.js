import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {  REGISTRATION,} from "./ActionTypes";
import {  userCreateResponse, } from "./Action";
import { Service } from "../../screens/Services/Helper.js"
import { useDispatch } from "react-redux";
import { FunnelChart } from "recharts";
import { updateUserProfileDetails } from "../Actions.js";


function* Registration({ payload: CreateUserInfo }) {
  try {
    const response = yield call(
        Service.commonFetch,
      "/user/createUser",
      "POST",
      CreateUserInfo,
      null
    );
    yield put(userCreateResponse(response));
    console.log('response from an api', response)
    
  } catch (error) {

  }
}




function* registration() {
  yield takeEvery(REGISTRATION, Registration);
}

export default registration;
