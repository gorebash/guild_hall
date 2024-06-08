import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  initialize() {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Permission to receive notifications has been granted");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(this.requestToken);
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

    // todo: add a fetch request to get the public key.

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
