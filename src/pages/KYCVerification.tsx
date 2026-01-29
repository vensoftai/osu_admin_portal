import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, RotateCcw, Calendar, Loader2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, formatDateTime } from '@/lib/utils';
import { kycService } from '@/lib/api';
import { transformKYCSubmissions } from '@/lib/transformers';
import { KYCReviewModal } from '@/components/kyc/KYCReviewModal';
import { KYCSubmission } from '@/types';
import { toast } from 'sonner';

type TabType = 'pending' | 'approved' | 'rejected';

export default function KYCVerification() {
  const [submissions, setSubmissions] = useState<KYCSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ start: string, end: string } | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all KYC submissions
  const fetchKYCSubmissions = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await kycService.getKYCSubmissions();
      setSubmissions(transformKYCSubmissions(data));
    } catch (error) {
      console.error('Failed to fetch KYC submissions:', error);
      toast.error('Failed to load KYC submissions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKYCSubmissions();
  }, [fetchKYCSubmissions]);

  // Filter submissions based on active tab, search query, and date range
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesTab = submission.status === activeTab;
    const matchesSearch =
      submission.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.userId.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesDate = true;
    if (dateRange?.start && dateRange?.end) {
      const submissionDate = new Date(submission.submissionDate);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // Include entire end day
      matchesDate = submissionDate >= startDate && submissionDate <= endDate;
    }

    return matchesTab && matchesSearch && matchesDate;
  });

  const counts = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleReview = (submission: KYCSubmission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await kycService.approveKYC(id);
      // Update local state to reflect the change
      setSubmissions(prev => prev.map(s =>
        s.id === id ? { ...s, status: 'approved' as const } : s
      ));
      toast.success(response.message || 'KYC submission approved successfully');
    } catch (error) {
      console.error('Failed to approve KYC:', error);
      toast.error('Failed to approve KYC. Please try again.');
    }
  };

  const handleReject = async (id: string, reason?: string) => {
    try {
      const response = await kycService.rejectKYC(id, reason || 'Rejected by admin');
      // Update local state to reflect the change
      setSubmissions(prev => prev.map(s =>
        s.id === id ? { ...s, status: 'rejected' as const, rejectionReason: reason } : s
      ));
      toast.success(response.message || 'KYC submission rejected');
    } catch (error) {
      console.error('Failed to reject KYC:', error);
      toast.error('Failed to reject KYC. Please try again.');
    }
  };

  const handleResetFilters = () => {
    setDateRange(null);
    setSearchQuery('');
    setActiveTab('pending');
    toast.success('Filters reset');
  };

  if (isLoading) {
    return (
      <AdminLayout title="KYC Verification" subtitle="Review and verify user identity documents">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="KYC Verification" subtitle="Review and verify user identity documents">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Tabs and Filters */}
        <div className="p-4 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex gap-4 overflow-x-auto">
              {(['pending', 'approved', 'rejected'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'pb-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2',
                    activeTab === tab
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs',
                    activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    {counts[tab]}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <input
                  type="date"
                  className="px-3 py-2 border border-border rounded-md text-sm"
                  placeholder="Start Date"
                  value={dateRange?.start || ''}
                  onChange={(e) => setDateRange(prev => ({ start: e.target.value, end: prev?.end || '' }))}
                />
                <input
                  type="date"
                  className="px-3 py-2 border border-border rounded-md text-sm"
                  placeholder="End Date"
                  value={dateRange?.end || ''}
                  onChange={(e) => setDateRange(prev => ({ start: prev?.start || '', end: e.target.value }))}
                />
              </div>

              <Button variant="outline" className="gap-2" onClick={handleResetFilters}>
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Submitted At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="text-muted-foreground font-mono text-sm">#{submission.userId}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                          {getInitials(submission.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{submission.user.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{submission.user.email}</td>
                  <td className="text-muted-foreground">{formatDateTime(submission.submissionDate)}</td>
                  <td>
                    <span className={cn(
                      'status-badge',
                      submission.status === 'pending' && 'status-pending',
                      submission.status === 'approved' && 'status-approved',
                      submission.status === 'rejected' && 'status-rejected'
                    )}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <span
                        className="action-link"
                        onClick={() => handleReview(submission)}
                      >
                        Review
                      </span>
                      {submission.status === 'pending' && (
                        <>
                          <span
                            className="action-link"
                            onClick={() => handleApprove(submission.id)}
                          >
                            Approve
                          </span>
                          <span
                            className="action-link"
                            onClick={() => handleReject(submission.id)}
                          >
                            Reject
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {filteredSubmissions.length} of {counts[activeTab]} entries
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
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
