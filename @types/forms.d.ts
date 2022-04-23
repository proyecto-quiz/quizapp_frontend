declare module '@@/types-forms' {
  type SignInForm = {
    email: string;
    password: string;
    rememberPassword: boolean;
  };

  type SignUpForm = {
    email: string;
    password: string;
    password2: string;
    username: string;
  };
}
