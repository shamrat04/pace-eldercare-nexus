
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Search, 
  FileText, 
  Image, 
  Calendar, 
  User, 
  Phone, 
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const IntakePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const referrals = [
    {
      id: 1,
      fileName: 'Johnson_Mary_Referral.pdf',
      participant: 'Mary Johnson',
      date: '2024-01-15',
      uploadedBy: 'Dr. Smith',
      status: 'pending',
      mrn: 'MRN-001234'
    },
    {
      id: 2,
      fileName: 'Wilson_Robert_Assessment.pdf',
      participant: 'Robert Wilson',
      date: '2024-01-14',
      uploadedBy: 'Nurse Davis',
      status: 'in-review',
      mrn: 'MRN-001235'
    },
    {
      id: 3,
      fileName: 'Brown_Susan_Medical.pdf',
      participant: 'Susan Brown',
      date: '2024-01-13',
      uploadedBy: 'Dr. Martinez',
      status: 'assigned',
      mrn: 'MRN-001236'
    }
  ];

  const selectedParticipant = {
    name: 'Mary Johnson',
    mrn: 'MRN-001234',
    dob: '1945-03-15',
    age: 79,
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, ST 12345',
    payer: 'Medicare + Medicaid',
    referralDate: '2024-01-15',
    primaryDx: 'Diabetes Type 2, Hypertension',
    referralSource: 'Community Hospital'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-review': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-review': return <AlertCircle className="w-4 h-4" />;
      case 'assigned': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Intake Management</h1>
          <p className="text-gray-600 mt-1">Manage participant referrals and intake documents</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF, JPG, PNG, DOC files up to 10MB
                </p>
                <Button variant="outline" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Bar */}
          <Card>
            <CardHeader>
              <CardTitle>Participant Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, MRN, or DOB..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Referrals Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">File Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Participant</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Uploaded By</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral) => (
                      <tr key={referral.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium">{referral.fileName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{referral.participant}</p>
                            <p className="text-sm text-gray-500">{referral.mrn}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{referral.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{referral.uploadedBy}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${getStatusColor(referral.status)} flex items-center space-x-1`}>
                            {getStatusIcon(referral.status)}
                            <span className="capitalize">{referral.status.replace('-', ' ')}</span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Participant Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Participant Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedParticipant.name}</h3>
                <p className="text-sm text-gray-600">{selectedParticipant.mrn}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>DOB: {selectedParticipant.dob} (Age {selectedParticipant.age})</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{selectedParticipant.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{selectedParticipant.address}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Insurance Information</h4>
                <Badge variant="outline">{selectedParticipant.payer}</Badge>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Clinical Summary</h4>
                <p className="text-sm text-gray-600">{selectedParticipant.primaryDx}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Referral Source</h4>
                <p className="text-sm text-gray-600">{selectedParticipant.referralSource}</p>
                <p className="text-xs text-gray-500 mt-1">Referred: {selectedParticipant.referralDate}</p>
              </div>
            </CardContent>
          </Card>

          {/* Status Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Referral Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Pending</p>
                    <p className="text-sm text-gray-500">Document received</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">In Review</p>
                    <p className="text-sm text-gray-500">Clinical review in progress</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Assigned</p>
                    <p className="text-sm text-gray-400">Awaiting assignment</p>
                  </div>
                </div>
                
                <Progress value={33} className="mt-4" />
                <p className="text-xs text-gray-500 text-center">33% Complete</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntakePage;
