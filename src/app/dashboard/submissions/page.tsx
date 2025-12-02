'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '@/lib/api/auth';
import { getAllSubmissions, getSubmissionById } from '@/lib/api/submissions';
import { getMarkingFeedback } from '@/lib/api/marking-feedback';
import type { Submission } from '@/lib/api/submissions';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function SubmissionsPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadSubmissions();
  }, [router]);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getAllSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewFeedback = async (submissionId: string) => {
    try {
      const feedbackData = await getMarkingFeedback(submissionId);
      setFeedback(feedbackData);
      const submission = await getSubmissionById(submissionId);
      setSelectedSubmission(submission);
    } catch (error) {
      console.error('Failed to load feedback:', error);
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
            <h1 className="font-serif text-4xl font-bold mb-2 text-black">My Submissions</h1>
            <p className="text-gray-600">View your exam submissions and feedback</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {submissions.length === 0 ? (
                <div className="bg-white rounded-lg p-8 shadow text-center">
                  <p className="text-gray-600">No submissions yet. Start an exam to create a submission.</p>
                </div>
              ) : (
                submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2">
                          Submission #{submission.id}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Submitted: {new Date(submission.submitted_at).toLocaleString()}
                        </p>
                        {submission.status && (
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            submission.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {submission.status}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => handleViewFeedback(submission.id)}
                        className="text-sm py-1 px-3"
                      >
                        View Feedback
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedSubmission && feedback && (
              <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="font-serif text-2xl font-semibold mb-4">Feedback</h2>
                <div className="space-y-4">
                  {feedback.score !== undefined && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Score</p>
                      <p className="text-2xl font-bold text-blue-600">{feedback.score}/10</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Feedback</p>
                    <p className="text-gray-700">{feedback.feedback}</p>
                  </div>
                  {feedback.created_at && (
                    <p className="text-xs text-gray-500">
                      {new Date(feedback.created_at).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

