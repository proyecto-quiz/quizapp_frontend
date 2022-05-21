declare module '@@/types-response-nota' {
  type notaResponse = {
    puntaje: string | null;
    tipo: string | null;
    especificacion: string | null;
  };
  export type UseNotaResponse = {
    nota: notaResponse;
  };
}
