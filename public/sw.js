//install service worker
self.addEventListener("install", event => {
    console.log("service worker has been installed");
})

//listen for service worker activate
self.addEventListener("activate", event => {
    console.log("service worker has been activated")
})

//fetch events
self.addEventListener("fetch", event => {
    console.log("found a fetch event", event);
});
