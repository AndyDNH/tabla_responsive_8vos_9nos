<template>
  <div class="contenedor-tabla">
    <!-- Encabezado separado con título y botón -->
    <div class="encabezado-tabla">
      <h2 class="titulo-tabla">{{ titulo }}</h2>
      <a :href="urlArchivoDescarga" class="btn-descarga" download="Resultados_Electorales.xlsx">
        {{ textoBotonDescarga }}
      </a>
    </div>

    <!-- Tabla separada del encabezado -->
    <div class="tabla-wrapper">
      <table class="tabla-datos">
        <thead>
          <tr>
            <th v-for="(tituloColumna, index) in columnasDinamicas" :key="index">
              {{ formatearTitulo(tituloColumna) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fila, index) in datosOrdenados" :key="index">
            <td v-for="(columna, colIndex) in columnasDinamicas" :key="colIndex">
              {{ fila[columna] }}
            </td>
          </tr>
          <tr v-if="datos.length === 0">
            <td>No hay datos disponibles para mostrar.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div></div>
  </div>
</template>

<script>
import "../styles/EstilosGenerales.css";

export default {
  name: "TablaGenerica",
  props: {
    datos: {
      type: Array,
      required: true,
      default: () => [],
    },
    titulo: {
      type: String,
      required: true,
      default: "Tabla de Datos",
    },
    textoBotonDescarga: {
      type: String,
      required: true,
      default: "Descargar",
    },
    urlArchivoDescarga: {
      type: String,
      required: true,
      default: "#",
    },
  },

  computed: {
    // Extrae las llaves del primer objeto para crear los títulos dinámicamente.
    columnasDinamicas() {
      if (this.datos && this.datos.length > 0) {
        return Object.keys(this.datos[0]);
      }
      return [];
    },
    // Crea una lista nueva ordenada basada en la primera columna
    datosOrdenados() {
      // 1. Hacemos una copia para no alterar la variable 'datos' de Andrade
      const lista = [...this.datos];

      if (lista.length === 0) return [];

      // 2. Detectamos automáticamente la primera columna (clave)
      const primeraColumnaKey = Object.keys(lista[0])[0];

      // 3. Ordenamos Alfabéticamente (A-Z)
      return lista.sort((a, b) => {
        const valorA = String(a[primeraColumnaKey]).toLowerCase();
        const valorB = String(b[primeraColumnaKey]).toLowerCase();

        if (valorA < valorB) return -1;
        if (valorA > valorB) return 1;
        return 0;
      });
    },
  },

  methods: {
    // Método original de Andrade
    formatearTitulo(texto) {
      if (!texto) return "";
      // Reemplaza guiones bajos por espacios
      return texto.replace(/_/g, " ");
    },
  },
};
</script>
