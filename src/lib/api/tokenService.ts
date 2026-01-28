/**
 * Token Service
 * Handles all token-related operations (storage, retrieval, parsing)
 */

import { STORAGE_KEYS } from './config';

export interface TokenPayload {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: string;
}

class TokenService {
    /**
     * Get access token from storage
     */
    getAccessToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }

    /**
     * Get refresh token from storage
     */
    getRefreshToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    /**
     * Save tokens to storage
     */
    setTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }

    /**
     * Clear all tokens from storage
     */
    clearTokens(): void {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    /**
     * Parse JWT token payload
     */
    parseToken(token: string): TokenPayload | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch {
            return null;
        }
    }

    /**
     * Check if token is expired
     */
    isTokenExpired(token: string): boolean {
        const payload = this.parseToken(token);
        if (!payload) return true;

        // Add 60 second buffer to handle clock skew
        const expirationTime = payload.exp * 1000;
        return Date.now() >= expirationTime - 60000;
    }

    /**
     * Check if access token is valid and not expired
     */
    isAuthenticated(): boolean {
        const token = this.getAccessToken();
        if (!token) return false;
        return !this.isTokenExpired(token);
    }

    /**
     * Get user ID from token
     */
    getUserIdFromToken(): string | null {
        const token = this.getAccessToken();
        if (!token) return null;

        const payload = this.parseToken(token);
        return payload?.user_id || null;
    }
}

export const tokenService = new TokenService();
