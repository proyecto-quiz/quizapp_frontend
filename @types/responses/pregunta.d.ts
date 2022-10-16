declare module '@@/types-response-pregunta' {
  // Alternativa Response
  type alternativas = {
    altId: string;
    contenido: string;
  };
  // Pregunta Response
  type PreguntaResponse = {
    preguntaId: string;
    texto: string;
    alternativas: alternativas[];
    image: string;
    temaId: string;
    tema: string;
    cursoId: string;
    curso: string;
  };
  export type UsePreguntaResponse = {
    pregunta: PreguntaResponse;
  };
}
