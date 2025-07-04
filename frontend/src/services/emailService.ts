import { api } from '@/lib/api';
import type { ApiResponse } from '@/types/ApiResponse';

export const emailService = {
    async generate(data: any): Promise<ApiResponse<any>> {
        return await api('/engage/generate', 'POST', data);
    },
};