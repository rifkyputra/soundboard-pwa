/**
 * Cards Service
 */

import { axiosInstance } from '../client';
import type { Card, CardCreate, CardUpdate, ListCardsParams } from '../types';

export const cardsService = {
  /**
   * List all cards
   */
  async list(params?: ListCardsParams): Promise<Card[]> {
    const response = await axiosInstance.get<Card[]>('/api/cards', { params });
    return response.data;
  },

  /**
   * Get card by ID
   */
  async getById(id: number): Promise<Card> {
    const response = await axiosInstance.get<Card>(`/api/cards/${id}`);
    return response.data;
  },

  /**
   * Create a new card
   */
  async create(data: CardCreate): Promise<Card> {
    const response = await axiosInstance.post<Card>('/api/cards', data);
    return response.data;
  },

  /**
   * Update card
   */
  async update(id: number, data: CardUpdate): Promise<Card> {
    const response = await axiosInstance.put<Card>(`/api/cards/${id}`, data);
    return response.data;
  },

  /**
   * Delete card
   */
  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/api/cards/${id}`);
  },
};
