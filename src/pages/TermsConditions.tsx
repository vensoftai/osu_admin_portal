import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PolicyEditor } from '@/components/policy/PolicyEditor';
import { contentService } from '@/lib/api';
import { toast } from 'sonner';

export default function TermsConditions() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const response = await contentService.getTermsConditions();
      setContent(response.content || '');
    } catch (error) {
      console.error('Failed to fetch terms and conditions:', error);
      toast.error('Failed to load terms and conditions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (newContent: string) => {
    try {
      setIsSaving(true);
      await contentService.updateTermsConditions(newContent);
      setContent(newContent);
      toast.success('Terms and conditions saved successfully');
    } catch (error) {
      console.error('Failed to save terms and conditions:', error);
      toast.error('Failed to save terms and conditions');
    } finally {
      setIsSaving(false);
    }
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
          initialContent={content}
          isLoading={isLoading}
          isSaving={isSaving}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
