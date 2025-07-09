
import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  File, 
  FileText, 
  Image, 
  FileSpreadsheet, 
  FilePdf,
  Search,
  Tag,
  Eye,
  Download,
  Trash2,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  participant: string;
  category: string;
  tags: string[];
  aiProcessingStatus: 'pending' | 'processing' | 'complete' | 'error';
  aiTags?: string[];
  extractedText?: string;
  confidence?: number;
}

const DocumentUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const uploadedFiles: UploadedFile[] = [
    {
      id: '1',
      name: 'Lab_Results_Eleanor_Davis_2024.pdf',
      type: 'application/pdf',
      size: 245760,
      uploadDate: '2024-01-22',
      participant: 'Eleanor Davis',
      category: 'lab-results',
      tags: ['glucose', 'cholesterol', 'routine'],
      aiProcessingStatus: 'complete',
      aiTags: ['diabetes-monitoring', 'lipid-panel', 'quarterly-labs'],
      extractedText: 'Glucose: 142 mg/dL, Total Cholesterol: 178 mg/dL, HbA1c: 7.4%',
      confidence: 95
    },
    {
      id: '2',
      name: 'Insurance_Card_Medicare_2024.jpg',
      type: 'image/jpeg',
      size: 1024000,
      uploadDate: '2024-01-21',
      participant: 'Robert Martinez',
      category: 'insurance',
      tags: ['medicare', 'card'],
      aiProcessingStatus: 'complete',
      aiTags: ['insurance-verification', 'eligibility-document'],
      extractedText: 'Medicare ID: 1234567890A, Effective: 01/01/2024',
      confidence: 98
    },
    {
      id: '3',
      name: 'Physical_Therapy_Assessment.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 87040,
      uploadDate: '2024-01-20',
      participant: 'Mary Chen',
      category: 'assessment',
      tags: ['physical-therapy', 'mobility'],
      aiProcessingStatus: 'processing',
      confidence: 0
    },
    {
      id: '4',
      name: 'Medication_List_Update.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 32768,
      uploadDate: '2024-01-19',
      participant: 'Frank Thompson',
      category: 'medication',
      tags: ['medication-list', 'reconciliation'],
      aiProcessingStatus: 'pending',
      confidence: 0
    }
  ];

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'lab-results', label: 'Lab Results' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'assessment', label: 'Assessments' },
    { value: 'medication', label: 'Medications' },
    { value: 'care-plan', label: 'Care Plans' },
    { value: 'correspondence', label: 'Correspondence' }
  ];

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FilePdf;
    if (type.includes('image')) return Image;
    if (type.includes('sheet')) return FileSpreadsheet;
    if (type.includes('word')) return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...files]);
      // Start upload simulation
      files.forEach(file => {
        simulateUpload(file.name);
      });
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
      // Start upload simulation
      files.forEach(file => {
        simulateUpload(file.name);
      });
    }
  };

  const simulateUpload = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [fileName]: progress }));
    }, 200);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600 mt-1">Upload, organize, and AI-process participant documents</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800">
            <Zap className="w-3 h-3 mr-1" />
            AI Processing Enabled
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            OCR Ready
          </Badge>
        </div>
      </div>

      {/* Upload Zone */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Documents</span>
          </CardTitle>
          <CardDescription>Drag and drop files or click to browse. AI will automatically process and tag documents.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop files here to upload</p>
            <p className="text-gray-500 mb-4">or click to browse from your computer</p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
            <p className="text-xs text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, GIF (Max 10MB each)
            </p>
          </div>

          {/* Upload Progress */}
          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-gray-900">Uploading Files</h4>
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <File className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Progress value={uploadProgress[file.name] || 0} className="flex-1 h-2" />
                      <span className="text-xs text-gray-500">
                        {Math.round(uploadProgress[file.name] || 0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search documents, participants, or tags..."
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
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredFiles.map((file) => {
          const FileIcon = getFileIcon(file.type);
          return (
            <Card key={file.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <FileIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate pr-2">
                        {file.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(file.aiProcessingStatus)}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-500">
                      <p>Participant: {file.participant}</p>
                      <p>Size: {formatFileSize(file.size)} • Uploaded: {file.uploadDate}</p>
                    </div>

                    {/* AI Processing Status */}
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">AI Processing</span>
                        <Badge 
                          variant="outline" 
                          className={
                            file.aiProcessingStatus === 'complete' ? 'bg-green-50 text-green-700' :
                            file.aiProcessingStatus === 'processing' ? 'bg-yellow-50 text-yellow-700' :
                            file.aiProcessingStatus === 'error' ? 'bg-red-50 text-red-700' :
                            'bg-gray-50 text-gray-700'
                          }
                        >
                          {file.aiProcessingStatus}
                        </Badge>
                      </div>
                      
                      {file.aiProcessingStatus === 'complete' && file.extractedText && (
                        <div className="space-y-2">
                          <p className="text-xs text-gray-600">
                            <strong>Extracted:</strong> {file.extractedText}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {file.aiTags?.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <span className="text-xs text-green-600">
                              {file.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {file.aiProcessingStatus === 'processing' && (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                          <span className="text-xs text-gray-600">Analyzing document...</span>
                        </div>
                      )}
                    </div>

                    {/* Manual Tags */}
                    {file.tags.length > 0 && (
                      <div className="mt-3 flex items-center space-x-2">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <div className="flex flex-wrap gap-1">
                          {file.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="text-center py-12">
            <File className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Upload your first document to get started.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;
