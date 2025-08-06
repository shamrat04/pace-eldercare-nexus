import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  CheckCircle, 
  AlertTriangle, 
  Upload, 
  FileText, 
  Calendar,
  Phone,
  Mail,
  StickyNote,
  Users,
  Activity,
  Clock
} from 'lucide-react';
import { PACEMember, PACEIntakeRecord, CallLogEntry } from '@/types/pace';

interface PACEMemberDetailProps {
  member: PACEMember;
  onBack: () => void;
}

// Mock intake record
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

export default function PACEMemberDetail({ member, onBack }: PACEMemberDetailProps) {
  const [intakeRecord, setIntakeRecord] = useState<PACEIntakeRecord>(mockIntakeRecord);
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'Inbound' | 'Outbound' | 'Email' | 'Note'>('Note');

  const getStatusColor = (status: string) => {
    const statusColors = {
      'Inquiry': 'bg-gray-100 text-gray-800',
      'Application Submitted': 'bg-blue-100 text-blue-800',
      'Eligibility Review': 'bg-yellow-100 text-yellow-800',
      'UAS Scheduled': 'bg-orange-100 text-orange-800',
      'UAS Completed': 'bg-purple-100 text-purple-800',
      'IDT Review': 'bg-indigo-100 text-indigo-800',
      'Ready to Enroll': 'bg-green-100 text-green-800',
      'Enrolled': 'bg-emerald-100 text-emerald-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
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

  const getCompletionPercentage = () => {
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

    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold">
                  {member.firstName} {member.lastName}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>DOB: {new Date(member.dateOfBirth).toLocaleDateString()}</span>
                  <span>CIN: {member.medicaidCIN || 'Pending'}</span>
                  <Badge className={getStatusColor(member.currentStatus)}>
                    {member.currentStatus}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Completion</div>
                <div className="font-semibold">{getCompletionPercentage()}%</div>
              </div>
              <Button 
                disabled={!canEnroll()}
                className={canEnroll() ? 'bg-green-600 hover:bg-green-700' : ''}
                size="lg"
              >
                {canEnroll() ? 'Mark as Enrolled' : 'Requirements Not Met'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Warning Alerts */}
        {shouldWarnMedicaid() && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Warning: Medicaid application has been pending for more than 30 days.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Eligibility Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Eligibility Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                  
                  <div className="flex items-center justify-between">
                    <Label>ePACES Connected</Label>
                    <Badge className={intakeRecord.eligibilityChecklist.epacesIntegrated ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {intakeRecord.eligibilityChecklist.epacesIntegrated ? 'Yes' : 'Manual'}
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
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
                </div>
              </CardContent>
            </Card>

            {/* UAS Assessment Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  UAS Assessment Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label>Community Safety</Label>
                    <Checkbox checked={intakeRecord.uasAssessment.communitySafetyCriteria} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Age Criteria</Label>
                    <Checkbox checked={intakeRecord.uasAssessment.ageCriteria} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                
                <div>
                  <Label>Notes</Label>
                  <Textarea 
                    value={intakeRecord.uasAssessment.trackingNotes}
                    className="mt-1"
                    rows={2}
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
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(intakeRecord.idtChecklist).map(([role, status]) => (
                    <div key={role} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="capitalize font-medium">{role.toUpperCase()}</Label>
                        <Checkbox checked={status.assigned} />
                      </div>
                      {status.assigned && (
                        <div className="ml-4 space-y-1">
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
                </div>
              </CardContent>
            </Card>

            {/* Enrollment Packet */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Enrollment Packet & Signatures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>ROI Received</Label>
                      <Checkbox checked={intakeRecord.enrollmentPacket.roiReceived} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>HIPAA Received</Label>
                      <Checkbox checked={intakeRecord.enrollmentPacket.hipaaReceived} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>UAS Summary</Label>
                      <Checkbox checked={intakeRecord.enrollmentPacket.uasSummaryReceived} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Medicaid Docs</Label>
                      <Checkbox checked={intakeRecord.enrollmentPacket.medicaidDocsReceived} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
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
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Notes */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StickyNote className="h-5 w-5" />
                  Notes & Call Log
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recent Notes */}
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium text-sm">Outbound Call</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Jan 20, 2024</span>
                    </div>
                    <p className="text-sm">Contacted member to schedule IDT meeting. Left voicemail with callback number.</p>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium text-sm">Email</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Jan 19, 2024</span>
                    </div>
                    <p className="text-sm">Sent enrollment packet to member's email address. Requested signature within 5 business days.</p>
                  </div>
                </div>
                
                <Separator />
                
                {/* Add New Note */}
                <div className="space-y-3">
                  <Label>Add New Note</Label>
                  <Select value={noteType} onValueChange={(value: any) => setNoteType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inbound">Inbound Call</SelectItem>
                      <SelectItem value="Outbound">Outbound Call</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Note">Note</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea 
                    placeholder="Enter your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={4}
                  />
                  <Button className="w-full" disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule UAS Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Schedule IDT Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Refresh ePACES Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}