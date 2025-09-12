import React, { useEffect, useState } from "react";
import Styles from "./Index.module.css";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ReactComponent as ExportIcon } from "../../../assets/SvgIcons/ExportIcon.svg";
import { ReactComponent as MyTankFillIcon } from "../../../assets/SvgIcons/MyTankFillIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification } from "../../../Redux/Actions";

const NotificationComponent = () => {
    const dispatch = useDispatch();
    const notificationList = useSelector((notification) => notification.Notification.getNotificationSuccessfull?.data || []);
    
    console.log("notificationList:", notificationList);

    const [age, setAge] = useState(10);
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const authUser = JSON.parse(localStorage.getItem("auth"));
    console.log("authUser ID:", authUser.userId);

    useEffect(() => {
        if (authUser?.userId) {
            dispatch(getAllNotification(authUser.userId));
        }
    }, [authUser.userId, dispatch]);

    return (
        <div className={Styles.NotificationComponentMainContainer}>
            <div className={Styles.NotificationComponentHeaderContent}>
                <p className={Styles.NotificationComponentHeaderContentText}>My alerts and notifications</p>
                <div className={Styles.NotificationComponentHeaderExportContainer}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            onChange={handleChange}
                            className={Styles.NotificationComponentHeaderExportContainerSelect}
                        >
                            <MenuItem value={10}>last 30 days</MenuItem>
                            <MenuItem value={20}>last month</MenuItem>
                            <MenuItem value={30}>last 6 months</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <button className={Styles.NotificationComponentExportButton}>
                        <ExportIcon /> Export events
                    </button> */}
                </div>
            </div>

            <div className={Styles.NotificationComponentCartContainer}>
                {notificationList.map((notification, index) => (
                    <div key={notification._id || index} className={Styles.NotificationComponentNotificationCart}>
                        {/* <p className={Styles.NotificationComponentCartContainerDate}>
                            {new Date(notification.createddate).toDateString()}
                        </p> */}
                        <div className={Styles.NotificationComponentNotificationDetails}>
                            <div className={Styles.NotificationComponentNotificationDetailsHeaderContent}>
                                <p className={Styles.NotificationComponentNotificationDetailsHeaderContentMyTank}>
                                    {notification.deviceInfo?.devicename || 'My Tank'}
                                </p>
                                <p className={Styles.NotificationComponentNotificationDetailsHeaderContentMyTankLevel}>
                                    {notification.message}
                                </p>
                                <MyTankFillIcon />
                            </div>
                            <p className={Styles.NotificationComponentNotificationDetailsDescription}>
                                {notification.message}
                            </p>
                        </div>
                        <p className={Styles.NotificationComponentNotificationCartTime}>
                            {new Date(notification.createddate).toLocaleTimeString()}, {new Date(notification.createddate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationComponent;
