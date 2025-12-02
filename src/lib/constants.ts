// API Base URLs - These should be set in .env.local
export const API_BASE_URLS = {
  AUTH: process.env.NEXT_PUBLIC_AUTH_BASE_URL || '',
  AI_MARKING_FEEDBACK: process.env.NEXT_PUBLIC_AI_MARKING_FEEDBACK || '',
  ANSWER_HINT: process.env.NEXT_PUBLIC_ANSWER_HINT || '',
  EXAM_BOARD: process.env.NEXT_PUBLIC_EXAM_BOARD || '',
  EXAM_SESSION: process.env.NEXT_PUBLIC_EXAM_SESSION || '',
  EXAM_PAPER_QUES: process.env.NEXT_PUBLIC_EXAM_PAPER_QUES || '',
  EXAM_PAPER_ANSWER: process.env.NEXT_PUBLIC_EXAM_PAPER_ANSWER || '',
  EXAM_PAPER: process.env.NEXT_PUBLIC_EXAM_PAPER || '',
  QUES_BASE_URL: process.env.NEXT_PUBLIC_QUES_BASE_URL || '',
  SUBJECTS: process.env.NEXT_PUBLIC_SUBJECTS || '',
  SUBMISSION: process.env.NEXT_PUBLIC_SUBMISSION || '',
  SUBSCRIPTION: process.env.NEXT_PUBLIC_SUBSCRIPTION || '',
  SUBS_PLAN: process.env.NEXT_PUBLIC_SUBS_PLAN || '',
  USER_BASE_URL: process.env.NEXT_PUBLIC_USER_BASE_URL || '',
};

// Subject icons mapping (you can replace these with actual icons)
export const SUBJECT_ICONS: Record<string, string> = {
  Literature: '📚',
  Grammar: '📖',
  Math: '📐',
  Physics: '⚛️',
  Chemistry: '🧪',
  Biology: '🧬',
};

// FAQ Data
export const FAQ_DATA = [
  {
    id: 1,
    question: 'What is RAG based learning system?',
  },
  {
    id: 2,
    question: 'How does your AI help me learn or practice for GCSE exams?',
  },
  {
    id: 3,
    question: 'Is your AI trained on real GCSE exam papers?',
  },
  {
    id: 4,
    question: 'Is this platform suitable for all GCSE subjects?',
  },
  {
    id: 5,
    question: 'Can I take full model papers or just topic-based tests?',
  },
  {
    id: 6,
    question: 'Will the system track my progress and show improvement reports?',
  },
  {
    id: 7,
    question: 'How does the AI give real-time hints while solving questions?',
  },
  {
    id: 8,
    question: 'Will my previous sessions or answers be saved automatically?',
  },
  {
    id: 9,
    question: 'Is it free to use or do I need a subscription?',
  },
  {
    id: 10,
    question: 'How do I contact support if I face issues?',
  },
];

