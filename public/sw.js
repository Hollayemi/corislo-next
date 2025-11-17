// public/sw.js - Service Worker for Push Notifications

const CACHE_NAME = 'corisio-v1';
const API_URL = self.location.origin;

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
        '/icons/badge.png'
      ]);
    })
  );

  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Push event - Handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);

  if (!event.data) {
    console.log('Push event has no data');
    return;
  }

  let notificationData;

  try {
    notificationData = event.data.json();
  } catch (error) {
    console.error('Error parsing notification data:', error);
    notificationData = {
      title: 'New Notification',
      body: event.data.text()
    };
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon || '/icons/icon-192x192.png',
    badge: notificationData.badge || '/icons/badge.png',
    image: notificationData.image,
    tag: notificationData.tag || 'notification',
    data: notificationData.data || {},
    actions: notificationData.actions || [
      { action: 'view', title: 'View', icon: '/icons/view.png' },
      { action: 'dismiss', title: 'Dismiss', icon: '/icons/close.png' }
    ],
    requireInteraction: notificationData.requireInteraction || false,
    silent: notificationData.silent || false,
    vibrate: notificationData.vibrate || [200, 100, 200],
    timestamp: notificationData.timestamp || Date.now(),
    renotify: notificationData.renotify || true
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);

  event.notification.close();

  const notificationData = event.notification.data;
  const action = event.action;

  // Handle different actions
  if (action === 'dismiss') {
    return;
  }

  // Determine URL based on notification type
  let targetUrl = notificationData.url || '/';

  if (notificationData.type === 'order') {
    targetUrl = `/orders/${notificationData.typeId?.orderId || ''}`;
  } else if (notificationData.type === 'message') {
    targetUrl = `/messages/${notificationData.typeId?.conversationId || ''}`;
  } else if (notificationData.type === 'promotion') {
    targetUrl = `/products/${notificationData.typeId?.productId || ''}`;
  }

  // Track notification click
  if (notificationData.notificationId) {
    fetch(`${API_URL}/api/v1/notifications/${notificationData.notificationId}/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).catch(err => console.error('Failed to track click:', err));
  }

  // Open or focus the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already an open window
        for (const client of clientList) {
          if (client.url.includes(API_URL) && 'focus' in client) {
            client.focus();
            client.postMessage({
              type: 'NOTIFICATION_CLICKED',
              url: targetUrl,
              data: notificationData
            });
            return;
          }
        }

        // Open new window if no matching window found
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

// Background sync for offline notifications
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);

  if (event.tag === 'sync-notifications') {
    event.waitUntil(syncNotifications());
  }
});

// Sync notifications when back online
async function syncNotifications() {
  try {
    const response = await fetch(`${API_URL}/api/v1/notifications?limit=20`, {
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Synced notifications:', data);

      // Send message to all clients
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'NOTIFICATIONS_SYNCED',
          data
        });
      });
    }
  } catch (error) {
    console.error('Error syncing notifications:', error);
  }
}

// Message event - Handle messages from the app
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-notifications') {
    event.waitUntil(syncNotifications());
  }
});

// Helper function to get badge count
async function updateBadgeCount() {
  try {
    const response = await fetch(`${API_URL}/api/v1/notifications/unread-count`, {
      credentials: 'include'
    });

    if (response.ok) {
      const { count } = await response.json();

      if ('setAppBadge' in navigator) {
        if (count > 0) {
          navigator.setAppBadge(count);
        } else {
          navigator.clearAppBadge();
        }
      }
    }
  } catch (error) {
    console.error('Error updating badge:', error);
  }
}

console.log('Service Worker loaded');