export interface Personaje {
  id: string;
  nombre: string;
  apodo: string;
  especialidad: string;
  habilidades: string[];
  amigo: string;
  imagen: string;
}

export interface crearBotonParams {
  texto: string;
  nombre: string;
  nombreClase: string;
  onClick: (nombre: string) => void;
}
