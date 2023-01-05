import { client } from './config';
/**
 * Preguntas
 */
export async function search(text: string) {
  try {
    return await client.get('/search/pregunta/', { params: { text: text } });
  } catch (error: any) {
    return error.response;
  }
}
