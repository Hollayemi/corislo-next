// public/js/notifications.js - Client-side notification handler

class NotificationManager {
    constructor() {
        this.socket = null;
        this.serviceWorkerRegistration = null;
        this.permissionGranted = false;
        this.unreadCount = 0;
        this.vapidPublicKey2 = "BKjE-3grH11rRppsn-wBmrXSERKLWiszSB2zXbcEXAGAfgmUN3MFCjXLSuzPOob36kS1drjxgCIZO_LXJ2dwOI4";

    }

    /**
     * Initialize notification system
     */
    async initialize(socket) {
        this.socket = socket;

        // Register service worker
        await this.registerServiceWorker();

        // Request notification permission
        await this.requestPermission();

        // Subscribe to push notifications
        if (this.permissionGranted) {
            await this.subscribeToPush();
        }

        // Setup socket listeners
        this.setupSocketListeners();

        // Load initial notifications
        this.loadNotifications();
    }

    /**
     * Register service worker
     */
    async registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            console.warn('Service Worker not supported');
            return;
        }

        try {
            this.serviceWorkerRegistration = await navigator.serviceWorker.register(
                '/sw.js',
                { scope: '/' }
            );

            console.log('Service Worker registered:', this.serviceWorkerRegistration);

            // Handle service worker updates
            this.serviceWorkerRegistration.addEventListener('updatefound', () => {
                const newWorker = this.serviceWorkerRegistration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        this.showUpdateNotification();
                    }
                });
            });

        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }

    /**
     * Request notification permission
     */
    async requestPermission() {
        if (!('Notification' in window)) {
            console.warn('Notifications not supported');
            return false;
        }

        if (Notification.permission === 'granted') {
            this.permissionGranted = true;
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            this.permissionGranted = permission === 'granted';
            return this.permissionGranted;
        }

        return false;
    }

    /**
     * Subscribe to push notifications
     */
    async subscribeToPush() {
        if (!this.serviceWorkerRegistration) {
            console.warn('Service Worker not registered');
            return;
        }

        try {
            // Check if already subscribed
            let subscription = await this.serviceWorkerRegistration.pushManager.getSubscription();

            if (!subscription) {
                // Get VAPID public key from server
                const vapidPublicKey = await this.getVapidPublicKey();

                console.log(vapidPublicKey)

                // Subscribe
                subscription = await this.serviceWorkerRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
                });

                console.log('Push subscription created:', subscription);
            }

            // Send subscription to server
            await this.sendSubscriptionToServer(subscription);

        } catch (error) {
            console.error('Push subscription failed:', error);
        }
    }

    /**
     * Get VAPID public key from server
     */
    async getVapidPublicKey() {
        // This should be set in your HTML or fetched from server
        return window.VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY || this.vapidPublicKey2;
    }

    /**
     * Send subscription to server
     */
    async sendSubscriptionToServer(subscription) {
        try {
            const deviceId = this.getDeviceId();

            const response = await fetch('/api/v1/notifications/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    subscription: subscription.toJSON(),
                    deviceId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send subscription to server');
            }

            console.log('Subscription sent to server');

        } catch (error) {
            console.error('Error sending subscription:', error);
        }
    }

    /**
     * Unsubscribe from push notifications
     */
    async unsubscribe() {
        try {
            if (!this.serviceWorkerRegistration) return;

            const subscription = await this.serviceWorkerRegistration.pushManager.getSubscription();

            if (subscription) {
                await subscription.unsubscribe();

                // Notify server
                const deviceId = this.getDeviceId();
                await fetch('/api/v1/notifications/unsubscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ deviceId })
                });

                console.log('Unsubscribed from push notifications');
            }

        } catch (error) {
            console.error('Unsubscribe error:', error);
        }
    }

    /**
     * Setup socket event listeners
     */
    setupSocketListeners() {
        if (!this.socket) return;

        // Initial state
        this.socket.on('notification:init', (data) => {
            console.log('Notification state initialized:', data);
            this.updateUnreadCount(data.unreadCount);
        });

        // New notification
        this.socket.on('notification:new', (data) => {
            console.log('New notification:', data);
            this.handleNewNotification(data);
        });

        // Notification marked as read
        this.socket.on('notification:marked-read', (data) => {
            this.handleNotificationRead(data.notificationId);
        });

        // All notifications marked as read
        this.socket.on('notification:all-read', () => {
            this.handleAllRead();
        });

        // Notification deleted
        this.socket.on('notification:deleted', (data) => {
            this.handleNotificationDeleted(data.notificationId);
        });

        // Notification update (unread count changed)
        this.socket.on('notification:update', (data) => {
            this.updateUnreadCount(data.unreadCount);
        });

        // Error handling
        this.socket.on('notification:error', (data) => {
            console.error('Notification error:', data);
            this.showErrorMessage(data.message);
        });

        // Listen for service worker messages
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'NOTIFICATION_CLICKED') {
                    this.handleNotificationClick(event.data);
                }
            });
        }
    }

    /**
     * Handle new notification
     */
    handleNewNotification(data) {
        const { notification, unreadCount } = data;

        // Update UI
        this.addNotificationToUI(notification);
        this.updateUnreadCount(unreadCount);

        // Show browser notification if tab not focused
        if (document.hidden && this.permissionGranted) {
            this.showBrowserNotification(notification);
        }

        // Play sound
        this.playNotificationSound();

        // Trigger custom event
        document.dispatchEvent(new CustomEvent('notification:new', { detail: notification }));
    }

    /**
     * Show browser notification
     */
    showBrowserNotification(notification) {
        if (!this.permissionGranted) return;

        const options = {
            body: notification.body,
            icon: notification.icon || '/icons/icon-192x192.png',
            badge: '/icons/badge.png',
            tag: `notification-${notification.id}`,
            requireInteraction: notification.priority === 'urgent',
            silent: notification.silent || false,
            data: notification
        };

        // Use service worker notification if available
        if (this.serviceWorkerRegistration) {
            this.serviceWorkerRegistration.showNotification(notification.title, options);
        } else {
            new Notification(notification.title, options);
        }
    }

    /**
     * Load notifications from server
     */
    async loadNotifications(options = {}) {
        const { page = 1, limit = 20, type, unreadOnly = false } = options;

        if (this.socket && this.socket.connected) {
            // Load via socket
            this.socket.emit('notification:fetch', { page, limit, type, unreadOnly });

            // Listen for response
            this.socket.once('notification:list', (data) => {
                this.renderNotifications(data);
            });
        } else {
            // Fallback to REST API
            try {
                const params = new URLSearchParams({
                    page, limit,
                    ...(type && { type }),
                    ...(unreadOnly && { unreadOnly: 'true' })
                });

                const response = await fetch(`/api/v1/notifications?${params}`, {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    this.renderNotifications(data);
                }
            } catch (error) {
                console.error('Error loading notifications:', error);
            }
        }
    }

    /**
     * Mark notification as read
     */
    async markAsRead(notificationId) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('notification:read', { notificationId });
        } else {
            try {
                await fetch(`/api/v1/notifications/${notificationId}/read`, {
                    method: 'PUT',
                    credentials: 'include'
                });
                this.handleNotificationRead(notificationId);
            } catch (error) {
                console.error('Error marking as read:', error);
            }
        }
    }

    /**
     * Mark all as read
     */
    async markAllAsRead() {
        if (this.socket && this.socket.connected) {
            this.socket.emit('notification:read-all');
        } else {
            try {
                await fetch('/api/v1/notifications/read-all', {
                    method: 'PUT',
                    credentials: 'include'
                });
                this.handleAllRead();
            } catch (error) {
                console.error('Error marking all as read:', error);
            }
        }
    }

    /**
     * Delete notification
     */
    async deleteNotification(notificationId) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('notification:delete', { notificationId });
        } else {
            try {
                await fetch(`/api/v1/notifications/${notificationId}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                this.handleNotificationDeleted(notificationId);
            } catch (error) {
                console.error('Error deleting notification:', error);
            }
        }
    }

    /**
     * Update unread count in UI
     */
    updateUnreadCount(count) {
        this.unreadCount = count;

        // Update badge
        const badges = document.querySelectorAll('.notification-badge');
        badges.forEach(badge => {
            if (count > 0) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        });

        // Update title
        if (count > 0) {
            document.title = `(${count}) ${document.title.replace(/^\(\d+\)\s/, '')}`;
        } else {
            document.title = document.title.replace(/^\(\d+\)\s/, '');
        }

        // Update app badge (if supported)
        if ('setAppBadge' in navigator) {
            if (count > 0) {
                navigator.setAppBadge(count);
            } else {
                navigator.clearAppBadge();
            }
        }
    }

    /**
     * Play notification sound
     */
    playNotificationSound() {
        const audio = new Audio('/sounds/notification.mp3');
        audio.volume = 0.5;
        audio.play().catch(err => console.log('Sound play failed:', err));
    }

    /**
     * Helper: Convert VAPID key
     */
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /**
     * Get or create device ID
     */
    getDeviceId() {
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + Date.now();
            localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
    }

    // Placeholder methods - implement based on your UI
    addNotificationToUI(notification) {
        console.log('Add to UI:', notification);
    }

    handleNotificationRead(notificationId) {
        console.log('Notification read:', notificationId);
    }

    handleAllRead() {
        console.log('All notifications read');
    }

    handleNotificationDeleted(notificationId) {
        console.log('Notification deleted:', notificationId);
    }

    handleNotificationClick(data) {
        console.log('Notification clicked:', data);
    }

    renderNotifications(data) {
        console.log('Render notifications:', data);
    }

    showErrorMessage(message) {
        console.error(message);
    }

    showUpdateNotification() {
        console.log('New version available');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.notificationManager = new NotificationManager();
});