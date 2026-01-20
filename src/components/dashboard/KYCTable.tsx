import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { KYCSubmission } from '@/types';

interface KYCTableProps {
  submissions: KYCSubmission[];
  showTabs?: boolean;
  onReview?: (submission: KYCSubmission) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function KYCTable({
  submissions,
  showTabs = true,
  onReview,
  onApprove,
  onReject
}: KYCTableProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesTab = submission.status === activeTab;
    const matchesSearch =
      submission.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
      {showTabs && (
        <div className="border-b border-border px-4 pt-4">
          <div className="flex gap-6">
            {(['pending', 'approved', 'rejected'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'pb-3 text-sm font-medium border-b-2 transition-colors',
                  activeTab === tab
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} KYC ({counts[tab]})
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
          <h3 className="font-semibold text-foreground">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} KYC Submissions
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Submission Date</th>
                <th>Document Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                          {getInitials(submission.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{submission.user.name}</p>
                        <p className="text-sm text-muted-foreground">{submission.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{submission.submissionDate}</td>
                  <td className="text-foreground">{submission.documentType}</td>
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
                        onClick={() => onReview?.(submission)}
                      >
                        Review
                      </span>
                      {submission.status === 'pending' && (
                        <>
                          <span
                            className="action-link"
                            onClick={() => onApprove?.(submission.id)}
                          >
                            Approve
                          </span>
                          <span
                            className="action-link"
                            onClick={() => onReject?.(submission.id)}
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

        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {filteredSubmissions.length} of {counts[activeTab]} results
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>
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
    </div>
  );
}
