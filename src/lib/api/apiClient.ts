/**
 * API Client
 * Centralized axios instance with interceptors for auth and error handling
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from './config';
import { tokenService } from './tokenService';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenService.getAccessToken();

        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - Token expired or invalid
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = tokenService.getRefreshToken();

            if (refreshToken && !tokenService.isTokenExpired(refreshToken)) {
                try {
                    // Attempt to refresh the token
                    const response = await axios.post(
                        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
                        { refresh: refreshToken }
                    );

                    const { access } = response.data;
                    tokenService.setTokens(access, refreshToken);

                    // Retry the original request with new token
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return apiClient(originalRequest);
                } catch {
                    // Refresh failed - clear tokens and redirect to login
                    tokenService.clearTokens();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
            } else {
                // No refresh token or it's expired - redirect to login
                tokenService.clearTokens();
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
