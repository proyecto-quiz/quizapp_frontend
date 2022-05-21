import { client } from './config';
/**
 * Nota
 */
//@param tipo
export async function notaMe(tipo: string | undefined) {
  try {
    return await client.get(`/nota_user/${tipo}/`);
  } catch (error: any) {
    return error.response;
  }
}
