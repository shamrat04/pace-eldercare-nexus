import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Search, 
  Plus,
  Send,
  User, 
  Phone, 
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Bell,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Member, Intake, Assessment, MaximusSubmission, MemberStatus, IntakeStatus } from '@/types/member';
import { MemberSummaryCard } from './MemberSummaryCard';
import { MemberProfileTab } from './MemberProfileTab';
import { LifecycleStatusTracker } from './LifecycleStatusTracker';
import { AssessmentsTab } from './AssessmentsTab';
import { MaximusSubmissionsTab } from './MaximusSubmissionsTab';
import { AuditTrailTab } from './AuditTrailTab';
import { AddMemberDialog } from './AddMemberDialog';

const MemberManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [pendingMaximusCount, setPendingMaximusCount] = useState(3);
  const [pendingAssessments, setPendingAssessments] = useState(2);

  // Mock data - would come from API
  const members: Member[] = [
    {
      id: 'MEM-001',
      firstName: 'Mary',
      lastName: 'Johnson',
      middleInitial: 'A',
      dateOfBirth: '1945-03-15',
      gender: 'Female',
      ssn: '***-**-1234',
      currentStatus: 'Enrolled',
      contactInfo: {
        primaryPhone: '(555) 123-4567',
        email: 'mary.johnson@email.com',
        address: {
          street1: '123 Main St',
          city: 'Anytown',
          state: 'ST',
          zipCode: '12345'
        },
        preferredContactMethod: 'Phone',
        communicationPreferences: ['English', 'Large Print']
      },
      insuranceInfo: {
        primaryInsurance: {
          carrier: 'Medicare',
          planName: 'Medicare Part A & B',
          memberId: 'MED123456789',
          effectiveDate: '2020-01-01'
        },
        medicaidId: 'MCD987654321'
      },
      createdDate: '2024-01-15',
      updatedDate: '2024-01-15',
      intakes: []
    }
  ];

  const getStatusColor = (status: MemberStatus | IntakeStatus) => {
    switch (status) {
      case 'Not Enrolled':
      case 'Pending': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Active':
      case 'In Review': 
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Enrolled':
      case 'Approved': 
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Exited':
      case 'Completed': 
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Disenrolled':
      case 'Denied':
      case 'Cancelled': 
        return 'bg-red-100 text-red-800 border-red-200';
      case 'On Hold': 
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredMembers = members.filter(member =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-1">Comprehensive member lifecycle and intake management</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setPendingMaximusCount(0)}
            className="relative"
          >
            <Send className="w-4 h-4 mr-2" />
            Send to Maximus ({pendingMaximusCount})
            {pendingMaximusCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-1 py-0 text-xs">
                {pendingMaximusCount}
              </Badge>
            )}
          </Button>
          <Button 
            onClick={() => setShowAddMemberDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {pendingAssessments > 0 && (
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertDescription>
            You have {pendingAssessments} pending assessments that require attention.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name, ID, or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Member List */}
          <Card>
            <CardHeader>
              <CardTitle>Members ({filteredMembers.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedMember?.id === member.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{member.id}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>DOB: {member.dateOfBirth}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(member.currentStatus)}>
                        {member.currentStatus}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedMember ? (
            <>
              {/* Member Summary Card */}
              <MemberSummaryCard member={selectedMember} />

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
                  <TabsTrigger value="assessments" className="relative">
                    Assessments
                    {pendingAssessments > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-1 py-0 text-xs">
                        {pendingAssessments}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="maximus">Maximus</TabsTrigger>
                  <TabsTrigger value="audit">History</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <MemberProfileTab member={selectedMember} />
                </TabsContent>

                <TabsContent value="lifecycle">
                  <LifecycleStatusTracker member={selectedMember} />
                </TabsContent>

                <TabsContent value="assessments">
                  <AssessmentsTab 
                    member={selectedMember} 
                    onAssessmentUpdate={() => setPendingAssessments(prev => Math.max(0, prev - 1))}
                  />
                </TabsContent>

                <TabsContent value="maximus">
                  <MaximusSubmissionsTab 
                    member={selectedMember}
                    onSubmissionUpdate={() => setPendingMaximusCount(prev => Math.max(0, prev - 1))}
                  />
                </TabsContent>

                <TabsContent value="audit">
                  <AuditTrailTab member={selectedMember} />
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Member Selected</h3>
                <p className="text-gray-600">Select a member from the list to view their details and manage their intake process.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Member Dialog */}
      <AddMemberDialog 
        open={showAddMemberDialog}
        onClose={() => setShowAddMemberDialog(false)}
        onMemberAdded={(member) => {
          // Handle new member addition
          setShowAddMemberDialog(false);
          setSelectedMember(member);
        }}
      />
    </div>
  );
};

export default MemberManagementPage;