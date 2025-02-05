import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const router = useRouter();
    
    this.axiosInstance = axios.create({ 
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
    });

    this.axiosInstance.interceptors.request.use((config) => {
      if (!(config as RequestConfig).skipAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          router.push('/auth/signin');
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data: unknown, config?: RequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data: unknown, config?: RequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}
