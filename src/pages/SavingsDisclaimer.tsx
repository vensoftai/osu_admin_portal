import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PolicyEditor } from '@/components/policy/PolicyEditor';
import { contentService } from '@/lib/api';
import { toast } from 'sonner';

export default function SavingsDisclaimer() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const response = await contentService.getSavingsDisclaimer();
      setContent(response.content || '');
    } catch (error) {
      console.error('Failed to fetch savings disclaimer:', error);
      toast.error('Failed to load savings challenge disclaimer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (newContent: string) => {
    try {
      setIsSaving(true);
      await contentService.updateSavingsDisclaimer(newContent);
      setContent(newContent);
      toast.success('Savings challenge disclaimer saved successfully');
    } catch (error) {
      console.error('Failed to save savings disclaimer:', error);
      toast.error('Failed to save savings challenge disclaimer');
    } finally {
      setIsSaving(false);
    }
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
          initialContent={content}
          isLoading={isLoading}
          isSaving={isSaving}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}
