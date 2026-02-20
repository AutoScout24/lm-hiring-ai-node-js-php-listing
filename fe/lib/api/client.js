/**
 * Base API client with centralized configuration and error handling.
 * Provides a consistent interface for making API requests to the backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

/**
 * Default fetch options applied to all requests
 */
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

/**
 * Base fetch wrapper with error handling
 *
 * @param {string} endpoint - API endpoint path (e.g., '/version')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} Parsed JSON response
 * @throws {Error} Network or API errors
 */
export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

/**
 * GET request helper
 */
export async function get(endpoint) {
  return apiClient(endpoint, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function post(endpoint, data) {
  return apiClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
