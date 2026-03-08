/**
 * Get the appropriate backend URL based on environment
 * SOLUCIÓN DEFINITIVA: Usa preview.emergentagent.com para producción
 */
export const getBackendUrl = () => {
  const hostname = window.location.hostname;
  
  // Si estamos en localhost, usa localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return window.location.origin;
  }
  
  // Para CUALQUIER otro dominio (gigzipfinder.com, etc.)
  // USA EL DOMINIO DE PREVIEW que SÍ tiene el routing configurado
  return 'https://gif-tools-central.preview.emergentagent.com';
};

export const BACKEND_URL = getBackendUrl();
