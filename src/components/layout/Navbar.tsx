
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ClipboardList, 
  MessageSquare,
  Shield,
  Calendar,
  Pill,
  Car,
  DollarSign,
  BarChart3,
  FileBarChart,
  Upload,
  UserCheck,
  LogOut,
  Menu
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  userRole: string;
}

const Navbar = ({ currentPage, onPageChange, onLogout, userRole }: NavbarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'intake', label: 'Intake', icon: Upload },
    { id: 'participants', label: 'Participants', icon: Users },
    { id: 'providers', label: 'Providers', icon: UserCheck },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList },
    { id: 'idt', label: 'IDT Notes', icon: MessageSquare },
    { id: 'authorizations', label: 'Authorizations', icon: Shield },
    { id: 'daycare', label: 'Social Day Care', icon: Calendar },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'transportation', label: 'Transportation', icon: Car },
    { id: 'claims', label: 'Claims', icon: DollarSign },
    { id: 'quality', label: 'Quality', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'clinical': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'billing': return 'bg-green-100 text-green-800';
      case 'quality': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <nav className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">PACE EMR</h1>
                <p className="text-xs text-gray-500">Eldercare Nexus</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          {!isCollapsed && userRole && (
            <div className="mt-3">
              <Badge className={getRoleBadgeColor(userRole)}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} User
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={onLogout}
            className={`w-full flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${
              isCollapsed ? 'px-2' : 'px-3'
            }`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
