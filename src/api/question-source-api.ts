import { client } from './config';
/**
 * Question Source
 */
export async function questionSource() {
    try {
      return await client.get('/question-source/');
    } catch (error: any) {
      return error.response;
    }
  }