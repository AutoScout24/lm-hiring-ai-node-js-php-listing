/**
 * Car service for fetching car listings and details from the backend API
 */

import { get } from '../client';

/**
 * Fetches a paginated, filtered list of cars
 *
 * @param {URLSearchParams|string} params - Query parameters for filtering/sorting/pagination
 * @returns {Promise<{cars: Array, total: number, totalResults: number, page: number, totalPages: number}>}
 */
export async function getCars(params) {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return await get(`/cars?${queryString}`);
}

/**
 * Fetches a single car by ID
 *
 * @param {number|string} id - Car ID
 * @returns {Promise<object>} Car data
 */
export async function getCarById(id) {
  return await get(`/cars/${id}`);
}
