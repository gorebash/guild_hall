console.log("registration init...");

class WebPush {
  register() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register("/javascript/webpush/serviceworker.js")
        .then(function (reg) {
          console.log("Service worker change, registered the service worker");
        });
    }

    // Otherwise, no push notifications :(
    else {
      console.error("Service worker is not supported in this browser");
    }
  }
}

new WebPush().register();

export default WebPush;
