import { client } from './config';
/**
 * List course topic
 */
export async function curso() {
  try {
    return await client.get('/course-topic/');
  } catch (error: any) {
    return error.response;
  }
}
