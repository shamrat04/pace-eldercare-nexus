import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle,
  Clock,
  User,
  ArrowRight,
  Plus,
  Edit,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { Member, MemberStatus, MEMBER_STATUSES } from '@/types/member';

interface LifecycleStatusTrackerProps {
  member: Member;
}

export const LifecycleStatusTracker = ({ member }: LifecycleStatusTrackerProps) => {
  const [newNote, setNewNote] = useState('');
  
  // Mock status history data
  const statusHistory = [
    {
      id: '1',
      fromStatus: null,
      toStatus: 'Not Enrolled' as MemberStatus,
      changeDate: '2024-01-15',
      changedBy: 'System',
      reason: 'Initial member creation',
      notes: 'Member record created from referral'
    },
    {
      id: '2',
      fromStatus: 'Not Enrolled' as MemberStatus,
      toStatus: 'Active' as MemberStatus,
      changeDate: '2024-01-16',
      changedBy: 'Sarah Wilson, RN',
      reason: 'Eligibility verified',
      notes: 'Insurance verified, documentation complete'
    },
    {
      id: '3',
      fromStatus: 'Active' as MemberStatus,
      toStatus: 'Enrolled' as MemberStatus,
      changeDate: '2024-01-20',
      changedBy: 'Dr. Martinez',
      reason: 'Assessment completed',
      notes: 'Initial assessment completed, care plan established'
    }
  ];

  const getStatusIndex = (status: MemberStatus) => {
    return MEMBER_STATUSES.indexOf(status);
  };

  const getCurrentStepIndex = () => {
    return getStatusIndex(member.currentStatus);
  };

  const getStepProgress = () => {
    const currentIndex = getCurrentStepIndex();
    return ((currentIndex + 1) / MEMBER_STATUSES.length) * 100;
  };

  const getStatusColor = (status: MemberStatus, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return 'bg-green-500 text-white';
    if (isCurrent) return 'bg-blue-500 text-white';
    return 'bg-gray-300 text-gray-600';
  };

  const handleStatusChange = (newStatus: MemberStatus) => {
    // Handle status change logic here
    console.log(`Changing status from ${member.currentStatus} to ${newStatus}`);
  };

  const addNote = () => {
    if (newNote.trim()) {
      // Handle adding note logic here
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Visual Status Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Member Lifecycle Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(getStepProgress())}% Complete</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>

            {/* Status Steps */}
            <div className="space-y-4">
              {MEMBER_STATUSES.map((status, index) => {
                const currentIndex = getCurrentStepIndex();
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;
                const isAvailable = index <= currentIndex + 1;

                return (
                  <div key={status} className="flex items-center space-x-4">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        getStatusColor(status, isCompleted, isCurrent)
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isCurrent ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-medium ${isCurrent ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'}`}>
                            {status}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {status === 'Not Enrolled' && 'Initial member setup and documentation'}
                            {status === 'Active' && 'Eligibility verified, ready for enrollment'}
                            {status === 'Enrolled' && 'Actively receiving care coordination services'}
                            {status === 'Exited' && 'Successfully completed program'}
                            {status === 'Disenrolled' && 'Removed from program (can re-enroll)'}
                          </p>
                        </div>
                        
                        {isCurrent && isAvailable && index < MEMBER_STATUSES.length - 1 && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(MEMBER_STATUSES[index + 1])}
                            className="ml-4"
                          >
                            <ArrowRight className="w-4 h-4 mr-1" />
                            Advance to {MEMBER_STATUSES[index + 1]}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Re-enrollment Option */}
            {member.currentStatus === 'Disenrolled' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Re-enrollment Available</h4>
                <p className="text-sm text-blue-700 mb-3">
                  This member can be re-enrolled with a new intake ID while maintaining their member history.
                </p>
                <Button onClick={() => handleStatusChange('Not Enrolled')} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Start Re-enrollment
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Status History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusHistory.map((change, index) => (
              <div key={change.id} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {change.fromStatus && (
                        <>
                          <Badge variant="outline">{change.fromStatus}</Badge>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </>
                      )}
                      <Badge className="bg-green-100 text-green-800">{change.toStatus}</Badge>
                    </div>
                    <span className="text-sm text-gray-500">{change.changeDate}</span>
                  </div>
                  
                  <p className="text-sm text-gray-900 font-medium">{change.reason}</p>
                  <p className="text-sm text-gray-600">Changed by: {change.changedBy}</p>
                  
                  {change.notes && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                      <span className="font-medium">Notes: </span>
                      {change.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Status Note */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Add Status Note</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Textarea
              placeholder="Add a note about the current status or any observations..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={addNote} disabled={!newNote.trim()}>
                <Plus className="w-4 h-4 mr-1" />
                Add Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};