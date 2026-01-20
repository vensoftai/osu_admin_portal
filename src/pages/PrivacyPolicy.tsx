import { AdminLayout } from '@/components/layout/AdminLayout';
import { PolicyEditor } from '@/components/policy/PolicyEditor';
import { privacyPolicyContent } from '@/data/mockData';
import { toast } from 'sonner';

export default function PrivacyPolicy() {
  const handleSave = (content: string) => {
    console.log('Saving privacy policy:', content);
    toast.success('Privacy policy saved successfully');
  };

  return (
    <AdminLayout title="Privacy Policy" subtitle="Manage your privacy policy content">
      <div className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Legal</span>
          <span className="mx-2">›</span>
          <span className="text-foreground">Privacy Policy</span>
        </div>
        
        <PolicyEditor 
          initialContent={privacyPolicyContent}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
