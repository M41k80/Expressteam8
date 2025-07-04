import { api } from "@/lib/api";

type GenerateResponse = {
  subject: string;
  body: string;
};

type EmailHistoryItem = {
  id: number;
  prompt: string;
  generatedSubject: string;
  generatedBody: string;
  timestamp: string;
};

export const emailService = {
  async generate(prompt: string): Promise<GenerateResponse> {
    const response = await api<GenerateResponse>("/engage/generate", "POST", { prompt });
    return response.data;
  },

  async getAllHistory(): Promise<EmailHistoryItem[]> {
    const response = await api<EmailHistoryItem[]>("/engage/history", "GET");
    return response.data;
  },

  async getLatest(): Promise<EmailHistoryItem[]> {
    const response = await api<EmailHistoryItem[]>("/engage/history/latest", "GET");
    return response.data;
  },

  async delete(mailId: number): Promise<void> {
    await api(`/engage/history/${mailId}`, "DELETE");
  },
};
