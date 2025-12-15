/**
 * Sites API Service
 * Handles all sites-related API calls
 * IMPORTANT: Never log tokens
 */

import axios from "axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { SitesResponse } from "@/types/contracts";
import { getAuthToken } from "@/utils/auth";

export const getSites = async () => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.get<SitesResponse>(API_ENDPOINTS.SITES.GET_ALL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
