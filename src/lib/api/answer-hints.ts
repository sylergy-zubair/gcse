import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { shouldUseMock, delay } from './mock-data';

export interface AnswerHint {
  id: string;
  question_id: string;
  hint: string;
  created_at?: string;
}

export async function getAnswerHint(questionId: string): Promise<AnswerHint> {
  if (shouldUseMock(API_BASE_URLS.ANSWER_HINT)) {
    await delay();
    return {
      id: String(Date.now()),
      question_id: questionId,
      hint: 'Consider the relationship between the variables. Try substituting known values.',
      created_at: new Date().toISOString(),
    };
  }
  
  return apiRequest<AnswerHint>(
    `${API_BASE_URLS.ANSWER_HINT}/answer_hint/${questionId}`,
    {
      method: 'GET',
    }
  );
}

export async function createAnswerHint(data: Partial<AnswerHint>): Promise<AnswerHint> {
  if (shouldUseMock(API_BASE_URLS.ANSWER_HINT)) {
    await delay();
    return {
      id: String(Date.now()),
      question_id: data.question_id || '1',
      hint: data.hint || 'Hint text',
      created_at: new Date().toISOString(),
    };
  }
  
  return apiRequest<AnswerHint>(
    `${API_BASE_URLS.ANSWER_HINT}/answer_hint`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

