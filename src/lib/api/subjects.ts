import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { MOCK_SUBJECTS, shouldUseMock, delay } from './mock-data';

export interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export async function getAllSubjects(): Promise<Subject[]> {
  if (shouldUseMock(API_BASE_URLS.SUBJECTS)) {
    await delay();
    return MOCK_SUBJECTS;
  }
  
  return apiRequest<Subject[]>(
    `${API_BASE_URLS.SUBJECTS}/subject`,
    {
      method: 'GET',
    }
  );
}

export async function getSubjectById(id: string): Promise<Subject> {
  if (shouldUseMock(API_BASE_URLS.SUBJECTS)) {
    await delay();
    const subject = MOCK_SUBJECTS.find(s => s.id === id);
    if (!subject) throw new Error('Subject not found');
    return subject;
  }
  
  return apiRequest<Subject>(
    `${API_BASE_URLS.SUBJECTS}/subject/${id}`,
    {
      method: 'GET',
    }
  );
}

export async function createSubject(data: Partial<Subject>): Promise<Subject> {
  if (shouldUseMock(API_BASE_URLS.SUBJECTS)) {
    await delay();
    return { id: String(Date.now()), ...data } as Subject;
  }
  
  return apiRequest<Subject>(
    `${API_BASE_URLS.SUBJECTS}/subject`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function updateSubject(id: string, data: Partial<Subject>): Promise<Subject> {
  if (shouldUseMock(API_BASE_URLS.SUBJECTS)) {
    await delay();
    const subject = MOCK_SUBJECTS.find(s => s.id === id);
    if (!subject) throw new Error('Subject not found');
    return { ...subject, ...data } as Subject;
  }
  
  return apiRequest<Subject>(
    `${API_BASE_URLS.SUBJECTS}/subject/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

