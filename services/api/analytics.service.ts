/**
 * Analytics API Service
 * Handles all analytics-related API calls
 * IMPORTANT: Never log tokens
 */

import {
  DemographicsRequest,
  DemographicsResponse,
  DwellRequest,
  DwellResponse,
  EntryExitRequest,
  EntryExitResponse,
  FootfallRequest,
  FootfallResponse,
  OccupancyRequest,
  OccupancyResponse,
} from "@/types/contracts";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";

export const getOccupancy = async (request: OccupancyRequest) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication required");

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
  const token = getAuthToken();
  if (!token) throw new Error("Authentication required");

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

export const getFootfall = async (request: FootfallRequest) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication required");

  const response = await axios.post<FootfallResponse>(
    API_ENDPOINTS.ANALYTICS.FOOTFALL,
    request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getDemographics = async (request: DemographicsRequest) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication required");

  const response = await axios.post<DemographicsResponse>(
    API_ENDPOINTS.ANALYTICS.DEMOGRAPHICS,
    request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getEntryExit = async (request: EntryExitRequest) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication required");

  const response = await axios.post<EntryExitResponse>(
    API_ENDPOINTS.ANALYTICS.ENTRY_EXIT,
    request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
