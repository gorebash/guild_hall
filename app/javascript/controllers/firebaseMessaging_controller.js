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
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        getToken(this.#messaging, { vapidKey: window.vapidPublicKey })
          .then(async (token) => {
            if (token) {
              console.log("token retrieved ", token);
              const data = await fetch("/push_subscribers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token }),
              }).then((r) => r.json());
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one.",
              );
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            // ...
          });
      }
    });
  }

  listen() {
    onMessage(this.#messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
  }
}
