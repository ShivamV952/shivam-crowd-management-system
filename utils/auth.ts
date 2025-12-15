/**
 * Authentication Utilities
 * Handles authentication checks and token management
 * Ensures credentials/tokens are never logged or exposed
 */

const AUTH_TOKEN_KEY = "authToken";

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return !!token;
};

/**
 * Get authentication token (never log this)
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Set authentication token
 */
export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Remove authentication token
 */
export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
