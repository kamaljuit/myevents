/**
 * Service Worker File
 */

//Setting Event Handlers

self.addEventListener("fetch", onFetch);

//Versioning variables
const version = 1;
const cacheName = `myevents-${version}`;
console.log(version);

//Global vars

var isOnline = undefined;
var isAuthenticated = undefined;
var swSelf = self;

//will handle the code after the SW has been activated

main.call(swSelf);

//---------------------- Lifecycle Methods ------------------------

//Many tasks can be done here like prefetching assets, clearing indexedDB, clearing state
//Skipping For now

//onactivate event handler

// -------------  END of Lifecycle Methods ----------------

async function main() {}

//-------------------SW Event Handler methods----------------------

//onmessage event handler

//Implementing Basic caching for offline availability

function onFetch(event) {
  event.respondWith(router(event.request));
}

async function router(request) {
  //URL method parses the req.url
  var url = new URL(request.url);

  var reqURL = url.pathname;

  var myCache = await caches.open(cacheName);

  //Only implementing the caching strategies for the URLs of our origin

  if (url.origin == location.origin) {
    //In the below condition we are checking whether we are making a request to the api.
    // are we making an API request?
    if (!/^\/api\/.+$/.test(reqURL)) {
      let fetchOptions = {
        credentials: "same-origin"
      };
      var res = await myCache.match(reqURL);
      if (res) {
        return res;
      } else {
        const res = await fetch(reqURL, fetchOptions);
        await myCache.put(reqURL, res.clone());
        return res;
      }
    }
  }
}
