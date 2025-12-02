import { apiRequest } from './api-client';
import { API_BASE_URLS } from '@/lib/constants';
import { shouldUseMock, delay } from './mock-data';

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
  if (shouldUseMock(API_BASE_URLS.AUTH)) {
    await delay();
    const response: AuthResponse = {
      token: 'mock_jwt_token_' + Date.now(),
      user: {
        id: '1',
        email: credentials.email,
        name: 'Mock User',
      },
    };
    
    // Store token in localStorage
    if (typeof window !== 'undefined' && response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }
  
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
  if (shouldUseMock(API_BASE_URLS.AUTH)) {
    await delay();
    const response: AuthResponse = {
      token: 'mock_jwt_token_' + Date.now(),
      user: {
        id: String(Date.now()),
        email: data.email,
        name: data.name || 'New User',
      },
    };
    
    // Store token in localStorage
    if (typeof window !== 'undefined' && response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }
  
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
  if (shouldUseMock(API_BASE_URLS.AUTH)) {
    await delay();
    const token = getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    return {
      id: '1',
      email: 'mock@example.com',
      name: 'Mock User',
    };
  }
  
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

