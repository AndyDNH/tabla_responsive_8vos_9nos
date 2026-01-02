<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
   <TablaGenerica  
      :datos="[
        { provincia: 'Pichincha', candidato: 'LUISA GONZALEZ', partido_politico: 'RC5', porcentaje: '45.5%' },
        { provincia: 'Guayas', candidato: 'DANIELA CHACON', partido_politico: 'ID', porcentaje: '39.2%' },
        { provincia: 'Azuay', candidato: 'JORGE ARTEAGA', partido_politico: 'UNES', porcentaje: '50.1%' }
      ]"
      titulo="Resultados Electorales 2024"
      textoBotonDescarga="Descargar"
      urlArchivoDescarga="/resultados.json"
    />
</template>

<script>
import TablaGenerica from './components/TablaGenerica.vue';
// import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld
    TablaGenerica
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
