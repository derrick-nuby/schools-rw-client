import apiRequest from '../utils/apiRequest';
import { handleApiError } from '../utils/handleApiError';

export async function fetchCombinations() {
  try {
    const { data } = await apiRequest.get('/combination');
    return data;
  } catch (error: any) {
    handleApiError(error, 'No combinations found; please search again');
  }
}
