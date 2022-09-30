declare module '@@/types-response-solucion' {
  type solucionResponse = {
    solucionId: string | undefined;
    author: string | null;
    image: string | null;
    pregunta: string | null;
    referencia: string | undefined;
    resolucion: string | null;
  };
  export type UseSolucionResponse = {
    solucion: solucionResponse;
  };
}
