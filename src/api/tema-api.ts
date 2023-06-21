import { client } from './config';
/**
 * List topic
 */
export async function tema() {
  try {
    return await client.get('/topic/');
  } catch (error: any) {
    return error.response;
  }
}
