
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from './components/auth/LoginPage';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ParticipantProfile from './components/participants/ParticipantProfile';
import AssessmentBuilder from './components/assessments/AssessmentBuilder';
import IDTNotes from './components/idt/IDTNotes';
import DocumentUpload from './components/documents/DocumentUpload';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'participants':
        return <ParticipantProfile />;
      case 'assessments':
        return <AssessmentBuilder />;
      case 'idt':
        return <IDTNotes />;
      case 'documents':
        return <DocumentUpload />;
      default:
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Module
              </h2>
              <p className="text-gray-600">This module is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isAuthenticated ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <div className="min-h-screen bg-white">
            <Navbar 
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onLogout={handleLogout}
              userRole={userRole}
            />
            <main>
              {renderCurrentPage()}
            </main>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
