'use client';

import { useEffect, useState } from 'react';
import { 
  login, 
  signup, 
  getCurrentUser, 
  isAuthenticated 
} from '@/lib/api/auth';
import { 
  getAllSubjects, 
  getSubjectById, 
  createSubject, 
  updateSubject 
} from '@/lib/api/subjects';
import { 
  getAllExamPapers, 
  getExamPaperById, 
  createExamPaper,
  createExamSession,
  getExamSession,
  updateExamSession,
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  getQuestionsByPaperId,
  submitAnswer,
  addQuestionToExamPaper,
  removeQuestionFromExamPaper
} from '@/lib/api/exams';
import { getAllExamBoards } from '@/lib/api/exam-boards';
import { 
  getAllSubscriptionPlans, 
  getSubscriptionPlanById,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  createSubscription,
  getUserSubscription,
  getSubscriptionById
} from '@/lib/api/subscriptions';
import { 
  getAllSubmissions, 
  getSubmissionById, 
  createSubmission 
} from '@/lib/api/submissions';
import { 
  getMarkingFeedback, 
  createMarkingFeedback 
} from '@/lib/api/marking-feedback';
import { 
  getAnswerHint, 
  createAnswerHint 
} from '@/lib/api/answer-hints';
import { 
  getUserExamSession,
  updateUserPassword,
  updateUserRole,
  getUserSubmissions,
  getUserExamPaperAnswers
} from '@/lib/api/users';

interface TestResult {
  endpoint: string;
  status: 'pass' | 'fail' | 'pending';
  message: string;
  data?: any;
}

export default function ApiTestPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [summary, setSummary] = useState({ total: 0, passed: 0, failed: 0 });

  const addResult = (result: TestResult) => {
    setResults(prev => [...prev, result]);
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setResults([]);
    setSummary({ total: 0, passed: 0, failed: 0 });

    const testResults: TestResult[] = [];

    try {
      // Authentication Tests
      console.log('Testing Authentication...');
      
      // Test signup
      try {
        const signupResult = await signup({
          email: 'test@example.com',
          password: 'test123',
          name: 'Test User'
        });
        testResults.push({
          endpoint: 'POST /auth/signup',
          status: 'pass',
          message: 'Signup successful',
          data: { hasToken: !!signupResult.token, userId: signupResult.user?.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /auth/signup',
          status: 'fail',
          message: `Signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Test login
      try {
        const loginResult = await login({
          email: 'test@example.com',
          password: 'test123'
        });
        testResults.push({
          endpoint: 'POST /auth/login',
          status: 'pass',
          message: 'Login successful',
          data: { hasToken: !!loginResult.token }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /auth/login',
          status: 'fail',
          message: `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Test getCurrentUser
      try {
        const user = await getCurrentUser();
        testResults.push({
          endpoint: 'GET /auth/me',
          status: 'pass',
          message: 'Get current user successful',
          data: { userId: user.id, email: user.email }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /auth/me',
          status: 'fail',
          message: `Get current user failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Test isAuthenticated
      const authenticated = isAuthenticated();
      testResults.push({
        endpoint: 'isAuthenticated()',
        status: authenticated ? 'pass' : 'fail',
        message: authenticated ? 'User is authenticated' : 'User is not authenticated'
      });

      // Subjects Tests
      console.log('Testing Subjects...');
      
      try {
        const subjects = await getAllSubjects();
        testResults.push({
          endpoint: 'GET /subject',
          status: 'pass',
          message: `Retrieved ${subjects.length} subjects`,
          data: { count: subjects.length, firstSubject: subjects[0]?.name }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /subject',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const subject = await getSubjectById('1');
        testResults.push({
          endpoint: 'GET /subject/{id}',
          status: 'pass',
          message: 'Retrieved subject by ID',
          data: { id: subject.id, name: subject.name }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /subject/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const newSubject = await createSubject({ name: 'Test Subject', description: 'Test' });
        testResults.push({
          endpoint: 'POST /subject',
          status: 'pass',
          message: 'Created subject',
          data: { id: newSubject.id, name: newSubject.name }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /subject',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const updated = await updateSubject('1', { description: 'Updated' });
        testResults.push({
          endpoint: 'PUT /subject/{id}',
          status: 'pass',
          message: 'Updated subject',
          data: { id: updated.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'PUT /subject/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Exam Papers Tests
      console.log('Testing Exam Papers...');
      
      try {
        const papers = await getAllExamPapers();
        testResults.push({
          endpoint: 'GET /exam_paper',
          status: 'pass',
          message: `Retrieved ${papers.length} exam papers`,
          data: { count: papers.length }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /exam_paper',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const paper = await getExamPaperById('1');
        testResults.push({
          endpoint: 'GET /exam_paper/{id}',
          status: 'pass',
          message: 'Retrieved exam paper by ID',
          data: { id: paper.id, title: paper.title }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /exam_paper/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const newPaper = await createExamPaper({ title: 'Test Paper', subject_id: '1' });
        testResults.push({
          endpoint: 'POST /exam_paper',
          status: 'pass',
          message: 'Created exam paper',
          data: { id: newPaper.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /exam_paper',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Exam Sessions Tests
      console.log('Testing Exam Sessions...');
      
      try {
        const session = await createExamSession({ exam_paper_id: '1', user_id: '1' });
        testResults.push({
          endpoint: 'POST /exam_session',
          status: 'pass',
          message: 'Created exam session',
          data: { id: session.id, status: session.status }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /exam_session',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const session = await getExamSession('1');
        testResults.push({
          endpoint: 'GET /exam_session/{id}',
          status: 'pass',
          message: 'Retrieved exam session',
          data: { id: session.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /exam_session/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const updated = await updateExamSession('1', { status: 'completed' });
        testResults.push({
          endpoint: 'PATCH /exam_session/{id}',
          status: 'pass',
          message: 'Updated exam session',
          data: { status: updated.status }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'PATCH /exam_session/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Questions Tests
      console.log('Testing Questions...');
      
      try {
        const questions = await getAllQuestions();
        testResults.push({
          endpoint: 'GET /question',
          status: 'pass',
          message: `Retrieved ${questions.length} questions`,
          data: { count: questions.length }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /question',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const question = await getQuestionById('1');
        testResults.push({
          endpoint: 'GET /question/{id}',
          status: 'pass',
          message: 'Retrieved question by ID',
          data: { id: question.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /question/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const newQuestion = await createQuestion({ content: 'Test question', subject_id: '1' });
        testResults.push({
          endpoint: 'POST /question',
          status: 'pass',
          message: 'Created question',
          data: { id: newQuestion.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /question',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const updated = await updateQuestion('1', { content: 'Updated question' });
        testResults.push({
          endpoint: 'PUT /question/{id}',
          status: 'pass',
          message: 'Updated question',
          data: { id: updated.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'PUT /question/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const questions = await getQuestionsByPaperId('1');
        testResults.push({
          endpoint: 'GET /question?exam_paper_id={id}',
          status: 'pass',
          message: `Retrieved ${questions.length} questions for paper`,
          data: { count: questions.length }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /question?exam_paper_id={id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Exam Paper Questions Tests
      console.log('Testing Exam Paper Questions...');
      
      try {
        await addQuestionToExamPaper({ exam_paper_id: '1', question_id: '1' });
        testResults.push({
          endpoint: 'POST /exam_paper_question',
          status: 'pass',
          message: 'Added question to exam paper'
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /exam_paper_question',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        await removeQuestionFromExamPaper('1', '1');
        testResults.push({
          endpoint: 'DELETE /exam_paper_question',
          status: 'pass',
          message: 'Removed question from exam paper'
        });
      } catch (error) {
        testResults.push({
          endpoint: 'DELETE /exam_paper_question',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Exam Paper Answers Tests
      console.log('Testing Exam Paper Answers...');
      
      try {
        const answer = await submitAnswer({
          question_id: '1',
          user_id: '1',
          answer: 'Test answer',
          exam_session_id: '1'
        });
        testResults.push({
          endpoint: 'POST /exam_paper_answer',
          status: 'pass',
          message: 'Submitted answer',
          data: { id: answer.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /exam_paper_answer',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Exam Boards Tests
      console.log('Testing Exam Boards...');
      
      try {
        const boards = await getAllExamBoards();
        testResults.push({
          endpoint: 'GET /exam_board',
          status: 'pass',
          message: `Retrieved ${boards.length} exam boards`,
          data: { count: boards.length }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /exam_board',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Subscriptions Tests
      console.log('Testing Subscriptions...');
      
      try {
        const plans = await getAllSubscriptionPlans();
        testResults.push({
          endpoint: 'GET /subscription_plan',
          status: 'pass',
          message: `Retrieved ${plans.length} subscription plans`,
          data: { count: plans.length }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /subscription_plan',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const plan = await getSubscriptionPlanById('1');
        testResults.push({
          endpoint: 'GET /subscription_plan/{id}',
          status: 'pass',
          message: 'Retrieved subscription plan by ID',
          data: { id: plan.id, name: plan.name }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /subscription_plan/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const newPlan = await createSubscriptionPlan({ name: 'Test Plan', price: 9.99, duration: 'month' });
        testResults.push({
          endpoint: 'POST /subscription_plan',
          status: 'pass',
          message: 'Created subscription plan',
          data: { id: newPlan.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /subscription_plan',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const updated = await updateSubscriptionPlan('1', { price: 19.99 });
        testResults.push({
          endpoint: 'PATCH /subscription_plan/{id}',
          status: 'pass',
          message: 'Updated subscription plan',
          data: { id: updated.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'PATCH /subscription_plan/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const subscription = await createSubscription({ user_id: '1', plan_id: '1' });
        testResults.push({
          endpoint: 'POST /subscription',
          status: 'pass',
          message: 'Created subscription',
          data: { id: subscription.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /subscription',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const subscription = await getUserSubscription('1');
        testResults.push({
          endpoint: 'GET /subscription?user_id={id}',
          status: 'pass',
          message: subscription ? 'Retrieved user subscription' : 'No subscription found (expected)',
          data: { hasSubscription: !!subscription }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /subscription?user_id={id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const subscription = await getSubscriptionById('1');
        testResults.push({
          endpoint: 'GET /subscription/{id}',
          status: 'pass',
          message: 'Retrieved subscription by ID',
          data: { id: subscription.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /subscription/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Submissions Tests
      console.log('Testing Submissions...');
      
      try {
        const submissions = await getAllSubmissions();
        testResults.push({
          endpoint: 'GET /submission',
          status: 'pass',
          message: `Retrieved ${submissions.length} submissions`,
          data: { count: submissions.length }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /submission',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const submission = await getSubmissionById('1');
        testResults.push({
          endpoint: 'GET /submission/{id}',
          status: 'pass',
          message: 'Retrieved submission by ID',
          data: { id: submission.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /submission/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const submission = await createSubmission({ user_id: '1', exam_session_id: '1' });
        testResults.push({
          endpoint: 'POST /submission',
          status: 'pass',
          message: 'Created submission',
          data: { id: submission.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /submission',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Marking Feedback Tests
      console.log('Testing Marking Feedback...');
      
      try {
        const feedback = await getMarkingFeedback('1');
        testResults.push({
          endpoint: 'GET /marking_feedback/{id}',
          status: 'pass',
          message: 'Retrieved marking feedback',
          data: { id: feedback.id, hasFeedback: !!feedback.feedback }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /marking_feedback/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const feedback = await createMarkingFeedback({ question_id: '1', feedback: 'Good work!', score: 8 });
        testResults.push({
          endpoint: 'POST /marking_feedback',
          status: 'pass',
          message: 'Created marking feedback',
          data: { id: feedback.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /marking_feedback',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // Answer Hints Tests
      console.log('Testing Answer Hints...');
      
      try {
        const hint = await getAnswerHint('1');
        testResults.push({
          endpoint: 'GET /answer_hint/{question_id}',
          status: 'pass',
          message: 'Retrieved answer hint',
          data: { id: hint.id, hasHint: !!hint.hint }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /answer_hint/{question_id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const hint = await createAnswerHint({ question_id: '1', hint: 'Test hint' });
        testResults.push({
          endpoint: 'POST /answer_hint',
          status: 'pass',
          message: 'Created answer hint',
          data: { id: hint.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'POST /answer_hint',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      // User Management Tests
      console.log('Testing User Management...');
      
      try {
        const session = await getUserExamSession('1', '1');
        testResults.push({
          endpoint: 'GET /user/exam_sesion/{id}',
          status: 'pass',
          message: 'Retrieved user exam session',
          data: { id: session.id }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /user/exam_sesion/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        await updateUserPassword('1', 'newPassword123');
        testResults.push({
          endpoint: 'PATCH /user/password/{id}',
          status: 'pass',
          message: 'Updated user password'
        });
      } catch (error) {
        testResults.push({
          endpoint: 'PATCH /user/password/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        await updateUserRole('1', 'admin');
        testResults.push({
          endpoint: 'PATCH /user/role/{id}',
          status: 'pass',
          message: 'Updated user role'
        });
      } catch (error) {
        testResults.push({
          endpoint: 'PATCH /user/role/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const submissions = await getUserSubmissions('1');
        testResults.push({
          endpoint: 'GET /user/submissions/{id}',
          status: 'pass',
          message: `Retrieved ${submissions.length} user submissions`,
          data: { count: submissions.length }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /user/submissions/{id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

      try {
        const answers = await getUserExamPaperAnswers('1');
        testResults.push({
          endpoint: 'GET /exam_paper_answer?user_id={id}',
          status: 'pass',
          message: `Retrieved ${answers.length} user exam paper answers`,
          data: { count: answers.length }
        });
      } catch (error) {
        testResults.push({
          endpoint: 'GET /exam_paper_answer?user_id={id}',
          status: 'fail',
          message: `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }

    } catch (error) {
      console.error('Test suite error:', error);
    }

    // Calculate summary
    const total = testResults.length;
    const passed = testResults.filter(r => r.status === 'pass').length;
    const failed = testResults.filter(r => r.status === 'fail').length;

    setResults(testResults);
    setSummary({ total, passed, failed });
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">API Endpoint Test Suite</h1>
        <p className="text-gray-600 mb-6">
          Testing all 42 API endpoints with mock data
        </p>

        <div className="mb-6">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </button>
        </div>

        {summary.total > 0 && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Test Summary</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-gray-700">{summary.total}</div>
                <div className="text-sm text-gray-500">Total Tests</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{summary.passed}</div>
                <div className="text-sm text-gray-500">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{summary.failed}</div>
                <div className="text-sm text-gray-500">Failed</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${(summary.passed / summary.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.status === 'pass'
                  ? 'bg-green-50 border-green-200'
                  : result.status === 'fail'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        result.status === 'pass'
                          ? 'bg-green-500'
                          : result.status === 'fail'
                          ? 'bg-red-500'
                          : 'bg-gray-400'
                      }`}
                    ></span>
                    <span className="font-mono text-sm font-semibold">{result.endpoint}</span>
                  </div>
                  <p className="text-sm text-gray-700">{result.message}</p>
                  {result.data && (
                    <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && !isRunning && (
          <div className="text-center py-12 text-gray-500">
            Click "Run All Tests" to start testing all endpoints
          </div>
        )}
      </div>
    </div>
  );
}

