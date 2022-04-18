import { client } from './config';

/**
 * Get the user authenticated with
 * a token
 @returns
 */
export async function preguntaGeneral() {
  try {
    return await client.get('/pregunta_general/');
  } catch (error: any) {
    return error.response;
  }
}
