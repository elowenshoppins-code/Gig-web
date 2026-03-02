/**
 * Get the appropriate backend URL based on environment
 * - Uses REACT_APP_BACKEND_URL if set
 * - Uses current domain for production (gigzipfinder.com, preview URLs, etc.)
 */
export const getBackendUrl = () => {
  // If REACT_APP_BACKEND_URL is set and not empty, use it
  if (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.trim()) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // For all environments (including localhost), use the current domain
  // The Kubernetes Ingress will route /api/* to the backend automatically
  return window.location.origin;
};

export const BACKEND_URL = getBackendUrl();
