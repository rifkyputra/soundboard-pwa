/**
 * Authentication Service
 */

import { axiosInstance, apiClient } from '../client';
import type { RegisterRequest, LoginRequest, LoginResponse } from '../types';

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/api/register', data);
    const { accessToken, refreshToken } = response.data;
    apiClient.setTokens(accessToken, refreshToken);
    return response.data;
  },

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/api/login', data);
    const { accessToken, refreshToken } = response.data;
    apiClient.setTokens(accessToken, refreshToken);
    return response.data;
  },

  /**
   * Logout user (clear tokens)
   */
  logout(): void {
    apiClient.clearTokens();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  },

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return apiClient.getAccessToken();
  },

  /**
   * Health check for auth service
   */
  async healthCheck(): Promise<string> {
    const response = await axiosInstance.get<string>('/auth/api/health');
    return response.data;
  },
};
