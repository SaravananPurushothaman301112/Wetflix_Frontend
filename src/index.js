import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import LandingPage from "./Components/screens/landingpage/LandingPage"
import reportWebVitals from './reportWebVitals';

import "./Components/assets/Global.css";
import Login from "./Components/screens/Authendication/Login/Login.js";
import AppProvider from './Components/screens/AppProvider/AppProvider.js';
import { Provider } from 'react-redux';
import store from "./Components/Redux/Store.js";
import HomePage from './Components/screens/pages/homePage/HomePage.js';
import DeviceManagement from './Components/screens/pages/DeviceManagement/DeviceManagement.jsx';
import BookTechnician from './Components/screens/pages/BookTechnician/BookTechnician.jsx';
import NotificationComponent from './Components/screens/pages/notification/Notification.js';
import PaymentPage from './Components/screens/pages/Payment/PaymentPage.js';
import BookingDetails from './Components/screens/pages/bookingDetails/BookingDetails.jsx';
import ChangePlan from './Components/screens/pages/changeplan/ChangePlan.js';
import QuickSetupGuide from './Components/screens/pages/QuickSetupGuide/QuickSetupGuide.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Components/screens/Authendication/Registration/Registration.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ForgotPassword from './Components/screens/Authendication/ForgotPassword/ForgotPassword.js';
import PrivateRoutes from './Components/screens/landingpage/PrivateRoutes.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AdminLandPage from './Components/screens/AdminScreens/AdminLandingPage/AdminLandPage.js';
import UsersAndDevicesPage from './Components/screens/AdminScreens/AdminLandingPage/UsersAndDevicesPage.js';
import AdvertisementPaymentPage from './Components/screens/AdminScreens/AdminLandingPage/Advertisement/AdvertisementPaymentPage.js';
import PaymentHistory from './Components/screens/AdminScreens/PaymentHistory/PaymentHistory.js';
import MapAndGeolocation from './Components/screens/AdminScreens/AdminLandingPage/MapAndGeo/MapAndGeolocation.js';
import AdminUserProfile from './Components/screens/AdminScreens/AdminLandingPage/AdminUserProfile/AdminUserProfile.js';
import PopUp from './Components/screens/PopUpPage/PopUp.js';
import CustomerBooking from './Components/screens/AdminScreens/AdminLandingPage/CustomerBooking/CustomerBooking.js';
// import Notification from './Components/screens/TestNotification/Notification.js';
// import App from './App.js';
import NotificationProvider from './Components/screens/TestNotification/NotificationProvider.js';
// import firebase from "./../public/firebase-messaging-sw.js"


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js') // Ensure this path is correct
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
}




const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
      <ToastContainer />
        <Provider store={store}>
          <NotificationProvider>
          <Routes >
          {/* <Route path="/s" element={<App />} /> */}
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Registration />} />
            <Route path='/forgot_password' element={<ForgotPassword />} />
            <Route element={<PrivateRoutes/>}>
            
            <Route path='/user_dashboard' element={<HomePage />} />
            <Route path="/Device_Management" element={<DeviceManagement />} />
            {/* <Route path="/edit-device/:deviceId" element={<Editdevice />} /> */}
            {/* <Route path="/edit-device/:deviceId" element={<Editdevice />} /> */}
  
                    <Route path='/bookings' element={<BookTechnician />} />
            <Route path='/notification_component' element={<NotificationComponent />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/booking_details' element={<BookingDetails />} />
            <Route path='/change_plan' element={<ChangePlan />} />
            <Route path='/quick_setup_guide' element={<QuickSetupGuide />} />
            <Route path="/pop_up_accept" element={<PopUp/>}/>
            <Route path='/admin_dashboard' element={<AdminLandPage />} />
            <Route path='/users_and_devices' element={<UsersAndDevicesPage/>}/>
            <Route path='/advertisement_payment' element={<AdvertisementPaymentPage/>}/>
            <Route path="/payment_history" element={<PaymentHistory/>}/>
            <Route path="/map_and_geolocation" element={<MapAndGeolocation/>}/>
            <Route path="/profile" element={<AdminUserProfile/>}/>
            <Route path="/customer_booking" element={<CustomerBooking/>}/>
            {/* <Route path='/push_notification' element={<Notification/>} /> */}

            </Route>
            
          </Routes>
          </NotificationProvider>
        </Provider>
      </BrowserRouter>
    </AppProvider>
    
  </React.StrictMode>,

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
