// Shared types for the application

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface ExamPaper {
  id: string;
  title: string;
  subject_id?: string;
  exam_board_id?: string;
  description?: string;
}

export interface Question {
  id: string;
  content: string;
  subject_id?: string;
  exam_paper_id?: string;
}

export interface Submission {
  id: string;
  user_id: string;
  exam_paper_id?: string;
  exam_session_id?: string;
  status: 'completed' | 'in_progress';
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features?: string[];
  description?: string;
}

