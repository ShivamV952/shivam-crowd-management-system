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

export interface OccupancyRequest {
  siteId: string;
  toUtc: string;
  fromUtc: string;
}

export interface OccupancyBucket {
  utc: number;
  local: string;
  avg: number;
}

export interface OccupancyResponse {
  siteId: string;
  fromUtc: string;
  toUtc: string;
  timezone: string;
  buckets: OccupancyBucket[];
}

