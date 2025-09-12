import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_USER_PLAN } from "./ActionTypes.js";
import { getUserPlanResponse } from "./Action.js";
import { Service } from "../../screens/Services/Helper.js"
import { useDispatch } from "react-redux";

function* getUsersPlan({payload:getUsersPlan}) {
    try{
        const response = yield call(
            Service.commonFetch,
        `/userPlanRouter/getUserPlanByUserId?userid=${getUsersPlan}`,
        "GET",
        null,
        true
        )
        yield put(getUserPlanResponse(response));
        console.log(response)
    }catch(error){

    }
}

function* userplans (){
    yield takeEvery(GET_USER_PLAN,getUsersPlan)
}
export default userplans