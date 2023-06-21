import { client } from './config';
/**
 * Preguntas
 */
export async function preguntaGeneral() {
  try {
    return await client.get('/generate/question/advanced/');
  } catch (error: any) {
    return error.response;
  }
}
//@param id
export async function preguntaTema(id: string | undefined) {
  try {
    return await client.get(`/generate/question/basic/${id}/`);
  } catch (error: any) {
    return error.response;
  }
}
//@param id
export async function preguntaCurso(id: string | undefined) {
  try {
    return await client.get(`/generate/question/medium/${id}/`);
  } catch (error: any) {
    return error.response;
  }
}

export async function preguntaAdd(data: FormData) {
  try {
    return await client.post('/question/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error: any) {
    return error.response;
  }
}
