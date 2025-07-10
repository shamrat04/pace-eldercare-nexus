
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Eye, Filter, Users, UserCheck, UserX, Award } from 'lucide-react';
import { Provider, SPECIALTIES } from '@/types/provider';
import ProviderForm from './ProviderForm';

// Mock data for demonstration
const mockProviders: Provider[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    middleInitial: 'A',
    suffix: 'MD',
    npi: '1234567890',
    taxonomyCode: '207Q00000X',
    specialties: ['Internal Medicine'],
    type: 'Individual',
    status: 'Active',
    contractType: 'PAR',
    acceptingNewPatients: true,
    stateLicenseNumber: 'CA12345',
    deaNumber: 'AS1234567',
    caqhId: 'CAQH123',
    boardCertifications: ['American Board of Internal Medicine'],
    licenseExpirationDate: '2025-12-31',
    medicaidId: 'MED123',
    medicareId: 'MCARE123',
    email: 'john.smith@email.com',
    directPhone: '555-0123',
    fax: '555-0124',
    preferredContactMethod: 'Email',
    createdBy: 'admin',
    createdDate: '2024-01-15',
    modifiedBy: 'admin',
    modifiedDate: '2024-01-15',
    notes: 'Primary care physician with 15 years experience',
    organizations: [],
    locations: [],
    primaryOrganizationId: '1',
    primaryLocationId: '1'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    suffix: 'NP',
    npi: '9876543210',
    taxonomyCode: '363L00000X',
    specialties: ['Family Medicine', 'Pediatrics'],
    type: 'Individual',
    status: 'Active',
    contractType: 'Non-PAR',
    acceptingNewPatients: false,
    stateLicenseNumber: 'CA67890',
    caqhId: 'CAQH456',
    boardCertifications: ['American Board of Family Medicine'],
    licenseExpirationDate: '2026-06-30',
    email: 'sarah.johnson@email.com',
    directPhone: '555-0456',
    preferredContactMethod: 'Phone',
    createdBy: 'admin',
    createdDate: '2024-02-01',
    modifiedBy: 'admin',
    modifiedDate: '2024-02-01',
    organizations: [],
    locations: []
  }
];

const ProvidersPage: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [viewingProvider, setViewingProvider] = useState<Provider | null>(null);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.npi.includes(searchTerm) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter;
    const matchesSpecialty = specialtyFilter === 'all' || provider.specialties.includes(specialtyFilter);
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const handleCreateProvider = (data: any) => {
    const newProvider: Provider = {
      ...data,
      id: Date.now().toString(),
      licenseExpirationDate: data.licenseExpirationDate.toISOString().split('T')[0],
      createdBy: 'current-user',
      createdDate: new Date().toISOString().split('T')[0],
      modifiedBy: 'current-user',
      modifiedDate: new Date().toISOString().split('T')[0],
      organizations: [],
      locations: []
    };
    setProviders([...providers, newProvider]);
    setShowForm(false);
  };

  const handleUpdateProvider = (data: any) => {
    if (editingProvider) {
      const updatedProvider: Provider = {
        ...editingProvider,
        ...data,
        licenseExpirationDate: data.licenseExpirationDate.toISOString().split('T')[0],
        modifiedBy: 'current-user',
        modifiedDate: new Date().toISOString().split('T')[0]
      };
      setProviders(providers.map(p => p.id === editingProvider.id ? updatedProvider : p));
      setEditingProvider(null);
    }
  };

  const handleDeleteProvider = (id: string) => {
    setProviders(providers.filter(p => p.id !== id));
  };

  const getStatusBadge = (status: string) => {
    return status === 'Active' ? 
      <Badge className="bg-green-100 text-green-800">Active</Badge> :
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
  };

  const getContractTypeBadge = (contractType: string) => {
    return contractType === 'PAR' ?
      <Badge className="bg-blue-100 text-blue-800">PAR</Badge> :
      <Badge className="bg-orange-100 text-orange-800">Non-PAR</Badge>;
  };

  const stats = {
    total: providers.length,
    active: providers.filter(p => p.status === 'Active').length,
    acceptingPatients: providers.filter(p => p.acceptingNewPatients).length,
    par: providers.filter(p => p.contractType === 'PAR').length
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Providers</h1>
          <p className="text-gray-600 mt-1">Manage healthcare providers and their credentials</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Provider</span>
        </Button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepting Patients</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.acceptingPatients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PAR Providers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.par}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, NPI, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {SPECIALTIES.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Providers ({filteredProviders.length})</CardTitle>
          <CardDescription>
            View and manage all healthcare providers in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>NPI</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>New Patients</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {provider.firstName} {provider.middleInitial && `${provider.middleInitial}. `}
                        {provider.lastName} {provider.suffix && `, ${provider.suffix}`}
                      </div>
                      <div className="text-sm text-gray-500">{provider.type}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{provider.npi}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {provider.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {provider.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(provider.status)}</TableCell>
                  <TableCell>{getContractTypeBadge(provider.contractType)}</TableCell>
                  <TableCell>
                    {provider.acceptingNewPatients ? (
                      <Badge className="bg-green-100 text-green-800">Yes</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{provider.email}</div>
                      <div className="text-gray-500">{provider.directPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setViewingProvider(provider)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Provider Details: {provider.firstName} {provider.lastName}
                            </DialogTitle>
                          </DialogHeader>
                          {viewingProvider && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-sm text-gray-500">Basic Information</h4>
                                  <div className="mt-2 space-y-1">
                                    <p><span className="font-medium">Name:</span> {provider.firstName} {provider.middleInitial && `${provider.middleInitial}. `}{provider.lastName} {provider.suffix && `, ${provider.suffix}`}</p>
                                    <p><span className="font-medium">NPI:</span> {provider.npi}</p>
                                    <p><span className="font-medium">Type:</span> {provider.type}</p>
                                    <p><span className="font-medium">Status:</span> {provider.status}</p>
                                    <p><span className="font-medium">Contract:</span> {provider.contractType}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-gray-500">Contact Information</h4>
                                  <div className="mt-2 space-y-1">
                                    <p><span className="font-medium">Email:</span> {provider.email}</p>
                                    <p><span className="font-medium">Phone:</span> {provider.directPhone}</p>
                                    {provider.fax && <p><span className="font-medium">Fax:</span> {provider.fax}</p>}
                                    <p><span className="font-medium">Preferred Contact:</span> {provider.preferredContactMethod}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm text-gray-500">Specialties</h4>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {provider.specialties.map((specialty) => (
                                    <Badge key={specialty} variant="outline">{specialty}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm text-gray-500">Credentials</h4>
                                <div className="mt-2 space-y-1">
                                  <p><span className="font-medium">State License:</span> {provider.stateLicenseNumber}</p>
                                  {provider.deaNumber && <p><span className="font-medium">DEA:</span> {provider.deaNumber}</p>}
                                  <p><span className="font-medium">CAQH ID:</span> {provider.caqhId}</p>
                                  <p><span className="font-medium">License Expires:</span> {provider.licenseExpirationDate}</p>
                                </div>
                              </div>
                              {provider.boardCertifications.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-sm text-gray-500">Board Certifications</h4>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {provider.boardCertifications.map((cert) => (
                                      <Badge key={cert} className="bg-green-100 text-green-800">{cert}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {provider.notes && (
                                <div>
                                  <h4 className="font-medium text-sm text-gray-500">Notes</h4>
                                  <p className="mt-2 text-sm">{provider.notes}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => setEditingProvider(provider)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Provider</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {provider.firstName} {provider.lastName}? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteProvider(provider.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Provider Dialog */}
      {showForm && (
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <ProviderForm
              onSubmit={handleCreateProvider}
              onCancel={() => setShowForm(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Provider Dialog */}
      {editingProvider && (
        <Dialog open={!!editingProvider} onOpenChange={(open) => !open && setEditingProvider(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <ProviderForm
              provider={editingProvider}
              onSubmit={handleUpdateProvider}
              onCancel={() => setEditingProvider(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProvidersPage;
