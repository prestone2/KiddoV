import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";
import bgImage from "@/assets/bg-solid-yellow.png";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import FancyCursor from "@/components/FancyCursor"; // <-- Add this import
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { isTouchDevice } from "@/lib/utils";
import Seo from "@/components/Seo";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, signInWithProvider, user } = useAuth();
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, username, displayName);

    if (!error) {
      // User will be redirected after email confirmation
    }

    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    const { error } = await signInWithProvider(provider);
    // OAuth redirect will handle success case
  };

  return (
    <>
      <Seo
        title="Sign Up"
        description="Create a Kiddovase account for your child or family. Join a fun, safe, and educational gaming world built for kids and trusted by parents."
        keywords="signup, create account, child registration, family-safe gaming"
        canonicalUrl="https://kiddovase.com/signup"
      />

      {!isTouchDevice() && <FancyCursor />}
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <motion.div
          className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 bg-opacity-90"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                type: "spring",
                stiffness: 120,
              }}
            >
              <img
                src={logo}
                alt="Your Logo"
                className="h-20 mx-auto rounded"
              />
            </motion.div>

            <motion.h1
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Join KiddoVase
            </motion.h1>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Create your account and start playing!
            </motion.p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a unique username"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your display name"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                placeholder="Create a password"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="mt-1"
                required
              />
              {password !== confirmPassword && confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || password !== confirmPassword}
              className="w-full bg-roblox-blue hover:bg-roblox-blue/90 text-white"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Replace grid with centered flex container */}
            <div className="mt-6 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignIn("google")}
                className="w-64" // Fixed width for better appearance
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
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-roblox-blue hover:text-roblox-blue/80"
              >
                Sign in
              </Link>
            </p>
          </div>
          {/* Help Section */}
          <div className="mt-10 bg-roblox-blue text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Need Help Verifying?</h3>
            <p className="text-sm mb-4">
              Still not receiving your verification email? Visit our Help Center
              for troubleshooting steps.
            </p>
            <Link to="/help-center" className="w-full">
              <Button
                variant="secondary"
                className="w-full bg-white text-roblox-blue hover:bg-gray-100 font-semibold transition"
              >
                Visit Help Center
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Signup;
