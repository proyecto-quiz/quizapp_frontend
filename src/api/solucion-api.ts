import { client } from './config';
import { SolucionForm } from '@@/types-forms';
/**
 * Solución
 */
export async function solucion(data: SolucionForm) {
  try {
    return await client.post('/pregunta_solucion/', data);
  } catch (error: any) {
    return error.response;
  }
}

export async function solucionAdd(formData: FormData) {
  try {
    return await client.post('/solucion/', formData);
  } catch (error: any) {
    return error.response;
  }
}
