import { useState } from 'react';
import { X, ZoomIn, User, CreditCard, MapPin, Check, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { KYCSubmission } from '@/types';

interface KYCReviewModalProps {
  submission: KYCSubmission | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

export function KYCReviewModal({ 
  submission, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject 
}: KYCReviewModalProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!submission) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleApprove = () => {
    onApprove(submission.id);
    onClose();
  };

  const handleReject = () => {
    if (showRejectForm) {
      onReject(submission.id, rejectionReason);
      setRejectionReason('');
      setShowRejectForm(false);
      onClose();
    } else {
      setShowRejectForm(true);
    }
  };

  const handleClose = () => {
    setShowRejectForm(false);
    setRejectionReason('');
    onClose();
  };

  const documents = [
    {
      label: 'Government ID - Front',
      icon: CreditCard,
      image: submission.documents?.govIdFront,
    },
    {
      label: 'Government ID - Back',
      icon: CreditCard,
      image: submission.documents?.govIdBack,
    },
    {
      label: 'Selfie',
      icon: User,
      image: submission.documents?.selfie,
    },
    {
      label: 'Address Proof',
      icon: MapPin,
      image: submission.documents?.addressProof,
    },
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>KYC Review - {submission.documentType}</span>
              <span className={cn(
                'status-badge text-xs',
                submission.status === 'pending' && 'status-pending',
                submission.status === 'approved' && 'status-approved',
                submission.status === 'rejected' && 'status-rejected'
              )}>
                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
              </span>
            </DialogTitle>
          </DialogHeader>

          {/* User Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-background text-foreground">
                {getInitials(submission.user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{submission.user.name}</h3>
              <p className="text-sm text-muted-foreground">{submission.user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                User ID: #{submission.userId} • Submitted: {submission.submissionDate}
              </p>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {documents.map((doc, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 p-3 bg-muted/50 border-b border-border">
                  <doc.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{doc.label}</span>
                </div>
                <div className="relative group">
                  {doc.image ? (
                    <>
                      <img
                        src={doc.image}
                        alt={doc.label}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => setZoomedImage(doc.image!)}
                        className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <div className="bg-background rounded-full p-2 shadow-lg">
                          <ZoomIn className="h-5 w-5 text-foreground" />
                        </div>
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-48 bg-muted flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">No document uploaded</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Rejection Reason Form */}
          {showRejectForm && (
            <div className="mt-4 p-4 border border-destructive/30 bg-destructive/5 rounded-lg">
              <Label htmlFor="rejection-reason" className="text-sm font-medium text-destructive">
                Rejection Reason
              </Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejecting this KYC submission..."
                className="mt-2 min-h-[100px]"
              />
            </div>
          )}

          {/* Action Buttons */}
          {submission.status === 'pending' && (
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {showRejectForm ? (
                <>
                  <Button variant="outline" onClick={() => setShowRejectForm(false)}>
                    Back
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleReject}
                    disabled={!rejectionReason.trim()}
                    className="gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Confirm Rejection
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={handleReject}
                    className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={handleApprove} className="gap-2">
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Zoom Modal */}
      <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute right-4 top-4 z-10 bg-background rounded-full p-2 shadow-lg hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
          {zoomedImage && (
            <img
              src={zoomedImage}
              alt="Document preview"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
