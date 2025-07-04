import { axiosInstance } from './axiosInstance';
import type { ApiResponse } from '../types/ApiResponse';
import type { AxiosRequestConfig } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function api<T>(
  url: string,
  method: HttpMethod = 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      ...config,
    };

    if (data) {
      axiosConfig.data = data;
      if (data instanceof FormData) {
        axiosConfig.headers = {
          ...axiosConfig.headers,
          'Content-Type': 'multipart/form-data',
        };
      }
    }

    const response = await axiosInstance.request<ApiResponse<T>>(axiosConfig);

    if (response.data.error) {
      throw new Error(response.data.message || 'Error en respuesta de API');
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Error desconocido');
  }
}