import { KYCSubmission, User } from '@/types';

export const mockUsers: User[] = [
  { id: 'USR-10234', name: 'Sarah Johnson', email: 'sarah.j@email.com', avatar: '' },
  { id: 'USR-10233', name: 'Michael Chen', email: 'm.chen@email.com', avatar: '' },
  { id: 'USR-10232', name: 'Emily Rodriguez', email: 'emily.r@email.com', avatar: '' },
  { id: 'USR-10231', name: 'David Park', email: 'd.park@email.com', avatar: '' },
  { id: 'USR-10230', name: 'Lisa Thompson', email: 'lisa.t@email.com', avatar: '' },
  { id: 'USR-10229', name: 'James Wilson', email: 'j.wilson@email.com', avatar: '' },
  { id: 'USR-10228', name: 'Anna Martinez', email: 'anna.m@email.com', avatar: '' },
  { id: 'USR-10227', name: 'Robert Brown', email: 'r.brown@email.com', avatar: '' },
];

export const mockKYCSubmissions: KYCSubmission[] = [
  {
    id: '1',
    userId: 'USR-10234',
    user: mockUsers[0],
    submissionDate: 'Jan 15, 2025',
    documentType: "Driver's License",
    status: 'pending',
    documents: {
      govIdFront: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      govIdBack: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      selfie: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      addressProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    }
  },
  {
    id: '2',
    userId: 'USR-10233',
    user: mockUsers[1],
    submissionDate: 'Jan 14, 2025',
    documentType: 'Passport',
    status: 'pending',
    documents: {
      govIdFront: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      govIdBack: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      selfie: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      addressProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    }
  },
  {
    id: '3',
    userId: 'USR-10232',
    user: mockUsers[2],
    submissionDate: 'Jan 14, 2025',
    documentType: 'National ID',
    status: 'pending',
    documents: {
      govIdFront: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      govIdBack: 'https://images.unsplash.com/photo-662996442-48f60103fc96?w=400&h=250&fit=crop',
      selfie: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      addressProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    }
  },
  {
    id: '4',
    userId: 'USR-10231',
    user: mockUsers[3],
    submissionDate: 'Jan 13, 2025',
    documentType: "Driver's License",
    status: 'approved',
    documents: {
      govIdFront: 'https://images.unsplash.com/photo-578662996442-48f60103fc96?w=400&h=250&fit=crop',
      govIdBack: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      selfie: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      addressProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    }
  },
  {
    id: '5',
    userId: 'USR-10230',
    user: mockUsers[4],
    submissionDate: 'Jan 13, 2025',
    documentType: 'Passport',
    status: 'approved',
    documents: {
      govIdFront: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      govIdBack: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      selfie: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
      addressProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    }
  },
  {
    id: '6',
    userId: 'USR-10229',
    user: mockUsers[5],
    submissionDate: 'Jan 12, 2025',
    documentType: 'National ID',
    status: 'rejected',
    documents: {
      govIdFront: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      govIdBack: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      selfie: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      addressProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    }
  },
  {
    id: '7',
    userId: 'USR-10228',
    user: mockUsers[6],
    submissionDate: 'Jan 12, 2025',
    documentType: "Driver's License",
    status: 'pending',
    documents: {
      govIdFront: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      govIdBack: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      selfie: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
      addressProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    }
  },
  {
    id: '8',
    userId: 'USR-10227',
    user: mockUsers[7],
    submissionDate: 'Jan 11, 2025',
    documentType: 'Passport',
    status: 'approved',
    documents: {
      govIdFront: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      govIdBack: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      selfie: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
      addressProof: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    }
  },
];

export const privacyPolicyContent = `# Privacy Policy

**Effective Date:** January 14, 2025

## 1. Introduction

Welcome to our application. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.

## 2. Information We Collect

### 2.1 Personal Information
We may collect the following types of personal information:
- Name and contact information
- Email address
- Phone number
- Billing and payment information
- Account credentials

### 2.2 Usage Information
We automatically collect information about how you use our services:
- IP address
- Browser type and version
- Device information
- Pages visited and time spent

## 3. How We Use Your Information

We use the collected information for:
- Providing and maintaining our services
- Processing transactions
- Sending notifications and updates
- Improving our services
- Complying with legal obligations

## 4. Data Security

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## 5. Contact Us

If you have any questions about this Privacy Policy, please contact us at privacy@example.com.`;

export const termsContent = `# Terms and Conditions

**Effective Date:** January 14, 2025

## 1. Acceptance of Terms

By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.

## 2. User Account

### 2.1 Registration
To use certain features of our service, you must register for an account. You agree to provide accurate information during registration.

### 2.2 Account Security
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

## 3. User Conduct

You agree not to:
- Violate any applicable laws or regulations
- Infringe on the rights of others
- Upload malicious content or viruses
- Attempt to gain unauthorized access
- Use the service for fraudulent purposes

## 4. Intellectual Property

All content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.

## 5. Limitation of Liability

To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

## 6. Modifications

We reserve the right to modify these terms at any time. Your continued use of the service constitutes acceptance of the modified terms.`;

export const savingsDisclaimerContent = `# Savings Challenge Disclaimer

**Effective Date:** January 14, 2025

## Important Notice

This Savings Challenge is designed to encourage healthy financial habits. Please read this disclaimer carefully before participating.

## 1. No Financial Advice

The savings challenge and any related content do not constitute financial, investment, or professional advice. We recommend consulting with a qualified financial advisor before making any financial decisions.

## 2. Eligibility

- Participants must be at least 18 years old
- Valid account registration required
- One entry per household
- Employees and affiliates are not eligible

## 3. Challenge Rules

### 3.1 Duration
Each savings challenge runs for a specified period as announced on the platform.

### 3.2 Rewards
- Rewards are subject to terms and conditions
- Rewards may vary based on participation level
- Tax implications are the responsibility of participants

## 4. Risk Disclosure

Saving money involves personal financial decisions. We are not responsible for any financial losses or missed opportunities resulting from participation in this challenge.

## 5. Modifications

We reserve the right to modify, suspend, or terminate the savings challenge at any time without prior notice.`;

export const referralPolicyContent = `# Referral Policy

**Effective Date:** January 14, 2025

## Program Overview

Our Referral Program rewards you for introducing friends and family to our platform.

## 1. How It Works

### 1.1 Getting Your Referral Link
Log into your account and navigate to the Referral section to get your unique referral link.

### 1.2 Sharing
Share your referral link via email, social media, or any other method you prefer.

### 1.3 Earning Rewards
When someone signs up using your referral link and completes verification, both you and your friend earn rewards.

## 2. Referral Rewards

| Action | Referrer Reward | Referee Reward |
|--------|-----------------|----------------|
| Sign Up | $5 | $5 |
| First Transaction | $10 | $10 |
| Premium Upgrade | $25 | 1 Month Free |

## 3. Terms and Conditions

- Referral rewards are credited within 7 business days
- Maximum of 50 successful referrals per month
- Self-referrals are not permitted
- Fraudulent referrals will result in account suspension
- Rewards may be modified without prior notice

## 4. Payment

Referral bonuses are credited directly to your account wallet and can be withdrawn according to our standard withdrawal policies.

## 5. Contact

For questions about the referral program, contact support@example.com.`;
