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
