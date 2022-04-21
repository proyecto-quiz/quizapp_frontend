import { client } from './config';
/**
 * Preguntas
 */
export async function preguntaGeneral() {
  try {
    return await client.get('/pregunta_general/');
  } catch (error: any) {
    return error.response;
  }
}
//@param id
export async function preguntaTema(id: string | undefined) {
  try {
    return await client.get(`/pregunta_tema/${id}/`);
  } catch (error: any) {
    return error.response;
  }
}
