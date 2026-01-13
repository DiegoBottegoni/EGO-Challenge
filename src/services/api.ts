import axios from 'axios';
import type { Model, ModelDetail } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://challenge.egodesign.dev/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getModels = async (): Promise<Model[]> => {
  try {
    const response = await api.get<Model[]>('/models/');
    return response.data;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

export const getModelById = async (id: number): Promise<ModelDetail> => {
  try {
    const response = await api.get<ModelDetail>(`/models/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching model ${id}:`, error);
    throw error;
  }
};
