import { filtrarPersonajes } from "./filtrar-listado.api";
import { Personaje, crearBotonParams } from "./filtrar-listado-model";

export const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = texto;
  return parrafo;
};

export const crearBoton = (params: crearBotonParams): HTMLButtonElement => {
  const { texto, nombre, nombreClase, onClick } = params;
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.id = nombre;
  boton.classList.add(nombreClase);
  boton.addEventListener("click", () => {
    onClick(nombre);
  });
  return boton;
};

const crearElementoImagen = (
  imagenUrl: string,
  nombre: string
): HTMLImageElement => {
  const imagen = document.createElement("img");
  imagen.src = `http://localhost:3000/${imagenUrl}`;
  imagen.alt = nombre;
  imagen.classList.add("personaje__imagen");
  return imagen;
};

const crearContenedorPersonajes = (personajes: Personaje[]): HTMLDivElement => {
  const contenedor = document.createElement("div");
  contenedor.classList.add("personajes__contenedor");
  personajes.forEach((personaje) => {
    const personajeDiv = document.createElement("div");
    personajeDiv.classList.add("personaje__div");

    const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
    const nombre = crearElementoParrafo(`
      <span class="label-negrita">Nombre:</span> ${personaje.nombre}
    `);
    const especialidad = crearElementoParrafo(
      `<span class="label-negrita">Especialidad:</span> ${personaje.especialidad}`
    );
    const habilidades = crearElementoParrafo(
      `<span class="label-negrita">Habilidades:</span> ${personaje.habilidades.join(
        ", "
      )}`
    );

    personajeDiv.appendChild(imagen);
    personajeDiv.appendChild(nombre);
    contenedor.appendChild(personajeDiv);
    personajeDiv.appendChild(especialidad);
    personajeDiv.appendChild(habilidades);
  });
  return contenedor;
};

const pintarPersonajes = async (): Promise<void> => {
  const contenedorPersonajesElem =
    document.getElementById("listado-personajes");
  if (!contenedorPersonajesElem) {
    console.error("No se encontró el contenedor de personajes.");
    return;
  }
  contenedorPersonajesElem.innerHTML = "";

  const inputBuscador = document.getElementById("buscador") as HTMLInputElement;
  const nombreBusqueda = inputBuscador ? inputBuscador.value.trim() : "";

  try {
    const personajesFiltrados = await filtrarPersonajes(nombreBusqueda);
    if (personajesFiltrados.length > 0) {
      const nuevoContenedor = crearContenedorPersonajes(personajesFiltrados);
      contenedorPersonajesElem.appendChild(nuevoContenedor);
    } else {
      const mensajeError = crearElementoParrafo(
        "No se encontraron personajes."
      );
      contenedorPersonajesElem.appendChild(mensajeError);
    }
  } catch (error) {
    console.error("Error al obtener personajes filtrados:", error);
  }
};

const botonFiltrar = () => {
  const botonFiltrar = document.getElementById("btn-filtrar");
  if (botonFiltrar) {
    botonFiltrar.addEventListener("click", pintarPersonajes);
  } else {
    console.error("No se encontró el botón de filtrar.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  pintarPersonajes();
  botonFiltrar();
});
