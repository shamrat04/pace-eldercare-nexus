
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Search, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Heart,
  Pill,
  Eye
} from 'lucide-react';

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const standardReports = [
    {
      id: 1,
      name: 'Monthly Enrollment Report',
      category: 'enrollment',
      description: 'Participant enrollment statistics and trends',
      lastGenerated: '2024-01-15',
      frequency: 'Monthly',
      format: 'PDF',
      icon: Users
    },
    {
      id: 2,
      name: 'Financial Summary',
      category: 'financial',
      description: 'Revenue, expenses, and claims analysis',
      lastGenerated: '2024-01-14',
      frequency: 'Weekly',
      format: 'Excel',
      icon: DollarSign
    },
    {
      id: 3,
      name: 'Quality Metrics Dashboard',
      category: 'quality',
      description: 'KPIs, incidents, and safety measures',
      lastGenerated: '2024-01-13',
      frequency: 'Weekly',
      format: 'PDF',
      icon: BarChart3
    },
    {
      id: 4,
      name: 'Medication Adherence Report',
      category: 'clinical',
      description: 'Medication compliance and drug interactions',
      lastGenerated: '2024-01-12',
      frequency: 'Monthly',
      format: 'Excel',
      icon: Pill
    },
    {
      id: 5,
      name: 'Daily Attendance Summary',
      category: 'operations',
      description: 'Day care attendance and activity participation',
      lastGenerated: '2024-01-15',
      frequency: 'Daily',
      format: 'PDF',
      icon: Activity
    },
    {
      id: 6,
      name: 'Health Outcomes Report',
      category: 'clinical',
      description: 'Patient outcomes and clinical indicators',
      lastGenerated: '2024-01-10',
      frequency: 'Quarterly',
      format: 'PDF',
      icon: Heart
    }
  ];

  const customReports = [
    {
      id: 1,
      name: 'Q1 Compliance Report',
      createdBy: 'Sarah Wilson',
      createdDate: '2024-01-10',
      parameters: 'Jan-Mar 2024, All Sites',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Provider Performance Analysis',
      createdBy: 'Dr. Martinez',
      createdDate: '2024-01-08',
      parameters: 'Last 6 months, Clinical Staff',
      status: 'generating'
    }
  ];

  const reportCategories = [
    { id: 'all', name: 'All Reports', icon: FileText },
    { id: 'enrollment', name: 'Enrollment', icon: Users },
    { id: 'financial', name: 'Financial', icon: DollarSign },
    { id: 'quality', name: 'Quality', icon: BarChart3 },
    { id: 'clinical', name: 'Clinical', icon: Heart },
    { id: 'operations', name: 'Operations', icon: Activity }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'enrollment': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'quality': return 'bg-purple-100 text-purple-800';
      case 'clinical': return 'bg-red-100 text-red-800';
      case 'operations': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = standardReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and manage reports and analytics</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Create Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{standardReports.length}</p>
                <p className="text-sm text-gray-600">Standard Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{customReports.length}</p>
                <p className="text-sm text-gray-600">Custom Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Generated This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Total Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {reportCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Standard Reports */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Standard Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <report.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{report.name}</h3>
                          <Badge className={getCategoryColor(report.category)}>
                            {report.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span>{report.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span>{report.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Generated:</span>
                        <span>{report.lastGenerated}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Generate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Reports & Filters */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customReports.map((report) => (
                  <div key={report.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Created by {report.createdBy} on {report.createdDate}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">{report.parameters}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last 30 Days</option>
                    <option>Last 60 Days</option>
                    <option>Last 90 Days</option>
                    <option>This Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Provider
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Providers</option>
                    <option>Dr. Smith</option>
                    <option>Dr. Martinez</option>
                    <option>Nursing Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payer
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Payers</option>
                    <option>Medicare</option>
                    <option>Medicaid</option>
                    <option>Private Insurance</option>
                  </select>
                </div>
                <Button className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Weekly Quality Report</p>
                    <p className="text-sm text-gray-500">Every Monday at 9:00 AM</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Monthly Financial Summary</p>
                    <p className="text-sm text-gray-500">1st of each month</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
