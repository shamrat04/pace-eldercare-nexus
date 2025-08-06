export interface PACEMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  medicaidCIN?: string;
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  referralSource: string;
  currentStatus: PACEStatus;
  createdDate: string;
  updatedDate: string;
}

export interface EligibilityChecklist {
  medicaidStatus: 'Active' | 'Pending' | 'Inactive' | 'Unknown';
  hasCIN: boolean;
  activeFlag: boolean;
  applicationDate?: string;
  applicationOutcome?: 'Approved' | 'Denied' | 'Pending';
  epacesIntegrated: boolean;
}

export interface UASAssessment {
  id: string;
  memberId: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  nhLOCMet: boolean;
  completedDate?: string;
  assessor?: string;
  communitySafetyCriteria: boolean;
  ageCriteria: boolean;
  trackingNotes: string;
}

export interface IDTChecklist {
  rn: IDTMemberStatus;
  pcp: IDTMemberStatus;
  pt: IDTMemberStatus;
  sw: IDTMemberStatus;
  ot?: IDTMemberStatus;
  dietitian?: IDTMemberStatus;
  pharmacist?: IDTMemberStatus;
  behavioralHealth?: IDTMemberStatus;
}

export interface IDTMemberStatus {
  assigned: boolean;
  name?: string;
  contactDate?: string;
  notes?: string;
}

export interface EnrollmentPacket {
  roiReceived: boolean;
  roiDate?: string;
  hipaaReceived: boolean;
  hipaaDate?: string;
  uasSummaryReceived: boolean;
  medicaidDocsReceived: boolean;
  signatureDate?: string;
  enrollmentDate?: string;
  documents: UploadedDocument[];
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  fileType: 'ROI' | 'HIPAA' | 'UAS_Summary' | 'Medicaid_Docs' | 'Other';
  uploadDate: string;
  uploadedBy: string;
  fileSize: number;
  filePath: string;
}

export interface PACEIntakeRecord {
  id: string;
  memberId: string;
  eligibilityChecklist: EligibilityChecklist;
  uasAssessment: UASAssessment;
  idtChecklist: IDTChecklist;
  enrollmentPacket: EnrollmentPacket;
  finalStatus: PACEStatus;
  timeline: TimelineEvent[];
  notes: CallLogEntry[];
  createdDate: string;
  updatedDate: string;
  createdBy: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  description: string;
  completedBy: string;
  category: 'Eligibility' | 'UAS' | 'IDT' | 'Enrollment' | 'System';
}

export interface CallLogEntry {
  id: string;
  date: string;
  time: string;
  contactType: 'Inbound' | 'Outbound' | 'Email' | 'Note';
  contactWith: string;
  subject: string;
  notes: string;
  createdBy: string;
  followUpRequired: boolean;
  followUpDate?: string;
}

export type PACEStatus = 
  | 'Inquiry'
  | 'Application Submitted'
  | 'Eligibility Review'
  | 'UAS Scheduled'
  | 'UAS Completed'
  | 'IDT Review'
  | 'Ready to Enroll'
  | 'Enrolled'
  | 'Denied'
  | 'Withdrawn';

export const PACE_STATUSES: PACEStatus[] = [
  'Inquiry',
  'Application Submitted',
  'Eligibility Review',
  'UAS Scheduled',
  'UAS Completed',
  'IDT Review',
  'Ready to Enroll',
  'Enrolled',
  'Denied',
  'Withdrawn'
];

export const CONTACT_TYPES = [
  'Inbound',
  'Outbound',
  'Email',
  'Note'
] as const;

export const DOCUMENT_TYPES = [
  'ROI',
  'HIPAA',
  'UAS_Summary',
  'Medicaid_Docs',
  'Other'
] as const;