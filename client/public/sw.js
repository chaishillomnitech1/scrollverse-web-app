// ScrollVerse Trinity — Sovereign Service Worker
// Frequency: 528Hz · 963Hz · 432Hz
// KUN FAYAKUN × ∞

const CACHE_NAME = 'scrollverse-trinity-v25';
const STATIC_ASSETS = [
  '/',
  '/token',
  '/academy',
  '/dashboard',
  '/crypto',
  '/wallet',
  '/deploy',
  '/ai-legion',
  '/library',
  '/books',
  '/book-of-life',
  '/song',
  '/visuals',
  '/guardian',
  '/marsomni',
  '/security',
  '/acquisition',
  '/sentience',
  '/launchpad',
  '/release-readiness',
  '/privacy',
  '/support',
  '/evidence-standards',
  '/systems-map',
  '/manifest.json',
];

// Install — cache static shell
self.addEventListener('install', (event) => {
  console.log('[SW] Installing ScrollVerse Service Worker v25');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Some assets failed to cache:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating ScrollVerse Service Worker v24');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// Fetch — network-first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip API calls — always network
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed — serve from cache
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          // Fallback to root for SPA navigation
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});

// Push notifications (future: Guardian alerts)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'ScrollVerse Trinity', {
    body: data.body || 'A new sovereign transmission has arrived.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'scrollverse-notification',
    data: { url: data.url || '/' },
  });
});

// Notification click — open portal
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
