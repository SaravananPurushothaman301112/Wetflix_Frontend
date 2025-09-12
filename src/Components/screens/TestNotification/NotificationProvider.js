import React, { useEffect, useState } from 'react';
import { getToken, onMessage } from "firebase/messaging";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotification } from "../../Redux/Actions";
import { messaging } from './firebase-config';

const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fcmToken, setFcmToken] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const usermail = localStorage.getItem("email");

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setPermissionGranted(true);
          console.log("Notification permission granted.");
          await getFcmToken();
        } else {
          console.log("Notification permission denied.");
        }
      } catch (err) {
        console.error("Error requesting notification permission:", err);
      }
    };

    requestNotificationPermission();
  }, []);

  const getFcmToken = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BHag0w0ow6kVW1ZbWQvF5LzkgzBPrumUUJXE1gxCC7EFnvEpXCSkMbk2QR64qHqJv2RhG4KgkxLcHZNWi_WqExg",
      });

      if (token) {
        console.log("FCM Token:", token);
        setFcmToken(token);
      } else {
        console.log("Failed to get FCM token.");
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };

  useEffect(() => {
    if (fcmToken && usermail) {
      console.log("Dispatching notification data...");
      dispatch(
        getNotification({
          email: usermail,
          token: fcmToken,
        })
      );
    }
  }, [fcmToken, usermail, dispatch]);

  useEffect(() => {
    if (permissionGranted) {
      onMessage(messaging, (payload) => {
        console.log("Message received in foreground:", payload);

        const { title, body } = payload.notification;
        const { url } = payload.data || {}; // Extract URL for navigation

        // Show the notification
        const notification = new Notification(title, {
          body: body,
          icon: payload.notification.icon,
          data: { url: "http://localhost:3000/notification_component" }, // Attach URL for click navigation
        });

        // Handle notification click
        notification.onclick = () => {
          if (url) {
            navigate("/notification_component"); // Navigate to the target URL
          }
        };
      });
    }
  }, [permissionGranted, navigate]);

  return <>{children}</>;
};

export default NotificationProvider;
