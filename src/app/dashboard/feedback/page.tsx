'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/api/auth';
import { getAllSubmissions } from '@/lib/api/submissions';
import { getMarkingFeedback, createMarkingFeedback } from '@/lib/api/marking-feedback';
import type { MarkingFeedback } from '@/lib/api/marking-feedback';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function FeedbackPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<MarkingFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

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
      const submissionsData = await getAllSubmissions();
      setSubmissions(submissionsData);
      
      // Load feedback for all submissions
      const feedbackPromises = submissionsData.map(sub => 
        getMarkingFeedback(sub.id).catch(() => null)
      );
      const feedbackResults = await Promise.all(feedbackPromises);
      setFeedback(feedbackResults.filter(f => f !== null) as MarkingFeedback[]);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
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
            <h1 className="font-serif text-4xl font-bold mb-2 text-black">AI Marking Feedback</h1>
            <p className="text-gray-600">View AI-generated feedback for your submissions</p>
          </div>

          <div className="space-y-6">
            {feedback.length === 0 ? (
              <div className="bg-white rounded-lg p-8 shadow text-center">
                <p className="text-gray-600">No feedback available yet. Complete an exam to receive AI feedback.</p>
              </div>
            ) : (
              feedback.map((fb) => {
                const submission = submissions.find(s => s.id === fb.submission_id || s.id === fb.id);
                
                return (
                  <div
                    key={fb.id}
                    className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2">
                          Feedback #{fb.id}
                        </h3>
                        {submission && (
                          <p className="text-sm text-gray-600">
                            Submission: {new Date(submission.submitted_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                      {fb.score !== undefined && (
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">Score</p>
                          <p className="text-3xl font-bold text-blue-600">{fb.score}/10</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{fb.feedback}</p>
                    </div>
                    
                    {fb.created_at && (
                      <p className="text-xs text-gray-500">
                        Generated: {new Date(fb.created_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

