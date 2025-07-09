
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Tag,
  MessageSquare,
  Clock,
  Users,
  Save,
  Edit3
} from 'lucide-react';

interface IDTNote {
  id: string;
  participant: string;
  participantId: string;
  author: string;
  role: string;
  date: string;
  time: string;
  category: 'assessment' | 'care-plan' | 'medication' | 'social' | 'medical' | 'behavioral';
  tags: string[];
  content: string;
  priority: 'low' | 'medium' | 'high';
  followUp?: string;
}

const IDTNotes = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newNote, setNewNote] = useState({
    participant: '',
    category: 'assessment' as IDTNote['category'],
    content: '',
    tags: [] as string[],
    priority: 'medium' as IDTNote['priority'],
    followUp: ''
  });

  const notes: IDTNote[] = [
    {
      id: '1',
      participant: 'Eleanor Davis',
      participantId: 'P-2024-001',
      author: 'Dr. Sarah Mitchell',
      role: 'Primary Care Physician',
      date: '2024-01-22',
      time: '10:30 AM',
      category: 'medical',
      tags: ['diabetes', 'medication-adjustment', 'follow-up'],
      content: 'Participant showed improved glucose control with recent medication adjustments. HbA1c decreased from 8.2% to 7.4%. Recommending continuation of current regimen with monthly monitoring. Patient reports no side effects and good medication adherence.',
      priority: 'medium',
      followUp: 'Schedule glucose monitoring in 4 weeks'
    },
    {
      id: '2',
      participant: 'Robert Martinez',
      participantId: 'P-2024-002',
      author: 'Jennifer Lopez, NP',
      role: 'Nurse Practitioner',
      date: '2024-01-22',
      time: '2:15 PM',
      category: 'care-plan',
      tags: ['mobility', 'pt-referral', 'fall-risk'],
      content: 'IDT meeting discussion regarding increased fall risk. Physical therapy evaluation recommended. Home safety assessment completed - recommend grab bars installation and carpet removal. Family education provided on fall prevention strategies.',
      priority: 'high',
      followUp: 'PT evaluation within 1 week'
    },
    {
      id: '3',
      participant: 'Mary Chen',
      participantId: 'P-2024-003',
      author: 'Michael Johnson, MSW',
      role: 'Social Worker',
      date: '2024-01-21',
      time: '3:45 PM',
      category: 'social',
      tags: ['family-support', 'transportation', 'resources'],
      content: 'Family meeting held to discuss transportation needs for medical appointments. Daughter will coordinate with PACE transportation services. Also discussed caregiver respite options - family interested in adult day program expansion.',
      priority: 'low',
      followUp: 'Connect family with day program coordinator'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', count: notes.length },
    { value: 'medical', label: 'Medical', count: notes.filter(n => n.category === 'medical').length },
    { value: 'care-plan', label: 'Care Plan', count: notes.filter(n => n.category === 'care-plan').length },
    { value: 'assessment', label: 'Assessment', count: notes.filter(n => n.category === 'assessment').length },
    { value: 'medication', label: 'Medication', count: notes.filter(n => n.category === 'medication').length },
    { value: 'social', label: 'Social', count: notes.filter(n => n.category === 'social').length },
    { value: 'behavioral', label: 'Behavioral', count: notes.filter(n => n.category === 'behavioral').length }
  ];

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const categoryColors = {
    medical: 'bg-blue-100 text-blue-800',
    'care-plan': 'bg-purple-100 text-purple-800',
    assessment: 'bg-green-100 text-green-800',
    medication: 'bg-orange-100 text-orange-800',
    social: 'bg-pink-100 text-pink-800',
    behavioral: 'bg-indigo-100 text-indigo-800'
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveNote = () => {
    // Implementation for saving note
    console.log('Saving note:', newNote);
    setIsCreating(false);
    setNewNote({
      participant: '',
      category: 'assessment',
      content: '',
      tags: [],
      priority: 'medium',
      followUp: ''
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IDT Notes</h1>
          <p className="text-gray-600 mt-1">Structured interdisciplinary team documentation</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search notes, participants, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="whitespace-nowrap"
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create New Note */}
      {isCreating && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit3 className="w-5 h-5" />
              <span>Create New IDT Note</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Participant</label>
                <Input
                  placeholder="Select or search participant..."
                  value={newNote.participant}
                  onChange={(e) => setNewNote({...newNote, participant: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <select
                  value={newNote.category}
                  onChange={(e) => setNewNote({...newNote, category: e.target.value as IDTNote['category']})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="assessment">Assessment</option>
                  <option value="care-plan">Care Plan</option>
                  <option value="medical">Medical</option>
                  <option value="medication">Medication</option>
                  <option value="social">Social</option>
                  <option value="behavioral">Behavioral</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Note Content</label>
              <Textarea
                placeholder="Enter detailed note content..."
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
                <select
                  value={newNote.priority}
                  onChange={(e) => setNewNote({...newNote, priority: e.target.value as IDTNote['priority']})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tags (comma separated)</label>
                <Input
                  placeholder="diabetes, medication, follow-up..."
                  onChange={(e) => setNewNote({...newNote, tags: e.target.value.split(',').map(t => t.trim())})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Follow-up Actions</label>
              <Input
                placeholder="Next steps or follow-up required..."
                value={newNote.followUp}
                onChange={(e) => setNewNote({...newNote, followUp: e.target.value})}
              />
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t">
              <Button onClick={handleSaveNote} className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Note</span>
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{note.participant}</span>
                        <Badge variant="outline" className="text-xs">
                          {note.participantId}
                        </Badge>
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {note.author} • {note.role}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={priorityColors[note.priority]}>
                        {note.priority} priority
                      </Badge>
                      <Badge className={categoryColors[note.category]}>
                        {note.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{note.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{note.time}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{note.content}</p>

                  {note.tags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {note.followUp && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Follow-up Required</span>
                      </div>
                      <p className="text-sm text-blue-800">{note.followUp}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Start by creating your first IDT note.'}
            </p>
            {!searchTerm && selectedCategory === 'all' && (
              <Button onClick={() => setIsCreating(true)}>
                Create First Note
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IDTNotes;
