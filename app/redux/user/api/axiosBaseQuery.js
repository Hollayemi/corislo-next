/* eslint-disable no-undef */
"use client"
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

export const server = process.env.NODE_ENV === "production"
    ? "https://corislo-backend.onrender.com"
    : "http://localhost:5001" // "http://172.20.10.8:5001";

const getAuthHeaders = (by = "user") => {
    if (typeof window === 'undefined') {
        return {
            'Content-Type': 'application/json',
        };
    }
    const tokenType = by === "user" ? "user_token" : "store_token";
    const token = localStorage.getItem(tokenType) || "";

    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

const showSuccessToast = (data) => {
    const { type, message } = data || {};
    if (type === "success" && message && message !== "success") {
        toast.success(message);
    }
};

// Main query function
export const axiosBaseQuery = (tokenOwner) => async (requestConfig) => {
    const {
        url,
        method = 'GET',
        data,
        actor,
        params,
        headers = {},
        skipSuccessToast = false,
    } = requestConfig;

    try {
        // Build headers
        const authHeaders = getAuthHeaders(tokenOwner || actor || "user");
        const mergedHeaders = { ...authHeaders, ...headers };

        // Build URL with params
        const fullUrl = new URL(`${server}/api/v1${url}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    fullUrl.searchParams.append(key, value);
                }
            });
        }

        // Prepare fetch options
        const fetchOptions = {
            method,
            headers: mergedHeaders,
            credentials: 'include',
        };

        // Only add body for methods that support it
        if (method !== 'GET' && method !== 'HEAD' && data) {
            fetchOptions.body = JSON.stringify(data);
        }

        console.log('Making request to:', fullUrl.toString());
        console.log('Request options:', fetchOptions);

        const response = await fetch(fullUrl.toString(), fetchOptions);

        // Parse response
        let responseData;
        const contentType = response.headers.get('content-type');

        try {
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }
        } catch (parseError) {
            console.error('Error parsing response:', parseError);
            responseData = null;
        }

        console.log('Response status:', response.status);
        console.log('Response data:', responseData);

        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
            error.response = response;
            error.data = responseData;
            error.status = response.status;
            throw error;
        }

        // Handle success message
        if (!skipSuccessToast) {
            showSuccessToast(responseData);
        }

        return { data: responseData };

    } catch (error) {
        console.error('Request failed:', error);

        // Handle network errors
        if (!error.response) {
            toast.error('Network error - please check your connection');
            return {
                error: {
                    status: 0,
                    data: { message: 'Network error' },
                    message: 'Network error',
                }
            };
        }

        // Handle HTTP errors
        const status = error.status || error.response?.status;
        const errorMessage = error.data?.message || error.message || 'An error occurred';

        toast.error(errorMessage);

        return {
            error: {
                status: status || 0,
                data: error.data || { message: errorMessage },
                message: errorMessage,
            }
        };
    }
};

// Token validation
const checkTokenStatus = (account = "user") => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
        return { isValid: false, needsRefresh: false };
    }

    const tokenType = account === "user" ? "user_token" : "store_token";

    try {
        const token = localStorage.getItem(tokenType);
        if (!token) return { isValid: false, needsRefresh: false };

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const bufferTime = 5 * 60; // 5 minutes

        if (typeof decodedToken.exp === "number") {
            const isValid = decodedToken.exp > currentTime;
            const needsRefresh = decodedToken.exp < currentTime + bufferTime;
            return { isValid, needsRefresh };
        }

        return { isValid: false, needsRefresh: false };
    } catch (error) {
        console.error('Token validation error:', error);
        return { isValid: false, needsRefresh: false };
    }
};

// Export utility functions
export const isAuthenticated = (account) => {
    const { isValid } = checkTokenStatus(account);
    return isValid;
};

export const needsTokenRefresh = () => {
    const { needsRefresh } = checkTokenStatus();
    return needsRefresh;
};

export const clearAuthData = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("store_token");
        localStorage.removeItem("user_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
    }
};

// Default instance
export const api = axiosBaseQuery();