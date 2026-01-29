/**
 * Data Transformers
 * Transform API responses to frontend-compatible formats
 */

import { API_CONFIG } from '@/lib/api';
import type { KYCSubmissionAPI } from '@/lib/api';
import type { KYCSubmission } from '@/types';

/**
 * Get full URL for media files
 */
export function getMediaUrl(path: string | null): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${API_CONFIG.BASE_URL}${path}`;
}

/**
 * Map API status to frontend status
 * API uses 'verified' but frontend uses 'approved'
 */
function mapKYCStatus(status: string): 'pending' | 'approved' | 'rejected' {
    if (status === 'verified') return 'approved';
    if (status === 'pending') return 'pending';
    if (status === 'rejected') return 'rejected';
    return 'pending'; // default
}

/**
 * Transform API KYC submission to frontend format
 */
export function transformKYCSubmission(submission: KYCSubmissionAPI): KYCSubmission {
    return {
        id: submission.id.toString(),
        userId: submission.id.toString(),
        user: {
            id: submission.id.toString(),
            name: submission.user_name,
            email: submission.email,
        },
        submissionDate: submission.submitted_at,
        documentType: 'Government ID',
        status: mapKYCStatus(submission.status),
        documents: {
            govIdFront: getMediaUrl(submission.government_id_front),
            govIdBack: getMediaUrl(submission.government_id_back),
            selfie: getMediaUrl(submission.selfie_with_id),
            addressProof: getMediaUrl(submission.address_proof),
        },
        rejectionReason: submission.rejection_reason,
    };
}

/**
 * Transform array of API KYC submissions
 */
export function transformKYCSubmissions(submissions: KYCSubmissionAPI[]): KYCSubmission[] {
    return submissions.map(transformKYCSubmission);
}
