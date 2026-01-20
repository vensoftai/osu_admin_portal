import { AdminLayout } from '@/components/layout/AdminLayout';
import { PolicyEditor } from '@/components/policy/PolicyEditor';
import { termsContent } from '@/data/mockData';
import { toast } from 'sonner';

export default function TermsConditions() {
  const handleSave = (content: string) => {
    console.log('Saving terms:', content);
    toast.success('Terms and conditions saved successfully');
  };

  return (
    <AdminLayout title="Terms & Conditions" subtitle="Manage your terms and conditions content">
      <div className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Legal</span>
          <span className="mx-2">›</span>
          <span className="text-foreground">Terms & Conditions</span>
        </div>
        
        <PolicyEditor 
          initialContent={termsContent}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
