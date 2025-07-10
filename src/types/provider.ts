
export interface Provider {
  id: string;
  // Core Information
  firstName: string;
  lastName: string;
  middleInitial?: string;
  suffix?: string;
  npi: string; // 10-digit National Provider Identifier
  taxonomyCode: string;
  specialties: string[];
  type: 'Individual' | 'Organization';
  status: 'Active' | 'Inactive';
  
  // Provider Type
  contractType: 'PAR' | 'Non-PAR';
  acceptingNewPatients: boolean;
  
  // Licensing & Credentials
  stateLicenseNumber: string;
  deaNumber?: string;
  caqhId: string;
  boardCertifications: string[];
  licenseExpirationDate: string;
  medicaidId?: string;
  medicareId?: string;
  
  // Contact Information
  email: string;
  directPhone: string;
  fax?: string;
  preferredContactMethod: 'Email' | 'Phone' | 'Portal';
  
  // Administrative Metadata
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
  notes?: string;
  
  // Relationships
  organizations: ProviderOrganization[];
  locations: ProviderLocation[];
  primaryOrganizationId?: string;
  primaryLocationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  npi?: string;
  address: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
  locations: Location[];
}

export interface Location {
  id: string;
  organizationId: string;
  name: string;
  address: string;
  phone: string;
  fax?: string;
  email?: string;
  status: 'Active' | 'Inactive';
}

export interface ProviderOrganization {
  id: string;
  providerId: string;
  organizationId: string;
  effectiveDate: string;
  endDate?: string;
  isPrimary: boolean;
  contractType: 'PAR' | 'Non-PAR';
  notes?: string;
}

export interface ProviderLocation {
  id: string;
  providerId: string;
  locationId: string;
  organizationId: string;
  effectiveDate: string;
  endDate?: string;
  isPrimary: boolean;
  daysOfWeek: string[];
  hoursOfAvailability: string;
  notes?: string;
}

export const SPECIALTIES = [
  'Internal Medicine',
  'Family Medicine',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Psychiatry',
  'Dermatology',
  'Emergency Medicine',
  'Pediatrics',
  'Radiology',
  'Surgery',
  'Other'
] as const;

export const BOARD_CERTIFICATIONS = [
  'American Board of Internal Medicine',
  'American Board of Family Medicine',
  'American Board of Cardiology',
  'American Board of Neurology',
  'American Board of Orthopedic Surgery',
  'American Board of Psychiatry and Neurology',
  'American Board of Dermatology',
  'American Board of Emergency Medicine',
  'American Board of Pediatrics',
  'American Board of Radiology',
  'American Board of Surgery',
  'Other'
] as const;

export const SUFFIXES = [
  'MD',
  'DO',
  'NP',
  'PA',
  'RN',
  'PharmD',
  'PhD',
  'Other'
] as const;
