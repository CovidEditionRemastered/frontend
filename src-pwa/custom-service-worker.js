import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {CacheFirst, NetworkFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);


self.skipWaiting();
self.clients.claim();

self.addEventListener('push', (e) => {
    // push event handler
    console.log(e.data.text().repeat(2));
});


registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com' ||
        url.origin === 'https://fonts.gstatic.com',
    new StaleWhileRevalidate(),
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

registerRoute(
    ({request}) => request.destination === 'script' ||
        request.destination === 'style',
    new NetworkFirst({
        cacheName: 'static-resources',
    })
);

registerRoute(
    // Cache style resources, i.e. CSS files.
    ({request}) => request.destination === 'style',
    // Use cache but update in the background.
    new StaleWhileRevalidate({
        // Use a custom cache name.
        cacheName: 'css-cache',
    })
);


registerRoute(
    // Cache image files.
    ({request}) => request.destination === 'image',
    // Use the cache if it's available.
    new StaleWhileRevalidate({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
            new ExpirationPlugin({
                // Cache only 50 images.
                maxEntries: 50,
                // Cache for a maximum of 4 week.
                maxAgeSeconds: 7 * 24 * 60 * 60 * 4,
            })
        ],
    })
);
