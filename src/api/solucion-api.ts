import { client } from './config';
import { SolucionForm, SolucionAddForm } from '@@/types-forms';
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
export async function solucionAdd(data: SolucionAddForm) {
  try {
    return await client.post('/solucion/', data);
  } catch (error: any) {
    return error.response;
  }
}
