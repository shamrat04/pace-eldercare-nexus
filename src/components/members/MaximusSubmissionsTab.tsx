import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Send,
  Download,
  RefreshCw,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Upload,
  Package
} from 'lucide-react';
import { Member, MaximusSubmission } from '@/types/member';

interface MaximusSubmissionsTabProps {
  member: Member;
  onSubmissionUpdate?: () => void;
}

export const MaximusSubmissionsTab = ({ member, onSubmissionUpdate }: MaximusSubmissionsTabProps) => {
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);

  // Mock submission data
  const submissions: MaximusSubmission[] = [
    {
      id: 'SUB-001',
      memberId: member.id,
      intakeId: 'INT-001',
      fileName: 'member_001_enrollment.xml',
      submissionDate: '2024-01-20',
      status: 'Acknowledged',
      sentBy: 'Sarah Wilson, RN',
      acknowledgedDate: '2024-01-21',
      retryCount: 0,
      fileSize: 15420,
      checksum: 'a1b2c3d4e5f6'
    },
    {
      id: 'SUB-002',
      memberId: member.id,
      intakeId: 'INT-001',
      fileName: 'member_001_assessment.xml',
      submissionDate: '2024-02-01',
      status: 'Sent',
      sentBy: 'Dr. Martinez',
      retryCount: 0,
      fileSize: 8950,
      checksum: 'f6e5d4c3b2a1'
    },
    {
      id: 'SUB-003',
      memberId: member.id,
      intakeId: 'INT-001',
      fileName: 'member_001_status_update.xml',
      submissionDate: '2024-02-15',
      status: 'Error',
      sentBy: 'System',
      errorMessage: 'Invalid member ID format',
      retryCount: 2,
      fileSize: 5230,
      checksum: '1a2b3c4d5e6f'
    }
  ];

  // Mock pending items (items ready to be sent)
  const pendingItems = [
    {
      id: 'PEND-001',
      type: 'Status Change',
      description: 'Member enrollment status update',
      priority: 'Medium',
      createdDate: '2024-02-20'
    },
    {
      id: 'PEND-002',
      type: 'Assessment Result',
      description: 'Quarterly assessment completion',
      priority: 'High',
      createdDate: '2024-02-22'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Queued': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sent': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Acknowledged': return 'bg-green-100 text-green-800 border-green-200';
      case 'Error': return 'bg-red-100 text-red-800 border-red-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Queued': return <Package className="w-4 h-4" />;
      case 'Sent': return <Send className="w-4 h-4" />;
      case 'Acknowledged': return <CheckCircle className="w-4 h-4" />;
      case 'Error': return <AlertTriangle className="w-4 h-4" />;
      case 'Rejected': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleBulkSubmit = () => {
    if (selectedSubmissions.length > 0) {
      console.log('Submitting items:', selectedSubmissions);
      onSubmissionUpdate?.();
      setSelectedSubmissions([]);
    }
  };

  const handleRetrySubmission = (submissionId: string) => {
    console.log('Retrying submission:', submissionId);
    onSubmissionUpdate?.();
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubmissions(pendingItems.map(item => item.id));
    } else {
      setSelectedSubmissions([]);
    }
  };

  const toggleSelection = (itemId: string) => {
    setSelectedSubmissions(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Count items by status
  const errorCount = submissions.filter(s => s.status === 'Error').length;
  const pendingCount = pendingItems.length;
  const sentCount = submissions.filter(s => s.status === 'Sent').length;
  const acknowledgedCount = submissions.filter(s => s.status === 'Acknowledged').length;

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {errorCount > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{errorCount}</strong> submission{errorCount !== 1 ? 's have' : ' has'} failed and require attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{sentCount}</p>
            <p className="text-sm text-gray-600">Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{acknowledgedCount}</p>
            <p className="text-sm text-gray-600">Acknowledged</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{errorCount}</p>
            <p className="text-sm text-gray-600">Errors</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Submissions */}
      {pendingItems.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Pending Submissions ({pendingItems.length})</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSelectAll(selectedSubmissions.length !== pendingItems.length)}
                >
                  {selectedSubmissions.length === pendingItems.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button 
                  onClick={handleBulkSubmit}
                  disabled={selectedSubmissions.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Submit Selected ({selectedSubmissions.length})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={selectedSubmissions.includes(item.id)}
                    onCheckedChange={() => toggleSelection(item.id)}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.type}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-500">Created: {item.createdDate}</p>
                      </div>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority} Priority
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submission History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Submission History</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh Status
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>{submission.fileName}</span>
                    </h4>
                    <p className="text-sm text-gray-600">{submission.id}</p>
                  </div>
                  <Badge className={getStatusColor(submission.status)}>
                    {getStatusIcon(submission.status)}
                    <span className="ml-1">{submission.status}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-1">Submission Details</h5>
                    <div className="space-y-1">
                      <p>
                        <span className="text-gray-600">Date:</span> {submission.submissionDate}
                      </p>
                      <p>
                        <span className="text-gray-600">Sent By:</span> {submission.sentBy}
                      </p>
                      <p>
                        <span className="text-gray-600">File Size:</span> {formatFileSize(submission.fileSize)}
                      </p>
                      <p>
                        <span className="text-gray-600">Checksum:</span> {submission.checksum}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-1">Status Information</h5>
                    <div className="space-y-1">
                      {submission.acknowledgedDate && (
                        <p>
                          <span className="text-gray-600">Acknowledged:</span> {submission.acknowledgedDate}
                        </p>
                      )}
                      {submission.retryCount > 0 && (
                        <p>
                          <span className="text-gray-600">Retries:</span> {submission.retryCount}
                        </p>
                      )}
                      {submission.errorMessage && (
                        <p className="text-red-600">
                          <span className="text-gray-600">Error:</span> {submission.errorMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-1">Actions</h5>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="w-4 h-4 mr-1" />
                        Download File
                      </Button>
                      {submission.status === 'Error' && (
                        <Button 
                          onClick={() => handleRetrySubmission(submission.id)}
                          size="sm" 
                          className="w-full bg-red-600 hover:bg-red-700"
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Retry Submission
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};