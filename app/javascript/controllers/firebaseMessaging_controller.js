import { Controller } from "@hotwired/stimulus";
import { initializeApp } from "@firebase/app";
import { getMessaging, onMessage, getToken } from "@firebase/messaging";

export default class extends Controller {
  #firebaseConfig = {
    apiKey: "AIzaSyBmJqQ4JUVhAt-1arUhxsZ-GdI1OzbsYkY",
    authDomain: "guild-hall-200d4.firebaseapp.com",
    projectId: "guild-hall-200d4",
    storageBucket: "guild-hall-200d4.appspot.com",
    messagingSenderId: "619066287243",
    appId: "1:619066287243:web:68de9957a156a78fc9208e",
    measurementId: "G-DJ72E9PT09",
  };

  #app;
  #messaging;

  initialize() {
    this.#app = initializeApp(this.#firebaseConfig);
    this.#messaging = getMessaging(this.#app);
    this.listen();
  }

  register() {
    let subscription = {};

    Notification.requestPermission()
      .then((permission) => this.registerSw())
      .then(() => navigator.serviceWorker.ready)
      .then((reg) => this.swReady(reg))
      .then((sub) => (subscription = sub))
      .then(() =>
        getToken(this.#messaging, { vapidKey: window.vapidPublicKey }),
      )
      .then((token) => this.savePushSubscription(subscription, token))
      .then(() => console.log("Push subscription successfully registered."))
      .then(() => this.listen())
      .catch((err) => console.log("error: ", err));
  }

  registerSw() {
    return navigator.serviceWorker.register("/serviceworker.js", {
      scope: "./",
    });
  }

  swReady(serviceWorkerRegistration) {
    return serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: window.vapidPublicKey,
    });
  }

  async savePushSubscription(sub, token) {
    return fetch("/push_subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sub: sub, token: token }),
    });
  }

  listen() {
    console.log("Listening for messages...");
    onMessage(this.#messaging, (payload) => {
      console.log("Message received. ", payload);
      alert("Firebase message received!" + payload);
    });
  }
}
