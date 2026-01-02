<template>
  <div class="hello">
    <div>
      <table>
        <thead>
          <tr>
            <th>Provincia</th>
            <th>Candidato</th>
            <th>Partido Político</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dato, idx) in datosPaginados" :key="idx">
            <td>{{ dato.provincia }}</td>
            <td>{{ dato.candidato }}</td>
            <td>{{ dato.partido }}</td>
            <td>{{ dato.porcentaje }}</td>
          </tr>
        </tbody>
      </table>
      <div class="paginacion">
        <button
          @click="cambiarPagina(paginaActual - 1)"
          :disabled="paginaActual === 1"
        >
          Anterior
        </button>
        <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
        <button
          @click="cambiarPagina(paginaActual + 1)"
          :disabled="paginaActual === totalPaginas"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      paginaActual: 1,
      itemsPorPagina: 8,
      datos: [
        {
          provincia: 'Azuay',
          candidato: 'Rodrigo Borja',
          partido: 'Izquierda Democrática',
          porcentaje: '30.66'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        },
        {
          provincia: 'Bolívar',
          candidato: 'Jamil Mahuad',
          partido: 'Democracia Popular',
          porcentaje: '20.87'
        }
      ]
    }
  },
  computed: {
    datosPaginados() {
      const inicio = (this.paginaActual - 1) * this.itemsPorPagina
      const fin = inicio + this.itemsPorPagina
      return this.datos.slice(inicio, fin)
    },
    totalPaginas() {
      return Math.ceil(this.datos.length / this.itemsPorPagina)
    }
  },
  methods: {
    cambiarPagina(nuevaPagina) {
      if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
        this.paginaActual = nuevaPagina
      }
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.paginacion {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>
