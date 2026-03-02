/**
 * Get the appropriate backend URL based on environment
 * - Uses REACT_APP_BACKEND_URL if set
 * - Falls back to preview URL for localhost development
 * - Uses current domain for custom domains (gigzipfinder.com, etc.)
 */
export const getBackendUrl = () => {
  // If REACT_APP_BACKEND_URL is set and not empty, use it
  if (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.trim()) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // If we're on localhost (development), use the preview URL
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'https://gif-tools-central.preview.emergentagent.com';
  }
  
  // Otherwise, use the current domain (for custom domains like gigzipfinder.com)
  return window.location.origin;
};

export const BACKEND_URL = getBackendUrl();
