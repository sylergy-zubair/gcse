import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { MOCK_EXAM_BOARDS, shouldUseMock, delay } from './mock-data';

export interface ExamBoard {
  id: string;
  name: string;
  description?: string;
}

export async function getAllExamBoards(): Promise<ExamBoard[]> {
  if (shouldUseMock(API_BASE_URLS.EXAM_BOARD)) {
    await delay();
    return MOCK_EXAM_BOARDS;
  }
  
  return apiRequest<ExamBoard[]>(
    `${API_BASE_URLS.EXAM_BOARD}/exam_board`,
    {
      method: 'GET',
    }
  );
}

