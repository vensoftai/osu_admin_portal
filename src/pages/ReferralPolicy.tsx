import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PolicyEditor } from '@/components/policy/PolicyEditor';
import { contentService } from '@/lib/api';
import { toast } from 'sonner';

export default function ReferralPolicy() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const response = await contentService.getAffiliatePolicy();
      setContent(response.content || '');
    } catch (error) {
      console.error('Failed to fetch referral policy:', error);
      toast.error('Failed to load referral policy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (newContent: string) => {
    try {
      setIsSaving(true);
      await contentService.updateAffiliatePolicy(newContent);
      setContent(newContent);
      toast.success('Referral policy saved successfully');
    } catch (error) {
      console.error('Failed to save referral policy:', error);
      toast.error('Failed to save referral policy');
    } finally {
      setIsSaving(false);
    }
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
          initialContent={content}
          isLoading={isLoading}
          isSaving={isSaving}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
