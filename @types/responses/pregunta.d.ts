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
  type source={
    institution: string;
    period: string;
    exam_type: string;
  }
  // Pregunta Response
  type PreguntaResponse = {
    id: string;
    text: string;
    alternatives: alternatives[];
    topic: topic;
    course: course;
    question_sources:[source]
  };
  export type UsePreguntaResponse = {
    pregunta: PreguntaResponse;
  };
}
