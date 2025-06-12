import apiRequest from '../utils/apiRequest';
import { handleApiError } from '../utils/handleApiError';

export async function fetchSchoolById(id: string) {
  try {
    const { data } = await apiRequest.get(`/school/${id}`);
    return data;
  } catch (error: any) {
    handleApiError(error, 'No school found; please search again');
  }
}
