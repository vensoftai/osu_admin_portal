import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { KYCTable } from '@/components/dashboard/KYCTable';
import { mockKYCSubmissions } from '@/data/mockData';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total KYC Submissions',
      value: '2,847',
      trend: { value: '+12% from last month', positive: true },
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: 'Pending KYC',
      value: '156',
      subtitle: 'Awaiting review',
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: 'Approved KYC',
      value: '2,534',
      subtitle: '✓ 89% approval rate',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: 'Rejected KYC',
      value: '157',
      subtitle: '× 5.5% rejection rate',
      icon: <XCircle className="h-5 w-5" />,
    },
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Monitor KYC verification status and statistics">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              trend={stat.trend}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* KYC Table */}
        <KYCTable submissions={mockKYCSubmissions} />
      </div>
    </AdminLayout>
  );
}
