declare module '@@/types-response-users' {
  // Token Response
  export type TokenResponse = {
    refreshToken: string;
    accessToken: string;
  };

  export type RefreshTokenResponse = {
    accessToken: string;
  };

  // User Authenticate Response
  type UserResponse = {
    email: string;
    username: string;
    name: string;
    image?: string;
    lastName: string;
    isVerified: boolean;
    role: string;
  };

  export type UserAuthenticateResponse = {
    user: UserResponse;
  };
}
