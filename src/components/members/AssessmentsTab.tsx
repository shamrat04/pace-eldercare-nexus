import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Download,
  Bell
} from 'lucide-react';
import { Member, Assessment, AssessmentType, ASSESSMENT_TYPES } from '@/types/member';

interface AssessmentsTabProps {
  member: Member;
  onAssessmentUpdate?: () => void;
}

export const AssessmentsTab = ({ member, onAssessmentUpdate }: AssessmentsTabProps) => {
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<AssessmentType>('Initial Assessment');

  // Mock assessment data
  const assessments: Assessment[] = [
    {
      id: 'ASS-001',
      memberId: member.id,
      intakeId: 'INT-001',
      assessmentType: 'Initial Assessment',
      assessmentDate: '2024-01-20',
      completedBy: 'Dr. Martinez',
      status: 'Completed',
      outcome: 'Member is appropriate for care coordination services',
      score: 85,
      recommendations: [
        'Continue current diabetes management',
        'Refer to nutritionist for dietary counseling',
        'Schedule quarterly follow-up assessments'
      ],
      nextAssessmentDue: '2024-04-20',
      documents: ['initial_assessment.pdf', 'care_plan.pdf']
    },
    {
      id: 'ASS-002',
      memberId: member.id,
      intakeId: 'INT-001',
      assessmentType: 'Functional Assessment',
      assessmentDate: '2024-02-15',
      completedBy: 'Sarah Wilson, RN',
      dueDate: '2024-02-10',
      status: 'In Progress',
      documents: []
    },
    {
      id: 'ASS-003',
      memberId: member.id,
      intakeId: 'INT-001',
      assessmentType: 'Quarterly Assessment',
      dueDate: '2024-04-20',
      status: 'Scheduled',
      completedBy: 'Dr. Martinez',
      assessmentDate: '2024-04-20',
      documents: []
    }
  ];

  // Calculate overdue assessments
  const overdueAssessments = assessments.filter(assessment => {
    if (assessment.status === 'Completed') return false;
    if (!assessment.dueDate) return false;
    return new Date(assessment.dueDate) < new Date();
  });

  // Calculate due soon assessments (within 7 days)
  const dueSoonAssessments = assessments.filter(assessment => {
    if (assessment.status === 'Completed') return false;
    if (!assessment.dueDate) return false;
    const dueDate = new Date(assessment.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'No Show': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Scheduled': return <Calendar className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <AlertTriangle className="w-4 h-4" />;
      case 'No Show': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const isOverdue = (assessment: Assessment) => {
    if (assessment.status === 'Completed') return false;
    if (!assessment.dueDate) return false;
    return new Date(assessment.dueDate) < new Date();
  };

  const scheduleAssessment = () => {
    // Handle scheduling new assessment
    console.log('Scheduling assessment:', selectedAssessmentType);
    onAssessmentUpdate?.();
  };

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {overdueAssessments.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{overdueAssessments.length}</strong> assessment{overdueAssessments.length !== 1 ? 's are' : ' is'} overdue and require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {dueSoonAssessments.length > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Bell className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>{dueSoonAssessments.length}</strong> assessment{dueSoonAssessments.length !== 1 ? 's are' : ' is'} due within the next 7 days.
          </AlertDescription>
        </Alert>
      )}

      {/* Schedule New Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Schedule New Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Select value={selectedAssessmentType} onValueChange={(value) => setSelectedAssessmentType(value as AssessmentType)}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent>
                {ASSESSMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={scheduleAssessment}>
              <Plus className="w-4 h-4 mr-1" />
              Schedule Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{assessments.length}</p>
            <p className="text-sm text-gray-600">Total Assessments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {assessments.filter(a => a.status === 'Completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {assessments.filter(a => a.status === 'In Progress').length}
            </p>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{overdueAssessments.length}</p>
            <p className="text-sm text-gray-600">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Assessments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Assessment History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div 
                key={assessment.id} 
                className={`border rounded-lg p-4 ${
                  isOverdue(assessment) ? 'border-red-200 bg-red-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold flex items-center space-x-2">
                      <span>{assessment.assessmentType}</span>
                      {isOverdue(assessment) && (
                        <Badge className="bg-red-100 text-red-800">OVERDUE</Badge>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">{assessment.id}</p>
                  </div>
                  <Badge className={getStatusColor(assessment.status)}>
                    {getStatusIcon(assessment.status)}
                    <span className="ml-1">{assessment.status}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-1">Schedule Information</h5>
                    <div className="space-y-1">
                      {assessment.dueDate && (
                        <p>
                          <span className="text-gray-600">Due Date:</span> {assessment.dueDate}
                        </p>
                      )}
                      {assessment.assessmentDate && (
                        <p>
                          <span className="text-gray-600">Assessment Date:</span> {assessment.assessmentDate}
                        </p>
                      )}
                      <p>
                        <span className="text-gray-600">Assigned To:</span> {assessment.completedBy}
                      </p>
                    </div>
                  </div>

                  {assessment.status === 'Completed' && (
                    <div>
                      <h5 className="font-medium mb-1">Results</h5>
                      <div className="space-y-1">
                        {assessment.score && (
                          <p>
                            <span className="text-gray-600">Score:</span> {assessment.score}
                          </p>
                        )}
                        {assessment.outcome && (
                          <p>
                            <span className="text-gray-600">Outcome:</span> {assessment.outcome}
                          </p>
                        )}
                        {assessment.nextAssessmentDue && (
                          <p>
                            <span className="text-gray-600">Next Due:</span> {assessment.nextAssessmentDue}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h5 className="font-medium mb-1">Documents</h5>
                    <div className="space-y-1">
                      {assessment.documents.length > 0 ? (
                        assessment.documents.map((doc, index) => (
                          <p key={index} className="text-blue-600 cursor-pointer hover:underline">
                            <FileText className="w-3 h-3 inline mr-1" />
                            {doc}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-500">No documents</p>
                      )}
                    </div>
                  </div>
                </div>

                {assessment.recommendations && assessment.recommendations.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <h5 className="font-medium mb-2">Recommendations</h5>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      {assessment.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  {assessment.status !== 'Completed' && (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  {assessment.documents.length > 0 && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};