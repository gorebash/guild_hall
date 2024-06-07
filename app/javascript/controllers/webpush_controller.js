import { Controller } from "@hotwired/stimulus"
import * as bootstrap from "bootstrap"

export default class extends Controller {
  //static targets = [ "source" ];

  initialize() {

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      console.log("Permission to receive notifications has been granted");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          console.log("Permission to receive notifications has been granted");
        }
      });
    }
  }

  register() {
    console.log("Requesting permission...");
    
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register("/serviceworker.js", { scope: "./" })
        .then(this.onPermissionGranted)
        .catch(function (error) {
          console.log(
            "[Companion]",
            "Service worker registration failed: " + error,
          );
        });
    } else {
      console.error("Service worker is not supported in this browser");
    }
  }

  onPermissionGranted() {

    console.log("[Companion]", "Service worker registered!");

    // When serviceWorker is supported, installed, and activated,
    // subscribe the pushManager property with the vapidPublicKey
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: window.vapidPublicKey,
        })
        .then(async function (sub) {
          const data = await fetch("/push_subscribers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sub),
          }).then((r) => r.json());
        });
    });
  }
}