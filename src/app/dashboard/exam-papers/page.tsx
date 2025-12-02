'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/api/auth';
import { getAllExamPapers, createExamPaper, getExamPaperById } from '@/lib/api/exams';
import { getAllSubjects } from '@/lib/api/subjects';
import { getAllExamBoards } from '@/lib/api/exam-boards';
import type { ExamPaper } from '@/lib/api/exams';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function ExamPapersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectFilter = searchParams.get('subject');
  
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject_id: '',
    exam_board_id: '',
    description: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router, subjectFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [papersData, subjectsData, boardsData] = await Promise.all([
        getAllExamPapers(),
        getAllSubjects(),
        getAllExamBoards()
      ]);
      setPapers(papersData);
      setSubjects(subjectsData);
      setBoards(boardsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createExamPaper(formData);
      setShowCreateModal(false);
      setFormData({ title: '', subject_id: '', exam_board_id: '', description: '' });
      loadData();
    } catch (error) {
      console.error('Failed to create exam paper:', error);
      alert('Failed to create exam paper');
    }
  };

  const filteredPapers = subjectFilter
    ? papers.filter(p => p.subject_id === subjectFilter)
    : papers;

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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2 text-black">Exam Papers</h1>
              <p className="text-gray-600">Browse and create exam papers</p>
            </div>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              + Create Paper
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPapers.map((paper) => {
              const subject = subjects.find(s => s.id === paper.subject_id);
              const board = boards.find(b => b.id === paper.exam_board_id);
              
              return (
                <div
                  key={paper.id}
                  className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-serif text-xl font-semibold mb-2 text-black">
                    {paper.title}
                  </h3>
                  {subject && (
                    <p className="text-sm text-gray-600 mb-1">Subject: {subject.name}</p>
                  )}
                  {board && (
                    <p className="text-sm text-gray-600 mb-1">Board: {board.name}</p>
                  )}
                  {paper.description && (
                    <p className="text-sm text-gray-600 mb-4">{paper.description}</p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      href={`/dashboard/exam-sessions?paper=${paper.id}`}
                      className="text-sm py-1 px-3"
                    >
                      Start Exam
                    </Button>
                    <Button
                      variant="primary"
                      href={`/dashboard/questions?paper=${paper.id}`}
                      className="text-sm py-1 px-3"
                    >
                      View Questions
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="font-serif text-2xl font-bold mb-4">Create Exam Paper</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={formData.subject_id}
                  onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Exam Board</label>
                <select
                  value={formData.exam_board_id}
                  onChange={(e) => setFormData({ ...formData, exam_board_id: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select a board</option>
                  {boards.map((board) => (
                    <option key={board.id} value={board.id}>
                      {board.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="primary" className="flex-1">
                  Create
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

