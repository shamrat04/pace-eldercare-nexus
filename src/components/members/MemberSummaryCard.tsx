import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Phone, 
  MapPin,
  Calendar,
  Edit,
  Shield,
  Heart
} from 'lucide-react';
import { Member } from '@/types/member';

interface MemberSummaryCardProps {
  member: Member;
  onEdit?: () => void;
}

export const MemberSummaryCard = ({ member, onEdit }: MemberSummaryCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Enrolled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Enrolled': return 'bg-green-100 text-green-800 border-green-200';
      case 'Exited': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Disenrolled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Member Summary</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(member.currentStatus)}>
              {member.currentStatus}
            </Badge>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Demographics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Demographics
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium text-lg">
                  {member.firstName} {member.middleInitial && `${member.middleInitial}. `}{member.lastName}
                </p>
                <p className="text-gray-600">Member ID: {member.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>DOB: {member.dateOfBirth} (Age {calculateAge(member.dateOfBirth)})</span>
              </div>
              <div>
                <span className="text-gray-600">Gender: </span>
                <span>{member.gender}</span>
              </div>
              {member.ssn && (
                <div>
                  <span className="text-gray-600">SSN: </span>
                  <span>{member.ssn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Contact Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{member.contactInfo.primaryPhone}</span>
              </div>
              {member.contactInfo.email && (
                <div>
                  <span className="text-gray-600">Email: </span>
                  <span>{member.contactInfo.email}</span>
                </div>
              )}
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
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
              <div>
                <span className="text-gray-600">Preferred Contact: </span>
                <span>{member.contactInfo.preferredContactMethod}</span>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Insurance
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium">{member.insuranceInfo.primaryInsurance.carrier}</p>
                <p className="text-gray-600">{member.insuranceInfo.primaryInsurance.planName}</p>
                <p className="text-xs text-gray-500">ID: {member.insuranceInfo.primaryInsurance.memberId}</p>
              </div>
              {member.insuranceInfo.medicaidId && (
                <div>
                  <span className="text-gray-600">Medicaid ID: </span>
                  <span>{member.insuranceInfo.medicaidId}</span>
                </div>
              )}
              {member.insuranceInfo.medicareId && (
                <div>
                  <span className="text-gray-600">Medicare ID: </span>
                  <span>{member.insuranceInfo.medicareId}</span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Effective: </span>
                <span>{member.insuranceInfo.primaryInsurance.effectiveDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{member.intakes.length}</p>
              <p className="text-xs text-gray-600">Total Intakes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-xs text-gray-600">Assessments</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">0</p>
              <p className="text-xs text-gray-600">Pending Actions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {Math.floor((new Date().getTime() - new Date(member.createdDate).getTime()) / (1000 * 60 * 60 * 24))}
              </p>
              <p className="text-xs text-gray-600">Days Since Created</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};