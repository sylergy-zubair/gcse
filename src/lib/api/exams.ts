import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { MOCK_EXAM_PAPERS, MOCK_QUESTIONS, shouldUseMock, delay } from './mock-data';

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
  if (shouldUseMock(API_BASE_URLS.EXAM_PAPER)) {
    await delay();
    return MOCK_EXAM_PAPERS;
  }
  
  return apiRequest<ExamPaper[]>(
    `${API_BASE_URLS.EXAM_PAPER}/exam_paper`,
    {
      method: 'GET',
    }
  );
}

export async function getExamPaperById(id: string): Promise<ExamPaper> {
  if (shouldUseMock(API_BASE_URLS.EXAM_PAPER)) {
    await delay();
    const paper = MOCK_EXAM_PAPERS.find(p => p.id === id);
    if (!paper) throw new Error('Exam paper not found');
    return paper;
  }
  
  return apiRequest<ExamPaper>(
    `${API_BASE_URLS.EXAM_PAPER}/exam_paper/${id}`,
    {
      method: 'GET',
    }
  );
}

export async function createExamPaper(data: Partial<ExamPaper>): Promise<ExamPaper> {
  if (shouldUseMock(API_BASE_URLS.EXAM_PAPER)) {
    await delay();
    return { id: String(Date.now()), ...data } as ExamPaper;
  }
  
  return apiRequest<ExamPaper>(
    `${API_BASE_URLS.EXAM_PAPER}/exam_paper`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function createExamSession(data: Partial<ExamSession>): Promise<ExamSession> {
  if (shouldUseMock(API_BASE_URLS.EXAM_SESSION)) {
    await delay();
    return {
      id: String(Date.now()),
      exam_paper_id: data.exam_paper_id || '1',
      user_id: data.user_id || '1',
      status: 'in_progress',
      started_at: new Date().toISOString(),
      ...data,
    } as ExamSession;
  }
  
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
  if (shouldUseMock(API_BASE_URLS.EXAM_SESSION)) {
    await delay();
    return {
      id,
      exam_paper_id: '1',
      user_id: '1',
      status: 'in_progress',
      started_at: new Date().toISOString(),
    } as ExamSession;
  }
  
  return apiRequest<ExamSession>(
    `${API_BASE_URLS.EXAM_SESSION}/exam_session/${id}`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

export async function updateExamSession(id: string, data: Partial<ExamSession>): Promise<ExamSession> {
  if (shouldUseMock(API_BASE_URLS.EXAM_SESSION)) {
    await delay();
    return {
      id,
      exam_paper_id: '1',
      user_id: '1',
      status: data.status || 'in_progress',
      started_at: new Date().toISOString(),
      ...data,
    } as ExamSession;
  }
  
  return apiRequest<ExamSession>(
    `${API_BASE_URLS.EXAM_SESSION}/exam_session/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function submitAnswer(data: Partial<ExamPaperAnswer>): Promise<ExamPaperAnswer> {
  if (shouldUseMock(API_BASE_URLS.EXAM_PAPER_ANSWER)) {
    await delay();
    return {
      id: String(Date.now()),
      question_id: data.question_id || '1',
      user_id: data.user_id || '1',
      answer: data.answer || '',
      exam_session_id: data.exam_session_id,
    } as ExamPaperAnswer;
  }
  
  return apiRequest<ExamPaperAnswer>(
    `${API_BASE_URLS.EXAM_PAPER_ANSWER}/exam_paper_answer`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function getAllQuestions(): Promise<Question[]> {
  if (shouldUseMock(API_BASE_URLS.QUES_BASE_URL)) {
    await delay();
    return MOCK_QUESTIONS;
  }
  
  return apiRequest<Question[]>(
    `${API_BASE_URLS.QUES_BASE_URL}/question`,
    {
      method: 'GET',
    }
  );
}

export async function getQuestionById(id: string): Promise<Question> {
  if (shouldUseMock(API_BASE_URLS.QUES_BASE_URL)) {
    await delay();
    const question = MOCK_QUESTIONS.find(q => q.id === id);
    if (!question) throw new Error('Question not found');
    return question;
  }
  
  return apiRequest<Question>(
    `${API_BASE_URLS.QUES_BASE_URL}/question/${id}`,
    {
      method: 'GET',
    }
  );
}

export async function createQuestion(data: Partial<Question>): Promise<Question> {
  if (shouldUseMock(API_BASE_URLS.QUES_BASE_URL)) {
    await delay();
    return { id: String(Date.now()), ...data } as Question;
  }
  
  return apiRequest<Question>(
    `${API_BASE_URLS.QUES_BASE_URL}/question`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function updateQuestion(id: string, data: Partial<Question>): Promise<Question> {
  if (shouldUseMock(API_BASE_URLS.QUES_BASE_URL)) {
    await delay();
    const question = MOCK_QUESTIONS.find(q => q.id === id);
    if (!question) throw new Error('Question not found');
    return { ...question, ...data } as Question;
  }
  
  return apiRequest<Question>(
    `${API_BASE_URLS.QUES_BASE_URL}/question/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function getQuestionsByPaperId(paperId: string): Promise<Question[]> {
  if (shouldUseMock(API_BASE_URLS.QUES_BASE_URL)) {
    await delay();
    return MOCK_QUESTIONS.filter(q => q.exam_paper_id === paperId);
  }
  
  return apiRequest<Question[]>(
    `${API_BASE_URLS.QUES_BASE_URL}/question?exam_paper_id=${paperId}`,
    {
      method: 'GET',
    }
  );
}

export async function addQuestionToExamPaper(data: { exam_paper_id: string; question_id: string }): Promise<void> {
  if (shouldUseMock(API_BASE_URLS.EXAM_PAPER_QUES)) {
    await delay();
    return;
  }
  
  return apiRequest<void>(
    `${API_BASE_URLS.EXAM_PAPER_QUES}/exam_paper_question`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function removeQuestionFromExamPaper(examPaperId: string, questionId: string): Promise<void> {
  if (shouldUseMock(API_BASE_URLS.EXAM_PAPER_QUES)) {
    await delay();
    return;
  }
  
  return apiRequest<void>(
    `${API_BASE_URLS.EXAM_PAPER_QUES}/exam_paper_question/?exam_paper_id=${examPaperId}&question_id=${questionId}`,
    {
      method: 'DELETE',
      requireAuth: true,
    }
  );
}

