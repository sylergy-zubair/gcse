import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';

export interface ExamPaper {
  id: string;
  title: string;
  subject_id?: string;
  exam_board_id?: string;
  description?: string;
}

export interface ExamSession {
  id: string;
  exam_paper_id: string;
  user_id: string;
  status: 'in_progress' | 'completed' | 'paused';
  started_at: string;
  completed_at?: string;
}

export interface Question {
  id: string;
  content: string;
  subject_id?: string;
  exam_paper_id?: string;
}

export interface ExamPaperAnswer {
  id: string;
  question_id: string;
  user_id: string;
  answer: string;
  exam_session_id?: string;
}

export async function getAllExamPapers(): Promise<ExamPaper[]> {
  return apiRequest<ExamPaper[]>(
    `${API_BASE_URLS.EXAM_PAPER}/exam_paper`,
    {
      method: 'GET',
    }
  );
}

export async function getExamPaperById(id: string): Promise<ExamPaper> {
  return apiRequest<ExamPaper>(
    `${API_BASE_URLS.EXAM_PAPER}/exam_paper/${id}`,
    {
      method: 'GET',
    }
  );
}

export async function createExamSession(data: Partial<ExamSession>): Promise<ExamSession> {
  return apiRequest<ExamSession>(
    `${API_BASE_URLS.EXAM_SESSION}/exam_session`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function getExamSession(id: string): Promise<ExamSession> {
  return apiRequest<ExamSession>(
    `${API_BASE_URLS.EXAM_SESSION}/exam_session/${id}`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

export async function submitAnswer(data: Partial<ExamPaperAnswer>): Promise<ExamPaperAnswer> {
  return apiRequest<ExamPaperAnswer>(
    `${API_BASE_URLS.EXAM_PAPER_ANSWER}/exam_paper_answer`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function getQuestionsByPaperId(paperId: string): Promise<Question[]> {
  return apiRequest<Question[]>(
    `${API_BASE_URLS.QUES_BASE_URL}/question?exam_paper_id=${paperId}`,
    {
      method: 'GET',
    }
  );
}

