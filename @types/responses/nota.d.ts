declare module '@@/types-response-nota' {
  type notaResponse = {
    id: number;
    score: string | null;
    level: string | null;
    detail: string | null;
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
