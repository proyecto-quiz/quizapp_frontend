declare module '@@/types-response-nota' {
  type notaResponse = {
    puntaje: string | null;
    tipo: string | null;
    especificacion: string | null;
  };
  export type UseNotaResponse = {
    nota: notaResponse;
  };
  type notaRankingResponse = {
    user: string | null;
    score: number | null;
  };
  export type useNotaRankingResponse = {
    notaRanking: notaRankingResponse;
  };
}
