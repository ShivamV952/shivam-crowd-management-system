/**
 * Analytics API Service
 * Handles all analytics-related API calls
 */

import axios from "axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import {
  OccupancyRequest,
  OccupancyResponse,
  DwellRequest,
  DwellResponse,
} from "@/types/contracts";

export const getOccupancy = async (request: OccupancyRequest) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.post<OccupancyResponse>(
    API_ENDPOINTS.ANALYTICS.OCCUPANCY,
    request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getDwell = async (request: DwellRequest) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.post<DwellResponse>(
    API_ENDPOINTS.ANALYTICS.DWELL,
    request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

