import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/Seo";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import bgImage from "@/assets/bg-solid-yellow.png";
import FancyCursor from "@/components/FancyCursor";
import { isTouchDevice } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const hash = window.location.hash || "";
      const params = new URLSearchParams(hash.replace(/^#/, ""));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (!error && data.session) {
          await supabase.auth.refreshSession();
          setHasValidSession(true);
        } else {
          toast({
            title: "Invalid or expired link",
            description: "Please request a new password reset email.",
            variant: "destructive",
          });
          setTimeout(() => navigate("/login"), 3000);
        }
      } else {
        const { data } = await supabase.auth.getSession();
        if (data.session) setHasValidSession(true);
        else {
          toast({
            title: "Invalid reset link",
            description: "Please open the latest link sent to your email.",
            variant: "destructive",
          });
          setTimeout(() => navigate("/login"), 3000);
        }
      }
      setInitializing(false);
    };
    run();
  }, [navigate, toast]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don’t match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error)
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        });
      else {
        toast({
          title: "Password updated successfully",
          description: "You can now sign in with your new password.",
        });
        navigate("/login");
      }
    } catch {
      toast({
        title: "Unexpected error",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  if (initializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="bg-roblox-red text-white font-bold text-2xl px-4 py-2 rounded inline-block mb-4">
            KiddoVase
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Validating Reset Link
          </h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-roblox-blue mx-auto"></div>
          <p className="text-gray-600 mt-4">
            Please wait while we verify your link...
          </p>
        </div>
      </div>
    );
  }

  if (!hasValidSession) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <img
            src={logo}
            alt="Kiddovase"
            className="h-20 mx-auto rounded animate-bounce mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Reset Link
          </h1>
          <p className="text-gray-600 mb-6">
            The reset link you used is invalid or has expired. You’ll be
            redirected shortly.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] hover:from-[#750935] hover:to-[#8d0b41] text-white font-semibold rounded-full py-3 transition-all duration-200 shadow-lg"
          >
            Go to Login
          </Button>
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
        <Seo
          title="Reset Password"
          description="Recover your Kiddovase account safely and securely. Protecting your child’s play, learning, and privacy online."
          keywords="reset password, secure account, kids safety, parental login"
          canonicalUrl="https://kiddovase.com/reset-password"
        />

        <motion.div
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <motion.img
              src={logo}
              alt="Kiddovase"
              className="h-20 mx-auto rounded animate-bounce mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Reset Your Password
            </h1>
            <p className="text-gray-600 mt-2">Enter your new password below</p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* New Password */}
            <div>
              <Label htmlFor="password" className="text-gray-700">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="mt-1 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirm-password" className="text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="mt-1 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8d0b41] to-[#a60e4d] hover:from-[#750935] hover:to-[#8d0b41] text-white font-semibold rounded-full py-3 transition-all duration-200 shadow-lg"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </Button>
          </form>

          <div className="mt-10 bg-roblox-blue text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Need More Help?</h3>
            <p className="text-sm mb-4">
              If you’re unable to reset your password, visit our Help Center for
              assistance.
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

export default ResetPassword;
