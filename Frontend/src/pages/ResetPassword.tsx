import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      try {
        // Basic SEO
        document.title = "Reset Password | KiddoVerse";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', 'Reset your account password securely.');
      } catch {}

      console.log('ResetPassword: Starting token validation...');
      
      // Supabase sends recovery tokens in the URL hash (#), not query params
      const hash = window.location.hash || '';
      console.log('ResetPassword: URL hash:', hash ? 'present' : 'missing');
      
      const params = new URLSearchParams(hash.replace(/^#/, ''));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        console.log('ResetPassword: Tokens found, establishing session...');
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        
        if (error || !data.session) {
          console.error('ResetPassword: Session setup failed:', error);
          toast({
            title: "Invalid reset link",
            description: "This password reset link is invalid or has expired.",
            variant: "destructive",
          });
          setInitializing(false);
          setTimeout(() => navigate('/login'), 2000);
          return;
        }
        
        console.log('ResetPassword: Session established successfully');
        // Clean up sensitive tokens from the URL and refresh to extend validity
        try {
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
          await supabase.auth.refreshSession();
        } catch {}
        
        setHasValidSession(true);
        setInitializing(false);
        return;
      }

      console.log('ResetPassword: No tokens in URL, checking existing session...');
      // Fallback: sometimes the SDK already set the session automatically
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log('ResetPassword: No valid session found');
        toast({
          title: "Invalid reset link",
          description: "This password reset link is invalid or has expired.",
          variant: "destructive",
        });
        setInitializing(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
      
      console.log('ResetPassword: Existing session found');
      setHasValidSession(true);
      setInitializing(false);
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, toast]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Ensure we have a valid session; refresh proactively
      let { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        await supabase.auth.refreshSession();
        ({ data: { session } } = await supabase.auth.getSession());
      }
      if (!session) {
        toast({
          title: "Session expired",
          description: "Please reopen the password reset link from your email.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const attemptUpdate = async () => supabase.auth.updateUser({ password });

      let { error } = await attemptUpdate();
      if (error) {
        // Retry once after a refresh in case the token just expired
        await supabase.auth.refreshSession();
        const retry = await attemptUpdate();
        error = retry.error;
      }

      if (error) {
        toast({
          title: "Error updating password",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password updated successfully",
          description: "Your password has been updated. You can now sign in with your new password.",
        });
        navigate('/login');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-roblox-blue to-blue-700 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="bg-roblox-red text-white font-bold text-2xl px-4 py-2 rounded inline-block mb-4">
            KiddoVerse
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Validating Reset Link</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-roblox-blue mx-auto"></div>
          <p className="text-gray-600 mt-4">Please wait while we verify your reset link...</p>
        </div>
      </div>
    );
  }

  if (!hasValidSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-roblox-blue to-blue-700 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="bg-roblox-red text-white font-bold text-2xl px-4 py-2 rounded inline-block mb-4">
            KiddoVerse
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">This password reset link is invalid or has expired. You will be redirected to the login page shortly.</p>
          <Button onClick={() => navigate('/login')} className="bg-roblox-blue hover:bg-roblox-blue/90 text-white">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-blue to-blue-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-roblox-red text-white font-bold text-2xl px-4 py-2 rounded inline-block mb-4">
            KiddoVerse
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
          <p className="text-gray-600">Enter your new password below</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="mt-1"
              required
              minLength={6}
            />
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="mt-1"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-roblox-blue hover:bg-roblox-blue/90 text-white"
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-roblox-blue hover:text-roblox-blue/80"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;