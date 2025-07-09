
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Heart, 
  FileText, 
  Pill, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Shield,
  CreditCard
} from 'lucide-react';

const ParticipantProfile = () => {
  const [activeTab, setActiveTab] = useState('summary');

  const participant = {
    id: 'P-2024-001',
    name: 'Eleanor Davis',
    dob: '1942-08-15',
    age: 82,
    gender: 'Female',
    phone: '(555) 123-4567',
    email: 'eleanor.davis@email.com',
    address: '123 Main Street, Apt 4B, Springfield, IL 62701',
    enrollmentDate: '2023-06-15',
    primaryLanguage: 'English',
    emergencyContact: 'Robert Davis (Son) - (555) 987-6543'
  };

  const eligibility = {
    medicare: { status: 'Active', id: '1234567890A', planType: 'Medicare Advantage' },
    medicaid: { status: 'Active', id: 'IL-MD-987654321', planType: 'Traditional Medicaid' },
    paceEligible: true,
    eligibilityDate: '2023-06-01',
    levelOfCare: 'Nursing Facility Level'
  };

  const teamAssignments = [
    { role: 'Primary Care Physician', name: 'Dr. Sarah Mitchell', contact: '(555) 234-5678' },
    { role: 'Nurse Practitioner', name: 'Jennifer Lopez, NP', contact: '(555) 345-6789' },
    { role: 'Social Worker', name: 'Michael Johnson, MSW', contact: '(555) 456-7890' },
    { role: 'Physical Therapist', name: 'Lisa Chen, PT', contact: '(555) 567-8901' },
    { role: 'Case Manager', name: 'David Brown', contact: '(555) 678-9012' }
  ];

  const assessments = {
    adl: { score: 14, maxScore: 24, lastAssessed: '2024-01-15', status: 'Moderate Assistance' },
    iadl: { score: 6, maxScore: 16, lastAssessed: '2024-01-15', status: 'Significant Assistance' },
    cognitive: { score: 22, maxScore: 30, lastAssessed: '2024-01-10', status: 'Mild Impairment' },
    mobility: { score: 8, maxScore: 12, lastAssessed: '2024-01-12', status: 'Limited Mobility' }
  };

  const recentDocuments = [
    { id: 1, name: 'Care Plan Update', date: '2024-01-20', type: 'Care Plan', status: 'Active' },
    { id: 2, name: 'Physical Therapy Eval', date: '2024-01-18', type: 'Assessment', status: 'Complete' },
    { id: 3, name: 'Medication List', date: '2024-01-15', type: 'Medication', status: 'Current' },
    { id: 4, name: 'Lab Results', date: '2024-01-12', type: 'Lab Report', status: 'Reviewed' }
  ];

  const carePlan = [
    { goal: 'Improve mobility and balance', status: 'In Progress', target: '2024-03-15', progress: 65 },
    { goal: 'Medication adherence monitoring', status: 'Active', target: 'Ongoing', progress: 85 },
    { goal: 'Social engagement activities', status: 'In Progress', target: '2024-02-28', progress: 40 },
    { goal: 'Nutritional assessment follow-up', status: 'Pending', target: '2024-02-10', progress: 20 }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{participant.name}</h1>
            <p className="text-gray-600">ID: {participant.id} • Age: {participant.age} • {participant.gender}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800">Active Participant</Badge>
          <Button>Edit Profile</Button>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{participant.phone}</p>
                <p className="text-xs text-gray-500">Primary Phone</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Medicare + Medicaid</p>
                <p className="text-xs text-gray-500">Dual Eligible</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{participant.enrollmentDate}</p>
                <p className="text-xs text-gray-500">Enrollment Date</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">5 Team Members</p>
                <p className="text-xs text-gray-500">Care Team</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="team">Care Team</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Care Plan Goals */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Active Care Plan</span>
                </CardTitle>
                <CardDescription>Current goals and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {carePlan.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{goal.goal}</p>
                      <Badge variant={goal.status === 'Active' ? 'default' : 
                                   goal.status === 'In Progress' ? 'secondary' : 'outline'}>
                        {goal.status}
                      </Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{goal.progress}% complete</span>
                      <span>Target: {goal.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest updates and interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Physical therapy session completed</p>
                      <p className="text-xs text-gray-500">2 hours ago • Lisa Chen, PT</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Medication reconciliation updated</p>
                      <p className="text-xs text-gray-500">1 day ago • Jennifer Lopez, NP</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Care plan review scheduled</p>
                      <p className="text-xs text-gray-500">2 days ago • David Brown</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Summary */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-green-500" />
                <span>Assessment Summary</span>
              </CardTitle>
              <CardDescription>Current functional status and capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">ADL Score</span>
                    <span className="text-sm text-gray-500">{assessments.adl.score}/{assessments.adl.maxScore}</span>
                  </div>
                  <Progress value={(assessments.adl.score / assessments.adl.maxScore) * 100} className="h-2" />
                  <p className="text-xs text-gray-500">{assessments.adl.status}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">IADL Score</span>
                    <span className="text-sm text-gray-500">{assessments.iadl.score}/{assessments.iadl.maxScore}</span>
                  </div>
                  <Progress value={(assessments.iadl.score / assessments.iadl.maxScore) * 100} className="h-2" />
                  <p className="text-xs text-gray-500">{assessments.iadl.status}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Cognitive</span>
                    <span className="text-sm text-gray-500">{assessments.cognitive.score}/{assessments.cognitive.maxScore}</span>
                  </div>
                  <Progress value={(assessments.cognitive.score / assessments.cognitive.maxScore) * 100} className="h-2" />
                  <p className="text-xs text-gray-500">{assessments.cognitive.status}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Mobility</span>
                    <span className="text-sm text-gray-500">{assessments.mobility.score}/{assessments.mobility.maxScore}</span>
                  </div>
                  <Progress value={(assessments.mobility.score / assessments.mobility.maxScore) * 100} className="h-2" />
                  <p className="text-xs text-gray-500">{assessments.mobility.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic demographic and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-sm text-gray-900 mt-1">{participant.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="text-sm text-gray-900 mt-1">{participant.dob}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <p className="text-sm text-gray-900 mt-1">{participant.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Primary Language</label>
                    <p className="text-sm text-gray-900 mt-1">{participant.primaryLanguage}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="text-sm text-gray-900 mt-1">{participant.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <p className="text-sm text-gray-900 mt-1">{participant.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <p className="text-sm text-gray-900 mt-1">{participant.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                    <p className="text-sm text-gray-900 mt-1">{participant.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Medicare Coverage</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <Badge className="bg-green-100 text-green-800">{eligibility.medicare.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Medicare ID</span>
                  <span className="text-sm text-gray-900">{eligibility.medicare.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Plan Type</span>
                  <span className="text-sm text-gray-900">{eligibility.medicare.planType}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span>Medicaid Coverage</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <Badge className="bg-green-100 text-green-800">{eligibility.medicaid.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Medicaid ID</span>
                  <span className="text-sm text-gray-900">{eligibility.medicaid.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Plan Type</span>
                  <span className="text-sm text-gray-900">{eligibility.medicaid.planType}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>PACE Eligibility</CardTitle>
              <CardDescription>Program eligibility status and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">PACE Eligible</p>
                    <p className="text-xs text-gray-500">Meets all requirements</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Eligibility Date</label>
                  <p className="text-sm text-gray-900 mt-1">{eligibility.eligibilityDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Level of Care</label>
                  <p className="text-sm text-gray-900 mt-1">{eligibility.levelOfCare}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Interdisciplinary Care Team</span>
              </CardTitle>
              <CardDescription>Healthcare professionals assigned to this participant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamAssignments.map((member, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <Button variant="outline" size="sm">Contact</Button>
                    </div>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.contact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(assessments).map(([key, assessment]) => (
              <Card key={key} className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="capitalize">{key.toUpperCase()} Assessment</CardTitle>
                  <CardDescription>Last assessed: {assessment.lastAssessed}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Score</span>
                      <span className="text-sm text-gray-900">{assessment.score}/{assessment.maxScore}</span>
                    </div>
                    <Progress value={(assessment.score / assessment.maxScore) * 100} className="h-3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <Badge variant="outline">{assessment.status}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span>Recent Documents</span>
              </CardTitle>
              <CardDescription>Latest files and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{doc.status}</Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantProfile;
