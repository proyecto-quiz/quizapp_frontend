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
    question: string | null;
    level: string | null;
    answer: string | undefined;
  };
  type alternatives = {
    text: string;
    is_answer: boolean;
  };
  type PreguntaForm = {
    text: string;
    topic: number | null;
    imagen: null | undefined | Blob;
    alternatives: alternatives[];
  };
  type SolucionAddForm = {
    imagen: null | undefined | Blob;
    pregunta: string;
    referencia: string;
    resolucion: string;
  };
}
