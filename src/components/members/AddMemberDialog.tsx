import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User,
  Phone,
  Shield,
  FileText,
  Upload,
  Save,
  X
} from 'lucide-react';
import { Member, GENDERS, CONTACT_METHODS, INTAKE_SOURCES, PRIORITIES } from '@/types/member';

interface AddMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onMemberAdded: (member: Member) => void;
}

export const AddMemberDialog = ({ open, onClose, onMemberAdded }: AddMemberDialogProps) => {
  const [activeTab, setActiveTab] = useState('demographics');
  const [formData, setFormData] = useState({
    // Demographics
    firstName: '',
    lastName: '',
    middleInitial: '',
    dateOfBirth: '',
    gender: '' as any,
    ssn: '',
    
    // Contact
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    county: '',
    preferredContactMethod: '' as any,
    communicationPreferences: [] as string[],
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: '',
    
    // Insurance
    primaryCarrier: '',
    primaryPlanName: '',
    primaryMemberId: '',
    primaryGroupNumber: '',
    primaryEffectiveDate: '',
    primaryExpirationDate: '',
    medicaidId: '',
    medicareId: '',
    
    // Intake
    intakeSource: '' as any,
    referralSource: '',
    referringProvider: '',
    priority: '' as any,
    diagnoses: '',
    medications: '',
    allergies: '',
    notes: ''
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.primaryPhone) {
      alert('Please fill in all required fields');
      return;
    }

    // Create member object
    const newMember: Member = {
      id: `MEM-${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleInitial: formData.middleInitial || undefined,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      ssn: formData.ssn || undefined,
      currentStatus: 'Not Enrolled',
      contactInfo: {
        primaryPhone: formData.primaryPhone,
        secondaryPhone: formData.secondaryPhone || undefined,
        email: formData.email || undefined,
        address: {
          street1: formData.street1,
          street2: formData.street2 || undefined,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          county: formData.county || undefined
        },
        emergencyContact: formData.emergencyName ? {
          name: formData.emergencyName,
          relationship: formData.emergencyRelationship,
          phone: formData.emergencyPhone,
          email: formData.emergencyEmail || undefined
        } : undefined,
        preferredContactMethod: formData.preferredContactMethod,
        communicationPreferences: formData.communicationPreferences
      },
      insuranceInfo: {
        primaryInsurance: {
          carrier: formData.primaryCarrier,
          planName: formData.primaryPlanName,
          memberId: formData.primaryMemberId,
          groupNumber: formData.primaryGroupNumber || undefined,
          effectiveDate: formData.primaryEffectiveDate,
          expirationDate: formData.primaryExpirationDate || undefined
        },
        medicaidId: formData.medicaidId || undefined,
        medicareId: formData.medicareId || undefined
      },
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      intakes: []
    };

    onMemberAdded(newMember);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      middleInitial: '',
      dateOfBirth: '',
      gender: '',
      ssn: '',
      primaryPhone: '',
      secondaryPhone: '',
      email: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
      county: '',
      preferredContactMethod: '',
      communicationPreferences: [],
      emergencyName: '',
      emergencyRelationship: '',
      emergencyPhone: '',
      emergencyEmail: '',
      primaryCarrier: '',
      primaryPlanName: '',
      primaryMemberId: '',
      primaryGroupNumber: '',
      primaryEffectiveDate: '',
      primaryExpirationDate: '',
      medicaidId: '',
      medicareId: '',
      intakeSource: '',
      referralSource: '',
      referringProvider: '',
      priority: '',
      diagnoses: '',
      medications: '',
      allergies: '',
      notes: ''
    });
    setActiveTab('demographics');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Add New Member</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="intake">Initial Intake</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="middleInitial">Middle Initial</Label>
                    <Input
                      id="middleInitial"
                      value={formData.middleInitial}
                      onChange={(e) => updateFormData('middleInitial', e.target.value)}
                      maxLength={1}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENDERS.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ssn">SSN</Label>
                    <Input
                      id="ssn"
                      value={formData.ssn}
                      onChange={(e) => updateFormData('ssn', e.target.value)}
                      placeholder="***-**-****"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryPhone">Primary Phone *</Label>
                      <Input
                        id="primaryPhone"
                        value={formData.primaryPhone}
                        onChange={(e) => updateFormData('primaryPhone', e.target.value)}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                      <Input
                        id="secondaryPhone"
                        value={formData.secondaryPhone}
                        onChange={(e) => updateFormData('secondaryPhone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="street1">Street Address *</Label>
                      <Input
                        id="street1"
                        value={formData.street1}
                        onChange={(e) => updateFormData('street1', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="street2">Street Address 2</Label>
                      <Input
                        id="street2"
                        value={formData.street2}
                        onChange={(e) => updateFormData('street2', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => updateFormData('state', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => updateFormData('zipCode', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="county">County</Label>
                      <Input
                        id="county"
                        value={formData.county}
                        onChange={(e) => updateFormData('county', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                    <Select value={formData.preferredContactMethod} onValueChange={(value) => updateFormData('preferredContactMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred method" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTACT_METHODS.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyName">Contact Name</Label>
                      <Input
                        id="emergencyName"
                        value={formData.emergencyName}
                        onChange={(e) => updateFormData('emergencyName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyRelationship">Relationship</Label>
                      <Input
                        id="emergencyRelationship"
                        value={formData.emergencyRelationship}
                        onChange={(e) => updateFormData('emergencyRelationship', e.target.value)}
                        placeholder="Spouse, Child, etc."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyEmail">Email Address</Label>
                      <Input
                        id="emergencyEmail"
                        type="email"
                        value={formData.emergencyEmail}
                        onChange={(e) => updateFormData('emergencyEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insurance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Insurance Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryCarrier">Primary Insurance Carrier *</Label>
                    <Input
                      id="primaryCarrier"
                      value={formData.primaryCarrier}
                      onChange={(e) => updateFormData('primaryCarrier', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryPlanName">Plan Name *</Label>
                    <Input
                      id="primaryPlanName"
                      value={formData.primaryPlanName}
                      onChange={(e) => updateFormData('primaryPlanName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryMemberId">Member ID *</Label>
                    <Input
                      id="primaryMemberId"
                      value={formData.primaryMemberId}
                      onChange={(e) => updateFormData('primaryMemberId', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryGroupNumber">Group Number</Label>
                    <Input
                      id="primaryGroupNumber"
                      value={formData.primaryGroupNumber}
                      onChange={(e) => updateFormData('primaryGroupNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryEffectiveDate">Effective Date *</Label>
                    <Input
                      id="primaryEffectiveDate"
                      type="date"
                      value={formData.primaryEffectiveDate}
                      onChange={(e) => updateFormData('primaryEffectiveDate', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryExpirationDate">Expiration Date</Label>
                    <Input
                      id="primaryExpirationDate"
                      type="date"
                      value={formData.primaryExpirationDate}
                      onChange={(e) => updateFormData('primaryExpirationDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="medicaidId">Medicaid ID</Label>
                    <Input
                      id="medicaidId"
                      value={formData.medicaidId}
                      onChange={(e) => updateFormData('medicaidId', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicareId">Medicare ID</Label>
                    <Input
                      id="medicareId"
                      value={formData.medicareId}
                      onChange={(e) => updateFormData('medicareId', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intake">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Initial Intake Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="intakeSource">Intake Source</Label>
                    <Select value={formData.intakeSource} onValueChange={(value) => updateFormData('intakeSource', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {INTAKE_SOURCES.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => updateFormData('priority', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRIORITIES.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="referralSource">Referral Source</Label>
                    <Input
                      id="referralSource"
                      value={formData.referralSource}
                      onChange={(e) => updateFormData('referralSource', e.target.value)}
                      placeholder="Hospital, Physician, etc."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="referringProvider">Referring Provider</Label>
                  <Input
                    id="referringProvider"
                    value={formData.referringProvider}
                    onChange={(e) => updateFormData('referringProvider', e.target.value)}
                    placeholder="Dr. Smith, NP Jones, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="diagnoses">Primary Diagnoses</Label>
                  <Textarea
                    id="diagnoses"
                    value={formData.diagnoses}
                    onChange={(e) => updateFormData('diagnoses', e.target.value)}
                    placeholder="Diabetes Type 2, Hypertension, etc. (comma separated)"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea
                    id="medications"
                    value={formData.medications}
                    onChange={(e) => updateFormData('medications', e.target.value)}
                    placeholder="Metformin 500mg BID, Lisinopril 10mg daily, etc."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => updateFormData('allergies', e.target.value)}
                    placeholder="Penicillin, Shellfish, NKDA, etc."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    placeholder="Any additional relevant information..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleClose}>
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-1" />
            Save Member
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};