/**
 * Get the appropriate backend URL based on environment
 * Uses REACT_APP_BACKEND_URL from environment variables
 */
export const getBackendUrl = () => {
  // If REACT_APP_BACKEND_URL is set (Railway, production), use it
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // Fallback for local development
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8001';
  }
  
  // Default fallback
  return window.location.origin;
};

export const BACKEND_URL = getBackendUrl();
