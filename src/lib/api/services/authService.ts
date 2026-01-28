/**
 * Auth Service
 * Handles all authentication-related API calls
 */

import apiClient from '../apiClient';
import { API_CONFIG } from '../config';
import { tokenService } from '../tokenService';
import type { LoginRequest, LoginResponse, User } from '../types';

class AuthService {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginRequest): Promise<{ user: User; message: string }> {
        const response = await apiClient.post<LoginResponse>(
            API_CONFIG.ENDPOINTS.AUTH.LOGIN,
            credentials
        );

        const { access, refresh, message } = response.data;

        // Store tokens
        tokenService.setTokens(access, refresh);

        // Parse user info from token
        const tokenPayload = tokenService.parseToken(access);

        const user: User = {
            id: tokenPayload?.user_id || '',
            email: credentials.email,
            name: 'Admin User', // This can be fetched from a separate endpoint if available
            role: 'Administrator',
        };

        // Store user info
        localStorage.setItem('admin_user', JSON.stringify(user));

        return { user, message };
    }

    /**
     * Logout user - clear tokens
     */
    logout(): void {
        tokenService.clearTokens();
    }

    /**
     * Check if user is currently authenticated
     */
    isAuthenticated(): boolean {
        return tokenService.isAuthenticated();
    }

    /**
     * Get stored user info
     */
    getStoredUser(): User | null {
        const userStr = localStorage.getItem('admin_user');
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }

    /**
     * Refresh access token
     */
    async refreshToken(): Promise<string | null> {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) return null;

        try {
            const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
                refresh: refreshToken,
            });

            const { access } = response.data;
            tokenService.setTokens(access, refreshToken);
            return access;
        } catch {
            tokenService.clearTokens();
            return null;
        }
    }
}

export const authService = new AuthService();
