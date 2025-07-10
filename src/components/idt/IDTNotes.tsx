
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Plus, 
  Search, 
  Users, 
  Clock, 
  FileText,
  Filter
} from 'lucide-react';

const IDTNotes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const meetings = [
    {
      id: 1,
      participant: 'Mary Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Completed',
      attendees: ['Dr. Smith', 'Nurse Jones', 'Social Worker Brown'],
      notes: 'Reviewed medication compliance and care plan adjustments.',
      nextMeeting: '2024-04-15'
    },
    {
      id: 2,
      participant: 'Robert Smith',
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'Scheduled',
      attendees: ['Dr. Wilson', 'PT Thompson', 'Dietitian Davis'],
      notes: '',
      nextMeeting: '2024-04-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IDT Notes</h1>
          <p className="text-gray-600">Interdisciplinary Team meeting management</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find IDT Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by participant name or meeting notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Meetings List */}
      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{meeting.participant}</CardTitle>
                  <CardDescription>
                    IDT Meeting - {meeting.date} at {meeting.time}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(meeting.status)}>
                  {meeting.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Date: {meeting.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Time: {meeting.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{meeting.attendees.length} attendees</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Attendees:</h4>
                <div className="flex flex-wrap gap-2">
                  {meeting.attendees.map((attendee, index) => (
                    <Badge key={index} variant="outline">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>

              {meeting.notes && (
                <div>
                  <h4 className="font-medium mb-2">Meeting Notes:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {meeting.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-gray-500">
                  Next meeting: {meeting.nextMeeting}
                </span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    View Notes
                  </Button>
                  <Button size="sm">
                    Edit Meeting
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IDTNotes;
