import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Service } from "../../screens/Services/Helper.js"
import {METRICS} from './ActionTypes.js'
import { metricsResponseData} from './Action.js'

function* metricsVerify() {
    try{
        const response = yield call( //call the api by call()
            Service.commonFetch,
            "/device/metrics-summary",
            "GET",
            null,
            true
        );
        yield put(metricsResponseData(response)); //If the API call is successful, the response is sent to the reducer and Dispatches an action to store the API response.
        console.log(response)

    }catch(error){

    }
}
function* metricss(){
    yield takeEvery(METRICS,metricsVerify); // yeild is used to  pauses the function until the operation completes
}
export default metricss