import { useState, useEffect } from 'react';
import { Bold, Italic, List, Link2, Eye, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PolicyEditorProps {
  initialContent?: string;
  isLoading?: boolean;
  isSaving?: boolean;
  onSave?: (content: string) => void;
}

export function PolicyEditor({ initialContent = '', isLoading = false, isSaving = false, onSave }: PolicyEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  // Update content when initialContent changes (e.g., after API fetch)
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = () => {
    onSave?.(content);
  };

  const formatMarkdown = (text: string) => {
    // Simple markdown rendering
    return text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Policy Content</h3>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Bold className="h-4 w-4" />
              <span className="hidden md:inline">Bold</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Italic className="h-4 w-4" />
              <span className="hidden md:inline">Italic</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <List className="h-4 w-4" />
              <span className="hidden md:inline">List</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Link2 className="h-4 w-4" />
              <span className="hidden md:inline">Link</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : isPreview ? (
          <div
            className="prose prose-sm max-w-none text-muted-foreground min-h-[400px] p-4 border border-border rounded-lg"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
          />
        ) : (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] font-mono text-sm resize-none"
            placeholder="Enter policy content in Markdown format..."
          />
        )}
      </div>

      <div className="flex items-center justify-end gap-2 p-4 border-t border-border bg-muted/50">
        <Button
          variant="outline"
          onClick={() => setIsPreview(!isPreview)}
          className="gap-2"
          disabled={isLoading}
        >
          <Eye className="h-4 w-4" />
          {isPreview ? 'Edit' : 'Preview'}
        </Button>
        <Button onClick={handleSave} className="gap-2" disabled={isLoading || isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
