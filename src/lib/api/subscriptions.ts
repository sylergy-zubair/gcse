import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';

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
  return apiRequest<SubscriptionPlan[]>(
    `${API_BASE_URLS.SUBS_PLAN}/subscription_plan`,
    {
      method: 'GET',
    }
  );
}

export async function getSubscriptionPlanById(id: string): Promise<SubscriptionPlan> {
  return apiRequest<SubscriptionPlan>(
    `${API_BASE_URLS.SUBS_PLAN}/subscription_plan/${id}`,
    {
      method: 'GET',
    }
  );
}

export async function createSubscription(data: Partial<Subscription>): Promise<Subscription> {
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

