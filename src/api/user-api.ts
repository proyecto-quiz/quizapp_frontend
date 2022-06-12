import { APIResponse } from '@@/type-config-api';
import { UserAuthenticateResponse } from '@@/types-response-users';
import { client } from './config';

/**
 * Get the user authenticated with
 * a token
 @returns
 */
export async function me(): APIResponse<UserAuthenticateResponse> {
  try {
    return await client.get('/users/me/');
  } catch (error: any) {
    return error.response;
  }
}
