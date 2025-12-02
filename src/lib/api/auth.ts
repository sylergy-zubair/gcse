import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name?: string;
  // Add other required fields based on your API
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>(
    `${API_BASE_URLS.AUTH}/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
  );
  
  // Store token in localStorage
  if (typeof window !== 'undefined' && response.token) {
    localStorage.setItem('auth_token', response.token);
  }
  
  return response;
}

export async function signup(data: SignupData): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>(
    `${API_BASE_URLS.AUTH}/auth/signup`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  
  // Store token in localStorage
  if (typeof window !== 'undefined' && response.token) {
    localStorage.setItem('auth_token', response.token);
  }
  
  return response;
}

export async function getCurrentUser(): Promise<User> {
  return apiRequest<User>(
    `${API_BASE_URLS.AUTH}/auth/me`,
    {
      method: 'GET',
      requireAuth: true,
    }
  );
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

