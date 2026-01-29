/**
 * KYC Service
 * Handles all KYC-related API calls
 */

import apiClient from '../apiClient';
import { API_CONFIG } from '../config';
import type { KYCSubmissionAPI, KYCActionRequest, KYCActionResponse } from '../types';

export type KYCStatusFilter = 'pending' | 'approved' | 'rejected' | 'verified';
export type KYCAction = 'approve' | 'reject';

export interface KYCListParams {
    status?: KYCStatusFilter;
}

class KYCService {
    /**
     * Get all KYC submissions, optionally filtered by status
     */
    async getKYCSubmissions(params?: KYCListParams): Promise<KYCSubmissionAPI[]> {
        const queryParams = new URLSearchParams();

        if (params?.status) {
            queryParams.append('status', params.status);
        }

        const url = `${API_CONFIG.ENDPOINTS.KYC.LIST}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await apiClient.get<KYCSubmissionAPI[]>(url);
        return response.data;
    }

    /**
     * Get pending KYC submissions
     */
    async getPendingSubmissions(): Promise<KYCSubmissionAPI[]> {
        return this.getKYCSubmissions({ status: 'pending' });
    }

    /**
     * Get approved/verified KYC submissions
     */
    async getApprovedSubmissions(): Promise<KYCSubmissionAPI[]> {
        return this.getKYCSubmissions({ status: 'verified' });
    }

    /**
     * Get rejected KYC submissions
     */
    async getRejectedSubmissions(): Promise<KYCSubmissionAPI[]> {
        return this.getKYCSubmissions({ status: 'rejected' });
    }

    /**
     * Approve or reject a KYC submission
     */
    async updateKYCStatus(id: string, action: KYCAction, reason?: string): Promise<KYCActionResponse> {
        const payload: KYCActionRequest = {
            id,
            action,
            reason: reason || '',
        };

        const response = await apiClient.post<KYCActionResponse>(
            API_CONFIG.ENDPOINTS.KYC.LIST,
            payload
        );
        return response.data;
    }

    /**
     * Approve a KYC submission
     */
    async approveKYC(id: string): Promise<KYCActionResponse> {
        return this.updateKYCStatus(id, 'approve');
    }

    /**
     * Reject a KYC submission with reason
     */
    async rejectKYC(id: string, reason: string): Promise<KYCActionResponse> {
        return this.updateKYCStatus(id, 'reject', reason);
    }
}

export const kycService = new KYCService();
