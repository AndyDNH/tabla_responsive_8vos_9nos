<template>
  <div id="app">
    <TablaGenerica :datos="datosEjemplo" titulo="Resultados Electorales 2024" textoBotonDescarga="Descargar Excel"
      urlArchivoDescarga="#" />
  </div>
</template>

<script>
import TablaGenerica from './components/TablaGenerica.vue'
import './styles/EstilosGenerales.css'

export default {
  name: 'App',
  components: {
    TablaGenerica
  },
  data() {
    return {
      datosEjemplo: [
        { provincia: 'Pichincha', candidato: 'LUISA GONZALEZ', partido_politico: 'RC5', porcentaje: '45.5%' },
        { provincia: 'Guayas', candidato: 'DANIELA CHACON', partido_politico: 'ID', porcentaje: '39.2%' },
        { provincia: 'Azuay', candidato: 'JORGE ARTEAGA', partido_politico: 'UNES', porcentaje: '50.1%' },
        { provincia: 'Manabí', candidato: 'CARLOS MENDEZ', partido_politico: 'PSC', porcentaje: '35.8%' },
        { provincia: 'El Oro', candidato: 'ANA LOPEZ', partido_politico: 'CREO', porcentaje: '42.3%' }
      ]
    }
  }
}
</script>
