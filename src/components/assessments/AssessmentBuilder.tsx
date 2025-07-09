
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult
} from '@hello-pangea/dnd';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Type, 
  CheckSquare, 
  Circle, 
  Star, 
  Calendar,
  Save,
  Eye
} from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'checkbox' | 'radio' | 'rating' | 'date';
  label: string;
  required: boolean;
  options?: string[];
}

const AssessmentBuilder = () => {
  const [formTitle, setFormTitle] = useState('New Assessment Form');
  const [formDescription, setFormDescription] = useState('');
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'textarea', label: 'Text Area', icon: Type },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { type: 'radio', label: 'Radio Button', icon: Circle },
    { type: 'rating', label: 'Rating Scale', icon: Star },
    { type: 'date', label: 'Date Picker', icon: Calendar },
  ];

  const addField = (type: string) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: type as FormField['type'],
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      options: type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined
    };
    setFormFields([...formFields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(formFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormFields(items);
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return <Input placeholder="Enter text..." className="mt-2" />;
      case 'textarea':
        return <Textarea placeholder="Enter detailed response..." className="mt-2" />;
      case 'checkbox':
        return (
          <div className="mt-2 space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" />
                <label className="text-sm">{option}</label>
              </div>
            ))}
          </div>
        );
      case 'radio':
        return (
          <div className="mt-2 space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" name={field.id} />
                <label className="text-sm">{option}</label>
              </div>
            ))}
          </div>
        );
      case 'rating':
        return (
          <div className="mt-2 flex space-x-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star key={num} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
        );
      case 'date':
        return <Input type="date" className="mt-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assessment Builder</h1>
          <p className="text-gray-600 mt-1">Create custom assessment forms with drag-and-drop interface</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{previewMode ? 'Edit Mode' : 'Preview'}</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Form</span>
          </Button>
        </div>
      </div>

      {!previewMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Field Types Sidebar */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Field Types</CardTitle>
              <CardDescription>Drag or click to add fields</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {fieldTypes.map((fieldType) => (
                <Button
                  key={fieldType.type}
                  variant="outline"
                  onClick={() => addField(fieldType.type)}
                  className="w-full justify-start flex items-center space-x-2"
                >
                  <fieldType.icon className="w-4 h-4" />
                  <span>{fieldType.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Form Builder */}
          <div className="lg:col-span-3 space-y-6">
            {/* Form Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Form Title</label>
                  <Input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter form title..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
                  <Textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter form description..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Fields */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Form Fields</CardTitle>
                <CardDescription>Drag to reorder, click to edit</CardDescription>
              </CardHeader>
              <CardContent>
                {formFields.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Type className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No fields added yet. Add some fields from the sidebar.</p>
                  </div>
                ) : (
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="form-fields">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                          {formFields.map((field, index) => (
                            <Draggable key={field.id} draggableId={field.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div {...provided.dragHandleProps}>
                                        <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                                      </div>
                                      <Input
                                        value={field.label}
                                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                                        className="font-medium"
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline">{field.type}</Badge>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeField(field.id)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                      />
                                      <span className="text-sm text-gray-600">Required</span>
                                    </label>
                                  </div>

                                  {(field.type === 'radio' || field.type === 'checkbox') && (
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700">Options:</label>
                                      {field.options?.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center space-x-2">
                                          <Input
                                            value={option}
                                            onChange={(e) => {
                                              const newOptions = [...(field.options || [])];
                                              newOptions[optionIndex] = e.target.value;
                                              updateField(field.id, { options: newOptions });
                                            }}
                                            placeholder={`Option ${optionIndex + 1}`}
                                          />
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                              const newOptions = field.options?.filter((_, i) => i !== optionIndex);
                                              updateField(field.id, { options: newOptions });
                                            }}
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      ))}
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
                                          updateField(field.id, { options: newOptions });
                                        }}
                                      >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Option
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <Card className="border-0 shadow-sm max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{formTitle}</CardTitle>
            {formDescription && <CardDescription className="text-base">{formDescription}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFieldPreview(field)}
              </div>
            ))}
            {formFields.length > 0 && (
              <div className="pt-6 border-t">
                <Button className="w-full">Submit Assessment</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssessmentBuilder;
