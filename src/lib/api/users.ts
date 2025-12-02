import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { shouldUseMock, delay } from './mock-data';
import { ExamSession } from './exams';
import { ExamPaperAnswer } from './exams';
import { Submission } from './submissions';

export async function getUserExamSession(userId: string, sessionId: string): Promise<ExamSession> {
  if (shouldUseMock(API_BASE_URLS.USER_BASE_URL)) {
    await delay();
    return {
      id: sessionId,
      exam_paper_id: '1',
      user_id: userId,
      status: 'in_progress',
      started_at: new Date().toISOString(),
    } as ExamSession;
  }
  
  return apiRequest<ExamSession>(
    `${API_BASE_URLS.USER_BASE_URL}/user/exam_sesion/${sessionId}`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

export async function updateUserPassword(userId: string, newPassword: string): Promise<void> {
  if (shouldUseMock(API_BASE_URLS.USER_BASE_URL)) {
    await delay();
    return;
  }
  
  return apiRequest<void>(
    `${API_BASE_URLS.USER_BASE_URL}/user/password/${userId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ password: newPassword }),
      requireAuth: true,
    }
  );
}

export async function updateUserRole(userId: string, role: string): Promise<void> {
  if (shouldUseMock(API_BASE_URLS.USER_BASE_URL)) {
    await delay();
    return;
  }
  
  return apiRequest<void>(
    `${API_BASE_URLS.USER_BASE_URL}/user/role/${userId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ role }),
      requireAuth: true,
    }
  );
}

export async function getUserSubmissions(userId: string): Promise<Submission[]> {
  if (shouldUseMock(API_BASE_URLS.USER_BASE_URL)) {
    await delay();
    return [];
  }
  
  return apiRequest<Submission[]>(
    `${API_BASE_URLS.USER_BASE_URL}/user/submissions/${userId}`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

export async function getUserExamPaperAnswers(userId: string): Promise<ExamPaperAnswer[]> {
  if (shouldUseMock(API_BASE_URLS.USER_BASE_URL)) {
    await delay();
    return [];
  }
  
  return apiRequest<ExamPaperAnswer[]>(
    `${API_BASE_URLS.USER_BASE_URL}/exam_paper_answer?user_id=${userId}`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

