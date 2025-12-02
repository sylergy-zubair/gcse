'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/api/auth';
import { getAllQuestions } from '@/lib/api/exams';
import { getAnswerHint, createAnswerHint } from '@/lib/api/answer-hints';
import type { AnswerHint } from '@/lib/api/answer-hints';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function HintsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [hints, setHints] = useState<Record<string, AnswerHint>>({});
  const [loading, setLoading] = useState(true);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const questionsData = await getAllQuestions();
      setQuestions(questionsData);
      
      // Load hints for all questions
      const hintsMap: Record<string, AnswerHint> = {};
      for (const question of questionsData) {
        try {
          const hint = await getAnswerHint(question.id);
          hintsMap[question.id] = hint;
        } catch (error) {
          // Hint doesn't exist yet, skip
        }
      }
      setHints(hintsMap);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetHint = async (questionId: string) => {
    try {
      const hint = await getAnswerHint(questionId);
      setHints({ ...hints, [questionId]: hint });
      setSelectedQuestionId(questionId);
    } catch (error) {
      console.error('Failed to get hint:', error);
      alert('Hint not available for this question');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-200">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2 text-black">Answer Hints</h1>
            <p className="text-gray-600">View hints to help you solve questions</p>
          </div>

          <div className="space-y-4">
            {questions.map((question) => {
              const hint = hints[question.id];
              
              return (
                <div
                  key={question.id}
                  className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-semibold mb-2">Question</h3>
                    <p className="text-gray-700">{question.content}</p>
                  </div>
                  
                  {hint ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-yellow-800">Hint</h4>
                      <p className="text-yellow-900">{hint.hint}</p>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleGetHint(question.id)}
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      Get Hint
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

