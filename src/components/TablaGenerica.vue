<template>
  <div class="contenedor-tabla">
    
    <div class="encabezado-tabla">
      <h2 class="titulo-tabla">{{ titulo }}</h2>
      
      <a :href="urlArchivoDescarga" class="btn-descarga" download>
        {{ textoBotonDescarga }}
      </a>
    </div>

    <table class="tabla-datos">
      <thead>
        <tr>
          <th v-for="(tituloColumna, index) in columnasDinamicas" :key="index">
            {{ formatearTitulo(tituloColumna) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(fila, index) in datos" :key="index">
          <td v-for="(columna, colIndex) in columnasDinamicas" :key="colIndex">
            {{ fila[columna] }}
          </td>
        </tr>
        <tr v-if="datos.length === 0">
          <td>
            No hay datos disponibles para mostrar.
          </td>
        </tr>
      </tbody>
    </table>

    <div>
        <!-- Div para paginación aquí -->
      </div>

  </div>
</template>

<script>
import './TablaGenerica.css';

export default {
  name: 'TablaGenerica',
  props: {
    datos: {
      type: Array,
      required: true,
      default: () => [] 
    },
    titulo: {
      type: String,
      required: true,
      default: 'Tabla de Datos'
    },
    textoBotonDescarga: {
      type: String,
      required: true,
      default: 'Descargar'
    },
    urlArchivoDescarga: {
      type: String,
      required: true,
      default: '#'
    }
  },

  computed: {
    // Extrae las llaves del primer objeto para crear los títulos dinámicamente.
    columnasDinamicas() {
      if (this.datos && this.datos.length > 0) {
        return Object.keys(this.datos[0]);
      }
      return [];
    }
  },
  methods: {
    formatearTitulo(texto) {
      if (!texto) return '';
      // Reemplaza guiones bajos por espacios
      return texto.replace(/_/g, ' ');
    }
  }
};
</script>