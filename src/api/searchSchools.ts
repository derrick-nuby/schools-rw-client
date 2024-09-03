import apiRequest from '../utils/apiRequest';
import { SearchSchoolsParams } from '../types/SearchSchoolsParams';

export async function searchSchools(params: SearchSchoolsParams) {
    try {
        const queryParams: string[] = [];

        console.log(params);


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
            console.log(params.district);
            params.district.forEach(district => {
                queryParams.push(`district=${encodeURIComponent(district)}`);
            });
        }
        if (params.school_status?.length) {
            params.school_status.forEach(status => {
                queryParams.push(`school_status=${encodeURIComponent(status)}`);
            });
        }
        if (params.school_type?.length) {
            params.school_type.forEach(type => {
                queryParams.push(`school_type=${encodeURIComponent(type)}`);
            });
        }
        if (params.combination_ids?.length) {
            params.combination_ids.forEach(id => {
                queryParams.push(`combination_ids=${encodeURIComponent(id)}`);
            });
        }

        const queryString = queryParams.join('&');

        const { data } = await apiRequest.get(`/school/search?${queryString}`);

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    throw new Error('No schools found; please search again.');
                case 500:
                    throw new Error('Internal server error. Please try again later.');
                default:
                    throw new Error(error.response.data?.error || 'An unknown error occurred.');
            }
        } else if (error.request) {
            throw new Error('No response from server. Please check your network connection.');
        } else {
            throw new Error('Error setting up the request. Please try again.');
        }
    }
}
