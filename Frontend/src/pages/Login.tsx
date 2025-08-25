import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import bgImage from '@/assets/bg-solid-yellow.png';
import logo from '@/assets/logo.png';
import FancyCursor from '@/components/FancyCursor';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
   const [showForgotPassword, setShowForgotPassword] = useState(false);
   const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, resendConfirmation } = useAuth();
   const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
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
      <FancyCursor />
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
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1"
                required
              />
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
