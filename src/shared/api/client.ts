import type { ApiError } from '../types';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // TODO: Ajouter automatiquement le token d'authentification
    // const token = getAuthToken();
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`,
    //   };
    // }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Throw a plain object shaped like ApiError instead of using a class
        throw {
          message: errorData.message || `HTTP error! status: ${response.status}`,
          code: errorData.code,
          statusCode: response.status,
        } as ApiError;
      }

      return await response.json();
    } catch (error: unknown) {
      // If it's already an ApiError-shaped object, rethrow it
      if (error && typeof error === 'object' && 'message' in (error as any)) {
        throw error as ApiError;
      }

      // Erreur réseau ou autre
      throw { message: 'Network error or unexpected error occurred' } as ApiError;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// TODO: Importer depuis env.ts quand disponible
const apiClient = new ApiClient('http://localhost:3000/api');

export { apiClient, ApiClient };
