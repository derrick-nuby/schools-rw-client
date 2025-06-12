import apiRequest from '../utils/apiRequest';
import { handleApiError } from '../utils/handleApiError';

export async function fetchSchools(page: number, limit: number) {
  try {
    const { data } = await apiRequest.get('/school', {
      params: { page, limit },
    });
    return data;
  } catch (error: any) {
    handleApiError(error, 'No schools found; please search again');
  }
}
