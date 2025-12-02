'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '@/lib/api/auth';
import { 
  getExamSession, 
  updateExamSession,
  getQuestionsByPaperId,
  submitAnswer 
} from '@/lib/api/exams';
import { getAnswerHint } from '@/lib/api/answer-hints';
import type { ExamSession, Question, ExamPaperAnswer } from '@/lib/api/exams';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function ExamSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  
  const [session, setSession] = useState<ExamSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadSession = async () => {
    try {
      setLoading(true);
      const sessionData = await getExamSession(sessionId);
      setSession(sessionData);
      
      if (sessionData.exam_paper_id) {
        const questionsData = await getQuestionsByPaperId(sessionData.exam_paper_id);
        setQuestions(questionsData);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, sessionId]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmitAnswer = async (questionId: string) => {
    if (!session || !answers[questionId]) return;
    
    try {
      setSubmitting(true);
      await submitAnswer({
        question_id: questionId,
        user_id: session.user_id,
        answer: answers[questionId],
        exam_session_id: session.id
      });
      alert('Answer submitted successfully!');
    } catch (error) {
      console.error('Failed to submit answer:', error);
      alert('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGetHint = async (questionId: string) => {
    try {
      const hintData = await getAnswerHint(questionId);
      setHint(hintData.hint);
    } catch (error) {
      console.error('Failed to get hint:', error);
    }
  };

  const handleCompleteSession = async () => {
    if (!session) return;
    try {
      await updateExamSession(session.id, {
        status: 'completed',
        completed_at: new Date().toISOString()
      });
      router.push('/dashboard/submissions');
    } catch (error) {
      console.error('Failed to complete session:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Session not found</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';

  return (
    <div className="min-h-screen flex flex-col bg-neutral-200">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-serif text-3xl font-bold text-black">Exam Session</h1>
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow mb-6">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Question {currentQuestionIndex + 1}
            </h2>
            <p className="text-gray-700 mb-6 text-lg">{currentQuestion.content}</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Your Answer</label>
              <textarea
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg min-h-[150px]"
                placeholder="Type your answer here..."
              />
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                variant="primary"
                onClick={() => handleSubmitAnswer(currentQuestion.id)}
                disabled={!currentAnswer || submitting}
              >
                Submit Answer
              </Button>
              <Button
                variant="primary"
                onClick={() => handleGetHint(currentQuestion.id)}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                Get Hint
              </Button>
            </div>

            {hint && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Hint:</strong> {hint}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="primary"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleCompleteSession}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Exam
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

