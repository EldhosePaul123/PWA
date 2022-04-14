
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("static").then(async (cache) => {
    console.log("Service Worker cache");
    return cache.addAll(["./","./src/index.html", "./images/icon.png", "./images/offline.svg", 
    "./images/IMG_6574.JPG","./images/maskable_icon.png","./images/twitter-sign.png","./images/instagram.png","src/style.css"]);
  }));
  console.log("Service Worker installed...");
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open("static")
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
        }
      })
  );
});          

/*
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activate");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            console.log("Service Worker: Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
*/