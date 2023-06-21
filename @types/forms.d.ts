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
    question: number | null;
    level: string | null;
    answer: number | null;
  };
  type alternativas = {
    contenido: string;
    is_answer: boolean;
  };
  type PreguntaForm = {
    texto: string;
    tema: string;
    imagen: null | undefined | Blob;
    alternativas: alternativas[];
  };
  type SolucionAddForm = {
    imagen: null | undefined | Blob;
    pregunta: string;
    referencia: string;
    resolucion: string;
  };
}
