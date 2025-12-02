'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '@/lib/api/auth';
import { updateUserPassword, updateUserRole } from '@/lib/api/users';
import { getUserSubmissions, getUserExamPaperAnswers } from '@/lib/api/users';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

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
      const userData = await getCurrentUser();
      setUser(userData);
      
      if (userData) {
        const [submissionsData, answersData] = await Promise.all([
          getUserSubmissions(userData.id),
          getUserExamPaperAnswers(userData.id)
        ]);
        setSubmissions(submissionsData);
        setAnswers(answersData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match');
      return;
    }
    if (!user) return;
    
    try {
      await updateUserPassword(user.id, passwordData.new);
      setShowPasswordModal(false);
      setPasswordData({ current: '', new: '', confirm: '' });
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Failed to update password:', error);
      alert('Failed to update password');
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
            <h1 className="font-serif text-4xl font-bold mb-2 text-black">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="font-serif text-2xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-medium">{user?.email}</p>
                </div>
                {user?.name && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="text-lg font-medium">{user.name}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">User ID</p>
                  <p className="text-lg font-mono text-sm">{user?.id}</p>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="font-serif text-2xl font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <Button
                  variant="primary"
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full"
                >
                  Change Password
                </Button>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="font-serif text-2xl font-semibold mb-4">Statistics</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Submissions</p>
                  <p className="text-3xl font-bold text-blue-600">{submissions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Answers</p>
                  <p className="text-3xl font-bold text-green-600">{answers.length}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="font-serif text-2xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-2">
                {submissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="text-sm text-gray-600">
                    Submission on {new Date(submission.submitted_at).toLocaleDateString()}
                  </div>
                ))}
                {submissions.length === 0 && (
                  <p className="text-sm text-gray-500">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="font-serif text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleUpdatePassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="primary" className="flex-1">
                  Update Password
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ current: '', new: '', confirm: '' });
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

