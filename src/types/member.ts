export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | 'Unknown';
  ssn?: string;
  contactInfo: ContactInfo;
  insuranceInfo: InsuranceInfo;
  createdDate: string;
  updatedDate: string;
  intakes: Intake[];
  currentStatus: MemberStatus;
}

export interface ContactInfo {
  primaryPhone: string;
  secondaryPhone?: string;
  email?: string;
  address: Address;
  emergencyContact?: EmergencyContact;
  preferredContactMethod: 'Phone' | 'Email' | 'Mail';
  communicationPreferences: string[];
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  county?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface InsuranceInfo {
  primaryInsurance: Insurance;
  secondaryInsurance?: Insurance;
  medicaidId?: string;
  medicareId?: string;
}

export interface Insurance {
  carrier: string;
  planName: string;
  memberId: string;
  groupNumber?: string;
  effectiveDate: string;
  expirationDate?: string;
  copay?: number;
  deductible?: number;
}

export interface Intake {
  id: string;
  memberId: string;
  intakeSource: 'Phone' | 'PDF' | 'Online' | 'Fax' | 'Mail';
  referralSource: string;
  referringProvider?: string;
  intakeDate: string;
  currentStatus: IntakeStatus;
  statusHistory: StatusChange[];
  notes: string;
  assignedTo?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  diagnoses: string[];
  medications: string[];
  allergies: string[];
  functionalStatus?: string;
  cognitiveStatus?: string;
  socialDeterminants?: SocialDeterminants;
}

export interface SocialDeterminants {
  housing: 'Stable' | 'Unstable' | 'Homeless' | 'Unknown';
  transportation: 'Available' | 'Limited' | 'None' | 'Unknown';
  foodSecurity: 'Secure' | 'Insecure' | 'Unknown';
  socialSupport: 'Strong' | 'Moderate' | 'Limited' | 'None';
  incomeLevel: 'Low' | 'Medium' | 'High' | 'Unknown';
}

export interface StatusChange {
  id: string;
  fromStatus: IntakeStatus;
  toStatus: IntakeStatus;
  changeDate: string;
  changedBy: string;
  reason: string;
  notes?: string;
}

export interface Assessment {
  id: string;
  memberId: string;
  intakeId: string;
  assessmentType: AssessmentType;
  assessmentDate: string;
  completedBy: string;
  dueDate?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
  outcome?: string;
  score?: number;
  recommendations?: string[];
  nextAssessmentDue?: string;
  documents: string[];
}

export interface MaximusSubmission {
  id: string;
  memberId: string;
  intakeId: string;
  fileName: string;
  submissionDate: string;
  status: 'Pending' | 'Queued' | 'Sent' | 'Acknowledged' | 'Error' | 'Rejected';
  sentBy: string;
  acknowledgedDate?: string;
  errorMessage?: string;
  retryCount: number;
  fileSize: number;
  checksum: string;
}

export interface AuditTrail {
  id: string;
  entityName: 'Members' | 'Intakes' | 'Assessments' | 'MaximusSubmissions';
  entityId: string;
  actionType: 'Create' | 'Update' | 'Delete' | 'SendToMaximus' | 'StatusChange' | 'AssessmentComplete';
  actionBy: string;
  actionDate: string;
  oldValue?: string;
  newValue?: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
}

export type MemberStatus = 'Not Enrolled' | 'Active' | 'Enrolled' | 'Exited' | 'Disenrolled';

export type IntakeStatus = 'Pending' | 'In Review' | 'Approved' | 'Denied' | 'On Hold' | 'Completed' | 'Cancelled';

export type AssessmentType = 
  | 'Initial Assessment'
  | 'Annual Assessment' 
  | 'Semi-Annual Assessment'
  | 'Quarterly Assessment'
  | 'Cognitive Assessment'
  | 'Functional Assessment'
  | 'Psychosocial Assessment'
  | 'Nutritional Assessment'
  | 'Pain Assessment'
  | 'Fall Risk Assessment'
  | 'Medication Review'
  | 'Care Plan Review'
  | 'Other';

export const MEMBER_STATUSES: MemberStatus[] = [
  'Not Enrolled',
  'Active', 
  'Enrolled',
  'Exited',
  'Disenrolled'
];

export const INTAKE_STATUSES: IntakeStatus[] = [
  'Pending',
  'In Review',
  'Approved',
  'Denied',
  'On Hold',
  'Completed',
  'Cancelled'
];

export const ASSESSMENT_TYPES: AssessmentType[] = [
  'Initial Assessment',
  'Annual Assessment',
  'Semi-Annual Assessment', 
  'Quarterly Assessment',
  'Cognitive Assessment',
  'Functional Assessment',
  'Psychosocial Assessment',
  'Nutritional Assessment',
  'Pain Assessment',
  'Fall Risk Assessment',
  'Medication Review',
  'Care Plan Review',
  'Other'
];

export const INTAKE_SOURCES = [
  'Phone',
  'PDF',
  'Online',
  'Fax',
  'Mail'
] as const;

export const GENDERS = [
  'Male',
  'Female', 
  'Other',
  'Unknown'
] as const;

export const CONTACT_METHODS = [
  'Phone',
  'Email',
  'Mail'
] as const;

export const PRIORITIES = [
  'Low',
  'Medium',
  'High', 
  'Urgent'
] as const;