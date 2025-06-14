import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;
