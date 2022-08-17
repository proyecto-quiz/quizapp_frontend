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

  type SolucionForm = {
    //pregunta
    preguntaId: string | undefined;
    alternativaId: string | undefined;
    tipo: string | null;
    //tema,curso
    id: string | undefined;
    nombre: string | undefined;
  };
  type alternativas = {
    contenido: string;
    is_answer: boolean;
  };
  type PreguntaForm = {
    texto: string;
    tema: string;
    alternativas: alternativas[];
  };
}
