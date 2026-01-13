import { useState, useEffect } from 'react';
import { getModelById } from '../services/api';
import type { ModelDetail } from '../types';

export const useModelDetail = (id: string | undefined) => {
  const [model, setModel] = useState<ModelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
        localStorage.setItem('lastVisitedModelId', id);
    }

    const fetchModel = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getModelById(parseInt(id));
        setModel(data);
      } catch (err) {
        setError('Failed to load model details.');
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [id]);

  return { model, loading, error };
};
