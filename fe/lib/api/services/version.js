/**
 * Version service for fetching backend framework information
 */

import { get } from '../client';

/**
 * Fetches the backend framework version information
 *
 * @returns {Promise<{version: string, php_version: string}>} Backend version data
 * @throws {Error} If the API request fails
 */
export async function getBackendVersion() {
  return await get('/version');
}
