var dataBase = 'web-challenge',
    scriptURL = '/polyfill.js',
    cacheURL = [
      '/',
      '/css/main.css',
      '/css/fonts/Fixedsys500c.eot',
      '/css/fonts/Fixedsys500c.svg',
      '/css/fonts/Fixedsys500c.ttf',
      '/css/fonts/Fixedsys500c.woff',
      '/img/logo.png',
      '/js/config.js',
      '/js/main.js',
      '/js/templates.js',
      '/js/collections/comment.collection.js',
      '/js/collections/message.collection.js',
      '/js/collections/navigation.collection.js',
      '/js/models/comment.model.js',
      '/js/models/message.model.js',
      '/js/models/navigation.item.model.js',
      '/js/routers/router.js',
      '/js/views/app.view.js',
      '/js/views/comment.view.js',
      '/js/views/comments.view.js',
      '/js/views/message.view.js',
      '/js/views/messages.view.js',
      '/js/views/navigation.view.js',
      '/js/views/navigation.item.view.js',
      '/lib/backbone/backbone.js',
      '/lib/jade/runtime.js',
      '/lib/jquery/dist/jquery.min.js',
      '/lib/underscore/underscore-min.js',
      '/lib/requirejs/require.js'
    ];


// Chrome's currently missing some useful cache methods,
// this polyfill adds them.
importScripts(scriptURL);

// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.
self.addEventListener('install', function(event) {
  // We pass a promise to event.waitUntil to signal how 
  // long install takes, and if it failed
  event.waitUntil(
      // We open a cache…
      caches.open(dataBase).then(function(cache) {
        // And add resources to it
        return cache.addAll(cacheURL);
      })
  );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  event.respondWith(
      // First we look for something in the caches that
      // matches the request
      caches.match(event.request).then(function(response) {
        // If we get something, we return it, otherwise
        // it's null, and we'll pass the request to
        // fetch, which will use the network.
        return response || fetch(event.request);
      })
  );
});
