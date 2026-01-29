import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PolicyEditor } from '@/components/policy/PolicyEditor';
import { contentService } from '@/lib/api';
import { toast } from 'sonner';

export default function PrivacyPolicy() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const response = await contentService.getPrivacyPolicy();
      setContent(response.content || '');
    } catch (error) {
      console.error('Failed to fetch privacy policy:', error);
      toast.error('Failed to load privacy policy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (newContent: string) => {
    try {
      setIsSaving(true);
      await contentService.updatePrivacyPolicy(newContent);
      setContent(newContent);
      toast.success('Privacy policy saved successfully');
    } catch (error) {
      console.error('Failed to save privacy policy:', error);
      toast.error('Failed to save privacy policy');
    } finally {
      setIsSaving(false);
    }
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
          initialContent={content}
          isLoading={isLoading}
          isSaving={isSaving}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
