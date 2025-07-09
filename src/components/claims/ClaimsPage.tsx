
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  FileText,
  Calendar,
  User,
  RefreshCw
} from 'lucide-react';

const ClaimsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');

  const claims = [
    {
      id: 'CLM-2024-001',
      participant: 'Mary Johnson',
      provider: 'Dr. Smith',
      serviceDate: '2024-01-10',
      submittedDate: '2024-01-12',
      amount: 450.00,
      status: 'paid',
      cptCode: '99213',
      description: 'Office Visit - Established Patient',
      payer: 'Medicare',
      paymentDate: '2024-01-20',
      denialReason: null
    },
    {
      id: 'CLM-2024-002',
      participant: 'Robert Wilson',
      provider: 'Physical Therapy Clinic',
      serviceDate: '2024-01-08',
      submittedDate: '2024-01-10',
      amount: 125.00,
      status: 'denied',
      cptCode: '97110',
      description: 'Therapeutic Exercise',
      payer: 'Medicaid',
      paymentDate: null,
      denialReason: 'Prior authorization required'
    },
    {
      id: 'CLM-2024-003',
      participant: 'Susan Brown',
      provider: 'Lab Services Inc',
      serviceDate: '2024-01-15',
      submittedDate: '2024-01-16',
      amount: 85.50,
      status: 'submitted',
      cptCode: '80053',
      description: 'Comprehensive Metabolic Panel',
      payer: 'Medicare',
      paymentDate: null,
      denialReason: null
    },
    {
      id: 'CLM-2024-004',
      participant: 'John Smith',
      provider: 'Cardiology Associates',
      serviceDate: '2024-01-12',
      submittedDate: '2024-01-14',
      amount: 675.00,
      status: 'pending',
      cptCode: '93306',
      description: 'Echocardiogram',
      payer: 'Medicare',
      paymentDate: null,
      denialReason: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'denied': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.cptCode.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const paidAmount = claims.filter(c => c.status === 'paid').reduce((sum, claim) => sum + claim.amount, 0);
  const pendingAmount = claims.filter(c => c.status === 'pending' || c.status === 'submitted').reduce((sum, claim) => sum + claim.amount, 0);
  const deniedAmount = claims.filter(c => c.status === 'denied').reduce((sum, claim) => sum + claim.amount, 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Claims Management</h1>
          <p className="text-gray-600 mt-1">Submit and track insurance claims</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Submit New Claim
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Claims</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${paidAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Paid</p>
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
                <p className="text-2xl font-bold text-gray-900">${pendingAmount.toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-gray-900">${deniedAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Denied</p>
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
                  placeholder="Search claims..."
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
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="denied">Denied</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-60-days">Last 60 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>Claims List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Claim ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Participant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Provider</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Service Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">CPT Code</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Payer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{claim.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{claim.participant}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{claim.provider}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{claim.serviceDate}</td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium">{claim.cptCode}</span>
                        <p className="text-xs text-gray-500">{claim.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">${claim.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(claim.status)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(claim.status)}
                        <span className="capitalize">{claim.status}</span>
                      </Badge>
                      {claim.denialReason && (
                        <p className="text-xs text-red-600 mt-1">{claim.denialReason}</p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{claim.payer}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {claim.status === 'denied' && (
                          <Button variant="outline" size="sm">
                            Resubmit
                          </Button>
                        )}
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

export default ClaimsPage;
