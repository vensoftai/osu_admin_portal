export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface KYCDocuments {
  govIdFront: string;
  govIdBack: string;
  selfie: string;
  addressProof: string;
}

export interface KYCSubmission {
  id: string;
  userId: string;
  user: User;
  submissionDate: string;
  documentType: string;
  status: 'pending' | 'approved' | 'rejected';
  documents?: KYCDocuments;
  rejectionReason?: string | null;
}

export interface StatCard {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}
