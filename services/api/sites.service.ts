/**
 * Sites API Service
 * Handles all sites-related API calls
 */

import axios from "axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { SitesResponse } from "@/types/contracts";

export const getSites = async () => {
  const token = localStorage.getItem("authToken");
  
  const response = await axios.get<SitesResponse>(
    API_ENDPOINTS.SITES.GET_ALL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
};

