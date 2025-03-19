const API_URL = process.env.REACT_APP_API_URL;

function getAuthHeaders(includeToken = true, isFormData = false) {
  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (includeToken) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

async function apiClient(endpoint, { method = 'GET', body, includeToken = true } = {}) {
  const isFormData = body instanceof FormData;
  const config = {
    method,
    headers: getAuthHeaders(includeToken, isFormData),
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  const contentType = response.headers.get('content-type');
  let responseData;
  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // Redirect to login page if the response status is 401
      window.location.href = '/login';
      return;
    }

    const errorMessage = responseData.message || responseData || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return responseData;
}

export default apiClient;