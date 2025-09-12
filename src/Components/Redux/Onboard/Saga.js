import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_USERS_ONBOARDED } from "./ActionTypes.js";
import { getUsersOnboardResponse } from "./Action.js";
import { Service } from "../../screens/Services/Helper.js"
import { useDispatch } from "react-redux";

function* getUSers ({  payload:getUsersOnboard }) {
    try{
        const response = yield call(
            Service.commonFetch,
            `/device/usersOnboarded?option=${getUsersOnboard}`,
            "GET",
            null,
            true
        );
        yield put(getUsersOnboardResponse(response));
        console.log(response)
    }catch(error){

    }
}
    function* getUsersBoard ( ) {
        yield takeEvery(GET_USERS_ONBOARDED,getUSers)
    }
    export  default getUsersBoard
