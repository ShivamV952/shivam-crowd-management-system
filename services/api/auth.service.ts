/**
 * Authentication API Service
 * Handles all authentication-related API calls
 * IMPORTANT: Never log credentials or tokens
 */

import { LoginRequest, LoginResponse } from "@/types/contracts";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axios from "axios";

export const login = async (credentials: LoginRequest) => {
  // Never log credentials - security best practice
  const response = await axios.post<LoginResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );

  // Never log tokens - return response data only
  return response.data;
};
