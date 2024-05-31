console.log("registration init...");

//class WebPush {
  function register() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register("/public/serviceworker.js")
        .then(function (reg) {
          console.log("Service worker change, registered the service worker");

          // When serviceWorker is supported, installed, and activated,
          // subscribe the pushManager property with the vapidPublicKey
          // navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
          //   serviceWorkerRegistration.pushManager
          //     .subscribe({
          //       userVisibleOnly: true,
          //       applicationServerKey: window.vapidPublicKey
          //     });
          // });

        });
    }

    // Otherwise, no push notifications :(
    else {
      console.error("Service worker is not supported in this browser");
    }
  }
//}

//new WebPush().register();

register();

//export default WebPush;
