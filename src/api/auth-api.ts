import { APIResponse, OkResponse } from '@@/type-config-api';
import { SignInForm, SignUpForm } from '@@/types-forms';
import { TokenResponse } from '@@/types-response-users';
import { client } from './config';

/**
 * Request post and sign-in with user credentials
 * @param data
 * @returns {APIResponse<TokenResponse>}
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

/**
 * Request create or register an user with credentials
 * @param data
 * @returns
 */
export async function signUp(data: SignUpForm): APIResponse<OkResponse> {
  try {
    return await client.post('/auth/sign-up/', data);
  } catch (error: any) {
    return error.response;
  }
}

export async function verify(token :string){
  try {
    return await client.get(`/auth/verify/?token=${token}`);
  } catch (error: any) {
    return error.response;
  }
}