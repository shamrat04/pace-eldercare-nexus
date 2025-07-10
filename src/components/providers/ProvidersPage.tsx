
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { ProviderForm } from './ProviderForm';
import { Provider } from '@/types/provider';

const mockProviders: Provider[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    suffix: 'MD',
    npi: '1234567890',
    taxonomyCode: '207R00000X',
    specialty: ['Internal Medicine', 'Geriatrics'],
    type: 'Individual',
    status: 'Active',
    contractType: 'PAR',
    acceptingNewPatients: true,
    stateLicenseNumber: 'CA12345',
    caqhId: 'CAQH123',
    boardCertifications: ['Internal Medicine', 'Geriatrics'],
    licenseExpirationDate: new Date('2025-12-31'),
    email: 'sarah.johnson@healthcare.com',
    directPhone: '(555) 123-4567',
    preferredContactMethod: 'Email',
    createdBy: 'admin',
    createdDate: new Date('2024-01-15'),
    modifiedBy: 'admin',
    modifiedDate: new Date('2024-01-15'),
    organizations: [],
    locations: []
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    suffix: 'NP',
    npi: '2345678901',
    taxonomyCode: '363L00000X',
    specialty: ['Family Medicine'],
    type: 'Individual',
    status: 'Active',
    contractType: 'Non-PAR',
    acceptingNewPatients: false,
    stateLicenseNumber: 'CA67890',
    caqhId: 'CAQH456',
    boardCertifications: ['Family Nurse Practitioner'],
    licenseExpirationDate: new Date('2025-08-15'),
    email: 'michael.chen@healthcare.com',
    directPhone: '(555) 234-5678',
    preferredContactMethod: 'Phone',
    createdBy: 'admin',
    createdDate: new Date('2024-02-01'),
    modifiedBy: 'admin',
    modifiedDate: new Date('2024-02-01'),
    organizations: [],
    locations: []
  }
];

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | undefined>();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewProvider, setViewProvider] = useState<Provider | undefined>();

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.npi.includes(searchTerm) ||
      provider.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter;
    const matchesSpecialty = specialtyFilter === 'all' || provider.specialty.includes(specialtyFilter);
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const handleCreateProvider = () => {
    setSelectedProvider(undefined);
    setIsFormOpen(true);
  };

  const handleEditProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsFormOpen(true);
  };

  const handleViewProvider = (provider: Provider) => {
    setViewProvider(provider);
    setIsViewModalOpen(true);
  };

  const handleDeleteProvider = (providerId: string) => {
    setProviders(providers.filter(p => p.id !== providerId));
  };

  const handleSaveProvider = (data: any) => {
    if (selectedProvider) {
      // Update existing provider
      setProviders(providers.map(p => 
        p.id === selectedProvider.id 
          ? { ...selectedProvider, ...data, modifiedDate: new Date() }
          : p
      ));
    } else {
      // Create new provider
      const newProvider: Provider = {
        ...data,
        id: Date.now().toString(),
        createdBy: 'current-user',
        createdDate: new Date(),
        modifiedBy: 'current-user',
        modifiedDate: new Date(),
        organizations: [],
        locations: []
      };
      setProviders([...providers, newProvider]);
    }
    setIsFormOpen(false);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = {
      'Internal Medicine': 'bg-blue-100 text-blue-800',
      'Family Medicine': 'bg-green-100 text-green-800',
      'Geriatrics': 'bg-purple-100 text-purple-800',
      'Cardiology': 'bg-red-100 text-red-800',
      'Neurology': 'bg-indigo-100 text-indigo-800',
    };
    return colors[specialty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider Management</h1>
          <p className="text-gray-600">Manage healthcare providers and their credentials</p>
        </div>
        <Button onClick={handleCreateProvider} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Provider
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Providers</p>
                <p className="text-2xl font-bold">{providers.length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">{providers.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Providers</p>
                <p className="text-2xl font-bold">{providers.filter(p => p.status === 'Active').length}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-medium">
                  {providers.filter(p => p.status === 'Active').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accepting Patients</p>
                <p className="text-2xl font-bold">
                  {providers.filter(p => p.acceptingNewPatients).length}
                </p>
              </div>
              <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-sm font-medium">
                  {providers.filter(p => p.acceptingNewPatients).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">PAR Providers</p>
                <p className="text-2xl font-bold">
                  {providers.filter(p => p.contractType === 'PAR').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm font-medium">
                  {providers.filter(p => p.contractType === 'PAR').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, NPI, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                <SelectItem value="Family Medicine">Family Medicine</SelectItem>
                <SelectItem value="Geriatrics">Geriatrics</SelectItem>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="Neurology">Neurology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Provider Table */}
      <Card>
        <CardHeader>
          <CardTitle>Providers ({filteredProviders.length})</CardTitle>
          <CardDescription>Manage your healthcare provider network</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>NPI</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>New Patients</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(provider.firstName, provider.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {provider.firstName} {provider.lastName} {provider.suffix}
                        </div>
                        <div className="text-sm text-gray-500">{provider.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{provider.npi}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {provider.specialty.slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="secondary" className={getSpecialtyColor(spec)}>
                          {spec}
                        </Badge>
                      ))}
                      {provider.specialty.length > 2 && (
                        <Badge variant="secondary">+{provider.specialty.length - 2} more</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">{provider.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{provider.directPhone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={provider.status === 'Active' ? 'default' : 'secondary'}
                      className={provider.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {provider.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={provider.contractType === 'PAR' ? 'border-blue-200 text-blue-800' : 'border-gray-200'}
                    >
                      {provider.contractType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={provider.acceptingNewPatients ? 'default' : 'secondary'}
                      className={provider.acceptingNewPatients ? 'bg-emerald-100 text-emerald-800' : ''}
                    >
                      {provider.acceptingNewPatients ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewProvider(provider)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditProvider(provider)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Provider
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteProvider(provider.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Provider Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
          <ProviderForm
            provider={selectedProvider}
            onSave={handleSaveProvider}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Provider Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Provider Details</DialogTitle>
          </DialogHeader>
          {viewProvider && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {getInitials(viewProvider.firstName, viewProvider.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">
                    {viewProvider.firstName} {viewProvider.lastName} {viewProvider.suffix}
                  </h3>
                  <p className="text-gray-600">NPI: {viewProvider.npi}</p>
                  <div className="flex gap-2 mt-2">
                    {viewProvider.specialty.map((spec, index) => (
                      <Badge key={index} className={getSpecialtyColor(spec)}>
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{viewProvider.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{viewProvider.directPhone}</span>
                    </div>
                    {viewProvider.fax && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>Fax: {viewProvider.fax}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Credentials</h4>
                  <div className="space-y-2 text-sm">
                    <div>License: {viewProvider.stateLicenseNumber}</div>
                    {viewProvider.deaNumber && <div>DEA: {viewProvider.deaNumber}</div>}
                    <div>CAQH: {viewProvider.caqhId}</div>
                    <div>Expires: {viewProvider.licenseExpirationDate.toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              {viewProvider.boardCertifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Board Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewProvider.boardCertifications.map((cert, index) => (
                      <Badge key={index} variant="outline">{cert}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {viewProvider.notes && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Notes</h4>
                  <p className="text-sm text-gray-600">{viewProvider.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
