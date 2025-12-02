'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '@/lib/api/auth';
import { 
  createExamSession, 
  getExamSession, 
  updateExamSession,
  getAllExamPapers 
} from '@/lib/api/exams';
import type { ExamSession } from '@/lib/api/exams';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

function ExamSessionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperId = searchParams.get('paper');
  
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState(paperId || '');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router, paperId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userData, papersData] = await Promise.all([
        getCurrentUser(),
        getAllExamPapers()
      ]);
      setUser(userData);
      setPapers(papersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = async () => {
    if (!selectedPaper || !user) return;
    try {
      const session = await createExamSession({
        exam_paper_id: selectedPaper,
        user_id: user.id,
        status: 'in_progress'
      });
      router.push(`/dashboard/exam-sessions/${session.id}`);
    } catch (error) {
      console.error('Failed to start session:', error);
      alert('Failed to start exam session');
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
            <h1 className="font-serif text-4xl font-bold mb-2 text-black">Exam Sessions</h1>
            <p className="text-gray-600">Start and manage your exam sessions</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h2 className="font-serif text-xl font-semibold mb-4">Start New Exam Session</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Select Exam Paper</label>
                <select
                  value={selectedPaper}
                  onChange={(e) => setSelectedPaper(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Choose an exam paper</option>
                  {papers.map((paper) => (
                    <option key={paper.id} value={paper.id}>
                      {paper.title}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="primary"
                onClick={handleStartSession}
                disabled={!selectedPaper}
              >
                Start Exam
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold mb-4">Active Sessions</h2>
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-gray-600">
                Your active exam sessions will appear here. Start a new session to begin.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ExamSessionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <ExamSessionsContent />
    </Suspense>
  );
}

