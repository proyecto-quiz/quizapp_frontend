declare module '@@/type-config-api' {
  import { AxiosResponse } from 'axios';

  /**
   * Error response API
   */
  type ErrorResponse = {
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

  // eslint-disable-next-line @typescript-eslint/ban-types
  export type APIResponse<T = {}> = Promise<AxiosResponse<T & ErrorResponse>>;
}
