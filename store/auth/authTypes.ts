// src/store/auth/authTypes.ts

export interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "pro" | "enterprise";
}

export interface AuthState {
  user: User | null;
  tenant: { id: string; name: string; plan: string } | null;
  token: string | null;
  isLoading: boolean;         // true while login/signup is in flight
  error: string | null;       // holds an error message if something fails
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupPayload {
  // Personal details + company details for the initial signup step
  name: string;
  email: string;
  password: string;
  companyName: string;
  companySize: string;
  industry: string;
  website?: string;
}

export interface AdditionalSignupPayload {
  // Fields collected in AdditionalSignupDialog
  productDescription: string;
  targetMarket: string;
  role: string;
  hearAboutUs: string;
  primaryGoal: string;
}
