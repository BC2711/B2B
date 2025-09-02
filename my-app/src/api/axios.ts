import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

// Define a generic response type
interface ApiResponse<T> {
    data?: T;
    status: number;
    message?: string;
    detail?: string | { loc: string[]; msg: string; type: string }[];
}

// Create Axios instance
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor for auth
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API response error:', error.response?.data);
        let message = 'Request failed';
        if (error.response?.data) {
            if (Array.isArray(error.response.data)) {
                // Handle FastAPI validation errors (422)
                message = error.response.data
                    .map((err: { msg: string }) => err.msg)
                    .join(', ') || 'Invalid input';
            } else if (error.response.data.detail) {
                // Handle other errors (e.g., 401, 500)
                message = error.response.data.detail;
            }
        }
        return Promise.reject(new Error(message));
    }
);

// Universal fetch function
export const fetchApi = async <T>(
    url: string,
    method: string = 'GET',
    data?: unknown,
    params?: Record<string, unknown>,
    config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
    try {
        const response = await apiClient({ url, method, data, params, ...config });
        return { data: response.data, status: response.status };
    } catch (error) {
        console.error('API fetch error:', error);
        throw error; 
    }
};