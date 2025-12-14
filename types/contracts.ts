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

export interface DwellRequest {
  siteId: string;
  toUtc: string;
  fromUtc: string;
}
export interface FootfallRequest {
  siteId: string;
  toUtc: string;
  fromUtc: string;
}

export interface DwellResponse {
  siteId: string;
  fromUtc: number;
  toUtc: number;
  avgDwellMinutes: number;
  dwellRecords: number;
}

export interface FootfallResponse {
  siteId: string;
  fromUtc: string;
  toUtc: string;
  footfall: number;
}

export interface DemographicsRequest {
  siteId: string;
  toUtc: string;
  fromUtc: string;
}

export interface DemographicsBucket {
  utc: number;
  local: string;
  male: number;
  female: number;
}

export interface DemographicsResponse {
  siteId: string;
  fromUtc: string;
  toUtc: string;
  timezone: string;
  buckets: DemographicsBucket[];
}

export interface EntryExitRequest {
  siteId: string;
  toUtc: string;
  fromUtc: string;
  pageNumber: number;
  pageSize: number;
}

export interface EntryExitRecord {
  personId: string;
  personName: string;
  zoneId: string;
  zoneName: string;
  severity: string;
  entryUtc: number;
  entryLocal: string;
  exitUtc: number;
  exitLocal: string;
  dwellMinutes: number;
}

export interface EntryExitResponse {
  siteId: string;
  totalRecords: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  records: EntryExitRecord[];
}

