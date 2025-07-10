
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  User,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

const ParticipantProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const participants = [
    {
      id: '001',
      name: 'Mary Johnson',
      dob: '1945-03-15',
      mrn: 'MRN001234',
      status: 'Active',
      phone: '(555) 123-4567',
      address: '123 Main St, City, ST 12345',
      enrollmentDate: '2023-01-15',
      primaryDiagnosis: 'Diabetes, Hypertension'
    },
    {
      id: '002',
      name: 'Robert Smith',
      dob: '1938-07-22',
      mrn: 'MRN001235',
      status: 'Active',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, City, ST 12345',
      enrollmentDate: '2023-02-20',
      primaryDiagnosis: 'COPD, Heart Disease'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Participants</h1>
          <p className="text-gray-600">Manage participant profiles and information</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Participant
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Participants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, MRN, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <div className="grid gap-4">
        {participants.map((participant) => (
          <Card key={participant.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{participant.name}</h3>
                    <p className="text-sm text-gray-600">MRN: {participant.mrn}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(participant.status)}>
                    {participant.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>DOB: {participant.dob}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{participant.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{participant.address}</span>
                </div>
              </div>
              
              <div className="mt-3 text-sm">
                <p><strong>Primary Diagnosis:</strong> {participant.primaryDiagnosis}</p>
                <p><strong>Enrollment Date:</strong> {participant.enrollmentDate}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ParticipantProfile;
