<template>
  <div id="app">
    <VistaCarrusel/>
  </div>
</template>

<script>
import TarjetaCandidato from './components/TarjetaCandidato.vue';
import VistaCarrusel from './views/VistaCarrusel.vue';

// Colores de degradado esperados 
const dessertsData = [
    { porcentaje: 'Menor porcentaje de votos', p1: '#bdd7e7', p2: '#fdbe85', p3: '#cbaada', p4: '#fcdabc', p5: '#B1E1E7', p6: '#f8bbd0', p7: '#F5B7B1', p8: '#bdbdbd', p9: '#A4DFBF', p10: '#c7b69f', p11: '#f9e79f', p12: '#b4e4f9', p13: '#ffc9c2', p14: '#fcf099', p15: '#cbe5f6', p16: '#DFA4CB' },
    { porcentaje: 'Porcentaje de votos bajo', p1: '#6baed6', p2: '#fd8d3c', p3: '#A569BD', p4: '#f8c89c', p5: '#64C3CE', p6: '#f48fb1', p7: '#F1948A', p8: '#8c8c8c', p9: '#7DCEA0', p10: '#907761', p11: '#F4D03F', p12: '#54C3F2', p13: '#fb887d', p14: '#f3d367', p15: '#85c1e9', p16: '#CF77B0' },
    { porcentaje: 'Porcentaje de votos medio', p1: '#3182bd', p2: '#e6550d', p3: '#8E44AD', p4: '#f2b77c', p5: '#40b6c4', p6: '#f06292', p7: '#EC7063', p8: '#5f5f5f', p9: '#52BE80', p10: '#7e634e', p11: '#F1C40F', p12: '#27B4EF', p13: '#ef7e73', p14: '#c29b2b', p15: '#5dade2', p16: '#c5599f' },
    { porcentaje: 'Mayor porcentaje de votos', p1: '#08519c', p2: '#a63603', p3: '#7D3C98', p4: '#e69237', p5: '#35A0AC', p6: '#e91e63', p7: '#E74C3C', p8: '#4a4a4a', p9: '#229954', p10: '#553d2a', p11: '#D4AC0D', p12: '#1097D1', p13: '#e37469', p14: '#8f6e0f', p15: '#3498db', p16: '#b5408c' }
];
// Datos fijos para la lista principal, cuando se definan se remplazaran por la lista real
const candidatoData = [
    { partido: 1, nombre: 'GUILLERMO LASSO', url: require('@/assets/img/1.png'), color: '#045A8D', nombrePartido: 'Alianza Creo 21 Psc 6', json: '1' },
    { partido: 2, nombre: 'ANDRÉS ARAUZ', url: require('@/assets/img/1.png'), color: '#EF8A62', nombrePartido: '1-5 Unión Por La Esperanza', json: '2' },
    { partido: 3, nombre: 'YAKU PÉREZ', url: require('@/assets/img/1.png'), color: '#54278f', nombrePartido: 'Movimiento De Unidad Plurinacional Pachakutik', json: '3' },
    { partido: 4, nombre: 'XAVIER HERVAS', url: require('@/assets/img/1.png'), color: '#fcbd00', nombrePartido: 'Partido Izquierda Democrática', json: '4' },
    { partido: 5, nombre: 'PEDRO JOSÉ FREILE', url: require('@/assets/img/1.png'), color: '#41b6c4', nombrePartido: 'Movimiento Amigo', json: '5' },
    { partido: 6, nombre: 'ISIDRO ROMERO', url: require('@/assets/img/1.png'), color: '#d81b60', nombrePartido: 'Partido Político Avanza', json: '6' },
    { partido: 7, nombre: 'LUCIO GUTIÉRREZ', url: require('@/assets/img/1.png'), color: '#cb4335', nombrePartido: 'Partido Sociedad Patriótica 21 De Enero', json: '7' },
    { partido: 8, nombre: 'GERSON ALMEIDA', url: require('@/assets/img/1.png'), color: '#808080', nombrePartido: 'Movimiento Ecuatoriano Unido', json: '8' },
    { partido: 9, nombre: 'XIMENA PEÑA', url: require('@/assets/img/1.png'), color: '#239b56', nombrePartido: 'Movimiento Alianza País', json: '9' },
    { partido: 10, nombre: 'GUILLERMO CELI', url: require('@/assets/img/1.png'), color: '#553d2a', nombrePartido: 'Partido Político Sociedad Unida Más Acción', json: '10' },
    { partido: 11, nombre: 'JUAN F. VELASCO', url: require('@/assets/img/1.png'), color: '#d4ac0d', nombrePartido: 'Movimiento Construye', json: '11' },
    { partido: 12, nombre: 'CESAR MONTUFAR', url: require('@/assets/img/1.png'), color: '#006691', nombrePartido: 'Alianza Honestidad', json: '12' },
    { partido: 13, nombre: 'GUSTAVO LARREA', url: require('@/assets/img/1.png'), color: '#fa8072', nombrePartido: 'Movimiento Democracia Sí', json: '13' },
    { partido: 14, nombre: 'CARLOS SAGNAY', url: require('@/assets/img/1.png'), color: '#765900', nombrePartido: 'Partido Fuerza Ec', json: '14' },
    { partido: 15, nombre: 'GIOVANNY ANDRADE', url: require('@/assets/img/1.png'), color: '#00ffff', nombrePartido: 'Unión Ecuatoriana', json: '15' },
    { partido: 16, nombre: 'PAÚL CARRASCO', url: require('@/assets/img/1.png'), color: '#cb35a3', nombrePartido: 'Movimiento Nacional Podemos', json: '16' },
];

export default {
    name: 'App',
    components: {
        TarjetaCandidato, VistaCarrusel
    },
    data() {
        return {
            listaCandidatos: candidatoData,
            listaLeyenda: dessertsData
        }
    }
}
</script>