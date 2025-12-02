import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { MOCK_SUBSCRIPTION_PLANS, shouldUseMock, delay } from './mock-data';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features?: string[];
  description?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired';
  start_date: string;
  end_date?: string;
}

export async function getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  if (shouldUseMock(API_BASE_URLS.SUBS_PLAN)) {
    await delay();
    return MOCK_SUBSCRIPTION_PLANS;
  }
  
  return apiRequest<SubscriptionPlan[]>(
    `${API_BASE_URLS.SUBS_PLAN}/subscription_plan`,
    {
      method: 'GET',
    }
  );
}

export async function getSubscriptionPlanById(id: string): Promise<SubscriptionPlan> {
  if (shouldUseMock(API_BASE_URLS.SUBS_PLAN)) {
    await delay();
    const plan = MOCK_SUBSCRIPTION_PLANS.find(p => p.id === id);
    if (!plan) throw new Error('Subscription plan not found');
    return plan;
  }
  
  return apiRequest<SubscriptionPlan>(
    `${API_BASE_URLS.SUBS_PLAN}/subscription_plan/${id}`,
    {
      method: 'GET',
    }
  );
}

export async function createSubscriptionPlan(data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> {
  if (shouldUseMock(API_BASE_URLS.SUBS_PLAN)) {
    await delay();
    return { id: String(Date.now()), ...data } as SubscriptionPlan;
  }
  
  return apiRequest<SubscriptionPlan>(
    `${API_BASE_URLS.SUBS_PLAN}/subscription_plan`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function updateSubscriptionPlan(id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> {
  if (shouldUseMock(API_BASE_URLS.SUBS_PLAN)) {
    await delay();
    const plan = MOCK_SUBSCRIPTION_PLANS.find(p => p.id === id);
    if (!plan) throw new Error('Subscription plan not found');
    return { ...plan, ...data } as SubscriptionPlan;
  }
  
  return apiRequest<SubscriptionPlan>(
    `${API_BASE_URLS.SUBS_PLAN}/subscription_plan/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function createSubscription(data: Partial<Subscription>): Promise<Subscription> {
  if (shouldUseMock(API_BASE_URLS.SUBSCRIPTION)) {
    await delay();
    return {
      id: String(Date.now()),
      user_id: data.user_id || '1',
      plan_id: data.plan_id || '1',
      status: 'active',
      start_date: new Date().toISOString(),
      ...data,
    };
  }
  
  return apiRequest<Subscription>(
    `${API_BASE_URLS.SUBSCRIPTION}/subscription`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    }
  );
}

export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  if (shouldUseMock(API_BASE_URLS.SUBSCRIPTION)) {
    await delay();
    return null; // No active subscription in mock
  }
  
  try {
    return await apiRequest<Subscription>(
      `${API_BASE_URLS.SUBSCRIPTION}/subscription?user_id=${userId}`,
      {
        method: 'GET',
        requireAuth: true,
      }
    );
  } catch (error) {
    return null;
  }
}

export async function getSubscriptionById(id: string): Promise<Subscription> {
  if (shouldUseMock(API_BASE_URLS.SUBSCRIPTION)) {
    await delay();
    return {
      id,
      user_id: '1',
      plan_id: '1',
      status: 'active',
      start_date: new Date().toISOString(),
    };
  }
  
  return apiRequest<Subscription>(
    `${API_BASE_URLS.SUBSCRIPTION}/subscription/${id}`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

