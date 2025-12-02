// Mock data for development when backend is not available

export const MOCK_SUBJECTS = [
  { id: '1', name: 'Literature', description: 'English Literature GCSE' },
  { id: '2', name: 'Grammar', description: 'English Grammar and Language' },
  { id: '3', name: 'Math', description: 'Mathematics GCSE' },
  { id: '4', name: 'Physics', description: 'Physics GCSE' },
  { id: '5', name: 'Chemistry', description: 'Chemistry GCSE' },
  { id: '6', name: 'Biology', description: 'Biology GCSE' },
];

export const MOCK_EXAM_BOARDS = [
  { id: '1', name: 'AQA', description: 'Assessment and Qualifications Alliance' },
  { id: '2', name: 'Edexcel', description: 'Pearson Edexcel' },
  { id: '3', name: 'OCR', description: 'Oxford, Cambridge and RSA Examinations' },
];

export const MOCK_EXAM_PAPERS = [
  { id: '1', title: 'GCSE Mathematics Paper 1', subject_id: '3', exam_board_id: '1', description: 'Foundation tier mathematics paper' },
  { id: '2', title: 'GCSE English Literature Paper 1', subject_id: '1', exam_board_id: '1', description: 'Shakespeare and the 19th-century novel' },
  { id: '3', title: 'GCSE Physics Paper 1', subject_id: '4', exam_board_id: '2', description: 'Energy and electricity' },
];

export const MOCK_QUESTIONS = [
  { id: '1', content: 'What is the formula for the area of a circle?', subject_id: '3', exam_paper_id: '1' },
  { id: '2', content: 'Solve for x: 2x + 5 = 15', subject_id: '3', exam_paper_id: '1' },
  { id: '3', content: 'Analyze the theme of love in Romeo and Juliet.', subject_id: '1', exam_paper_id: '2' },
  { id: '4', content: 'Explain the relationship between force, mass, and acceleration.', subject_id: '4', exam_paper_id: '3' },
];

export const MOCK_SUBSCRIPTION_PLANS = [
  { id: '1', name: 'Basic', price: 9.99, duration: 'month', features: ['5 exams/month', 'Basic feedback'], description: 'Perfect for occasional practice' },
  { id: '2', name: 'Premium', price: 19.99, duration: 'month', features: ['Unlimited exams', 'AI feedback', 'Progress tracking'], description: 'Best for serious students' },
  { id: '3', name: 'Student', price: 14.99, duration: 'month', features: ['10 exams/month', 'AI feedback'], description: 'Special pricing for students' },
];

export const MOCK_SUBMISSIONS = [
  { id: '1', user_id: '1', exam_session_id: '1', submitted_at: new Date().toISOString(), status: 'completed' },
  { id: '2', user_id: '1', exam_session_id: '2', submitted_at: new Date().toISOString(), status: 'completed' },
];

// Helper to simulate network delay
export const delay = (ms: number = 500): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Check if we should use mock data
export const shouldUseMock = (baseUrl: string): boolean => {
  return !baseUrl || baseUrl.trim() === '';
};

