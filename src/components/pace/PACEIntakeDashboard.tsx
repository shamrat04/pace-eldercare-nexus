import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  UserPlus, 
  Search, 
  Filter,
  Eye,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { PACEMember, PACEStatus } from '@/types/pace';
import PACEMemberDetail from './PACEMemberDetail';

// Mock data for 100+ members
const generateMockMembers = (): PACEMember[] => {
  const statuses: PACEStatus[] = ['Inquiry', 'Application Submitted', 'Eligibility Review', 'UAS Scheduled', 'UAS Completed', 'IDT Review', 'Ready to Enroll', 'Enrolled'];
  const referralSources = ['Monroe County DSS', 'Finger Lakes Health', 'Rochester General', 'Unity Health', 'Self-Referral', 'Family Referral'];
  const firstNames = ['Maria', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David'];
  const lastNames = ['Rodriguez', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez'];

  return Array.from({ length: 125 }, (_, i) => ({
    id: `PACE-${String(i + 1).padStart(3, '0')}`,
    firstName: firstNames[i % firstNames.length],
    lastName: lastNames[i % lastNames.length],
    dateOfBirth: `19${40 + (i % 25)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    medicaidCIN: i % 3 === 0 ? undefined : `NY${String(12345678 + i).slice(0, 8)}`,
    address: {
      street1: `${100 + i} Main Street`,
      city: 'Rochester',
      state: 'NY',
      zipCode: `146${String(i % 99).padStart(2, '0')}`
    },
    referralSource: referralSources[i % referralSources.length],
    currentStatus: statuses[i % statuses.length],
    createdDate: `2024-01-${String((i % 28) + 1).padStart(2, '0')}`,
    updatedDate: `2024-01-${String((i % 28) + 1).padStart(2, '0')}`
  }));
};

export default function PACEIntakeDashboard() {
  const [members] = useState<PACEMember[]>(generateMockMembers());
  const [selectedMember, setSelectedMember] = useState<PACEMember | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDetail, setShowDetail] = useState(false);

  const getStatusColor = (status: PACEStatus) => {
    const statusColors = {
      'Inquiry': 'bg-gray-100 text-gray-800',
      'Application Submitted': 'bg-blue-100 text-blue-800',
      'Eligibility Review': 'bg-yellow-100 text-yellow-800',
      'UAS Scheduled': 'bg-orange-100 text-orange-800',
      'UAS Completed': 'bg-purple-100 text-purple-800',
      'IDT Review': 'bg-indigo-100 text-indigo-800',
      'Ready to Enroll': 'bg-green-100 text-green-800',
      'Enrolled': 'bg-emerald-100 text-emerald-800',
      'Denied': 'bg-red-100 text-red-800',
      'Withdrawn': 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const isOverdue = (member: PACEMember) => {
    // Mock logic for overdue detection
    const daysSinceCreated = Math.floor((Date.now() - new Date(member.createdDate).getTime()) / (1000 * 60 * 60 * 24));
    return (member.currentStatus === 'Application Submitted' || member.currentStatus === 'Eligibility Review') && daysSinceCreated > 30;
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = !searchTerm || 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.medicaidCIN?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.dateOfBirth.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'new-referral' && member.currentStatus === 'Inquiry') ||
      (statusFilter === 'medicaid-pending' && member.currentStatus === 'Application Submitted') ||
      (statusFilter === 'uas-scheduled' && member.currentStatus === 'UAS Scheduled') ||
      (statusFilter === 'ready-to-enroll' && member.currentStatus === 'Ready to Enroll') ||
      (statusFilter === 'enrolled' && member.currentStatus === 'Enrolled');

    return matchesSearch && matchesStatus;
  });

  const handleViewMember = (member: PACEMember) => {
    setSelectedMember(member);
    setShowDetail(true);
  };

  const handleBackToDashboard = () => {
    setShowDetail(false);
    setSelectedMember(null);
  };

  if (showDetail && selectedMember) {
    return <PACEMemberDetail member={selectedMember} onBack={handleBackToDashboard} />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">PACE Intake Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Managing {filteredMembers.length} of {members.length} active intake members
          </p>
        </div>
        <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New PACE Member</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label>First Name</Label>
                <Input placeholder="Enter first name" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input placeholder="Enter last name" />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Medicaid CIN</Label>
                <Input placeholder="NY12345678" />
              </div>
              <div className="col-span-2">
                <Label>Referral Source</Label>
                <Input placeholder="Enter referral source" />
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input placeholder="Street address" />
              </div>
              <div>
                <Label>City</Label>
                <Input placeholder="City" />
              </div>
              <div>
                <Label>ZIP Code</Label>
                <Input placeholder="14620" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddMember(false)}>Cancel</Button>
              <Button>Create Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {members.filter(m => m.currentStatus === 'Inquiry').length}
            </div>
            <p className="text-sm text-muted-foreground">New Referrals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {members.filter(m => m.currentStatus === 'Application Submitted').length}
            </div>
            <p className="text-sm text-muted-foreground">Medicaid Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {members.filter(m => m.currentStatus === 'UAS Scheduled').length}
            </div>
            <p className="text-sm text-muted-foreground">UAS Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {members.filter(m => m.currentStatus === 'Ready to Enroll').length}
            </div>
            <p className="text-sm text-muted-foreground">Ready to Enroll</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-600">
              {members.filter(m => m.currentStatus === 'Enrolled').length}
            </div>
            <p className="text-sm text-muted-foreground">Enrolled</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, CIN, phone, or DOB..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new-referral">New Referral</SelectItem>
                  <SelectItem value="medicaid-pending">Medicaid Pending</SelectItem>
                  <SelectItem value="uas-scheduled">UAS Scheduled</SelectItem>
                  <SelectItem value="ready-to-enroll">Ready to Enroll</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Member Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Medicaid CIN</TableHead>
                <TableHead>Referral Source</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {member.firstName} {member.lastName}
                      {isOverdue(member) && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(member.dateOfBirth).toLocaleDateString()}</TableCell>
                  <TableCell>{member.medicaidCIN || 'Pending'}</TableCell>
                  <TableCell>{member.referralSource}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.currentStatus)}>
                      {member.currentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMember(member)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Upload className="h-3 w-3" />
                        Docs
                      </Button>
                      {member.currentStatus === 'Ready to Enroll' && (
                        <Button
                          size="sm"
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Enroll
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}