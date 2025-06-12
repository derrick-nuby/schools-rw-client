export function handleApiError(
  error: any,
  notFoundMsg = 'Resource not found.',
): never {
  console.error(error);
  if (error.response) {
    switch (error.response.status) {
      case 404:
        throw new Error(notFoundMsg);
      case 500:
        throw new Error('Internal server error. Please try again later.');
      default:
        throw new Error(
          error.response.data?.error || 'An unknown error occurred.',
        );
    }
  } else if (error.request) {
    throw new Error(
      'No response from server. Please check your network connection.',
    );
  } else {
    throw new Error('Error setting up the request. Please try again.');
  }
}
