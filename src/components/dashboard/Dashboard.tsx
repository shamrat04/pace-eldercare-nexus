
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Participants', value: '248', icon: Users, color: 'text-blue-600' },
    { title: 'Upcoming Appointments', value: '12', icon: Calendar, color: 'text-green-600' },
    { title: 'New Referrals', value: '5', icon: FileText, color: 'text-orange-600' },
    { title: 'Open Issues', value: '3', icon: AlertTriangle, color: 'text-red-600' }
  ];

  const recentActivity = [
    { id: 1, action: 'New participant enrolled', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'IDT meeting scheduled', time: '4 hours ago', status: 'info' },
    { id: 3, action: 'Medication review due', time: '6 hours ago', status: 'warning' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to PACE EMR System</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {activity.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                  {activity.status === 'info' && <Clock className="h-4 w-4 text-blue-600" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">New Participant</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Schedule IDT</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">Upload Document</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
