'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/api/auth';
import { 
  getAllQuestions, 
  getQuestionById,
  createQuestion, 
  updateQuestion,
  getQuestionsByPaperId 
} from '@/lib/api/exams';
import { getAllSubjects } from '@/lib/api/subjects';
import type { Question } from '@/lib/api/exams';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function QuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperFilter = searchParams.get('paper');
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    content: '',
    subject_id: '',
    exam_paper_id: paperFilter || ''
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [questionsData, subjectsData] = await Promise.all([
        paperFilter ? getQuestionsByPaperId(paperFilter) : getAllQuestions(),
        getAllSubjects()
      ]);
      setQuestions(questionsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, paperFilter]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createQuestion(formData);
      setShowCreateModal(false);
      setFormData({ content: '', subject_id: '', exam_paper_id: paperFilter || '' });
      loadData();
    } catch (error) {
      console.error('Failed to create question:', error);
      alert('Failed to create question');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    try {
      await updateQuestion(editingQuestion.id, formData);
      setEditingQuestion(null);
      setFormData({ content: '', subject_id: '', exam_paper_id: paperFilter || '' });
      loadData();
    } catch (error) {
      console.error('Failed to update question:', error);
      alert('Failed to update question');
    }
  };

  const startEdit = async (id: string) => {
    try {
      const question = await getQuestionById(id);
      setEditingQuestion(question);
      setFormData({
        content: question.content,
        subject_id: question.subject_id || '',
        exam_paper_id: question.exam_paper_id || ''
      });
      setShowCreateModal(true);
    } catch (error) {
      console.error('Failed to load question:', error);
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2 text-black">Questions</h1>
              <p className="text-gray-600">Manage exam questions</p>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                setEditingQuestion(null);
                setFormData({ content: '', subject_id: '', exam_paper_id: paperFilter || '' });
                setShowCreateModal(true);
              }}
            >
              + Add Question
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((question) => {
              const subject = subjects.find(s => s.id === question.subject_id);
              
              return (
                <div
                  key={question.id}
                  className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-gray-700 mb-2">{question.content}</p>
                      {subject && (
                        <p className="text-sm text-gray-500">Subject: {subject.name}</p>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => startEdit(question.id)}
                      className="text-sm py-1 px-3"
                    >
                      Edit
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
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <h2 className="font-serif text-2xl font-bold mb-4">
              {editingQuestion ? 'Edit Question' : 'Create Question'}
            </h2>
            <form onSubmit={editingQuestion ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Question Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={5}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={formData.subject_id}
                  onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="primary" className="flex-1">
                  {editingQuestion ? 'Update' : 'Create'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingQuestion(null);
                    setFormData({ content: '', subject_id: '', exam_paper_id: paperFilter || '' });
                  }}
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

