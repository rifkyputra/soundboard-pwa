/**
 * API Configuration
 */

export const API_CONFIG = {
  // Base URL - routes to all services via API gateway (Traefik)
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888',

  // WebSocket URL
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost',

  // Token configuration
  ACCESS_TOKEN_KEY: 'soundboard_access_token',
  REFRESH_TOKEN_KEY: 'soundboard_refresh_token',
  TOKEN_TYPE: 'Bearer',

  // Request timeouts
  TIMEOUT: 30000, // 30 seconds
  UPLOAD_TIMEOUT: 120000, // 2 minutes for file uploads
} as const;
