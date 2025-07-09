
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3, 
  Calendar, 
  User,
  Heart,
  Shield,
  Activity,
  FileText
} from 'lucide-react';

const QualityPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');

  const kpis = [
    {
      id: 1,
      name: 'Falls Rate',
      value: 2.3,
      target: 2.0,
      unit: 'per 100 participants',
      trend: 'up',
      change: 0.3,
      status: 'warning'
    },
    {
      id: 2,
      name: 'ER Visits',
      value: 4.1,
      target: 5.0,
      unit: 'per 100 participants',
      trend: 'down',
      change: -0.9,
      status: 'good'
    },
    {
      id: 3,
      name: 'Medication Errors',
      value: 0.5,
      target: 1.0,
      unit: 'per 100 participants',
      trend: 'down',
      change: -0.2,
      status: 'good'
    },
    {
      id: 4,
      name: 'Grievances',
      value: 1.2,
      target: 2.0,
      unit: 'per 100 participants',
      trend: 'up',
      change: 0.4,
      status: 'warning'
    }
  ];

  const incidents = [
    {
      id: 1,
      type: 'Fall',
      participant: 'Mary Johnson',
      date: '2024-01-14',
      severity: 'minor',
      status: 'investigating',
      owner: 'Sarah Wilson',
      dueDate: '2024-01-21',
      description: 'Participant slipped in bathroom'
    },
    {
      id: 2,
      type: 'Medication Error',
      participant: 'Robert Wilson',
      date: '2024-01-12',
      severity: 'moderate',
      status: 'resolved',
      owner: 'Dr. Martinez',
      dueDate: '2024-01-19',
      description: 'Wrong dosage administered'
    },
    {
      id: 3,
      type: 'Grievance',
      participant: 'Susan Brown',
      date: '2024-01-10',
      severity: 'low',
      status: 'open',
      owner: 'Lisa Davis',
      dueDate: '2024-01-17',
      description: 'Complaint about meal quality'
    }
  ];

  const getKpiStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'minor': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'major': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-red-500" /> : 
      <TrendingDown className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quality Management</h1>
          <p className="text-gray-600 mt-1">Monitor quality indicators and incidents</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="this-year">This Year</option>
          </select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Report Incident
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.name}</CardTitle>
                {getTrendIcon(kpi.trend)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                  <span className="text-sm text-gray-500">{kpi.unit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Target: {kpi.target}</span>
                  <Badge className={getKpiStatusColor(kpi.status)}>
                    {kpi.status}
                  </Badge>
                </div>
                <Progress 
                  value={(kpi.value / kpi.target) * 100} 
                  className="h-2"
                />
                <div className="flex items-center space-x-1 text-sm">
                  {getTrendIcon(kpi.trend)}
                  <span className={kpi.trend === 'up' ? 'text-red-600' : 'text-green-600'}>
                    {Math.abs(kpi.change)} from last period
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quality Incidents */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Quality Incidents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Participant</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Severity</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Owner</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incidents.map((incident) => (
                      <tr key={incident.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">{incident.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{incident.participant}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{incident.date}</td>
                        <td className="py-3 px-4">
                          <Badge className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(incident.status)}>
                            {incident.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{incident.owner}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{incident.dueDate}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Report New Incident
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Quality Dashboard
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Audit
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Incidents</span>
                  <span className="font-semibold">{incidents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Open Issues</span>
                  <span className="font-semibold text-yellow-600">
                    {incidents.filter(i => i.status === 'open' || i.status === 'investigating').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Resolved</span>
                  <span className="font-semibold text-green-600">
                    {incidents.filter(i => i.status === 'resolved').length}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Resolution Rate</span>
                    <span className="font-semibold">
                      {Math.round((incidents.filter(i => i.status === 'resolved').length / incidents.length) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(incidents.filter(i => i.status === 'resolved').length / incidents.length) * 100} 
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Safety Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Days without incident</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Safety score</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QualityPage;
