import { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { KYCTable } from '@/components/dashboard/KYCTable';
import { KYCReviewModal } from '@/components/kyc/KYCReviewModal';
import { dashboardService, kycService, type DashboardStats } from '@/lib/api';
import { transformKYCSubmissions } from '@/lib/transformers';
import { KYCSubmission } from '@/types';
import { toast } from 'sonner';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<KYCSubmission[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      // Fetch stats and all KYC submissions in parallel
      const [dashboardData, kycData] = await Promise.all([
        dashboardService.getDashboardData(),
        kycService.getKYCSubmissions(), // Get all submissions for tabs
      ]);
      setStats(dashboardData.stats);
      setSubmissions(transformKYCSubmissions(kycData));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total KYC Submissions',
      value: stats?.total_kyc?.toLocaleString() ?? '0',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: 'Pending KYC',
      value: stats?.pending_kyc?.toString() ?? '0',
      subtitle: 'Awaiting review',
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: 'Approved KYC',
      value: stats?.approved_kyc?.toLocaleString() ?? '0',
      subtitle: stats?.total_kyc
        ? `✓ ${((stats.approved_kyc / stats.total_kyc) * 100).toFixed(1)}% approval rate`
        : undefined,
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: 'Rejected KYC',
      value: stats?.rejected_kyc?.toString() ?? '0',
      subtitle: stats?.total_kyc
        ? `× ${((stats.rejected_kyc / stats.total_kyc) * 100).toFixed(1)}% rejection rate`
        : undefined,
      icon: <XCircle className="h-5 w-5" />,
    },
  ];

  const handleReview = (submission: KYCSubmission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await kycService.approveKYC(id);
      setSubmissions(prev => prev.map(s =>
        s.id === id ? { ...s, status: 'approved' as const } : s
      ));
      toast.success(response.message || 'KYC submission approved successfully');
      // Refresh dashboard data to update stats
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to approve KYC:', error);
      toast.error('Failed to approve KYC. Please try again.');
    }
  };

  const handleReject = async (id: string, reason?: string) => {
    try {
      const response = await kycService.rejectKYC(id, reason || 'Rejected by admin');
      setSubmissions(prev => prev.map(s =>
        s.id === id ? { ...s, status: 'rejected' as const } : s
      ));
      toast.success(response.message || 'KYC submission rejected');
      // Refresh dashboard data to update stats
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to reject KYC:', error);
      toast.error('Failed to reject KYC. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard" subtitle="Monitor KYC verification status and statistics">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard" subtitle="Monitor KYC verification status and statistics">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* KYC Table */}
        <KYCTable
          submissions={submissions}
          onReview={handleReview}
          onApprove={handleApprove}
          onReject={(id) => handleReject(id)}
        />
      </div>

      {/* KYC Review Modal */}
      <KYCReviewModal
        submission={selectedSubmission}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSubmission(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </AdminLayout>
  );
}
