
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from './components/auth/LoginPage';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import IntakePage from './components/intake/IntakePage';
import ParticipantProfile from './components/participants/ParticipantProfile';
import ProvidersPage from './components/providers/ProvidersPage';
import AssessmentPage from './components/assessments/AssessmentPage';
import IDTNotes from './components/idt/IDTNotes';
import MedicationsPage from './components/medications/MedicationsPage';
import DaycarePage from './components/daycare/DaycarePage';
import ClaimsPage from './components/claims/ClaimsPage';
import QualityPage from './components/quality/QualityPage';
import ReportsPage from './components/reports/ReportsPage';
import AuthorizationsPage from './components/authorizations/AuthorizationsPage';
import TransportationPage from './components/transportation/TransportationPage';
import DocumentUpload from './components/documents/DocumentUpload';

const queryClient = new QueryClient();

const App: React.FC = () => {
  console.log('App component rendering...');
  
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState('dashboard');

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
      case 'intake':
        return <IntakePage />;
      case 'participants':
        return <ParticipantProfile />;
      case 'providers':
        return <ProvidersPage />;
      case 'assessments':
        return <AssessmentPage />;
      case 'idt':
        return <IDTNotes />;
      case 'authorizations':
        return <AuthorizationsPage />;
      case 'daycare':
        return <DaycarePage />;
      case 'medications':
        return <MedicationsPage />;
      case 'transportation':
        return <TransportationPage />;
      case 'claims':
        return <ClaimsPage />;
      case 'quality':
        return <QualityPage />;
      case 'reports':
        return <ReportsPage />;
      case 'documents':
        return <DocumentUpload />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
