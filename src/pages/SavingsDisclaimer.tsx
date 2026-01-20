import { AdminLayout } from '@/components/layout/AdminLayout';
import { PolicyEditor } from '@/components/policy/PolicyEditor';
import { savingsDisclaimerContent } from '@/data/mockData';
import { toast } from 'sonner';

export default function SavingsDisclaimer() {
  const handleSave = (content: string) => {
    console.log('Saving savings disclaimer:', content);
    toast.success('Savings challenge disclaimer saved successfully');
  };

  return (
    <AdminLayout title="Savings Challenge Disclaimer" subtitle="Manage savings challenge disclaimer content">
      <div className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Legal</span>
          <span className="mx-2">›</span>
          <span className="text-foreground">Savings Challenge Disclaimer</span>
        </div>
        
        <PolicyEditor 
          initialContent={savingsDisclaimerContent}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
