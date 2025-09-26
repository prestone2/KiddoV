import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import bgImage from '@/assets/bg-solid-yellow.png';
import logo from '@/assets/logo.png';
import FancyCursor from '@/components/FancyCursor';
import { isTouchDevice } from '@/lib/utils';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
   const [showForgotPassword, setShowForgotPassword] = useState(false);
   const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signInWithProvider, user, resendConfirmation } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Check for return URL in search params
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl');
      
      if (returnUrl) {
        // Clean the URL by removing the returnUrl parameter
        window.history.replaceState({}, '', window.location.pathname);
        // Navigate to the return URL
        navigate(decodeURIComponent(returnUrl));
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);
    
        // If email not confirmed, show resend confirmation option
    if (error && (error.message.includes('Email not confirmed') || error.message.includes('not been confirmed'))) {
      setShowResendConfirmation(true);
      setResendEmail(email);
    } else if (!error) {
      navigate('/');
    }
    
    setLoading(false);
    };

  const handleResendConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendLoading(true);

    const { error } = await resendConfirmation(resendEmail);
    
    if (!error) {
      setShowResendConfirmation(false);
      setResendEmail('');
    }
    
    setResendLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Password reset email sent",
          description: "Check your email for password reset instructions."
        });
        setShowForgotPassword(false);
        setResetEmail('');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }

    setResetLoading(false);
     };

  const handleOAuthSignIn = async (provider: 'google' | 'facebook') => {
    const { error } = await signInWithProvider(provider);
  
  };
   if (showResendConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-roblox-blue to-blue-700 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-roblox-red text-white font-bold text-2xl px-4 py-2 rounded inline-block mb-4">
              KiddoVerse
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Confirm Your Email</h1>
            <p className="text-gray-600">Resend confirmation email to verify your account</p>
          </div>

          <form onSubmit={handleResendConfirmation} className="space-y-6">
            <div>
              <Label htmlFor="resend-email">Email</Label>
              <Input
                id="resend-email"
                type="email"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={resendLoading}
              className="w-full bg-roblox-blue hover:bg-roblox-blue/90 text-white"
            >
              {resendLoading ? 'Sending...' : 'Resend Confirmation Email'}
            </Button>
          </form>
          

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowResendConfirmation(false)}
              className="text-sm text-roblox-blue hover:text-roblox-blue/80"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-roblox-blue to-blue-700 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-roblox-red text-white font-bold text-2xl px-4 py-2 rounded inline-block mb-4">
              KiddoVerse
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-600">Enter your email to receive reset instructions</p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={resetLoading}
              className="w-full bg-roblox-blue hover:bg-roblox-blue/90 text-white"
            >
              {resetLoading ? 'Sending...' : 'Send Reset Email'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="text-sm text-roblox-blue hover:text-roblox-blue/80"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isTouchDevice() && <FancyCursor />}
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <motion.div
          className="max-w-md w-full bg-white rounded-lg shadow-xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="text-center mb-8">
               <div className="flex items-center mb-6">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Home
          </Link>
        </div>
            <motion.div
              className="inline-block mb-4"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
            >
              <img
                src={logo}
                alt="Your Logo"
                className="h-20 mx-auto rounded animate-bounce"
              />
            </motion.div>
          
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to continue your adventure</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-roblox-blue focus:ring-roblox-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="font-medium text-roblox-blue hover:text-roblox-blue/80">
                Forgot your password?
                 </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-roblox-blue hover:bg-roblox-blue/90 text-white"
            >
              Sign In
            </Button>
          </form>
          
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('google')}
              className="w-full"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            {/* <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('facebook')}
              className="w-full"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button> */}
          </div>
        </div>


          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-roblox-blue hover:text-roblox-blue/80">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
