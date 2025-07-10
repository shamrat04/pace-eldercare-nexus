
export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  suffix?: string;
  npi: string; // 10-digit National Provider Identifier
  taxonomyCode: string;
  specialty: string[];
  type: 'Individual' | 'Organization';
  status: 'Active' | 'Inactive';
  contractType: 'PAR' | 'Non-PAR';
  acceptingNewPatients: boolean;
  
  // Licensing & Credentials
  stateLicenseNumber: string;
  deaNumber?: string;
  caqhId: string;
  boardCertifications: string[];
  licenseExpirationDate: Date;
  medicaidId?: string;
  medicareId?: string;
  
  // Contact Information
  email: string;
  directPhone: string;
  fax?: string;
  preferredContactMethod: 'Email' | 'Phone' | 'Portal';
  
  // Administrative Metadata
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
  notes?: string;
  
  // Relationships
  organizations: ProviderOrganization[];
  locations: ProviderLocation[];
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  npi?: string;
  status: 'Active' | 'Inactive';
  locations: Location[];
}

export interface Location {
  id: string;
  name: string;
  address: Address;
  phone: string;
  fax?: string;
  organizationId: string;
  status: 'Active' | 'Inactive';
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ProviderOrganization {
  id: string;
  providerId: string;
  organizationId: string;
  organization: Organization;
  isPrimary: boolean;
  effectiveDate: Date;
  endDate?: Date;
  contractDetails?: string;
}

export interface ProviderLocation {
  id: string;
  providerId: string;
  locationId: string;
  location: Location;
  organizationId: string;
  isPrimary: boolean;
  effectiveDate: Date;
  endDate?: Date;
  daysOfWeek: string[];
  hoursOfOperation?: string;
  notes?: string;
}

export const SPECIALTIES = [
  'Internal Medicine',
  'Family Medicine',
  'Cardiology',
  'Neurology',
  'Psychiatry',
  'Physical Therapy',
  'Occupational Therapy',
  'Speech Therapy',
  'Social Work',
  'Nursing',
  'Pharmacy',
  'Nutrition',
  'Other'
];

export const TAXONOMY_CODES = [
  { code: '207Q00000X', description: 'Family Medicine' },
  { code: '207R00000X', description: 'Internal Medicine' },
  { code: '208D00000X', description: 'General Practice' },
  { code: '363L00000X', description: 'Nurse Practitioner' },
  { code: '363A00000X', description: 'Physician Assistant' },
  { code: '225100000X', description: 'Physical Therapist' },
  { code: '225X00000X', description: 'Occupational Therapist' },
  { code: '235Z00000X', description: 'Speech-Language Pathologist' },
  { code: '104100000X', description: 'Social Worker' },
];

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
