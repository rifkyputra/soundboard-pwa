/**
 * Situations Service
 */

import { axiosInstance } from '../client';
import type { Situation, SituationCreate, SituationUpdate, ListSituationsParams } from '../types';

export const situationsService = {
  /**
   * List all situations
   */
  async list(params?: ListSituationsParams): Promise<Situation[]> {
    const response = await axiosInstance.get<Situation[]>('/api/situations', { params });
    return response.data;
  },

  /**
   * Get situation by ID
   */
  async getById(id: number): Promise<Situation> {
    const response = await axiosInstance.get<Situation>(`/api/situations/${id}`);
    return response.data;
  },

  /**
   * Create a new situation
   */
  async create(data: SituationCreate): Promise<Situation> {
    const response = await axiosInstance.post<Situation>('/api/situations', data);
    return response.data;
  },

  /**
   * Update situation
   */
  async update(id: number, data: SituationUpdate): Promise<Situation> {
    const response = await axiosInstance.put<Situation>(`/api/situations/${id}`, data);
    return response.data;
  },

  /**
   * Delete situation
   */
  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/api/situations/${id}`);
  },
};
