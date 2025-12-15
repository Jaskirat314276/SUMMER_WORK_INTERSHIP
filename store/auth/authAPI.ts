// src/store/auth/authAPI.ts
import ApiClient from '../../services/api/apiClient';
import ApiEndpoints from '../../constants/Endpoints';
import { LoginCredentials, SignupPayload, AdditionalSignupPayload } from './authTypes';

/**
 * POST /auth/login
 */
export async function loginRequest(credentials: LoginCredentials) {
  const response = await ApiClient.post(ApiEndpoints.AUTH.LOGIN, credentials);
  return response.data; // { user: {...}, token: "..." }
}

/**
 * POST /tenants/create
 */
export async function signupRequest(payload: SignupPayload) {
  console.log('sign up request was clicked');
  const response = await ApiClient.post(ApiEndpoints.AUTH.SIGNUP, payload);
  console.log('response i got from the', response);
  return response.data; // { user: {...}, tenant: {...}, token: "..." }
}

/**
 * POST /tenant/:tenantId/additional-setup
 */
export async function completeAdditionalSignup(
  tenantId: string,
  payload: AdditionalSignupPayload
) {
  const response = await ApiClient.post(
    ApiEndpoints.AUTH.COMPLETE_ADDITIONAL_SIGNUP(tenantId),
    payload
  );
  return response.data; // { user: {...} }
}
// import axios from "axios";
// import { LoginCredentials, SignupPayload, AdditionalSignupPayload } from "./authTypes";

// // Base Axios instance (you can set baseURL or interceptors here)
// const api = axios.create({
//   baseURL: 'https://ai-sales-api-poc-production.up.railway.app',
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /**
//  * POST /auth/login
//  */
// export async function loginRequest(credentials: LoginCredentials) {
//   const response = await api.post("/auth/login", credentials);
//   return response.data; 
//   // expected { user: { ... }, token: "..." }
// }

// /**
//  * POST /tenant/create 
//  * (calls your createTenant controller)
//  */
// export async function signupRequest(payload: SignupPayload) {
//     console.log("sign up request was clicked ");
//   const response = await api.post("/tenants/create", payload);
//   console.log("response i got from the ", response);
//   return response.data;
//   // expected { user: { ... }, tenant: { ... }, token: "..." }
// }

// /**
//  * POST /tenant/additional-setup 
//  * (this endpoint does NOT exist yet—if you need one, create a route that accepts
//  *  AdditionalSignupPayload and saves it against the tenant/user.)
//  */
// export async function completeAdditionalSignup(
//   tenantId: string,
//   payload: AdditionalSignupPayload,
//   token: string
// ) {
//   // Example: we might set the auth header to the token
//   const response = await api.post(
//     `/tenant/${tenantId}/additional-setup`,
//     payload,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   return response.data;
// }
