/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import axios from "axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { LoginRequest, LoginResponse } from "@/types/contracts";

export const login = async (credentials: LoginRequest) => {
  const response = await axios.post<LoginResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );

  return response.data;
};
