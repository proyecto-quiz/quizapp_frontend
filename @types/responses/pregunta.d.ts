declare module '@@/types-response-pregunta' {
  // Alternativa Response
  type alternatives = {
    id: string;
    text: string;
  };
  type topic = {
    id: string;
    name: string;
  };
  type course = {
    id: string;
    name: string;
  };
  // Pregunta Response
  type PreguntaResponse = {
    id: string;
    text: string;
    alternatives: alternatives[];
    topic: topic;
    course: course;
  };
  export type UsePreguntaResponse = {
    pregunta: PreguntaResponse;
  };
}
