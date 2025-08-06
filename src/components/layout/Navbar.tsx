
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  UserPlus, 
  Users, 
  ClipboardList, 
  FileCheck, 
  Calendar, 
  Pill, 
  Car, 
  CreditCard, 
  BarChart3,
  FileText,
  Bell,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  userRole: string;
}

const Navbar = ({ currentPage, onPageChange, onLogout, userRole }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'intake', label: 'Intake', icon: UserPlus },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'pace-intake', label: 'PACE Intake', icon: UserPlus },
    { id: 'participants', label: 'Participants', icon: Users },
    { id: 'providers', label: 'Providers', icon: Users },
    { id: 'idt', label: 'IDT', icon: Users },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList },
    { id: 'authorizations', label: 'Authorizations', icon: FileCheck },
    { id: 'daycare', label: 'Day Care', icon: Calendar },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'transportation', label: 'Transportation', icon: Car },
    { id: 'claims', label: 'Claims', icon: CreditCard },
    { id: 'quality', label: 'Quality', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const roleColors = {
    clinical: 'bg-green-100 text-green-800',
    admin: 'bg-blue-100 text-blue-800',
    billing: 'bg-purple-100 text-purple-800',
    quality: 'bg-orange-100 text-orange-800'
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex bg-white border-b border-gray-200 px-6 py-3 items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PACE EMR</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(item.id)}
                className={`flex items-center space-x-2 ${
                  currentPage === item.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500">
              3
            </Badge>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Badge className={roleColors[userRole as keyof typeof roleColors]}>
              {userRole.toUpperCase()}
            </Badge>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              John Doe
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PACE EMR</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-red-500 text-xs">
                3
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">John Doe</span>
                <Badge className={roleColors[userRole as keyof typeof roleColors]}>
                  {userRole.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 justify-start ${
                    currentPage === item.id ? 'bg-blue-600 text-white' : 'text-gray-600'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
            <div className="border-t border-gray-100 p-4">
              <Button variant="ghost" size="sm" onClick={onLogout} className="w-full justify-start">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
