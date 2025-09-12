importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBwJPE6_b-QqXNVKLzEUlpstMp9ks1n5Lo",
  authDomain: "wetflix-sample-app.firebaseapp.com",
  projectId: "wetflix-sample-app",
  storageBucket: "wetflix-sample-app.firebasestorage.app",
  messagingSenderId: "1090486972049",
  appId: "1:1090486972049:web:a17a024bf45ff979045930"
  
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
