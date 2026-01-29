/**
 * Dashboard Service
 * Handles all dashboard-related API calls
 */

import apiClient from '../apiClient';
import { API_CONFIG } from '../config';
import type { DashboardResponse } from '../types';

class DashboardService {
    /**
     * Get dashboard data including stats and pending KYC submissions
     */
    async getDashboardData(): Promise<DashboardResponse> {
        const response = await apiClient.get<DashboardResponse>(
            API_CONFIG.ENDPOINTS.DASHBOARD.STAFF
        );
        return response.data;
    }
}

export const dashboardService = new DashboardService();
