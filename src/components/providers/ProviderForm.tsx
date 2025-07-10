
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, X, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Provider, SPECIALTIES, BOARD_CERTIFICATIONS, SUFFIXES } from '@/types/provider';

const providerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleInitial: z.string().optional(),
  suffix: z.string().optional(),
  npi: z.string().regex(/^\d{10}$/, 'NPI must be exactly 10 digits'),
  taxonomyCode: z.string().min(1, 'Taxonomy code is required'),
  specialties: z.array(z.string()).min(1, 'At least one specialty is required'),
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
  email: z.string().email('Invalid email format'),
  directPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  fax: z.string().optional(),
  preferredContactMethod: z.enum(['Email', 'Phone', 'Portal']),
  notes: z.string().optional(),
});

type ProviderFormData = z.infer<typeof providerSchema>;

interface ProviderFormProps {
  provider?: Provider;
  onSubmit: (data: ProviderFormData) => void;
  onCancel: () => void;
}

const ProviderForm: React.FC<ProviderFormProps> = ({ provider, onSubmit, onCancel }) => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(provider?.specialties || []);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>(provider?.boardCertifications || []);

  const form = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      firstName: provider?.firstName || '',
      lastName: provider?.lastName || '',
      middleInitial: provider?.middleInitial || '',
      suffix: provider?.suffix || '',
      npi: provider?.npi || '',
      taxonomyCode: provider?.taxonomyCode || '',
      specialties: provider?.specialties || [],
      type: provider?.type || 'Individual',
      status: provider?.status || 'Active',
      contractType: provider?.contractType || 'PAR',
      acceptingNewPatients: provider?.acceptingNewPatients || true,
      stateLicenseNumber: provider?.stateLicenseNumber || '',
      deaNumber: provider?.deaNumber || '',
      caqhId: provider?.caqhId || '',
      boardCertifications: provider?.boardCertifications || [],
      licenseExpirationDate: provider?.licenseExpirationDate ? new Date(provider.licenseExpirationDate) : new Date(),
      medicaidId: provider?.medicaidId || '',
      medicareId: provider?.medicareId || '',
      email: provider?.email || '',
      directPhone: provider?.directPhone || '',
      fax: provider?.fax || '',
      preferredContactMethod: provider?.preferredContactMethod || 'Email',
      notes: provider?.notes || '',
    },
  });

  const addSpecialty = (specialty: string) => {
    if (!selectedSpecialties.includes(specialty)) {
      const newSpecialties = [...selectedSpecialties, specialty];
      setSelectedSpecialties(newSpecialties);
      form.setValue('specialties', newSpecialties);
    }
  };

  const removeSpecialty = (specialty: string) => {
    const newSpecialties = selectedSpecialties.filter(s => s !== specialty);
    setSelectedSpecialties(newSpecialties);
    form.setValue('specialties', newSpecialties);
  };

  const addCertification = (certification: string) => {
    if (!selectedCertifications.includes(certification)) {
      const newCertifications = [...selectedCertifications, certification];
      setSelectedCertifications(newCertifications);
      form.setValue('boardCertifications', newCertifications);
    }
  };

  const removeCertification = (certification: string) => {
    const newCertifications = selectedCertifications.filter(c => c !== certification);
    setSelectedCertifications(newCertifications);
    form.setValue('boardCertifications', newCertifications);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{provider ? 'Edit Provider' : 'Add New Provider'}</CardTitle>
        <CardDescription>
          {provider ? 'Update provider information and credentials' : 'Enter provider information and credentials'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Accordion type="multiple" defaultValue={['basic', 'credentials', 'contact']} className="w-full">
              
              {/* Basic Information */}
              <AccordionItem value="basic">
                <AccordionTrigger>Basic Information</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="suffix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Suffix</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select suffix" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SUFFIXES.map((suffix) => (
                                <SelectItem key={suffix} value={suffix}>
                                  {suffix}
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
                      name="npi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NPI *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="10-digit NPI" maxLength={10} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provider Type *</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
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
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
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
                  </div>

                  <div className="space-y-2">
                    <Label>Specialties *</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedSpecialties.map((specialty) => (
                        <div key={specialty} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                          {specialty}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-4 w-4 p-0"
                            onClick={() => removeSpecialty(specialty)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Select onValueChange={addSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPECIALTIES.filter(s => !selectedSpecialties.includes(s)).map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contractType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contract Type *</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
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
                        <FormItem>
                          <FormLabel>Accepting New Patients *</FormLabel>
                          <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value === 'true')}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Credentials & Licensing */}
              <AccordionItem value="credentials">
                <AccordionTrigger>Credentials & Licensing</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      name="taxonomyCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taxonomy Code *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Board Certifications</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedCertifications.map((cert) => (
                        <div key={cert} className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                          {cert}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-4 w-4 p-0"
                            onClick={() => removeCertification(cert)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Select onValueChange={addCertification}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add board certification" />
                      </SelectTrigger>
                      <SelectContent>
                        {BOARD_CERTIFICATIONS.filter(c => !selectedCertifications.includes(c)).map((cert) => (
                          <SelectItem key={cert} value={cert}>
                            {cert}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
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
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
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
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Contact Information */}
              <AccordionItem value="contact">
                <AccordionTrigger>Contact Information</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fax</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <Select value={field.value} onValueChange={field.onChange}>
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
                </AccordionContent>
              </AccordionItem>

              {/* Notes */}
              <AccordionItem value="notes">
                <AccordionTrigger>Notes & Comments</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} placeholder="Additional notes or comments..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-end space-x-2 pt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {provider ? 'Update Provider' : 'Create Provider'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProviderForm;
