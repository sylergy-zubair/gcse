'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/api/auth';
import { getAllSubjects, createSubject, updateSubject, getSubjectById } from '@/lib/api/subjects';
import type { Subject } from '@/lib/api/subjects';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function SubjectsPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadSubjects();
  }, [router]);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const data = await getAllSubjects();
      setSubjects(data);
    } catch (error) {
      console.error('Failed to load subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubject(formData);
      setShowCreateModal(false);
      setFormData({ name: '', description: '' });
      loadSubjects();
    } catch (error) {
      console.error('Failed to create subject:', error);
      alert('Failed to create subject');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;
    try {
      await updateSubject(editingSubject.id, formData);
      setEditingSubject(null);
      setFormData({ name: '', description: '' });
      loadSubjects();
    } catch (error) {
      console.error('Failed to update subject:', error);
      alert('Failed to update subject');
    }
  };

  const startEdit = async (id: string) => {
    try {
      const subject = await getSubjectById(id);
      setEditingSubject(subject);
      setFormData({ name: subject.name, description: subject.description || '' });
      setShowCreateModal(true);
    } catch (error) {
      console.error('Failed to load subject:', error);
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
              <h1 className="font-serif text-4xl font-bold mb-2 text-black">Subjects</h1>
              <p className="text-gray-600">Manage all available subjects</p>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                setEditingSubject(null);
                setFormData({ name: '', description: '' });
                setShowCreateModal(true);
              }}
            >
              + Add Subject
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="font-serif text-2xl font-semibold mb-2 text-black">
                  {subject.name}
                </h3>
                {subject.description && (
                  <p className="text-gray-600 mb-4 text-sm">{subject.description}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => startEdit(subject.id)}
                    className="text-sm py-1 px-3"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="primary"
                    href={`/dashboard/exam-papers?subject=${subject.id}`}
                    className="text-sm py-1 px-3"
                  >
                    View Papers
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="font-serif text-2xl font-bold mb-4">
              {editingSubject ? 'Edit Subject' : 'Create Subject'}
            </h2>
            <form onSubmit={editingSubject ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
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
                  {editingSubject ? 'Update' : 'Create'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingSubject(null);
                    setFormData({ name: '', description: '' });
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

