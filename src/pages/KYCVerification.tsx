import { useState } from 'react';
import { Search, Filter, RotateCcw, Calendar } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { mockKYCSubmissions } from '@/data/mockData';

export default function KYCVerification() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSubmissions = mockKYCSubmissions.filter((submission) => {
    const matchesTab = submission.status === activeTab;
    const matchesSearch = 
      submission.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.userId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    pending: mockKYCSubmissions.filter(s => s.status === 'pending').length,
    approved: mockKYCSubmissions.filter(s => s.status === 'approved').length,
    rejected: mockKYCSubmissions.filter(s => s.status === 'rejected').length,
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All S..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Select Date Range</span>
              </Button>

              <Button variant="outline" className="gap-2">
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
                  <td className="text-muted-foreground">{submission.submissionDate} 14:30</td>
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
                      <span className="action-link">Review</span>
                      <span className="action-link">Approve</span>
                      <span className="action-link">Reject</span>
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
    </AdminLayout>
  );
}
