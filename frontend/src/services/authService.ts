import { api } from '@/lib/api';
import type { ApiResponse } from '@/types/ApiResponse';

export const authService = {
    async login(data: any): Promise<ApiResponse<any>> {
        return await api('/api/auth/login ', 'POST', data);
    },
    async register(data: any): Promise<ApiResponse<any>> {
        return await api('/api/auth/register', 'POST', data);
    },
    async logout(): Promise<ApiResponse<any>> {
        return await api('/api/auth/logout', 'POST');
    },
};