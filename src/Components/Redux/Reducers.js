import { combineReducers } from "redux";
import Login from "./Login/Reducers";
import DeviceList from "./Device/Reducers";
import Registration from "./Registration/Reducers";
import OTPVerification from "./OTPVerification/Reducers";
import Subscription from "./Subscription/Reducers";
import Notification from "./Notification/Reducers";
import Booking from "./Booking/Reducers";
import GetPayment from "./Payment/Reducers";
import SetMoreBooking from "./Setmore/Reducers";
import matrices from "./Admin/Reducers";
import Device from "./UsersDevice/Reducers";
import getUsersOnboarded from "./Onboard/Reducers";
import Revenue from "./Revenue/Reducers";
import Map from "./HeatMap/Reduers";
import UserProfile from "./UserProfile/Reducers"
import ViewBooking from "./ViewBooking/Reducers"
import UserPlan from "./UserPlan/Reducers";
import Notify from "./PushNotification/Reducers"

const reducers = combineReducers({
    Login,
    DeviceList,
    Registration,
    OTPVerification,
    Subscription,
    Notification,
    Booking,
    GetPayment,
    SetMoreBooking,
    matrices,
    Device,
    getUsersOnboarded,
    Revenue,
    Map,
    UserProfile,
    ViewBooking,
    UserPlan,
    Notify
});
export default reducers;
