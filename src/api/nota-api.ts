import { client } from './config';
/**
 * Nota
 */
//@param tipo
export async function notaMe() {
  try {
    return await client.get('/note/me');
  } catch (error: any) {
    return error.response;
  }
}

export async function notaRanking() {
  try {
    return await client.get('/note/ranking/');
  } catch (error: any) {
    return error.response;
  }
}
