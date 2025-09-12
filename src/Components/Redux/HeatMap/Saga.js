import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_ALL_MAPS } from "./ActionTypes";
import { getAllMapsResponse } from "./Action";
import { Service } from "../../screens/Services/Helper.js";

function* mapData () {
    try{
        const response = yield call(
            Service.commonFetch,
            "/device/heat-map",
            "GET",
            null,
            true
        );
        console.log(response, "response");

        yield put(getAllMapsResponse(response))

    }catch(error){
    console.log(error);
}
}

function* maps () {
    yield takeEvery(GET_ALL_MAPS,mapData)
}
export default maps