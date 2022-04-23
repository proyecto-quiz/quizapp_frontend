declare module '@@/type-config-api' {
  import { AxiosResponse } from 'axios';

  /**
   * Reponses successfully
   */
  export type OkResponse = Record<string, string | string[] | object>;

  /**
   * Error response API
   */
  export type ErrorResponse = {
    /**
     * detail message error
     * @type string, string[], object
     */
    detail: string | string[] | object;

    /**
     * nonFieldErrors message error
     * @type string, string[], object
     */
    nonFieldErrors: string | string[] | object;

    /**
     * error code response
     */
    statusCode: number;
  };

  /**
   * API Response of Backend
   */
  export type APIResponse<T = any> = Promise<AxiosResponse<T & ErrorResponse>>;
}
