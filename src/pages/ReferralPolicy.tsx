import { AdminLayout } from '@/components/layout/AdminLayout';
import { PolicyEditor } from '@/components/policy/PolicyEditor';
import { referralPolicyContent } from '@/data/mockData';
import { toast } from 'sonner';

export default function ReferralPolicy() {
  const handleSave = (content: string) => {
    console.log('Saving referral policy:', content);
    toast.success('Referral policy saved successfully');
  };

  return (
    <AdminLayout title="Referral Policy" subtitle="Manage referral program policy content">
      <div className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Legal</span>
          <span className="mx-2">›</span>
          <span className="text-foreground">Referral Policy</span>
        </div>
        
        <PolicyEditor 
          initialContent={referralPolicyContent}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
