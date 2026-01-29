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
            CHANGE_PASSWORD: '/api/users/settings/change-password/',
        },
        DASHBOARD: {
            STAFF: '/api/dashboard/staff/',
        },
        KYC: {
            LIST: '/api/dashboard/staff/kyc/',
        },
        CONTENT: {
            BASE: '/api/dashboard/staff/content/',
        },
    },
} as const;

// Content key names for policy pages
export const CONTENT_KEYS = {
    PRIVACY_POLICY: 'privacy_policy',
    TERMS_CONDITIONS: 'terms_conditions',
    AFFILIATE_POLICY: 'affiliate_policy',
    REFUND_POLICY: 'refund_policy',
    SAVINGS_DISCLAIMER: 'savings_disclaimer',
} as const;

export type ContentKey = typeof CONTENT_KEYS[keyof typeof CONTENT_KEYS];// Token storage keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'admin_user',
} as const;
