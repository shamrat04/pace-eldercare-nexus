
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Pill, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Edit, 
  Eye,
  Calendar,
  User,
  Building
} from 'lucide-react';

const MedicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState('all');

  const medications = [
    {
      id: 1,
      participant: 'Mary Johnson',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescriber: 'Dr. Smith',
      pharmacy: 'Main Street Pharmacy',
      refillsLeft: 3,
      lastFilled: '2024-01-10',
      nextRefill: '2024-02-10',
      interactions: ['Warfarin'],
      status: 'active'
    },
    {
      id: 2,
      participant: 'Mary Johnson',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescriber: 'Dr. Martinez',
      pharmacy: 'Main Street Pharmacy',
      refillsLeft: 2,
      lastFilled: '2024-01-08',
      nextRefill: '2024-02-08',
      interactions: [],
      status: 'active'
    },
    {
      id: 3,
      participant: 'Robert Wilson',
      medication: 'Warfarin',
      dosage: '5mg',
      frequency: 'Once daily',
      prescriber: 'Dr. Johnson',
      pharmacy: 'Health Plus Pharmacy',
      refillsLeft: 1,
      lastFilled: '2024-01-05',
      nextRefill: '2024-02-05',
      interactions: ['Metformin', 'Aspirin'],
      status: 'needs-refill'
    },
    {
      id: 4,
      participant: 'Susan Brown',
      medication: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      prescriber: 'Dr. Davis',
      pharmacy: 'Community Pharmacy',
      refillsLeft: 5,
      lastFilled: '2024-01-12',
      nextRefill: '2024-02-12',
      interactions: [],
      status: 'active'
    }
  ];

  const participants = [
    { id: 'all', name: 'All Participants' },
    { id: 'mary', name: 'Mary Johnson' },
    { id: 'robert', name: 'Robert Wilson' },
    { id: 'susan', name: 'Susan Brown' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'needs-refill': return 'bg-yellow-100 text-yellow-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'needs-refill': return <Clock className="w-4 h-4" />;
      case 'discontinued': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.participant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParticipant = selectedParticipant === 'all' || 
                              med.participant.toLowerCase().includes(participants.find(p => p.id === selectedParticipant)?.name.toLowerCase() || '');
    return matchesSearch && matchesParticipant;
  });

  const interactionAlerts = medications.filter(med => med.interactions.length > 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medications</h1>
          <p className="text-gray-600 mt-1">Manage participant medications and prescriptions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{medications.length}</p>
                <p className="text-sm text-gray-600">Active Medications</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {medications.filter(m => m.status === 'needs-refill').length}
                </p>
                <p className="text-sm text-gray-600">Need Refills</p>
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
                <p className="text-2xl font-bold text-gray-900">{interactionAlerts.length}</p>
                <p className="text-sm text-gray-600">Drug Interactions</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {medications.filter(m => m.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Up to Date</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drug Interactions Alert */}
      {interactionAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span>Drug Interaction Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {interactionAlerts.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium text-gray-900">{med.participant}</p>
                    <p className="text-sm text-gray-600">
                      {med.medication} may interact with: {med.interactions.join(', ')}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search medications or participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedParticipant}
                onChange={(e) => setSelectedParticipant(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {participants.map((participant) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Medication List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Participant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Medication</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Dosage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Frequency</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Prescriber</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Pharmacy</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Refills</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedications.map((medication) => (
                  <tr key={medication.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{medication.participant}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium">{medication.medication}</span>
                        {medication.interactions.length > 0 && (
                          <div className="flex items-center space-x-1 mt-1">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-red-600">Interactions</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{medication.dosage}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{medication.frequency}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{medication.prescriber}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Building className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{medication.pharmacy}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <span className="font-medium">{medication.refillsLeft}</span>
                        <span className="text-gray-500"> left</span>
                        <div className="text-xs text-gray-500">Next: {medication.nextRefill}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(medication.status)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(medication.status)}
                        <span className="capitalize">{medication.status.replace('-', ' ')}</span>
                      </Badge>
                    </td>
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

export default MedicationsPage;
