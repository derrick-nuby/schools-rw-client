import apiRequest from '../utils/apiRequest';
import { SearchSchoolsParams } from '../types/SearchSchoolsParams';
import { handleApiError } from '../utils/handleApiError';
import { ApiError } from '../types/ApiError';

export async function searchSchools(params: SearchSchoolsParams) {
  try {
    const queryParams: string[] = [];

    if (params.query) {
      queryParams.push(`query=${encodeURIComponent(params.query)}`);
    }
    if (params.limit !== undefined) {
      queryParams.push(`limit=${params.limit}`);
    }
    if (params.page !== undefined) {
      queryParams.push(`page=${params.page}`);
    }
    if (params.district?.length) {
      params.district.forEach((district) => {
        queryParams.push(`district=${encodeURIComponent(district)}`);
      });
    }
    if (params.school_status?.length) {
      params.school_status.forEach((status) => {
        queryParams.push(`school_status=${encodeURIComponent(status)}`);
      });
    }
    if (params.school_type?.length) {
      params.school_type.forEach((type) => {
        queryParams.push(`school_type=${encodeURIComponent(type)}`);
      });
    }
    if (params.combination_ids?.length) {
      params.combination_ids.forEach((id) => {
        queryParams.push(`combination_ids=${encodeURIComponent(id)}`);
      });
    }

    const queryString = queryParams.join('&');

    const { data } = await apiRequest.get(`/school/search?${queryString}`);

    return data;
  } catch (error: unknown) {
    handleApiError(error as ApiError, 'No schools found; please search again.');
  }
}
