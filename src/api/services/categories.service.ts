/**
 * Categories Service
 */

import { axiosInstance } from '../client';
import type { Category, CategoryCreate, CategoryUpdate, ListCategoriesParams } from '../types';

export const categoriesService = {
  /**
   * List all categories
   */
  async list(params?: ListCategoriesParams): Promise<Category[]> {
    const response = await axiosInstance.get<Category[]>('/api/categories', { params });
    return response.data;
  },

  /**
   * Get category by ID
   */
  async getById(id: number): Promise<Category> {
    const response = await axiosInstance.get<Category>(`/api/categories/${id}`);
    return response.data;
  },

  /**
   * Create a new category
   */
  async create(data: CategoryCreate): Promise<Category> {
    const response = await axiosInstance.post<Category>('/api/categories', data);
    return response.data;
  },

  /**
   * Update category
   */
  async update(id: number, data: CategoryUpdate): Promise<Category> {
    const response = await axiosInstance.put<Category>(`/api/categories/${id}`, data);
    return response.data;
  },

  /**
   * Delete category
   */
  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/api/categories/${id}`);
  },
};
