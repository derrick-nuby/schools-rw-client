import apiRequest from '../utils/apiRequest';

export async function searchSchools() {
    try {
        const { data } = await apiRequest.get('/combination');
        console.log(data);

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    throw new Error('No combinations found; please search again');
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