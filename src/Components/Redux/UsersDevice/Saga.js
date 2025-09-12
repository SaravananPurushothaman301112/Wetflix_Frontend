import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_ALL_DEVICES } from "./ActionTypes";
import { getAllDevicesResponse } from "./Action";
import { Service } from "../../screens/Services/Helper.js";

function* deviceData () {
    try{
        const response = yield call(
            Service.commonFetch,
            "/device/getAllUserDevice",
            "GET",
            null,
            true
        );
        console.log(response, "response");

        yield put(getAllDevicesResponse(response))

    }catch(error){
    console.log(error);
}
}

function* devices () {
    yield takeEvery(GET_ALL_DEVICES,deviceData)
}
export default devices