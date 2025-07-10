
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, User, Building, MapPin, Phone, Mail, FileText, Award, Plus, X, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { Provider, Organization, Location, SPECIALTIES, TAXONOMY_CODES, US_STATES } from '@/types/provider';

const providerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleInitial: z.string().max(1).optional(),
  suffix: z.string().optional(),
  npi: z.string().regex(/^\d{10}$/, 'NPI must be exactly 10 digits'),
  taxonomyCode: z.string().min(1, 'Taxonomy code is required'),
  specialty: z.array(z.string()).min(1, 'At least one specialty is required'),
  type: z.enum(['Individual', 'Organization']),
  status: z.enum(['Active', 'Inactive']),
  contractType: z.enum(['PAR', 'Non-PAR']),
  acceptingNewPatients: z.boolean(),
  stateLicenseNumber: z.string().min(1, 'State license number is required'),
  deaNumber: z.string().optional(),
  caqhId: z.string().min(1, 'CAQH ID is required'),
  boardCertifications: z.array(z.string()),
  licenseExpirationDate: z.date(),
  medicaidId: z.string().optional(),
  medicareId: z.string().optional(),
  email: z.string().email('Invalid email address'),
  directPhone: z.string().min(1, 'Direct phone is required'),
  fax: z.string().optional(),
  preferredContactMethod: z.enum(['Email', 'Phone', 'Portal']),
  notes: z.string().optional(),
});

type ProviderFormData = z.infer<typeof providerSchema>;

interface ProviderFormProps {
  provider?: Provider;
  onSave: (data: ProviderFormData) => void;
  onCancel: () => void;
}

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'PACE Healthcare Center',
    type: 'Healthcare Facility',
    npi: '1234567890',
    status: 'Active',
    locations: [
      {
        id: '1',
        name: 'Main Campus',
        address: { street1: '123 Healthcare Dr', city: 'Medical City', state: 'CA', zipCode: '90210' },
        phone: '(555) 123-4567',
        organizationId: '1',
        status: 'Active'
      },
      {
        id: '2',
        name: 'Outpatient Clinic',
        address: { street1: '456 Wellness Ave', city: 'Medical City', state: 'CA', zipCode: '90211' },
        phone: '(555) 123-4568',
        organizationId: '1',
        status: 'Active'
      }
    ]
  },
  {
    id: '2',
    name: 'Community Health Partners',
    type: 'Medical Group',
    status: 'Active',
    locations: [
      {
        id: '3',
        name: 'Downtown Office',
        address: { street1: '789 Main St', city: 'Downtown', state: 'CA', zipCode: '90212' },
        phone: '(555) 987-6543',
        organizationId: '2',
        status: 'Active'
      }
    ]
  }
];

export function ProviderForm({ provider, onSave, onCancel }: ProviderFormProps) {
  const [selectedOrganizations, setSelectedOrganizations] = useState<Organization[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [organizationSearch, setOrganizationSearch] = useState('');
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);

  const form = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      firstName: provider?.firstName || '',
      lastName: provider?.lastName || '',
      middleInitial: provider?.middleInitial || '',
      suffix: provider?.suffix || '',
      npi: provider?.npi || '',
      taxonomyCode: provider?.taxonomyCode || '',
      specialty: provider?.specialty || [],
      type: provider?.type || 'Individual',
      status: provider?.status || 'Active',
      contractType: provider?.contractType || 'PAR',
      acceptingNewPatients: provider?.acceptingNewPatients ?? true,
      stateLicenseNumber: provider?.stateLicenseNumber || '',
      deaNumber: provider?.deaNumber || '',
      caqhId: provider?.caqhId || '',
      boardCertifications: provider?.boardCertifications || [],
      licenseExpirationDate: provider?.licenseExpirationDate || new Date(),
      medicaidId: provider?.medicaidId || '',
      medicareId: provider?.medicareId || '',
      email: provider?.email || '',
      directPhone: provider?.directPhone || '',
      fax: provider?.fax || '',
      preferredContactMethod: provider?.preferredContactMethod || 'Email',
      notes: provider?.notes || '',
    },
  });

  const handleSpecialtyToggle = (specialty: string) => {
    const updated = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(s => s !== specialty)
      : [...selectedSpecialties, specialty];
    setSelectedSpecialties(updated);
    form.setValue('specialty', updated);
  };

  const handleCertificationAdd = (certification: string) => {
    if (certification && !selectedCertifications.includes(certification)) {
      const updated = [...selectedCertifications, certification];
      setSelectedCertifications(updated);
      form.setValue('boardCertifications', updated);
    }
  };

  const handleCertificationRemove = (certification: string) => {
    const updated = selectedCertifications.filter(c => c !== certification);
    setSelectedCertifications(updated);
    form.setValue('boardCertifications', updated);
  };

  const handleOrganizationSelect = (org: Organization) => {
    if (!selectedOrganizations.find(o => o.id === org.id)) {
      setSelectedOrganizations([...selectedOrganizations, org]);
    }
    setShowOrgDropdown(false);
    setOrganizationSearch('');
  };

  const handleOrganizationRemove = (orgId: string) => {
    setSelectedOrganizations(selectedOrganizations.filter(o => o.id !== orgId));
    setSelectedLocations(selectedLocations.filter(l => l.organizationId !== orgId));
  };

  const availableLocations = selectedOrganizations.flatMap(org => org.locations);

  const handleLocationToggle = (location: Location) => {
    const updated = selectedLocations.find(l => l.id === location.id)
      ? selectedLocations.filter(l => l.id !== location.id)
      : [...selectedLocations, location];
    setSelectedLocations(updated);
  };

  const filteredOrganizations = mockOrganizations.filter(org =>
    org.name.toLowerCase().includes(organizationSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {provider ? 'Edit Provider' : 'New Provider'}
          </h1>
          <p className="text-gray-600">Manage healthcare provider information and affiliations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSave)}>
            {provider ? 'Update Provider' : 'Create Provider'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
          <Accordion type="multiple" defaultValue={["basic", "credentials", "contact", "affiliations"]} className="w-full">
            
            {/* Basic Information */}
            <AccordionItem value="basic">
              <AccordionTrigger className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Information
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="middleInitial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Middle Initial</FormLabel>
                            <FormControl>
                              <Input {...field} maxLength={1} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="suffix"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Suffix</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select suffix" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="MD">MD</SelectItem>
                                <SelectItem value="DO">DO</SelectItem>
                                <SelectItem value="NP">NP</SelectItem>
                                <SelectItem value="PA">PA</SelectItem>
                                <SelectItem value="RN">RN</SelectItem>
                                <SelectItem value="LPN">LPN</SelectItem>
                                <SelectItem value="PharmD">PharmD</SelectItem>
                                <SelectItem value="PhD">PhD</SelectItem>
                                <SelectItem value="MSW">MSW</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="npi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NPI *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="1234567890"
                                maxLength={10}
                              />
                            </FormControl>
                            <FormDescription>10-digit National Provider Identifier</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="taxonomyCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Taxonomy Code *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select taxonomy" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {TAXONOMY_CODES.map((code) => (
                                  <SelectItem key={code.code} value={code.code}>
                                    {code.code} - {code.description}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provider Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Individual">Individual</SelectItem>
                                <SelectItem value="Organization">Organization</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contractType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contract Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="PAR">PAR (Participating)</SelectItem>
                                <SelectItem value="Non-PAR">Non-PAR</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acceptingNewPatients"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-8">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Accepting New Patients</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Specialties */}
                    <div className="mt-6">
                      <Label className="text-sm font-medium">Specialties *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                        {SPECIALTIES.map((specialty) => (
                          <div key={specialty} className="flex items-center space-x-2">
                            <Checkbox
                              id={specialty}
                              checked={selectedSpecialties.includes(specialty)}
                              onCheckedChange={() => handleSpecialtyToggle(specialty)}
                            />
                            <Label htmlFor={specialty} className="text-sm">
                              {specialty}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {selectedSpecialties.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedSpecialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Credentials & Licensing */}
            <AccordionItem value="credentials">
              <AccordionTrigger className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Credentials & Licensing
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="stateLicenseNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State License Number *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="deaNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>DEA Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="caqhId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CAQH ID *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="medicaidId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medicaid ID</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="medicareId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medicare ID</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="licenseExpirationDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>License Expiration Date *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date()
                                  }
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Board Certifications */}
                    <div className="mt-6">
                      <Label className="text-sm font-medium">Board Certifications</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Add certification..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleCertificationAdd(e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="Add certification..."]') as HTMLInputElement;
                            if (input?.value) {
                              handleCertificationAdd(input.value);
                              input.value = '';
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {selectedCertifications.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedCertifications.map((cert) => (
                            <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                              {cert}
                              <button
                                type="button"
                                onClick={() => handleCertificationRemove(cert)}
                                className="ml-1 hover:text-red-500"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Contact Information */}
            <AccordionItem value="contact">
              <AccordionTrigger className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="directPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Direct Phone *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="(555) 123-4567" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fax"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fax</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="(555) 123-4567" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredContactMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Contact Method *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Email">Email</SelectItem>
                                <SelectItem value="Phone">Phone</SelectItem>
                                <SelectItem value="Portal">Portal</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Organizational Affiliations */}
            <AccordionItem value="affiliations">
              <AccordionTrigger className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Organizational Affiliations
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    {/* Organization Selection */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Organizations</Label>
                        <Popover open={showOrgDropdown} onOpenChange={setShowOrgDropdown}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={showOrgDropdown}
                              className="w-full justify-between mt-2"
                            >
                              Select organizations...
                              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search organizations..."
                                value={organizationSearch}
                                onValueChange={setOrganizationSearch}
                              />
                              <CommandList>
                                <CommandEmpty>No organizations found.</CommandEmpty>
                                <CommandGroup>
                                  {filteredOrganizations.map((org) => (
                                    <CommandItem
                                      key={org.id}
                                      onSelect={() => handleOrganizationSelect(org)}
                                    >
                                      <div className="flex flex-col">
                                        <span className="font-medium">{org.name}</span>
                                        <span className="text-sm text-gray-500">{org.type}</span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Selected Organizations */}
                      {selectedOrganizations.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Selected Organizations</Label>
                          {selectedOrganizations.map((org) => (
                            <div key={org.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <span className="font-medium">{org.name}</span>
                                <span className="text-sm text-gray-500 ml-2">({org.type})</span>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleOrganizationRemove(org.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Location Selection */}
                      {availableLocations.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Practice Locations</Label>
                          <div className="space-y-2">
                            {availableLocations.map((location) => (
                              <div key={location.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                <Checkbox
                                  id={location.id}
                                  checked={selectedLocations.some(l => l.id === location.id)}
                                  onCheckedChange={() => handleLocationToggle(location)}
                                />
                                <div className="flex-1">
                                  <Label htmlFor={location.id} className="font-medium">
                                    {location.name}
                                  </Label>
                                  <p className="text-sm text-gray-500">
                                    {location.address.street1}, {location.address.city}, {location.address.state} {location.address.zipCode}
                                  </p>
                                  <p className="text-sm text-gray-500">{location.phone}</p>
                                </div>
                                <MapPin className="h-4 w-4 text-gray-400" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Notes */}
            <AccordionItem value="notes">
              <AccordionTrigger className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes & Comments
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter any additional notes or comments about this provider..."
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
}
