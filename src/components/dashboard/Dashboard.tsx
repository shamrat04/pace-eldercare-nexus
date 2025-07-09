
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  FileText,
  Heart,
  Pill,
  Car
} from 'lucide-react';

const Dashboard = () => {
  const alerts = [
    { id: 1, type: 'critical', message: 'Medication reconciliation needed for Sarah Johnson', time: '10 min ago' },
    { id: 2, type: 'warning', message: 'IDT meeting scheduled for tomorrow - 5 participants', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'Quality audit report ready for review', time: '2 hours ago' },
  ];

  const upcomingAppointments = [
    { id: 1, participant: 'Robert Martinez', type: 'Primary Care', time: '10:30 AM', status: 'confirmed' },
    { id: 2, participant: 'Mary Chen', type: 'Cardiology', time: '2:00 PM', status: 'pending' },
    { id: 3, participant: 'James Wilson', type: 'Physical Therapy', time: '3:30 PM', status: 'confirmed' },
  ];

  const idtTasks = [
    { id: 1, task: 'Complete assessment for new participant', priority: 'high', dueDate: 'Today' },
    { id: 2, task: 'Review care plan updates', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, task: 'Medication review meeting prep', priority: 'low', dueDate: 'This week' },
  ];

  const careGaps = [
    { id: 1, participant: 'Eleanor Davis', gap: 'Annual wellness visit overdue', days: 45 },
    { id: 2, participant: 'Frank Thompson', gap: 'Diabetic eye exam needed', days: 30 },
    { id: 3, participant: 'Grace Miller', gap: 'Medication adherence review', days: 15 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            System Healthy
          </Badge>
          <span className="text-sm text-gray-500">Last updated: 2 min ago</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Participants</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">247</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <p className="text-xs text-gray-500 mt-1">
              12 confirmed, 6 pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <p className="text-xs text-red-600 mt-1">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Quality Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94.2%</div>
            <Progress value={94.2} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Priority Alerts</span>
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'critical' ? 'bg-red-500' : 
                  alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>Today's Schedule</span>
            </CardTitle>
            <CardDescription>Upcoming appointments and visits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{appointment.participant}</p>
                  <p className="text-xs text-gray-600">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                  <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* IDT Tasks */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-500" />
              <span>IDT Tasks</span>
            </CardTitle>
            <CardDescription>Interdisciplinary team assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {idtTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  task.priority === 'high' ? 'bg-red-500' : 
                  task.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="outline" className="text-xs">
                      {task.priority} priority
                    </Badge>
                    <span className="text-xs text-gray-500">{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Care Gaps */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Care Gaps</span>
          </CardTitle>
          <CardDescription>Participants with outstanding care needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careGaps.map((gap) => (
              <div key={gap.id} className="p-4 rounded-lg bg-red-50 border border-red-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{gap.participant}</h4>
                  <Badge variant="destructive" className="text-xs">
                    {gap.days} days
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{gap.gap}</p>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Schedule Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-20">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-sm">New Intake</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-20">
              <FileText className="w-6 h-6 text-green-600" />
              <span className="text-sm">Assessment</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-20">
              <Pill className="w-6 h-6 text-purple-600" />
              <span className="text-sm">Medications</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center space-y-2 h-20">
              <Car className="w-6 h-6 text-orange-600" />
              <span className="text-sm">Transport</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
