declare module '@@/types-response-search' {
  // Alternativa Response
  type Alternativas = {
    altId: string;
    contenido: string;
    isAnswer: boolean;
  };
  type Tema = {
    id: string;
    nombre: string;
  };
  type Curso = {
    id: string;
    nombre: string;
  };
  // Pregunta Response
  type SearchPreguntaResponse = {
    id: string;
    texto: string;
    alternativas: Alternativas[];
    image: string;
    tema: Tema;
    curso: Curso;
  };
  export type UseSearchPreguntaResponse = {
    searchPregunta: SearchPreguntaResponse;
  };
}
