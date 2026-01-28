/**
 * API Configuration
 * Central place for all API-related configuration
 */

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://10.10.12.28:8010',
    TIMEOUT: 30000, // 30 seconds
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/api/users/login/',
            REFRESH: '/api/users/token/refresh/',
            LOGOUT: '/api/users/logout/',
        },
    },
} as const;

// Token storage keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'admin_user',
} as const;
