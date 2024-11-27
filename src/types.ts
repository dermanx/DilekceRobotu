export interface FormData {
  ad: string;
  soyad: string;
  telefon: string;
  adres: string;
  kurum: string;
  mesaj: string;
}

export interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface AIResponse {
  success: boolean;
  content: string;
  error?: string;
}

export interface FormState {
  step: number;
  data: FormData;
  apiResponse: APIResponse | null;
  aiResponse: AIResponse | null;
  isLoading: boolean;
  isAILoading: boolean;
  error: string | null;
}