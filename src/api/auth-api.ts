import { APIResponse } from '@@/type-config-api';
import { SignInForm } from '@@/types-forms';
import { TokenResponse } from '@@/types-response-users';
import { client } from './config';

/**
 * Request post and sign-in with user credentials
 * @param data
 * @returns {APIResponse<UserAuthenticate>}
 */
export async function signIn(data: SignInForm): APIResponse<TokenResponse> {
  try {
    return await client.post('/auth/sign-in/', data);
  } catch (error: any) {
    return error.response;
  }
}

/**
 * Request post and sign-out with user credentials
 * @returns {APIResponse}
 */
export async function signOut(): APIResponse {
  try {
    return await client.post('/auth/sign-out/');
  } catch (error: any) {
    return error.response;
  }
}
