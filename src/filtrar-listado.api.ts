import axios from "axios";
import { Personaje } from "./filtrar-listado-model";

export const filtrarPersonajes = async (
  nombre: string
): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/personajes?nombre_like=${nombre}`
    );
    data.filter((personaje: Personaje) =>
      personaje.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    return data;
  } catch (error) {
    throw new Error("Error fetching characters: " + error);
  }
};
