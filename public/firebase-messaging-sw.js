// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

// const firebaseConfig = {
//     apiKey: 'AIzaSyDFAa3l6A6mf1WpqlrBenvW0DFy5zJKS60',
//     authDomain: 'syahrilscom-11d75.firebaseapp.com',
//     projectId: 'syahrilscom-11d75',
//     storageBucket: 'syahrilscom-11d75.appspot.com',
//     messagingSenderId: '1047623268751',
//     appId: '1:1047623268751:web:7121762071d524921273fa',
//     measurementId: 'G-T01C47Q884',
// };

const firebaseConfig = {
    apiKey: 'AIzaSyD2RjWCxnIqLh8qQZnwQk53fbVDF9VGodA',
    authDomain: 'push-notification-crowner.firebaseapp.com',
    projectId: 'push-notification-crowner',
    storageBucket: 'push-notification-crowner.appspot.com',
    messagingSenderId: '260328961423',
    appId: '1:260328961423:web:dee0481425b6e155fac7fa',
    measurementId: 'G-73B6G0N9XY',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './logo.svg',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
