import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  UserPlus, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Upload, 
  FileText, 
  Calendar,
  Phone,
  Mail,
  StickyNote,
  Users,
  Activity
} from 'lucide-react';
import { PACEMember, PACEIntakeRecord, PACEStatus, CallLogEntry, TimelineEvent } from '@/types/pace';

// Mock data for demonstration
const mockMember: PACEMember = {
  id: 'PACE-001',
  firstName: 'Maria',
  lastName: 'Rodriguez',
  dateOfBirth: '1945-03-15',
  medicaidCIN: 'NY12345678',
  address: {
    street1: '123 Main Street',
    city: 'Rochester',
    state: 'NY',
    zipCode: '14620'
  },
  referralSource: 'Monroe County DSS',
  currentStatus: 'UAS Completed',
  createdDate: '2024-01-15',
  updatedDate: '2024-01-20'
};

const mockIntakeRecord: PACEIntakeRecord = {
  id: 'INT-001',
  memberId: 'PACE-001',
  eligibilityChecklist: {
    medicaidStatus: 'Active',
    hasCIN: true,
    activeFlag: true,
    applicationDate: '2024-01-15',
    applicationOutcome: 'Approved',
    epacesIntegrated: false
  },
  uasAssessment: {
    id: 'UAS-001',
    memberId: 'PACE-001',
    status: 'Completed',
    nhLOCMet: true,
    completedDate: '2024-01-18',
    assessor: 'Jane Smith, RN',
    communitySafetyCriteria: true,
    ageCriteria: true,
    trackingNotes: 'Assessment completed successfully. NH LOC criteria met.'
  },
  idtChecklist: {
    rn: { assigned: true, name: 'Jane Smith', contactDate: '2024-01-19' },
    pcp: { assigned: true, name: 'Dr. Johnson', contactDate: '2024-01-19' },
    pt: { assigned: false },
    sw: { assigned: true, name: 'Mike Wilson', contactDate: '2024-01-20' }
  },
  enrollmentPacket: {
    roiReceived: true,
    roiDate: '2024-01-16',
    hipaaReceived: true,
    hipaaDate: '2024-01-16',
    uasSummaryReceived: true,
    medicaidDocsReceived: false,
    documents: []
  },
  finalStatus: 'IDT Review',
  timeline: [],
  notes: [],
  createdDate: '2024-01-15',
  updatedDate: '2024-01-20',
  createdBy: 'admin'
};

export default function PACEIntakePage() {
  const [selectedMember, setSelectedMember] = useState<PACEMember>(mockMember);
  const [intakeRecord, setIntakeRecord] = useState<PACEIntakeRecord>(mockIntakeRecord);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newCallLog, setNewCallLog] = useState<Partial<CallLogEntry>>({});

  const getStatusColor = (status: PACEStatus) => {
    const statusColors = {
      'Inquiry': 'bg-gray-100 text-gray-800',
      'Application Submitted': 'bg-blue-100 text-blue-800',
      'Eligibility Review': 'bg-yellow-100 text-yellow-800',
      'UAS Scheduled': 'bg-orange-100 text-orange-800',
      'UAS Completed': 'bg-purple-100 text-purple-800',
      'IDT Review': 'bg-indigo-100 text-indigo-800',
      'Ready to Enroll': 'bg-green-100 text-green-800',
      'Enrolled': 'bg-emerald-100 text-emerald-800',
      'Denied': 'bg-red-100 text-red-800',
      'Withdrawn': 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const calculateProgress = () => {
    let completed = 0;
    let total = 8;

    if (intakeRecord.eligibilityChecklist.medicaidStatus === 'Active') completed++;
    if (intakeRecord.eligibilityChecklist.hasCIN) completed++;
    if (intakeRecord.uasAssessment.status === 'Completed') completed++;
    if (intakeRecord.uasAssessment.nhLOCMet) completed++;
    if (intakeRecord.idtChecklist.rn.assigned) completed++;
    if (intakeRecord.idtChecklist.pcp.assigned) completed++;
    if (intakeRecord.enrollmentPacket.roiReceived) completed++;
    if (intakeRecord.enrollmentPacket.hipaaReceived) completed++;

    return (completed / total) * 100;
  };

  const canEnroll = () => {
    return intakeRecord.eligibilityChecklist.medicaidStatus === 'Active' &&
           intakeRecord.eligibilityChecklist.hasCIN &&
           intakeRecord.uasAssessment.status === 'Completed' &&
           intakeRecord.uasAssessment.nhLOCMet &&
           intakeRecord.idtChecklist.rn.assigned &&
           intakeRecord.idtChecklist.pcp.assigned &&
           intakeRecord.enrollmentPacket.roiReceived &&
           intakeRecord.enrollmentPacket.hipaaReceived;
  };

  const shouldWarnMedicaid = () => {
    if (intakeRecord.eligibilityChecklist.medicaidStatus === 'Pending' && 
        intakeRecord.eligibilityChecklist.applicationDate) {
      const appDate = new Date(intakeRecord.eligibilityChecklist.applicationDate);
      const daysDiff = Math.floor((Date.now() - appDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff > 30;
    }
    return false;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">PACE Intake & Enrollment</h1>
          <p className="text-muted-foreground mt-1">Intake Coordinator Dashboard - New York State</p>
        </div>
        <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New PACE Member</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label>First Name</Label>
                <Input placeholder="Enter first name" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input placeholder="Enter last name" />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Medicaid CIN</Label>
                <Input placeholder="NY12345678" />
              </div>
              <div className="col-span-2">
                <Label>Referral Source</Label>
                <Input placeholder="Enter referral source" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddMember(false)}>Cancel</Button>
              <Button>Create Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Member Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">
                {selectedMember.firstName} {selectedMember.lastName}
              </CardTitle>
              <div className="text-sm text-muted-foreground mt-2 space-y-1">
                <p>DOB: {new Date(selectedMember.dateOfBirth).toLocaleDateString()}</p>
                <p>Medicaid CIN: {selectedMember.medicaidCIN || 'Not Available'}</p>
                <p>Address: {selectedMember.address.street1}, {selectedMember.address.city}, {selectedMember.address.state} {selectedMember.address.zipCode}</p>
                <p>Referral Source: {selectedMember.referralSource}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className={getStatusColor(selectedMember.currentStatus)}>
                {selectedMember.currentStatus}
              </Badge>
              <div className="mt-2">
                <Progress value={calculateProgress()} className="w-40" />
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round(calculateProgress())}% Complete
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Warning Alerts */}
      {shouldWarnMedicaid() && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Warning: Medicaid application has been pending for more than 30 days.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="intake" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="intake">Intake & Eligibility</TabsTrigger>
          <TabsTrigger value="uas">UAS & IDT</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="timeline">Timeline & Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="intake" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Eligibility Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Eligibility Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Medicaid Status</Label>
                  <Badge className={intakeRecord.eligibilityChecklist.medicaidStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {intakeRecord.eligibilityChecklist.medicaidStatus}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Has CIN</Label>
                  <Checkbox checked={intakeRecord.eligibilityChecklist.hasCIN} />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Active Flag</Label>
                  <Checkbox checked={intakeRecord.eligibilityChecklist.activeFlag} />
                </div>
                
                <Separator />
                
                <div>
                  <Label>Application Date</Label>
                  <Input 
                    type="date" 
                    value={intakeRecord.eligibilityChecklist.applicationDate}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Application Outcome</Label>
                  <Select value={intakeRecord.eligibilityChecklist.applicationOutcome}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Denied">Denied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* ePACES Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  ePACES Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>ePACES Connected</Label>
                  <Badge className={intakeRecord.eligibilityChecklist.epacesIntegrated ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {intakeRecord.eligibilityChecklist.epacesIntegrated ? 'Connected' : 'Manual Entry'}
                  </Badge>
                </div>
                
                {!intakeRecord.eligibilityChecklist.epacesIntegrated && (
                  <Alert>
                    <AlertDescription>
                      ePACES integration not available. Manual data entry required.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Refresh ePACES Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    Manual Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="uas" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* UAS Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  UAS Assessment Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Assessment Status</Label>
                  <Badge className={intakeRecord.uasAssessment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {intakeRecord.uasAssessment.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>NH LOC Met</Label>
                  <Checkbox checked={intakeRecord.uasAssessment.nhLOCMet} />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Community Safety Criteria</Label>
                  <Checkbox checked={intakeRecord.uasAssessment.communitySafetyCriteria} />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Age Criteria</Label>
                  <Checkbox checked={intakeRecord.uasAssessment.ageCriteria} />
                </div>
                
                <div>
                  <Label>Completed Date</Label>
                  <Input 
                    type="date" 
                    value={intakeRecord.uasAssessment.completedDate}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Assessor</Label>
                  <Input 
                    value={intakeRecord.uasAssessment.assessor}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Tracking Notes</Label>
                  <Textarea 
                    value={intakeRecord.uasAssessment.trackingNotes}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* IDT Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  IDT Team Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(intakeRecord.idtChecklist).map(([role, status]) => (
                  <div key={role} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="capitalize">{role.toUpperCase()}</Label>
                      <Checkbox checked={status.assigned} />
                    </div>
                    {status.assigned && (
                      <div className="ml-4 space-y-2">
                        <Input 
                          placeholder="Team member name"
                          value={status.name || ''}
                          className="text-sm"
                        />
                        <Input 
                          type="date"
                          value={status.contactDate || ''}
                          className="text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Enrollment Packet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>ROI Received</Label>
                    <Checkbox checked={intakeRecord.enrollmentPacket.roiReceived} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>HIPAA Received</Label>
                    <Checkbox checked={intakeRecord.enrollmentPacket.hipaaReceived} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>UAS Summary Received</Label>
                    <Checkbox checked={intakeRecord.enrollmentPacket.uasSummaryReceived} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Medicaid Docs Received</Label>
                    <Checkbox checked={intakeRecord.enrollmentPacket.medicaidDocsReceived} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Signature Date</Label>
                    <Input 
                      type="date" 
                      value={intakeRecord.enrollmentPacket.signatureDate}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Enrollment Date</Label>
                    <Input 
                      type="date" 
                      value={intakeRecord.enrollmentPacket.enrollmentDate}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Final Enrollment Status</h3>
                  <p className="text-sm text-muted-foreground">
                    All requirements must be met to enable enrollment
                  </p>
                </div>
                <Button 
                  disabled={!canEnroll()}
                  className={canEnroll() ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {canEnroll() ? 'Enroll Member' : 'Requirements Not Met'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Progress Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Application Submitted</p>
                      <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">UAS Assessment Completed</p>
                      <p className="text-sm text-muted-foreground">Jan 18, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">IDT Review In Progress</p>
                      <p className="text-sm text-muted-foreground">Jan 20, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call Log / Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StickyNote className="h-5 w-5" />
                  Call Log & Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">Outbound Call</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Jan 20, 2024</span>
                    </div>
                    <p className="text-sm">Contacted member to schedule IDT meeting. Left voicemail.</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Add New Note</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Contact Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Inbound Call</SelectItem>
                      <SelectItem value="outbound">Outbound Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="note">Note</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Contact with" />
                  <Textarea placeholder="Notes" rows={3} />
                  <Button className="w-full">Add Note</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}