import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_REVENUE } from "./ActionTypes.js";
import { getRevenueResponse } from "./Action.js";
import { Service } from "../../screens/Services/Helper.js"
import { useDispatch } from "react-redux";

function* getRevenues({payload:getRevenue}) {
    try{
        const response = yield call(
            Service.commonFetch,
        `/device/revenues?option=${getRevenue}`,
        "GET",
        null,
        true
        )
        yield put(getRevenueResponse(response));
        console.log(response)
    }catch(error){

    }
}

function* Revenues (){
    yield takeEvery(GET_REVENUE,getRevenues)
}
export default Revenues