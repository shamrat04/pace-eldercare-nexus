
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  FileText,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  Settings
} from 'lucide-react';

const AssessmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const assessments = [
    {
      id: 1,
      participant: 'Mary Johnson',
      type: 'ADL Assessment',
      provider: 'Sarah Wilson, RN',
      date: '2024-01-15',
      status: 'completed',
      score: '18/28',
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      participant: 'Robert Wilson',
      type: 'Cognitive Assessment',
      provider: 'Dr. Martinez',
      date: '2024-01-14',
      status: 'in-progress',
      score: 'Pending',
      dueDate: '2024-01-20'
    },
    {
      id: 3,
      participant: 'Susan Brown',
      type: 'Nutrition Assessment',
      provider: 'Lisa Davis, RD',
      date: '2024-01-13',
      status: 'scheduled',
      score: 'Not started',
      dueDate: '2024-01-18'
    },
    {
      id: 4,
      participant: 'John Smith',
      type: 'IADL Assessment',
      provider: 'Mike Johnson, OT',
      date: '2024-01-12',
      status: 'completed',
      score: '22/32',
      dueDate: '2024-02-12'
    }
  ];

  const assessmentTypes = [
    { name: 'ADL Assessment', description: 'Activities of Daily Living', icon: User, color: 'bg-blue-500' },
    { name: 'IADL Assessment', description: 'Instrumental Activities of Daily Living', icon: FileText, color: 'bg-green-500' },
    { name: 'Cognitive Assessment', description: 'Mental Status Evaluation', icon: Settings, color: 'bg-purple-500' },
    { name: 'Nutrition Assessment', description: 'Dietary and Nutritional Status', icon: Calendar, color: 'bg-orange-500' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || assessment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-600 mt-1">Manage participant assessments and evaluations</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Assessment Builder
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {assessmentTypes.map((type, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center`}>
                  <type.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('completed')}
              >
                Completed
              </Button>
              <Button
                variant={selectedFilter === 'in-progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('in-progress')}
              >
                In Progress
              </Button>
              <Button
                variant={selectedFilter === 'scheduled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('scheduled')}
              >
                Scheduled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Participant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Assessment Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Provider</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((assessment) => (
                  <tr key={assessment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{assessment.participant}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{assessment.type}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{assessment.provider}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{assessment.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(assessment.status)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(assessment.status)}
                        <span className="capitalize">{assessment.status.replace('-', ' ')}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${
                        assessment.score.includes('/') ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {assessment.score}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{assessment.dueDate}</td>
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

export default AssessmentPage;
