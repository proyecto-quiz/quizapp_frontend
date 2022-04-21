declare module '@@/types-response-solucion' {
  type solucionResponse = {
    id: string;
    author: string;
    imagen: string;
    pregunta: string;
    referencia: string;
    resolucion: string;
  };
  export type UseSolucionResponse = {
    solucion: solucionResponse;
  };
}
