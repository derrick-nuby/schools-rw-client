import apiRequest from '../utils/apiRequest';
import { handleApiError } from '../utils/handleApiError';
import { ApiError } from '../types/ApiError';

export async function fetchCombinations() {
  try {
    const { data } = await apiRequest.get('/combination');
    return data;
  } catch (error: unknown) {
    handleApiError(error as ApiError, 'No combinations found; please search again');
  }
}
