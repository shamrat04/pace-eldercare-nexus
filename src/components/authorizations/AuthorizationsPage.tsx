
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Search, 
  Calendar, 
  User, 
  FileCheck, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Edit, 
  Eye,
  RefreshCw
} from 'lucide-react';

const AuthorizationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const authorizations = [
    {
      id: 'AUTH-2024-001',
      participant: 'Mary Johnson',
      service: 'Physical Therapy',
      provider: 'Physical Therapy Clinic',
      requestDate: '2024-01-10',
      approvalDate: '2024-01-12',
      effectiveDate: '2024-01-15',
      expirationDate: '2024-04-15',
      units: 24,
      usedUnits: 8,
      status: 'approved',
      payer: 'Medicare',
      notes: 'Standard PT protocol'
    },
    {
      id: 'AUTH-2024-002',
      participant: 'Robert Wilson',
      service: 'Specialist Consultation',
      provider: 'Cardiology Associates',
      requestDate: '2024-01-08',
      approvalDate: null,
      effectiveDate: '2024-01-20',
      expirationDate: '2024-02-20',
      units: 1,
      usedUnits: 0,
      status: 'pending',
      payer: 'Medicaid',
      notes: 'Urgent cardiac evaluation'
    },
    {
      id: 'AUTH-2024-003',
      participant: 'Susan Brown',
      service: 'Occupational Therapy',
      provider: 'Rehabilitation Center',
      requestDate: '2024-01-05',
      approvalDate: null,
      effectiveDate: null,
      expirationDate: null,
      units: 12,
      usedUnits: 0,
      status: 'denied',
      payer: 'Medicare',
      notes: 'Insufficient documentation'
    },
    {
      id: 'AUTH-2024-004',
      participant: 'John Smith',
      service: 'Home Health Aide',
      provider: 'Home Care Services',
      requestDate: '2024-01-14',
      approvalDate: '2024-01-15',
      effectiveDate: '2024-01-16',
      expirationDate: '2024-07-16',
      units: 120,
      usedUnits: 15,
      status: 'approved',
      payer: 'Medicaid',
      notes: 'Personal care assistance'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'denied': return <AlertTriangle className="w-4 h-4" />;
      case 'expired': return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getUtilizationColor = (used: number, total: number) => {
    const percentage = (used / total) * 100;
    if (percentage >= 80) return 'text-red-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredAuthorizations = authorizations.filter(auth => {
    const matchesSearch = auth.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || auth.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const approvedCount = authorizations.filter(a => a.status === 'approved').length;
  const pendingCount = authorizations.filter(a => a.status === 'pending').length;
  const deniedCount = authorizations.filter(a => a.status === 'denied').length;
  const totalUnits = authorizations.reduce((sum, auth) => sum + auth.units, 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Authorizations</h1>
          <p className="text-gray-600 mt-1">Manage service authorizations and approvals</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Request Authorization
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{deniedCount}</p>
                <p className="text-sm text-gray-600">Denied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalUnits}</p>
                <p className="text-sm text-gray-600">Total Units</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search authorizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="denied">Denied</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Authorizations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Authorization Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Auth ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Participant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Provider</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Units</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Valid Through</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Payer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthorizations.map((auth) => (
                  <tr key={auth.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{auth.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{auth.participant}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium">{auth.service}</span>
                        {auth.notes && (
                          <p className="text-xs text-gray-500 mt-1">{auth.notes}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{auth.provider}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(auth.status)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(auth.status)}
                        <span className="capitalize">{auth.status}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getUtilizationColor(auth.usedUnits, auth.units)}`}>
                            {auth.usedUnits}/{auth.units}
                          </span>
                        </div>
                        <Progress 
                          value={(auth.usedUnits / auth.units) * 100} 
                          className="h-1 w-20"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        {auth.expirationDate ? (
                          <>
                            <span className="text-gray-900">{auth.expirationDate}</span>
                            <div className="flex items-center space-x-1 mt-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {Math.ceil((new Date(auth.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{auth.payer}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthorizationsPage;
