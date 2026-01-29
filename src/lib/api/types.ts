/**
 * API Types
 * Centralized type definitions for API requests and responses
 */

// ============ Auth Types ============

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    message: string;
}

export interface RefreshTokenRequest {
    refresh: string;
}

export interface RefreshTokenResponse {
    access: string;
}

export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

export interface ChangePasswordResponse {
    message: string;
}

// ============ Generic API Types ============

export interface ApiError {
    message: string;
    detail?: string;
    errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// ============ User Types ============

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

// ============ Dashboard Types ============

export interface DashboardStats {
    total_kyc: number;
    pending_kyc: number;
    approved_kyc: number;
    rejected_kyc: number;
}

export interface KYCSubmissionAPI {
    id: number;
    user_name: string;
    email: string;
    submitted_at: string;
    status: 'pending' | 'approved' | 'rejected' | 'verified';
    government_id_front: string | null;
    government_id_back: string | null;
    selfie_with_id: string | null;
    address_proof: string | null;
    rejection_reason: string | null;
}

export interface DashboardResponse {
    stats: DashboardStats;
    pending_submissions: KYCSubmissionAPI[];
}

// ============ KYC Action Types ============

export interface KYCActionRequest {
    id: string;
    action: 'approve' | 'reject';
    reason: string;
}

export interface KYCActionResponse {
    message: string;
    status?: string;
}

// ============ Content/Policy Types ============

export interface ContentResponse {
    id?: number;
    key: string;
    content: string;
    updated_at?: string;
}

export interface ContentUpdateRequest {
    key: string;
    content: string;
}

export interface ContentUpdateResponse {
    message: string;
    content?: ContentResponse;
}
