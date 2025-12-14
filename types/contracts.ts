export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Zone {
  zoneId: string;
  name: string;
  securityLevel: string;
}

export interface Site {
  siteId: string;
  name: string;
  timezone: string;
  country: string;
  city: string;
  zones: Zone[];
}

export type SitesResponse = Site[];

