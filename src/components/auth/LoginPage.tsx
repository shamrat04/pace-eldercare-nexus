
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Building2, User, Lock } from 'lucide-react';

const LoginPage = ({ onLogin }: { onLogin: (role: string) => void }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEntraLogin = async (role: string) => {
    setIsLoading(true);
    // Simulate Entra ID authentication
    setTimeout(() => {
      onLogin(role);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Organization Branding */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PACE EMR System</h1>
          <p className="text-gray-600">Comprehensive Care Management</p>
        </div>

        {/* Entra ID Login Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2 justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-xl">Secure Sign In</CardTitle>
            </div>
            <CardDescription className="text-center">
              Sign in with your organization credentials via Microsoft Entra ID
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Work or school account</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="user@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button 
              onClick={() => handleEntraLogin('clinical')}
              disabled={isLoading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Signing in...' : 'Sign in with Microsoft'}
            </Button>

            {/* Demo Role Selection */}
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500 mb-3 text-center">Demo Access (Development)</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEntraLogin('clinical')}
                  className="h-8"
                >
                  Clinical Staff
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEntraLogin('admin')}
                  className="h-8"
                >
                  Administrator
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEntraLogin('billing')}
                  className="h-8"
                >
                  Billing
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEntraLogin('quality')}
                  className="h-8"
                >
                  Quality
                </Button>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>Protected by Microsoft Entra ID</p>
              <p>HIPAA Compliant • SOC 2 Certified</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500">
          <p>© 2024 PACE EMR System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
