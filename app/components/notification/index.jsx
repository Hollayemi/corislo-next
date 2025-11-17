"use client";
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Bell, X, Check, Trash2, Settings, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/app/hooks/useData';

export const NotificationBell = () => {
    const { unreadCount, loadNotifications } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <Bell className="w-6 h-6 text-gray-700" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <NotificationPanel onClose={() => setIsOpen(false)} />
                </>
            )}
        </div>
    );
};

// ============ NOTIFICATION PANEL ============

const NotificationPanel = ({ onClose }) => {
    const {
        notifications,
        unreadCount,
        loading,
        hasMore,
        loadNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        trackClick,
        loadMore
    } = useNotifications();

    console.log({ notifications })

    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadNotifications({ unreadOnly: filter === 'unread' });
    }, [filter, loadNotifications]);

    const handleNotificationClick = (notification) => {
        if (notification.unread) {
            markAsRead(notification.id);
        }
        trackClick(notification.id);

        if (notification.clickUrl) {
            window.location.href = notification.clickUrl;
        }
        onClose();
    };

    const getIcon = (type) => {
        const icons = {
            order: '📦',
            promotion: '🎉',
            message: '💬',
            payment: '💳',
            system: '⚙️',
            review: '⭐'
        };
        return icons[type] || '🔔';
    };

    const filteredNotifications = filter === 'unread'
        ? notifications.filter(n => n.unread)
        : notifications;

    return (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl z-50 max-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === 'all'
                                ? 'bg-brand-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === 'unread'
                                ? 'bg-brand-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Unread ({unreadCount})
                        </button>
                    </div>

                    {/* Mark all as read */}
                    {unreadCount > 0 ? (
                        <button
                            onClick={markAllAsRead}
                            className="mt-2 text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                        >
                            <CheckCheck className="w-4 h-4" />
                            Mark all as read
                        </button>
                    ) : null}
                </div>
            </div>

            {/* Notifications list */}
            <div className="flex-1 overflow-y-auto">
                {loading && notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mb-2" />
                        Loading...
                    </div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No notifications</p>
                    </div>
                ) : (
                    <>
                        {filteredNotifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onClick={() => handleNotificationClick(notification)}
                                onDelete={() => deleteNotification(notification.id)}
                                onMarkRead={() => markAsRead(notification.id)}
                            />
                        ))}

                        {/* Load more */}
                        {hasMore && (
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="w-full p-4 text-sm text-brand-600 hover:bg-gray-50 font-medium"
                            >
                                {loading ? 'Loading...' : 'Load more'}
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200">
                <a
                    href="/notifications"
                    className="block text-center text-sm text-brand-600 hover:text-brand-700 font-medium"
                >
                    View all notifications
                </a>
            </div>
        </div>
    );
};

// ============ NOTIFICATION ITEM ============

const NotificationItem = ({ notification, onClick, onDelete, onMarkRead }) => {
    const [showActions, setShowActions] = useState(false);

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        return new Date(date).toLocaleDateString();
    };

    const getIcon = (type) => {
        const icons = {
            order: '📦',
            promotion: '🎉',
            message: '💬',
            payment: '💳',
            system: '⚙️',
            review: '⭐'
        };
        return icons[type] || '🔔';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            urgent: 'bg-red-100 border-red-200',
            high: 'bg-orange-50 border-orange-200',
            medium: 'bg-brand-50 border-brand-200',
            low: 'bg-gray-50 border-gray-200'
        };
        return colors[priority] || colors.medium;
    };

    return (
        <div
            className={`relative border-b border-gray-100 hover:bg-gray-50 transition-colors ${notification.unread ? 'bg-brand-50' : ''
                }`}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div onClick={onClick} className="p-4 cursor-pointer">
                <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                        <span className="text-2xl">{getIcon(notification.type)}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-medium text-gray-900 text-sm">
                                {notification.title}
                            </p>
                            {notification.unread ? (
                                <span className="w-2 h-2 bg-brand-500 rounded-full flex-shrink-0 mt-1" />
                            ) : null}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {notification.body}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{timeAgo(notification.createdAt)}</span>
                            {notification.priority === 'urgent' && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                                    Urgent
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            {showActions && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 bg-white rounded-lg shadow-lg p-1">
                    {notification.unread ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onMarkRead();
                            }}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                            title="Mark as read"
                        >
                            <Check className="w-4 h-4 text-gray-600" />
                        </button>
                    ) : null}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="p-2 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                </div>
            )}
        </div>
    );
};
