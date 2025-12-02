# GCSE Frontend API Documentation

## Overview

This documentation describes all available API functions in the frontend codebase. These functions provide a TypeScript interface to interact with the GCSE backend API, with automatic support for mock data when the backend is not available.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Mock Mode vs Real API](#mock-mode-vs-real-api)
- [Authentication](#authentication)
- [Subjects](#subjects)
- [Exam Papers](#exam-papers)
- [Exam Sessions](#exam-sessions)
- [Questions](#questions)
- [Exam Paper Questions](#exam-paper-questions)
- [Exam Paper Answers](#exam-paper-answers)
- [Exam Boards](#exam-boards)
- [Subscriptions](#subscriptions)
- [Submissions](#submissions)
- [AI Marking Feedback](#ai-marking-feedback)
- [Answer Hints](#answer-hints)
- [User Management](#user-management)
- [TypeScript Interfaces](#typescript-interfaces)
- [Error Handling](#error-handling)

---

## Getting Started

### Installation

All API functions are located in `src/lib/api/`. Import them in your components:

```typescript
import { getAllSubjects } from "@/lib/api/subjects";
import { login } from "@/lib/api/auth";
```

### Environment Variables

Set the following environment variables in `.env.local` to connect to the real backend:

```env
NEXT_PUBLIC_AUTH_BASE_URL=
NEXT_PUBLIC_AI_MARKING_FEEDBACK=
NEXT_PUBLIC_ANSWER_HINT=
NEXT_PUBLIC_EXAM_BOARD=
NEXT_PUBLIC_EXAM_SESSION=
NEXT_PUBLIC_EXAM_PAPER_QUES=
NEXT_PUBLIC_EXAM_PAPER_ANSWER=
NEXT_PUBLIC_EXAM_PAPER=
NEXT_PUBLIC_QUES_BASE_URL=
NEXT_PUBLIC_SUBJECTS=
NEXT_PUBLIC_SUBMISSION=
NEXT_PUBLIC_SUBSCRIPTION=
NEXT_PUBLIC_SUBS_PLAN=
NEXT_PUBLIC_USER_BASE_URL=
```

**Note:** If any of these are empty or not set, the API will automatically use mock data.

---

## Mock Mode vs Real API

The frontend API functions automatically detect whether to use mock data or real API calls:

- **Mock Mode**: When backend URLs are empty/not set, functions return mock data with simulated network delay (500ms)
- **Real API Mode**: When backend URLs are configured, functions make actual HTTP requests

No code changes are needed when switching between modes - just configure your environment variables.

---

## Authentication

**File:** `src/lib/api/auth.ts`

### Interfaces

```typescript
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

interface User {
  id: string;
  email: string;
  name?: string;
}
```

### Functions

#### `login(credentials: LoginCredentials): Promise<AuthResponse>`

User login. Automatically stores the token in localStorage.

**Backend Endpoint:** `POST /auth/login`

**Example:**

```typescript
import { login } from "@/lib/api/auth";

try {
  const response = await login({
    email: "user@example.com",
    password: "password123",
  });
  console.log("Logged in:", response.user);
} catch (error) {
  console.error("Login failed:", error);
}
```

---

#### `signup(data: SignupData): Promise<AuthResponse>`

User registration. Automatically stores the token in localStorage.

**Backend Endpoint:** `POST /auth/signup`

**Example:**

```typescript
import { signup } from "@/lib/api/auth";

const response = await signup({
  email: "newuser@example.com",
  password: "password123",
  name: "John Doe",
});
```

---

#### `getCurrentUser(): Promise<User>`

Get the currently authenticated user. Requires authentication.

**Backend Endpoint:** `GET /auth/me`

**Example:**

```typescript
import { getCurrentUser } from "@/lib/api/auth";

try {
  const user = await getCurrentUser();
  console.log("Current user:", user);
} catch (error) {
  // User not authenticated
}
```

---

#### `logout(): void`

Logout helper function. Removes token from localStorage and redirects to home.

**Example:**

```typescript
import { logout } from "@/lib/api/auth";

logout(); // Removes token and redirects
```

---

#### `getAuthToken(): string | null`

Get the stored authentication token from localStorage.

**Example:**

```typescript
import { getAuthToken } from "@/lib/api/auth";

const token = getAuthToken();
if (token) {
  // User is logged in
}
```

---

#### `isAuthenticated(): boolean`

Check if user is authenticated (has a valid token).

**Example:**

```typescript
import { isAuthenticated } from "@/lib/api/auth";

if (isAuthenticated()) {
  // Show authenticated content
}
```

---

## Subjects

**File:** `src/lib/api/subjects.ts`

### Interface

```typescript
interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}
```

### Functions

#### `getAllSubjects(): Promise<Subject[]>`

Get all subjects.

**Backend Endpoint:** `GET /subject`

**Example:**

```typescript
import { getAllSubjects } from "@/lib/api/subjects";

const subjects = await getAllSubjects();
subjects.forEach((subject) => {
  console.log(subject.name);
});
```

---

#### `getSubjectById(id: string): Promise<Subject>`

Get a specific subject by ID.

**Backend Endpoint:** `GET /subject/{id}`

**Example:**

```typescript
import { getSubjectById } from "@/lib/api/subjects";

const subject = await getSubjectById("1");
```

---

#### `createSubject(data: Partial<Subject>): Promise<Subject>`

Create a new subject. **Requires authentication.**

**Backend Endpoint:** `POST /subject`

**Example:**

```typescript
import { createSubject } from "@/lib/api/subjects";

const newSubject = await createSubject({
  name: "History",
  description: "GCSE History",
});
```

---

#### `updateSubject(id: string, data: Partial<Subject>): Promise<Subject>`

Update an existing subject. **Requires authentication.**

**Backend Endpoint:** `PUT /subject/{id}`

**Example:**

```typescript
import { updateSubject } from "@/lib/api/subjects";

const updated = await updateSubject("1", {
  description: "Updated description",
});
```

---

## Exam Papers

**File:** `src/lib/api/exams.ts`

### Interface

```typescript
interface ExamPaper {
  id: string;
  title: string;
  subject_id?: string;
  exam_board_id?: string;
  description?: string;
}
```

### Functions

#### `getAllExamPapers(): Promise<ExamPaper[]>`

Get all exam papers.

**Backend Endpoint:** `GET /exam_paper`

**Example:**

```typescript
import { getAllExamPapers } from "@/lib/api/exams";

const papers = await getAllExamPapers();
```

---

#### `getExamPaperById(id: string): Promise<ExamPaper>`

Get a specific exam paper by ID.

**Backend Endpoint:** `GET /exam_paper/{id}`

**Example:**

```typescript
import { getExamPaperById } from "@/lib/api/exams";

const paper = await getExamPaperById("1");
```

---

#### `createExamPaper(data: Partial<ExamPaper>): Promise<ExamPaper>`

Create a new exam paper. **Requires authentication.**

**Backend Endpoint:** `POST /exam_paper`

**Example:**

```typescript
import { createExamPaper } from "@/lib/api/exams";

const newPaper = await createExamPaper({
  title: "GCSE Mathematics Paper 2",
  subject_id: "3",
  exam_board_id: "1",
});
```

---

## Exam Sessions

**File:** `src/lib/api/exams.ts`

### Interface

```typescript
interface ExamSession {
  id: string;
  exam_paper_id: string;
  user_id: string;
  status: "in_progress" | "completed" | "paused";
  started_at: string;
  completed_at?: string;
}
```

### Functions

#### `createExamSession(data: Partial<ExamSession>): Promise<ExamSession>`

Create a new exam session. **Requires authentication.**

**Backend Endpoint:** `POST /exam_session`

**Example:**

```typescript
import { createExamSession } from "@/lib/api/exams";

const session = await createExamSession({
  exam_paper_id: "1",
  user_id: "1",
});
```

---

#### `getExamSession(id: string): Promise<ExamSession>`

Get an exam session by ID. **Requires authentication.**

**Backend Endpoint:** `GET /exam_session/{id}`

**Example:**

```typescript
import { getExamSession } from "@/lib/api/exams";

const session = await getExamSession("1");
```

---

#### `updateExamSession(id: string, data: Partial<ExamSession>): Promise<ExamSession>`

Update an exam session (e.g., mark as completed). **Requires authentication.**

**Backend Endpoint:** `PATCH /exam_session/{id}`

**Example:**

```typescript
import { updateExamSession } from "@/lib/api/exams";

const updated = await updateExamSession("1", {
  status: "completed",
  completed_at: new Date().toISOString(),
});
```

---

## Questions

**File:** `src/lib/api/exams.ts`

### Interface

```typescript
interface Question {
  id: string;
  content: string;
  subject_id?: string;
  exam_paper_id?: string;
}
```

### Functions

#### `getAllQuestions(): Promise<Question[]>`

Get all questions.

**Backend Endpoint:** `GET /question`

**Example:**

```typescript
import { getAllQuestions } from "@/lib/api/exams";

const questions = await getAllQuestions();
```

---

#### `getQuestionById(id: string): Promise<Question>`

Get a specific question by ID.

**Backend Endpoint:** `GET /question/{id}`

**Example:**

```typescript
import { getQuestionById } from "@/lib/api/exams";

const question = await getQuestionById("1");
```

---

#### `createQuestion(data: Partial<Question>): Promise<Question>`

Create a new question. **Requires authentication.**

**Backend Endpoint:** `POST /question`

**Example:**

```typescript
import { createQuestion } from "@/lib/api/exams";

const newQuestion = await createQuestion({
  content: "What is 2 + 2?",
  subject_id: "3",
});
```

---

#### `updateQuestion(id: string, data: Partial<Question>): Promise<Question>`

Update an existing question. **Requires authentication.**

**Backend Endpoint:** `PUT /question/{id}`

**Example:**

```typescript
import { updateQuestion } from "@/lib/api/exams";

const updated = await updateQuestion("1", {
  content: "Updated question content",
});
```

---

#### `getQuestionsByPaperId(paperId: string): Promise<Question[]>`

Get all questions for a specific exam paper.

**Backend Endpoint:** `GET /question?exam_paper_id={paperId}`

**Example:**

```typescript
import { getQuestionsByPaperId } from "@/lib/api/exams";

const questions = await getQuestionsByPaperId("1");
```

---

## Exam Paper Questions

**File:** `src/lib/api/exams.ts`

### Functions

#### `addQuestionToExamPaper(data: { exam_paper_id: string; question_id: string }): Promise<void>`

Add a question to an exam paper. **Requires authentication.**

**Backend Endpoint:** `POST /exam_paper_question`

**Example:**

```typescript
import { addQuestionToExamPaper } from "@/lib/api/exams";

await addQuestionToExamPaper({
  exam_paper_id: "1",
  question_id: "2",
});
```

---

#### `removeQuestionFromExamPaper(examPaperId: string, questionId: string): Promise<void>`

Remove a question from an exam paper. **Requires authentication.**

**Backend Endpoint:** `DELETE /exam_paper_question/?exam_paper_id={id}&question_id={id}`

**Example:**

```typescript
import { removeQuestionFromExamPaper } from "@/lib/api/exams";

await removeQuestionFromExamPaper("1", "2");
```

---

## Exam Paper Answers

**File:** `src/lib/api/exams.ts`

### Interface

```typescript
interface ExamPaperAnswer {
  id: string;
  question_id: string;
  user_id: string;
  answer: string;
  exam_session_id?: string;
}
```

### Functions

#### `submitAnswer(data: Partial<ExamPaperAnswer>): Promise<ExamPaperAnswer>`

Submit an answer for a question. **Requires authentication.**

**Backend Endpoint:** `POST /exam_paper_answer`

**Example:**

```typescript
import { submitAnswer } from "@/lib/api/exams";

const answer = await submitAnswer({
  question_id: "1",
  user_id: "1",
  answer: "The answer is 4",
  exam_session_id: "1",
});
```

---

## Exam Boards

**File:** `src/lib/api/exam-boards.ts`

### Interface

```typescript
interface ExamBoard {
  id: string;
  name: string;
  description?: string;
}
```

### Functions

#### `getAllExamBoards(): Promise<ExamBoard[]>`

Get all exam boards.

**Backend Endpoint:** `GET /exam_board`

**Example:**

```typescript
import { getAllExamBoards } from "@/lib/api/exam-boards";

const boards = await getAllExamBoards();
```

---

## Subscriptions

**File:** `src/lib/api/subscriptions.ts`

### Interfaces

```typescript
interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features?: string[];
  description?: string;
}

interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: "active" | "cancelled" | "expired";
  start_date: string;
  end_date?: string;
}
```

### Functions

#### `getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>`

Get all subscription plans.

**Backend Endpoint:** `GET /subscription_plan`

**Example:**

```typescript
import { getAllSubscriptionPlans } from "@/lib/api/subscriptions";

const plans = await getAllSubscriptionPlans();
```

---

#### `getSubscriptionPlanById(id: string): Promise<SubscriptionPlan>`

Get a specific subscription plan by ID.

**Backend Endpoint:** `GET /subscription_plan/{id}`

**Example:**

```typescript
import { getSubscriptionPlanById } from "@/lib/api/subscriptions";

const plan = await getSubscriptionPlanById("1");
```

---

#### `createSubscriptionPlan(data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan>`

Create a new subscription plan. **Requires authentication.**

**Backend Endpoint:** `POST /subscription_plan`

**Example:**

```typescript
import { createSubscriptionPlan } from "@/lib/api/subscriptions";

const newPlan = await createSubscriptionPlan({
  name: "Premium",
  price: 19.99,
  duration: "month",
});
```

---

#### `updateSubscriptionPlan(id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan>`

Update a subscription plan. **Requires authentication.**

**Backend Endpoint:** `PATCH /subscription_plan/{id}`

**Example:**

```typescript
import { updateSubscriptionPlan } from "@/lib/api/subscriptions";

const updated = await updateSubscriptionPlan("1", {
  price: 24.99,
});
```

---

#### `createSubscription(data: Partial<Subscription>): Promise<Subscription>`

Create a user subscription. **Requires authentication.**

**Backend Endpoint:** `POST /subscription`

**Example:**

```typescript
import { createSubscription } from "@/lib/api/subscriptions";

const subscription = await createSubscription({
  user_id: "1",
  plan_id: "2",
});
```

---

#### `getUserSubscription(userId: string): Promise<Subscription | null>`

Get a user's subscription. Returns `null` if no subscription exists. **Requires authentication.**

**Backend Endpoint:** `GET /subscription?user_id={userId}`

**Example:**

```typescript
import { getUserSubscription } from "@/lib/api/subscriptions";

const subscription = await getUserSubscription("1");
if (subscription) {
  console.log("User has active subscription");
}
```

---

#### `getSubscriptionById(id: string): Promise<Subscription>`

Get a subscription by ID. **Requires authentication.**

**Backend Endpoint:** `GET /subscription/{id}`

**Example:**

```typescript
import { getSubscriptionById } from "@/lib/api/subscriptions";

const subscription = await getSubscriptionById("1");
```

---

## Submissions

**File:** `src/lib/api/submissions.ts`

### Interface

```typescript
interface Submission {
  id: string;
  user_id: string;
  exam_session_id: string;
  submitted_at: string;
  status?: string;
}
```

### Functions

#### `getAllSubmissions(): Promise<Submission[]>`

Get all submissions. **Requires authentication.**

**Backend Endpoint:** `GET /submission`

**Example:**

```typescript
import { getAllSubmissions } from "@/lib/api/submissions";

const submissions = await getAllSubmissions();
```

---

#### `getSubmissionById(id: string): Promise<Submission>`

Get a specific submission by ID. **Requires authentication.**

**Backend Endpoint:** `GET /submission/{id}`

**Example:**

```typescript
import { getSubmissionById } from "@/lib/api/submissions";

const submission = await getSubmissionById("1");
```

---

#### `createSubmission(data: Partial<Submission>): Promise<Submission>`

Create a new submission. **Requires authentication.**

**Backend Endpoint:** `POST /submission`

**Example:**

```typescript
import { createSubmission } from "@/lib/api/submissions";

const submission = await createSubmission({
  user_id: "1",
  exam_session_id: "1",
});
```

---

## AI Marking Feedback

**File:** `src/lib/api/marking-feedback.ts`

### Interface

```typescript
interface MarkingFeedback {
  id: string;
  submission_id?: string;
  question_id?: string;
  feedback: string;
  score?: number;
  created_at?: string;
}
```

### Functions

#### `getMarkingFeedback(id: string): Promise<MarkingFeedback>`

Get marking feedback by ID. **Requires authentication.**

**Backend Endpoint:** `GET /marking_feedback/{id}`

**Example:**

```typescript
import { getMarkingFeedback } from "@/lib/api/marking-feedback";

const feedback = await getMarkingFeedback("1");
console.log(feedback.feedback, feedback.score);
```

---

#### `createMarkingFeedback(data: Partial<MarkingFeedback>): Promise<MarkingFeedback>`

Create new marking feedback. **Requires authentication.**

**Backend Endpoint:** `POST /marking_feedback`

**Example:**

```typescript
import { createMarkingFeedback } from "@/lib/api/marking-feedback";

const feedback = await createMarkingFeedback({
  question_id: "1",
  feedback: "Good work!",
  score: 8,
});
```

---

## Answer Hints

**File:** `src/lib/api/answer-hints.ts`

### Interface

```typescript
interface AnswerHint {
  id: string;
  question_id: string;
  hint: string;
  created_at?: string;
}
```

### Functions

#### `getAnswerHint(questionId: string): Promise<AnswerHint>`

Get answer hint for a question.

**Backend Endpoint:** `GET /answer_hint/{question_id}`

**Example:**

```typescript
import { getAnswerHint } from "@/lib/api/answer-hints";

const hint = await getAnswerHint("1");
console.log(hint.hint);
```

---

#### `createAnswerHint(data: Partial<AnswerHint>): Promise<AnswerHint>`

Create an answer hint. **Requires authentication.**

**Backend Endpoint:** `POST /answer_hint`

**Example:**

```typescript
import { createAnswerHint } from "@/lib/api/answer-hints";

const hint = await createAnswerHint({
  question_id: "1",
  hint: "Consider using the quadratic formula",
});
```

---

## User Management

**File:** `src/lib/api/users.ts`

### Functions

#### `getUserExamSession(userId: string, sessionId: string): Promise<ExamSession>`

Get a user's specific exam session. **Requires authentication.**

**Backend Endpoint:** `GET /user/exam_sesion/{sessionId}`

**Example:**

```typescript
import { getUserExamSession } from "@/lib/api/users";

const session = await getUserExamSession("1", "13");
```

---

#### `updateUserPassword(userId: string, newPassword: string): Promise<void>`

Update a user's password. **Requires authentication.**

**Backend Endpoint:** `PATCH /user/password/{userId}`

**Example:**

```typescript
import { updateUserPassword } from "@/lib/api/users";

await updateUserPassword("13", "newPassword123");
```

---

#### `updateUserRole(userId: string, role: string): Promise<void>`

Update a user's role. **Requires authentication.**

**Backend Endpoint:** `PATCH /user/role/{userId}`

**Example:**

```typescript
import { updateUserRole } from "@/lib/api/users";

await updateUserRole("13", "admin");
```

---

#### `getUserSubmissions(userId: string): Promise<Submission[]>`

Get all submissions for a user. **Requires authentication.**

**Backend Endpoint:** `GET /user/submissions/{userId}`

**Example:**

```typescript
import { getUserSubmissions } from "@/lib/api/users";

const submissions = await getUserSubmissions("11");
```

---

#### `getUserExamPaperAnswers(userId: string): Promise<ExamPaperAnswer[]>`

Get all exam paper answers for a user. **Requires authentication.**

**Backend Endpoint:** `GET /exam_paper_answer?user_id={userId}`

**Example:**

```typescript
import { getUserExamPaperAnswers } from "@/lib/api/users";

const answers = await getUserExamPaperAnswers("19");
```

---

## TypeScript Interfaces

All interfaces are exported from their respective API files. You can import them for type safety:

```typescript
import type { Subject } from "@/lib/api/subjects";
import type {
  ExamPaper,
  ExamSession,
  Question,
  ExamPaperAnswer,
} from "@/lib/api/exams";
import type { SubscriptionPlan, Subscription } from "@/lib/api/subscriptions";
import type { Submission } from "@/lib/api/submissions";
import type { MarkingFeedback } from "@/lib/api/marking-feedback";
import type { AnswerHint } from "@/lib/api/answer-hints";
import type { User, AuthResponse } from "@/lib/api/auth";
import type { ExamBoard } from "@/lib/api/exam-boards";
```

---

## Error Handling

All API functions throw an `ApiError` when requests fail. The error includes:

- `message`: Error message
- `status`: HTTP status code (0 for network errors)
- `data`: Additional error data from the server

**Example:**

```typescript
import { ApiError } from "@/lib/api/api-client";

try {
  const subjects = await getAllSubjects();
} catch (error) {
  if (error instanceof ApiError) {
    console.error("API Error:", error.message);
    console.error("Status:", error.status);
    console.error("Data:", error.data);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

---

## Complete Example: React Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { getAllSubjects } from "@/lib/api/subjects";
import { getAllSubscriptionPlans } from "@/lib/api/subscriptions";
import type { Subject } from "@/lib/api/subjects";
import type { SubscriptionPlan } from "@/lib/api/subscriptions";

export default function MyComponent() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [subjectsData, plansData] = await Promise.all([
          getAllSubjects(),
          getAllSubscriptionPlans(),
        ]);
        setSubjects(subjectsData);
        setPlans(plansData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Subjects</h2>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>

      <h2>Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            {plan.name} - £{plan.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Summary

- **Total API Functions:** 42
- **API Modules:** 11
- **Mock Mode:** Automatic when backend URLs are empty
- **Authentication:** Automatic token management via localStorage
- **Type Safety:** Full TypeScript support with exported interfaces

All functions are ready to use in your React components. Simply import the functions you need and call them with the appropriate parameters.
