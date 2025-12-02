import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { shouldUseMock, delay } from './mock-data';

export interface MarkingFeedback {
  id: string;
  submission_id?: string;
  question_id?: string;
  feedback: string;
  score?: number;
  created_at?: string;
}

export async function getMarkingFeedback(id: string): Promise<MarkingFeedback> {
  if (shouldUseMock(API_BASE_URLS.AI_MARKING_FEEDBACK)) {
    await delay();
    return {
      id,
      question_id: '1',
      feedback: 'Good attempt! You correctly identified the main theme. Consider expanding on the character development aspect.',
      score: 7,
      created_at: new Date().toISOString(),
    };
  }
  
  return apiRequest<MarkingFeedback>(
    `${API_BASE_URLS.AI_MARKING_FEEDBACK}/marking_feedback/${id}`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

export async function createMarkingFeedback(data: Partial<MarkingFeedback>): Promise<MarkingFeedback> {
  if (shouldUseMock(API_BASE_URLS.AI_MARKING_FEEDBACK)) {
    await delay();
    return {
      id: String(Date.now()),
      feedback: data.feedback || 'Feedback generated',
      score: data.score || 0,
      created_at: new Date().toISOString(),
      ...data,
    };
  }
  
  return apiRequest<MarkingFeedback>(
    `${API_BASE_URLS.AI_MARKING_FEEDBACK}/marking_feedback`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

