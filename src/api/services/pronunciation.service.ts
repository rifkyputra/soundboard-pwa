/**
 * Pronunciation Service
 */

import { axiosInstance } from '../client';
import type { Pronunciation, PronunciationCreate } from '../types';

export const pronunciationService = {
  /**
   * List all pronunciation entries
   */
  async list(): Promise<Pronunciation[]> {
    const response = await axiosInstance.get<Pronunciation[]>('/api/pronunciation');
    return response.data;
  },

  /**
   * Add pronunciation entry
   */
  async create(data: PronunciationCreate): Promise<Pronunciation> {
    const response = await axiosInstance.post<Pronunciation>('/api/pronunciation', data);
    return response.data;
  },
};
