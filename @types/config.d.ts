declare module '@@/type-config-api' {
  import { AxiosResponse } from 'axios';

  /**
   * Responses successfully
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

  /**
   * Statuses
   */
  export type TypeStatusStore = 'error' | 'success' | 'idle' | 'loading';
  export type GetStatusStore<T = any> = {
    // Statuses
    isError(state: T): boolean;
    isIdle(state: T): boolean;
    isLoading(state: T): boolean;
    isSuccess(state: T): boolean;
  };
}
