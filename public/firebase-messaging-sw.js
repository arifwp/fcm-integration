importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDOfopbDbRa8JzGsFaJXPwiDrNQymzcK_0",
  authDomain: "klinik-ku-khaki.firebaseapp.com",
  projectId: "klinik-ku-khaki",
  storageBucket: "klinik-ku-khaki.firebasestorage.app",
  messagingSenderId: "424366713858",
  appId: "1:424366713858:web:2d8f2edccd2fa7ad334b1b",
  measurementId: "G-6LRN3JYLPE",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification?.title || "Background Message";
  const notificationOptions = {
    body: payload.notification?.body || "New Msg",
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("push", function (event) {
  const data = event.data?.json();

  const title = data?.notification?.title || "Default Title";
  const options = {
    body: data?.notification?.body || "Default Body",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
