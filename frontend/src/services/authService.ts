import { api } from '@/lib/api';
import type { ApiResponse } from '@/types/ApiResponse';

export const authService = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async login(data: { username: string; password: string }): Promise<ApiResponse<any>> {
    // Cambiar al endpoint interno
    return await api('/api/proxy-login', 'POST', data);
  },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async register(data: { username: string; password: string }): Promise<ApiResponse<any>> {
    return await api('/api/proxy-register', 'POST', data);
  },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async logout(): Promise<ApiResponse<any>> {
    return await api('/api/proxy-logout', 'POST');
  },
};
