"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getDeviceId, playNotificationSound, urlBase64ToUint8Array } from '../utils/notification';


export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children, socket, apiUrl = '/api/v1' }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [subscription, setSubscription] = useState(null);

    // Initialize notifications
    useEffect(() => {
        if (!socket) return;

        // Socket listeners
        socket.on('notification:init', (data) => {
            setUnreadCount(data.unreadCount);
        });

        socket.on('notification:new', (data) => {
            setNotifications(prev => [data.notification, ...prev]);
            setUnreadCount(data.unreadCount);
            playNotificationSound();
        });

        socket.on('notification:list', (data) => {
            console.log({ data });
            const newNotifications = data.notifications.flatMap(group => group.notifications);
            setNotifications(prev => page === 1 ? newNotifications : [...prev, ...newNotifications]);
            setUnreadCount(data.unreadCount);
            setHasMore(data.pagination.page < data.pagination.pages);
            setLoading(false);
        });

        socket.on('notification:marked-read', (data) => {
            setNotifications(prev =>
                prev.map(n => n.id === data.notificationId ? { ...n, unread: false } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        });

        socket.on('notification:all-read', () => {
            setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
            setUnreadCount(0);
        });

        socket.on('notification:deleted', (data) => {
            setNotifications(prev => prev.filter(n => n.id !== data.notificationId));
        });

        socket.on('notification:update', (data) => {
            setUnreadCount(data.unreadCount);
        });

        // return () => {
        //     socket.off('notification:init');
        //     socket.off('notification:new');
        //     socket.off('notification:list');
        //     socket.off('notification:marked-read');
        //     socket.off('notification:all-read');
        //     socket.off('notification:deleted');
        //     socket.off('notification:update');
        // };
    }, [socket, page]);



    const loadNotifications = useCallback((options = {}) => {
        if (!socket?.connected) return;
        setLoading(true);
        socket.emit('notification:fetch', {
            page: options.page || page,
            limit: 20,
            ...options
        });
    }, [socket, page]);

    useEffect(() =>
        loadNotifications()
        , [socket])

    const markAsRead = useCallback((notificationId) => {
        if (!socket?.connected) return;
        socket.emit('notification:read', { notificationId });
    }, [socket]);

    const markAllAsRead = useCallback(() => {
        if (!socket?.connected) return;
        socket.emit('notification:read-all');
    }, [socket]);

    const deleteNotification = useCallback((notificationId) => {
        if (!socket?.connected) return;
        socket.emit('notification:delete', { notificationId });
    }, [socket]);

    const trackClick = useCallback((notificationId) => {
        if (!socket?.connected) return;
        socket.emit('notification:click', { notificationId });
    }, [socket]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
            loadNotifications({ page: page + 1 });
        }
    }, [loading, hasMore, page, loadNotifications]);

    const value = {
        notifications,
        unreadCount,
        loading,
        hasMore,
        loadNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        trackClick,
        loadMore,
        subscription
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};


