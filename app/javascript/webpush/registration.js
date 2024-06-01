console.log("registration init...");

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/serviceworker.js", { scope: "./" })
    .then(function (reg) {
      console.log("[Companion]", "Service worker registered!");
      onReady();
    })
    .catch(function (error) {
      console.log(
        "[Companion]",
        "Rails Service worker registration failed: " + error,
      );
    });
} else {
  console.error("Service worker is not supported in this browser");
}

// make this less global...
function onReady() {
  // When serviceWorker is supported, installed, and activated,
  // subscribe the pushManager property with the vapidPublicKey
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: window.vapidPublicKey,
    });
  });
}

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
