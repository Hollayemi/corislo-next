
export function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function getDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + Date.now();
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

export function playNotificationSound() {
    try {
        const audio = new Audio('/sounds/notification.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => { });
    } catch (error) {
        console.error('Sound play error:', error);
    }
}
