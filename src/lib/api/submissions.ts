import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { MOCK_SUBMISSIONS, shouldUseMock, delay } from './mock-data';

export interface Submission {
  id: string;
  user_id: string;
  exam_session_id: string;
  submitted_at: string;
  status?: string;
}

export async function getAllSubmissions(): Promise<Submission[]> {
  if (shouldUseMock(API_BASE_URLS.SUBMISSION)) {
    await delay();
    return MOCK_SUBMISSIONS;
  }
  
  return apiRequest<Submission[]>(
    `${API_BASE_URLS.SUBMISSION}/submission`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

export async function getSubmissionById(id: string): Promise<Submission> {
  if (shouldUseMock(API_BASE_URLS.SUBMISSION)) {
    await delay();
    const submission = MOCK_SUBMISSIONS.find(s => s.id === id);
    if (!submission) throw new Error('Submission not found');
    return submission;
  }
  
  return apiRequest<Submission>(
    `${API_BASE_URLS.SUBMISSION}/submission/${id}`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

export async function createSubmission(data: Partial<Submission>): Promise<Submission> {
  if (shouldUseMock(API_BASE_URLS.SUBMISSION)) {
    await delay();
    return {
      id: String(Date.now()),
      user_id: data.user_id || '1',
      exam_session_id: data.exam_session_id || '1',
      submitted_at: new Date().toISOString(),
      status: 'completed',
      ...data,
    };
  }
  
  return apiRequest<Submission>(
    `${API_BASE_URLS.SUBMISSION}/submission`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

