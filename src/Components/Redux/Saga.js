import { all } from "redux-saga/effects";
import login from "./Login/Saga.js";
import deviceList from "./Device/Saga.js";
import registration from "./Registration/Saga.js";
import OTPVerification from "./OTPVerification/Saga.js";
import Subscription from "./Subscription/Saga.js";
import Notification from "./Notification/Saga.js";
import Booking from "./Booking/Saga.js";
import Payment from "./Payment/Saga.js";
import setMoreBooking from "./Setmore/Saga.js";
import metricss from "./Admin/Saga.js"
import devices from "./UsersDevice/Saga.js"
import getUsersBoard from "./Onboard/Saga.js"
import Revenues from "./Revenue/Saga.js"
import maps from "./HeatMap/Saga.js"
import UserProfile from "./UserProfile/Saga.js";
import Books from "./ViewBooking/Saga.js"
import userplans from "./UserPlan/Saga.js";
import pushnotification from "./PushNotification/Saga.js"


export default function* rootSaga() {
    yield all([
        login(),
        deviceList(),
        registration(),
        OTPVerification(),
        Subscription(),
        Notification(),
        Booking(),
        Payment(),
        setMoreBooking(),
        metricss(),
        devices(),
        getUsersBoard(),
        Revenues(),
        maps(),
        UserProfile(),
        Books(),
        userplans(),
        pushnotification()

    ])
}
