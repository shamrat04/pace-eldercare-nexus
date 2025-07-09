
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Plus,
  Search,
  Users,
  Heart,
  Brain,
  Dumbbell
} from 'lucide-react';

const DaycarePage = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [searchTerm, setSearchTerm] = useState('');

  const participants = [
    {
      id: 1,
      name: 'Mary Johnson',
      checkIn: '08:30',
      checkOut: null,
      status: 'present',
      activities: ['Physical Therapy', 'Arts & Crafts'],
      notes: 'Engaged well in group activities',
      concerns: []
    },
    {
      id: 2,
      name: 'Robert Wilson',
      checkIn: '09:00',
      checkOut: null,
      status: 'present',
      activities: ['Cognitive Games', 'Social Hour'],
      notes: 'Needs assistance with mobility',
      concerns: ['Mobility assistance needed']
    },
    {
      id: 3,
      name: 'Susan Brown',
      checkIn: '08:45',
      checkOut: '15:30',
      status: 'departed',
      activities: ['Music Therapy', 'Lunch Program'],
      notes: 'Excellent participation today',
      concerns: []
    },
    {
      id: 4,
      name: 'John Smith',
      checkIn: null,
      checkOut: null,
      status: 'absent',
      activities: [],
      notes: 'Called in sick',
      concerns: ['Health concern']
    }
  ];

  const dailyActivities = [
    { time: '09:00', activity: 'Morning Exercise', type: 'physical', participants: 8 },
    { time: '10:00', activity: 'Cognitive Games', type: 'cognitive', participants: 6 },
    { time: '11:00', activity: 'Arts & Crafts', type: 'creative', participants: 10 },
    { time: '12:00', activity: 'Lunch Program', type: 'social', participants: 12 },
    { time: '13:00', activity: 'Music Therapy', type: 'therapeutic', participants: 7 },
    { time: '14:00', activity: 'Social Hour', type: 'social', participants: 9 },
    { time: '15:00', activity: 'Physical Therapy', type: 'therapeutic', participants: 4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'departed': return 'bg-blue-100 text-blue-800';
      case 'absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'departed': return <Clock className="w-4 h-4" />;
      case 'absent': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'physical': return <Dumbbell className="w-4 h-4" />;
      case 'cognitive': return <Brain className="w-4 h-4" />;
      case 'therapeutic': return <Heart className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'physical': return 'bg-blue-100 text-blue-800';
      case 'cognitive': return 'bg-purple-100 text-purple-800';
      case 'therapeutic': return 'bg-green-100 text-green-800';
      case 'creative': return 'bg-orange-100 text-orange-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredParticipants = participants.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = participants.filter(p => p.status === 'present').length;
  const absentCount = participants.filter(p => p.status === 'absent').length;
  const departedCount = participants.filter(p => p.status === 'departed').length;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Day Care</h1>
          <p className="text-gray-600 mt-1">Daily attendance and activity management</p>
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
            Add Activity
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{presentCount}</p>
                <p className="text-sm text-gray-600">Present Today</p>
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
                <p className="text-2xl font-bold text-gray-900">{departedCount}</p>
                <p className="text-sm text-gray-600">Departed</p>
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
                <p className="text-2xl font-bold text-gray-900">{absentCount}</p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{dailyActivities.length}</p>
                <p className="text-sm text-gray-600">Activities Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Tracking */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Tracking</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search participants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Participant</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Check In</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Check Out</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Activities</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((participant) => (
                      <tr key={participant.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <span className="font-medium">{participant.name}</span>
                              {participant.concerns.length > 0 && (
                                <div className="flex items-center space-x-1 mt-1">
                                  <AlertTriangle className="w-3 h-3 text-red-500" />
                                  <span className="text-xs text-red-600">Concern</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {participant.checkIn || '-'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {participant.checkOut || 'Still present'}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${getStatusColor(participant.status)} flex items-center space-x-1 w-fit`}>
                            {getStatusIcon(participant.status)}
                            <span className="capitalize">{participant.status}</span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {participant.activities.map((activity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {participant.status === 'present' && (
                              <Button variant="outline" size="sm">
                                Check Out
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Notes
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

          {/* Participant Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {participants.filter(p => p.notes).map((participant) => (
                  <div key={participant.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{participant.name}</h4>
                      <Badge className={getStatusColor(participant.status)}>
                        {participant.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{participant.notes}</p>
                    {participant.concerns.length > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-1">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-700">Concerns:</span>
                        </div>
                        <ul className="text-sm text-red-600 ml-5 list-disc">
                          {participant.concerns.map((concern, index) => (
                            <li key={index}>{concern}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Activities Schedule */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.activity}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getActivityColor(activity.type)}>
                        {activity.participants} participants
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Participant Note
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Incident
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Update Activity
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Weekly Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DaycarePage;
