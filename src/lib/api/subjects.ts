import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';

export interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export async function getAllSubjects(): Promise<Subject[]> {
  return apiRequest<Subject[]>(
    `${API_BASE_URLS.SUBJECTS}/subject`,
    {
      method: 'GET',
    }
  );
}

export async function getSubjectById(id: string): Promise<Subject> {
  return apiRequest<Subject>(
    `${API_BASE_URLS.SUBJECTS}/subject/${id}`,
    {
      method: 'GET',
    }
  );
}

