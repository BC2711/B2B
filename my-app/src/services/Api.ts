// src/services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AuthTokens } from '../types';
import { refreshAuthTokens } from './auth';
import { getCookie, setCookie, removeCookie } from '../utils/cookies';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.yourdomain.com';

class ApiService {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedRequests: Array<{
    resolve: (token: string) => void;
    reject: (error: AxiosError) => void;
  }> = [];

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = getCookie('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If we're already refreshing, queue the request
            return new Promise((resolve, reject) => {
              this.failedRequests.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = getCookie('refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const newTokens = await refreshAuthTokens(refreshToken);
            setCookie('accessToken', newTokens.accessToken);
            setCookie('refreshToken', newTokens.refreshToken);

            // Update Authorization header
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

            // Process queued requests
            this.failedRequests.forEach((prom) => prom.resolve(newTokens.accessToken));
            this.failedRequests = [];

            return this.instance(originalRequest);
          } catch (refreshError) {
            // If refresh fails, clear tokens and redirect to login
            this.failedRequests.forEach((prom) => prom.reject(refreshError));
            this.failedRequests = [];
            removeCookie('accessToken');
            removeCookie('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.request(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  }

  // Authentication methods
  public async login(email: string, password: string): Promise<AuthTokens> {
    return this.request<AuthTokens>({
      method: 'POST',
      url: '/auth/login',
      data: { email, password },
    });
  }

  public async register(userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthTokens> {
    return this.request<AuthTokens>({
      method: 'POST',
      url: '/auth/register',
      data: userData,
    });
  }

  public async logout(): Promise<void> {
    return this.request<void>({
      method: 'POST',
      url: '/auth/logout',
    });
  }

  // User management methods
  public async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ users: User[]; total: number }> {
    return this.request({
      method: 'GET',
      url: '/users',
      params,
    });
  }

  public async getUserById(id: string): Promise<User> {
    return this.request({
      method: 'GET',
      url: `/users/${id}`,
    });
  }

  public async createUser(userData: Omit<User, 'id'>): Promise<User> {
    return this.request({
      method: 'POST',
      url: '/users',
      data: userData,
    });
  }

  public async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return this.request({
      method: 'PATCH',
      url: `/users/${id}`,
      data: userData,
    });
  }

  public async deleteUser(id: string): Promise<void> {
    return this.request({
      method: 'DELETE',
      url: `/users/${id}`,
    });
  }

  // Add other API endpoints as needed
  // Example for other resources:
  public async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<{ products: Product[]; total: number }> {
    return this.request({
      method: 'GET',
      url: '/products',
      params,
    });
  }
}

export const apiService = new ApiService();