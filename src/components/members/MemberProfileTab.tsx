import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  FileText,
  Phone,
  Upload,
  Edit,
  Eye,
  Calendar,
  User,
  AlertCircle
} from 'lucide-react';
import { Member, Intake, INTAKE_SOURCES, PRIORITIES } from '@/types/member';

interface MemberProfileTabProps {
  member: Member;
}

export const MemberProfileTab = ({ member }: MemberProfileTabProps) => {
  const [showAddIntake, setShowAddIntake] = useState(false);

  // Mock intake data
  const intakes: Intake[] = [
    {
      id: 'INT-001',
      memberId: member.id,
      intakeSource: 'Phone',
      referralSource: 'Community Hospital',
      referringProvider: 'Dr. Smith',
      intakeDate: '2024-01-15',
      currentStatus: 'In Review',
      statusHistory: [],
      notes: 'Patient referred for diabetes management and care coordination.',
      assignedTo: 'Sarah Wilson, RN',
      priority: 'Medium',
      diagnoses: ['Type 2 Diabetes', 'Hypertension', 'Hyperlipidemia'],
      medications: ['Metformin 500mg BID', 'Lisinopril 10mg daily', 'Atorvastatin 20mg daily'],
      allergies: ['Penicillin', 'Shellfish'],
      functionalStatus: 'Independent with ADLs, uses walker for ambulation',
      cognitiveStatus: 'Alert and oriented x3, mild memory concerns',
      socialDeterminants: {
        housing: 'Stable',
        transportation: 'Limited',
        foodSecurity: 'Secure',
        socialSupport: 'Moderate',
        incomeLevel: 'Low'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Denied': return 'bg-red-100 text-red-800 border-red-200';
      case 'On Hold': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Demographics Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Demographics & Contact Information</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit Demographics
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">First Name:</span>
                    <span>{member.firstName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Last Name:</span>
                    <span>{member.lastName}</span>
                  </div>
                  {member.middleInitial && (
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Middle Initial:</span>
                      <span>{member.middleInitial}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span>{member.dateOfBirth}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Gender:</span>
                    <span>{member.gender}</span>
                  </div>
                  {member.ssn && (
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">SSN:</span>
                      <span>{member.ssn}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Communication Preferences</h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Preferred Method:</span>
                    <span>{member.contactInfo.preferredContactMethod}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Language:</span>
                    <span>{member.contactInfo.communicationPreferences.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Primary Phone:</span>
                    <span>{member.contactInfo.primaryPhone}</span>
                  </div>
                  {member.contactInfo.secondaryPhone && (
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Secondary Phone:</span>
                      <span>{member.contactInfo.secondaryPhone}</span>
                    </div>
                  )}
                  {member.contactInfo.email && (
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Email:</span>
                      <span>{member.contactInfo.email}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Address:</span>
                    <div>
                      <p>{member.contactInfo.address.street1}</p>
                      {member.contactInfo.address.street2 && (
                        <p>{member.contactInfo.address.street2}</p>
                      )}
                      <p>
                        {member.contactInfo.address.city}, {member.contactInfo.address.state} {member.contactInfo.address.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intakes Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Intake History</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                Phone Intake
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-1" />
                Upload PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {intakes.length > 0 ? (
            <div className="space-y-4">
              {intakes.map((intake) => (
                <div key={intake.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{intake.id}</h4>
                      <p className="text-sm text-gray-600">
                        Intake Date: {intake.intakeDate} • Source: {intake.intakeSource}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(intake.priority)}>
                        {intake.priority} Priority
                      </Badge>
                      <Badge className={getStatusColor(intake.currentStatus)}>
                        {intake.currentStatus}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Referral Information</h5>
                      <div className="space-y-1">
                        <p><span className="text-gray-600">Source:</span> {intake.referralSource}</p>
                        {intake.referringProvider && (
                          <p><span className="text-gray-600">Provider:</span> {intake.referringProvider}</p>
                        )}
                        {intake.assignedTo && (
                          <p><span className="text-gray-600">Assigned To:</span> {intake.assignedTo}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Clinical Summary</h5>
                      <div className="space-y-1">
                        <p><span className="text-gray-600">Diagnoses:</span> {intake.diagnoses.join(', ')}</p>
                        <p><span className="text-gray-600">Allergies:</span> {intake.allergies.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  {intake.notes && (
                    <div className="mt-3 pt-3 border-t">
                      <h5 className="font-medium mb-1">Notes</h5>
                      <p className="text-sm text-gray-700">{intake.notes}</p>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">No Intakes Found</h3>
              <p className="text-gray-600 mt-1">Start by creating a new intake for this member.</p>
              <div className="mt-4 flex justify-center space-x-2">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-1" />
                  Phone Intake
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload PDF
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};