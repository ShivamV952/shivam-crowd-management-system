/**
 * API Endpoints Constants
 * Centralized location for all API endpoint URLs
 */

const BASE_URL = "https://hiring-dev.internal.kloudspot.com/api";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    // Add more auth endpoints here as needed
    // LOGOUT: `${BASE_URL}/auth/logout`,
    // REFRESH_TOKEN: `${BASE_URL}/auth/refresh`,
  },

  // Sites endpoints
  SITES: {
    GET_ALL: `${BASE_URL}/sites`,
  },

  // Analytics endpoints
  ANALYTICS: {
    OCCUPANCY: `${BASE_URL}/analytics/occupancy`,
    DWELL: `${BASE_URL}/analytics/dwell`,
  },

  // Add more endpoint groups here as needed
  // DASHBOARD: {
  //   OVERVIEW: `${BASE_URL}/dashboard/overview`,
  //   CROWD_ENTRIES: `${BASE_URL}/dashboard/crowd-entries`,
  // },
} as const;

