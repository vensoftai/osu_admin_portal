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
}

export interface SupportTicket {
  id: string;
  userId: string;
  user: User;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
  author: string;
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
