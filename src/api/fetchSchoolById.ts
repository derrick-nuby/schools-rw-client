import apiRequest from '../utils/apiRequest';
import { handleApiError } from '../utils/handleApiError';
import { ApiError } from '../types/ApiError';

export async function fetchSchoolById(id: string) {
  try {
    const { data } = await apiRequest.get(`/school/${id}`);
    return data;
  } catch (error: unknown) {
    handleApiError(error as ApiError, 'No school found; please search again');
  }
}
