import apiRequest from '../utils/apiRequest';
import { handleApiError } from '../utils/handleApiError';
import { ApiError } from '../types/ApiError';

export async function fetchSchools(page: number, limit: number) {
  try {
    const { data } = await apiRequest.get('/school', {
      params: { page, limit },
    });
    return data;
  } catch (error: unknown) {
    handleApiError(error as ApiError, 'No schools found; please search again');
  }
}
