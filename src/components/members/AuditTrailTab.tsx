import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  History,
  Search,
  Filter,
  User,
  Edit,
  Plus,
  Trash2,
  Send,
  RefreshCw,
  Eye
} from 'lucide-react';
import { Member, AuditTrail } from '@/types/member';

interface AuditTrailTabProps {
  member: Member;
}

export const AuditTrailTab = ({ member }: AuditTrailTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterEntity, setFilterEntity] = useState<string>('all');

  // Mock audit trail data
  const auditTrail: AuditTrail[] = [
    {
      id: 'AUD-001',
      entityName: 'Members',
      entityId: member.id,
      actionType: 'Create',
      actionBy: 'Sarah Wilson, RN',
      actionDate: '2024-01-15T09:30:00Z',
      description: 'Member record created from phone referral',
      newValue: JSON.stringify({
        firstName: member.firstName,
        lastName: member.lastName,
        dateOfBirth: member.dateOfBirth
      }),
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'AUD-002',
      entityName: 'Members',
      entityId: member.id,
      actionType: 'Update',
      actionBy: 'Sarah Wilson, RN',
      actionDate: '2024-01-15T10:15:00Z',
      description: 'Updated contact information',
      oldValue: JSON.stringify({ phone: '(555) 000-0000' }),
      newValue: JSON.stringify({ phone: member.contactInfo.primaryPhone }),
      ipAddress: '192.168.1.101'
    },
    {
      id: 'AUD-003',
      entityName: 'Intakes',
      entityId: 'INT-001',
      actionType: 'Create',
      actionBy: 'Sarah Wilson, RN',
      actionDate: '2024-01-15T11:00:00Z',
      description: 'Initial intake created for member',
      newValue: JSON.stringify({
        intakeSource: 'Phone',
        referralSource: 'Community Hospital'
      }),
      ipAddress: '192.168.1.101'
    },
    {
      id: 'AUD-004',
      entityName: 'Members',
      entityId: member.id,
      actionType: 'StatusChange',
      actionBy: 'Dr. Martinez',
      actionDate: '2024-01-20T14:30:00Z',
      description: 'Member status changed from Active to Enrolled',
      oldValue: 'Active',
      newValue: 'Enrolled',
      ipAddress: '192.168.1.105'
    },
    {
      id: 'AUD-005',
      entityName: 'Assessments',
      entityId: 'ASS-001',
      actionType: 'AssessmentComplete',
      actionBy: 'Dr. Martinez',
      actionDate: '2024-01-20T15:00:00Z',
      description: 'Initial assessment completed',
      newValue: JSON.stringify({
        assessmentType: 'Initial Assessment',
        outcome: 'Appropriate for care coordination',
        score: 85
      }),
      ipAddress: '192.168.1.105'
    },
    {
      id: 'AUD-006',
      entityName: 'MaximusSubmissions',
      entityId: 'SUB-001',
      actionType: 'SendToMaximus',
      actionBy: 'System',
      actionDate: '2024-01-20T16:00:00Z',
      description: 'Member enrollment data sent to Maximus',
      newValue: JSON.stringify({
        fileName: 'member_001_enrollment.xml',
        status: 'Sent'
      }),
      ipAddress: '192.168.1.100'
    }
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Create': return 'bg-green-100 text-green-800 border-green-200';
      case 'Update': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delete': return 'bg-red-100 text-red-800 border-red-200';
      case 'StatusChange': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SendToMaximus': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'AssessmentComplete': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Create': return <Plus className="w-4 h-4" />;
      case 'Update': return <Edit className="w-4 h-4" />;
      case 'Delete': return <Trash2 className="w-4 h-4" />;
      case 'StatusChange': return <RefreshCw className="w-4 h-4" />;
      case 'SendToMaximus': return <Send className="w-4 h-4" />;
      case 'AssessmentComplete': return <Eye className="w-4 h-4" />;
      default: return <History className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filteredAuditTrail = auditTrail.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.actionBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = filterAction === 'all' || entry.actionType === filterAction;
    const matchesEntity = filterEntity === 'all' || entry.entityName === filterEntity;
    
    return matchesSearch && matchesAction && matchesEntity;
  });

  const formatValue = (value: string | undefined) => {
    if (!value) return 'N/A';
    try {
      const parsed = JSON.parse(value);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return value;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Audit Trail</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="Create">Create</SelectItem>
                <SelectItem value="Update">Update</SelectItem>
                <SelectItem value="Delete">Delete</SelectItem>
                <SelectItem value="StatusChange">Status Change</SelectItem>
                <SelectItem value="SendToMaximus">Send to Maximus</SelectItem>
                <SelectItem value="AssessmentComplete">Assessment Complete</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterEntity} onValueChange={setFilterEntity}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="Members">Members</SelectItem>
                <SelectItem value="Intakes">Intakes</SelectItem>
                <SelectItem value="Assessments">Assessments</SelectItem>
                <SelectItem value="MaximusSubmissions">Maximus Submissions</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterAction('all');
                setFilterEntity('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{auditTrail.length}</p>
            <p className="text-sm text-gray-600">Total Actions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {new Set(auditTrail.map(entry => entry.actionBy)).size}
            </p>
            <p className="text-sm text-gray-600">Unique Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.floor((new Date().getTime() - new Date(auditTrail[0]?.actionDate || new Date()).getTime()) / (1000 * 60 * 60 * 24))}
            </p>
            <p className="text-sm text-gray-600">Days of History</p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Audit Trail ({filteredAuditTrail.length} entries)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAuditTrail.map((entry, index) => (
              <div key={entry.id} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {getActionIcon(entry.actionType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getActionColor(entry.actionType)}>
                        {entry.actionType}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {entry.entityName} • {entry.entityId}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(entry.actionDate)}</span>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-1">{entry.description}</h4>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {entry.actionBy}
                    </span>
                    {entry.ipAddress && (
                      <span>IP: {entry.ipAddress}</span>
                    )}
                  </div>

                  {(entry.oldValue || entry.newValue) && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {entry.oldValue && (
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-1">Previous Value:</h5>
                            <pre className="bg-white p-2 rounded border text-gray-800 whitespace-pre-wrap">
                              {formatValue(entry.oldValue)}
                            </pre>
                          </div>
                        )}
                        {entry.newValue && (
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-1">New Value:</h5>
                            <pre className="bg-white p-2 rounded border text-gray-800 whitespace-pre-wrap">
                              {formatValue(entry.newValue)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
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