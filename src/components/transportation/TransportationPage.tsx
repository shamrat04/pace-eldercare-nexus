
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Car, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Phone, 
  CheckCircle, 
  AlertTriangle,
  Edit,
  Eye,
  Navigation
} from 'lucide-react';

const TransportationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [statusFilter, setStatusFilter] = useState('all');

  const transportRequests = [
    {
      id: 'TR-2024-001',
      participant: 'Mary Johnson',
      pickupAddress: '123 Main St, Anytown, ST 12345',
      destination: 'PACE Day Center',
      scheduledTime: '08:30',
      actualTime: '08:32',
      status: 'completed',
      driver: 'Mike Wilson',
      vehicle: 'Van 01',
      notes: 'On time pickup',
      phone: '(555) 123-4567'
    },
    {
      id: 'TR-2024-002',
      participant: 'Robert Wilson',
      pickupAddress: '456 Oak Ave, Anytown, ST 12345',
      destination: 'Medical Center',
      scheduledTime: '09:15',
      actualTime: null,
      status: 'scheduled',
      driver: 'Sarah Davis',
      vehicle: 'Van 02',
      notes: 'Wheelchair accessible needed',
      phone: '(555) 234-5678'
    },
    {
      id: 'TR-2024-003',
      participant: 'Susan Brown',
      pickupAddress: '789 Pine Rd, Anytown, ST 12345',
      destination: 'PACE Day Center',
      scheduledTime: '08:45',
      actualTime: '09:10',
      status: 'delayed',
      driver: 'John Martinez',
      vehicle: 'Van 03',
      notes: 'Traffic delay',
      phone: '(555) 345-6789'
    },
    {
      id: 'TR-2024-004',
      participant: 'John Smith',
      pickupAddress: '321 Elm St, Anytown, ST 12345',
      destination: 'Physical Therapy Clinic',
      scheduledTime: '14:00',
      actualTime: null,
      status: 'cancelled',
      driver: null,
      vehicle: null,
      notes: 'Participant not available',
      phone: '(555) 456-7890'
    }
  ];

  const vehicles = [
    {
      id: 'VAN-01',
      name: 'Van 01',
      capacity: 8,
      currentOccupancy: 6,
      driver: 'Mike Wilson',
      status: 'active',
      location: 'En route to pickup'
    },
    {
      id: 'VAN-02',
      name: 'Van 02',
      capacity: 8,
      currentOccupancy: 3,
      driver: 'Sarah Davis',
      status: 'active',
      location: 'At PACE Center'
    },
    {
      id: 'VAN-03',
      name: 'Van 03',
      capacity: 6,
      currentOccupancy: 0,
      driver: 'John Martinez',
      status: 'maintenance',
      location: 'Maintenance facility'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'delayed': return <AlertTriangle className="w-4 h-4" />;
      case 'cancelled': return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress': return <Car className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getVehicleStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = transportRequests.filter(request => {
    const matchesSearch = request.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedCount = transportRequests.filter(r => r.status === 'completed').length;
  const scheduledCount = transportRequests.filter(r => r.status === 'scheduled').length;
  const delayedCount = transportRequests.filter(r => r.status === 'delayed').length;
  const cancelledCount = transportRequests.filter(r => r.status === 'cancelled').length;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transportation</h1>
          <p className="text-gray-600 mt-1">Manage participant transportation requests and schedules</p>
        </div>
        <div className="flex space-x-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Transportation
          </Button>
        </div>
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
                <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{scheduledCount}</p>
                <p className="text-sm text-gray-600">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{delayedCount}</p>
                <p className="text-sm text-gray-600">Delayed</p>
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
                <p className="text-2xl font-bold text-gray-900">{cancelledCount}</p>
                <p className="text-sm text-gray-600">Cancelled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Transportation Requests */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transportation Requests</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search requests..."
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
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="delayed">Delayed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Request ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Participant</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Pickup Location</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Destination</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Scheduled Time</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Driver/Vehicle</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Car className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{request.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <span className="font-medium">{request.participant}</span>
                              <div className="flex items-center space-x-1 mt-1">
                                <Phone className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{request.phone}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span className="text-sm text-gray-600">{request.pickupAddress}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{request.destination}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <span className="font-medium">{request.scheduledTime}</span>
                            {request.actualTime && (
                              <div className="text-xs text-gray-500">
                                Actual: {request.actualTime}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${getStatusColor(request.status)} flex items-center space-x-1 w-fit`}>
                            {getStatusIcon(request.status)}
                            <span className="capitalize">{request.status}</span>
                          </Badge>
                          {request.notes && (
                            <p className="text-xs text-gray-500 mt-1">{request.notes}</p>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {request.driver ? (
                            <div className="text-sm">
                              <span className="font-medium">{request.driver}</span>
                              <div className="text-xs text-gray-500">{request.vehicle}</div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Not assigned</span>
                          )}
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

        {/* Vehicle Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="w-5 h-5" />
                <span>Vehicle Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                      <Badge className={getVehicleStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </div>
                    {vehicle.driver && (
                      <p className="text-sm text-gray-600 mb-1">Driver: {vehicle.driver}</p>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Capacity:</span>
                      <span className="text-sm font-medium">
                        {vehicle.currentOccupancy}/{vehicle.capacity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{vehicle.location}</span>
                    </div>
                    {vehicle.status === 'active' && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Navigation className="w-4 h-4 mr-2" />
                        Track Vehicle
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Pickup
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Car className="w-4 h-4 mr-2" />
                  Manage Vehicles
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Navigation className="w-4 h-4 mr-2" />
                  Live Tracking
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Requests</span>
                  <span className="font-semibold">{transportRequests.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">On Time Rate</span>
                  <span className="font-semibold text-green-600">
                    {Math.round((completedCount / (completedCount + delayedCount || 1)) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Vehicles</span>
                  <span className="font-semibold">
                    {vehicles.filter(v => v.status === 'active').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransportationPage;
