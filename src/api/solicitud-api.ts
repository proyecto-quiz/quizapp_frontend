import { client } from './config';
/**
 * Preguntas
 */
export async function listSolicitud() {
  try {
    return await client.get('/pregunta_solicitud/');
  } catch (error: any) {
    return error.response;
  }
}
export async function updateSolicitud(id: string | undefined, data: FormData) {
  try {
    return await client.put(`/pregunta_solicitud/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error: any) {
    return error.response;
  }
}
export async function deleteSolicitud(id: string | undefined) {
  try {
    return await client.delete(`/pregunta_solicitud/${id}/`);
  } catch (error: any) {
    return error.response;
  }
}
