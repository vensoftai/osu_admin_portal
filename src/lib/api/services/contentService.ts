/**
 * Content Service
 * Handles all content/policy-related API calls
 */

import apiClient from '../apiClient';
import { API_CONFIG, CONTENT_KEYS, type ContentKey } from '../config';
import type { ContentResponse, ContentUpdateRequest, ContentUpdateResponse } from '../types';

class ContentService {
    /**
     * Get content by key
     */
    async getContent(key: ContentKey): Promise<ContentResponse> {
        const response = await apiClient.get<ContentResponse>(
            `${API_CONFIG.ENDPOINTS.CONTENT.BASE}${key}/`
        );
        return response.data;
    }

    /**
     * Update content by key
     */
    async updateContent(key: ContentKey, content: string): Promise<ContentUpdateResponse> {
        const payload: ContentUpdateRequest = {
            key,
            content,
        };

        const response = await apiClient.put<ContentUpdateResponse>(
            `${API_CONFIG.ENDPOINTS.CONTENT.BASE}${key}/`,
            payload
        );
        return response.data;
    }

    // Convenience methods for each content type

    async getPrivacyPolicy(): Promise<ContentResponse> {
        return this.getContent(CONTENT_KEYS.PRIVACY_POLICY);
    }

    async updatePrivacyPolicy(content: string): Promise<ContentUpdateResponse> {
        return this.updateContent(CONTENT_KEYS.PRIVACY_POLICY, content);
    }

    async getTermsConditions(): Promise<ContentResponse> {
        return this.getContent(CONTENT_KEYS.TERMS_CONDITIONS);
    }

    async updateTermsConditions(content: string): Promise<ContentUpdateResponse> {
        return this.updateContent(CONTENT_KEYS.TERMS_CONDITIONS, content);
    }

    async getAffiliatePolicy(): Promise<ContentResponse> {
        return this.getContent(CONTENT_KEYS.AFFILIATE_POLICY);
    }

    async updateAffiliatePolicy(content: string): Promise<ContentUpdateResponse> {
        return this.updateContent(CONTENT_KEYS.AFFILIATE_POLICY, content);
    }

    async getRefundPolicy(): Promise<ContentResponse> {
        return this.getContent(CONTENT_KEYS.REFUND_POLICY);
    }

    async updateRefundPolicy(content: string): Promise<ContentUpdateResponse> {
        return this.updateContent(CONTENT_KEYS.REFUND_POLICY, content);
    }

    async getSavingsDisclaimer(): Promise<ContentResponse> {
        return this.getContent(CONTENT_KEYS.SAVINGS_DISCLAIMER);
    }

    async updateSavingsDisclaimer(content: string): Promise<ContentUpdateResponse> {
        return this.updateContent(CONTENT_KEYS.SAVINGS_DISCLAIMER, content);
    }
}

export const contentService = new ContentService();
