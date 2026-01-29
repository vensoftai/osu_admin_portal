/**
 * API Module - Main Entry Point
 * Export all API-related modules for easy importing
 */

// Core
export { default as apiClient } from './apiClient';
export { API_CONFIG, STORAGE_KEYS, CONTENT_KEYS, type ContentKey } from './config';
export { tokenService } from './tokenService';

// Services
export { authService } from './services/authService';
export { dashboardService } from './services/dashboardService';
export { kycService, type KYCStatusFilter, type KYCListParams } from './services/kycService';
export { contentService } from './services/contentService';

// Types
export type {
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ChangePasswordRequest,
    ChangePasswordResponse,
    ApiError,
    PaginatedResponse,
    User,
    DashboardStats,
    KYCSubmissionAPI,
    DashboardResponse,
    KYCActionRequest,
    KYCActionResponse,
    ContentResponse,
    ContentUpdateRequest,
    ContentUpdateResponse,
} from './types';