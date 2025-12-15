
// src/components/auth/LoginPage.tsx
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Lock, Mail, User, Building, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { AdditionalSignupDialog } from "./AdditionalSignupDialog";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAdditionalDialog, setShowAdditionalDialog] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companySize: "",
    industry: "",
    website: "",
  });

  const [additionalData, setAdditionalData] = useState({
    productDescription: "",
    targetMarket: "",
    role: "",
    hearAboutUs: "",
    primaryGoal: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, login, isLoading } = useAuth();

  // If already logged in, redirect home:
  if (user) {
    return <Navigate to="/" replace />;
  }

  // 1) LOGIN handler
  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      const success = await login(loginForm.email, loginForm.password);
      if (success) {
        toast({
          title: "Login successful!",
          description: "Welcome back to LeadGen Pro",
          duration: 3000,
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
        duration: 3000,
      });
    }
    setLoading(false);
  };

  // 2) SIGNUP Step 1: Validate personal info & move to company info
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (
        !signupForm.name ||
        !signupForm.email ||
        !signupForm.password ||
        !signupForm.confirmPassword
      ) {
        toast({
          title: "Please fill in all personal fields",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      if (signupForm.password !== signupForm.confirmPassword) {
        toast({
          title: "Passwords don't match",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      if (signupForm.password.length < 6) {
        toast({
          title: "Password must be at least 6 characters",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // 3) SIGNUP Step 2: Company info → simulate signup
  const handleInitialSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupForm.companyName || !signupForm.companySize || !signupForm.industry) {
      toast({
        title: "Please fill in all required company details",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Simulate signup success and login
    try {
      const success = await login(signupForm.email, signupForm.password);
      if (success) {
        toast({
          title: "Account created successfully!",
          description: "Complete your setup to get started",
          duration: 3000,
        });
        setShowAdditionalDialog(true);
      } else {
        toast({
          title: "Signup failed",
          description: "Account creation failed. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An error occurred during signup",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // 4) ADDITIONAL SETUP: Handle completion
  const handleAdditionalStepsComplete = async (data: typeof additionalData) => {
    if (!user) {
      toast({
        title: "You must be logged in to complete setup",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      // Simulate API call for additional setup
      toast({
        title: "Setup completed!",
        description: "Welcome to LeadGen Pro",
        duration: 3000,
      });
      setShowAdditionalDialog(false);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error completing setup",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // 5) SKIP ADDITIONAL SETUP
  const handleSkip = () => {
    setShowAdditionalDialog(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">CRM</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">LeadGen Pro</h1>
          <p className="text-gray-600 mt-2">Manage your leads and grow your business</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup" onClick={() => setCurrentStep(1)}>
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* ===== LOGIN TAB ===== */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                        }
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Forgot password?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Google Sign-In",
                        description: "Google authentication would be implemented here",
                        duration: 3000,
                      });
                    }}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Sign in with Google
                  </Button>
                </form>
              </TabsContent>

              {/* ===== SIGNUP TAB ===== */}
              <TabsContent value="signup">
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-semibold">Personal Information</h3>
                      <p className="text-sm text-gray-600">Step 1 of 2</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={signupForm.name}
                          onChange={(e) =>
                            setSignupForm((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupForm.email}
                          onChange={(e) =>
                            setSignupForm((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={signupForm.password}
                          onChange={(e) =>
                            setSignupForm((prev) => ({ ...prev, password: e.target.value }))
                          }
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signupForm.confirmPassword}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mb-4"
                      onClick={() => {
                        toast({
                          title: "Google Sign-Up",
                          description: "Google authentication would be implemented here",
                          duration: 3000,
                        });
                      }}
                    >
                      <Chrome className="mr-2 h-4 w-4" />
                      Sign up with Google
                    </Button>

                    <Button type="button" onClick={handleNextStep} className="w-full">
                      Next
                    </Button>
                  </div>
                )}

                {/* Step 2: Company Info */}
                {currentStep === 2 && (
                  <form onSubmit={handleInitialSignup} className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-semibold">Company Information</h3>
                      <p className="text-sm text-gray-600">Step 2 of 2</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name *</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="company-name"
                          type="text"
                          placeholder="Enter your company name"
                          value={signupForm.companyName}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              companyName: e.target.value,
                            }))
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-size">Company Size *</Label>
                      <Select
                        onValueChange={(value) =>
                          setSignupForm((prev) => ({ ...prev, companySize: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-1000">201-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry *</Label>
                      <Select
                        onValueChange={(value) =>
                          setSignupForm((prev) => ({ ...prev, industry: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Company Website (Optional)</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourcompany.com"
                        value={signupForm.website}
                        onChange={(e) =>
                          setSignupForm((prev) => ({ ...prev, website: e.target.value }))
                        }
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreviousStep}
                        className="flex-1"
                      >
                        Previous
                      </Button>
                      <Button type="submit" className="flex-1">
                        Create Account
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-gray-600">
              By signing up, you agree to our{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Privacy Policy
              </Button>
            </div>
          </CardContent>
        </Card>

        <AdditionalSignupDialog
          isOpen={showAdditionalDialog}
          onComplete={(data) => handleAdditionalStepsComplete(data)}
        />
      </div>
    </div>
  );
};
