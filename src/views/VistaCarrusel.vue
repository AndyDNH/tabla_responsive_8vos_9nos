<template>
    <div class="fondo-ciudad d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div class="container-fluid w-100 p-0">

            <div id="carruselResultados" class="carousel carousel-dark slide w-100" data-bs-ride="false">
                <div class="carousel-inner">

                    <div class="carousel-item active">
                        <div class="d-flex justify-content-center align-items-center w-100">
                            <div class="col-11 col-md-10 col-lg-8 col-xl-7 limite-ancho mx-auto py-4">

                                <SidebarFilter :provincias="dataProvincias" :cantones="cantonesFiltrados"
                                    :partidos="listaPartidos" v-model:vuelta="filtros.vuelta"
                                    v-model:provincia="filtros.provincia" v-model:canton="filtros.canton"
                                    v-model:partido="filtros.partido" @reset-canton="filtros.canton = ''" />

                                <div class="mb-4 mt-3">
                                    <TarjetaCandidato :itemsCandidato="listaCandidatos" :itemsLeyenda="listaLeyenda"
                                        :etiquetaTarjeta2="filtros.partido"
                                        @cambio-partido="filtros.partido = $event" />
                                </div>

                                <TablaGenerica :datos="datosProcesados" :filtros="filtros" :titulo="textoUbicacion"
                                    :urlArchivoDescarga="urlDescargaLocal" />

                            </div>
                        </div>
                    </div>

                    <div class="carousel-item">
                        <div class="d-flex justify-content-center align-items-center w-100">
                            <div class="col-11 col-md-10 col-lg-8 col-xl-7 limite-ancho mx-auto">
                                <div class="bg-white p-5 text-center shadow rounded bg-opacity-75">
                                    <h3>Otra información electoral</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="controles-carrusel-inferior mt-4 d-flex justify-content-center align-items-center gap-3">
                    <button class="btn-carrusel-custom" type="button" data-bs-target="#carruselResultados"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <div class="indicadores-custom d-flex gap-2">
                        <button type="button" data-bs-target="#carruselResultados" data-bs-slide-to="0"
                            class="active dot-indicator"></button>
                        <button type="button" data-bs-target="#carruselResultados" data-bs-slide-to="1"
                            class="dot-indicator"></button>
                    </div>
                    <button class="btn-carrusel-custom" type="button" data-bs-target="#carruselResultados"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import TablaGenerica from '@/components/TablaGenerica.vue';
import SidebarFilter from '@/components/SidebarFilter.vue';
import TarjetaCandidato from '@/components/TarjetaCandidato.vue'; // IMPORTAR EL COMPONENTE

import rawProvincias from '@/assets/año/datos/presidentes/provincias.json';
import rawCantones from '@/assets/año/datos/presidentes/cantones.json';
import rawParroquias from '@/assets/año/datos/presidentes/parroquias.json';

// --- DATOS FIJOS (Se mueven aquí para pasarlos como props) ---
const dessertsData = [
    { porcentaje: 'Menor porcentaje de votos', p1: '#bdd7e7', p2: '#fdbe85', p3: '#cbaada', p4: '#fcdabc', p5: '#B1E1E7', p6: '#f8bbd0', p7: '#F5B7B1', p8: '#bdbdbd', p9: '#A4DFBF', p10: '#c7b69f', p11: '#f9e79f', p12: '#b4e4f9', p13: '#ffc9c2', p14: '#fcf099', p15: '#cbe5f6', p16: '#DFA4CB' },
    { porcentaje: 'Porcentaje de votos bajo', p1: '#6baed6', p2: '#fd8d3c', p3: '#A569BD', p4: '#f8c89c', p5: '#64C3CE', p6: '#f48fb1', p7: '#F1948A', p8: '#8c8c8c', p9: '#7DCEA0', p10: '#907761', p11: '#F4D03F', p12: '#54C3F2', p13: '#fb887d', p14: '#f3d367', p15: '#85c1e9', p16: '#CF77B0' },
    { porcentaje: 'Porcentaje de votos medio', p1: '#3182bd', p2: '#e6550d', p3: '#8E44AD', p4: '#f2b77c', p5: '#40b6c4', p6: '#f06292', p7: '#EC7063', p8: '#5f5f5f', p9: '#52BE80', p10: '#7e634e', p11: '#F1C40F', p12: '#27B4EF', p13: '#ef7e73', p14: '#c29b2b', p15: '#5dade2', p16: '#c5599f' },
    { porcentaje: 'Mayor porcentaje de votos', p1: '#08519c', p2: '#a63603', p3: '#7D3C98', p4: '#e69237', p5: '#35A0AC', p6: '#e91e63', p7: '#E74C3C', p8: '#4a4a4a', p9: '#229954', p10: '#553d2a', p11: '#D4AC0D', p12: '#1097D1', p13: '#e37469', p14: '#8f6e0f', p15: '#3498db', p16: '#b5408c' }
];

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
    name: "VistaCarrusel",
    components: {
        TablaGenerica,
        SidebarFilter,
        TarjetaCandidato // Registrar componente
    },
    data() {
        return {
            // Asignar los datos fijos a variables del data
            listaCandidatos: candidatoData,
            listaLeyenda: dessertsData,

            dataProvincias: rawProvincias,
            dataCantones: rawCantones,
            dataParroquias: rawParroquias,

            filtros: {
                vuelta: 'primera',
                provincia: '',
                canton: '',
                partido: ''
            },
            urlDescargaLocal: "/results/DataResults.xlsx",
        };
    },
    computed: {
        listaPartidos() {
            const partidosSet = new Set();
            this.dataProvincias.forEach(item => {
                if (item.resultados) {
                    Object.keys(item.resultados).forEach(key => {
                        if (key !== 'VOTOS' && key !== 'votos_validos' && key !== 'votos_blancos' && key !== 'votos_nulos') {
                            partidosSet.add(key);
                        }
                    });
                }
            });
            return Array.from(partidosSet);
        },
        cantonesFiltrados() {
            if (!this.filtros.provincia) return [];
            return this.dataCantones.filter(c => c.CODPRO === this.filtros.provincia);
        },
        textoUbicacion() {
            let base = "RESULTADOS NACIONALES";
            if (this.filtros.canton) {
                const c = this.dataCantones.find(c => c.CODCAN === this.filtros.canton);
                base = `PARROQUIAS DE ${c ? c.CANTON : '...'}`;
            } else if (this.filtros.provincia) {
                const p = this.dataProvincias.find(p => p.CODPRO === this.filtros.provincia);
                base = `CANTONES DE ${p ? p.PROVINCIA : '...'}`;
            }
            if (this.filtros.partido) base += ` - ${this.filtros.partido}`;
            return base;
        },
        datosProcesados() {
            let dataFuente = [];
            if (this.filtros.canton) {
                dataFuente = this.dataParroquias.filter(p => p.CODCAN === this.filtros.canton);
            } else if (this.filtros.provincia) {
                dataFuente = this.dataCantones.filter(c => c.CODPRO === this.filtros.provincia);
            } else {
                dataFuente = this.dataProvincias;
            }

            return dataFuente.map(item => {
                const id = item.CODPRO || item.CODCAN || item.CODPAR;
                const nombre = item.PROVINCIA || item.CANTON || item.PARROQUIA;
                let votos = 0;
                let porcentaje = 0;
                let candidatoNombre = '';
                let partidoNombre = '';

                if (this.filtros.partido) {
                    const datosPartido = item.resultados?.[this.filtros.partido];
                    if (datosPartido) {
                        votos = Number(datosPartido.votos);
                        porcentaje = datosPartido.porcentaje;
                        candidatoNombre = datosPartido.candidato;
                        partidoNombre = this.filtros.partido;
                    }
                } else {
                    const ganadorSiglas = item.ganador;
                    const datosGanador = item.resultados?.[ganadorSiglas];
                    partidoNombre = ganadorSiglas || 'N/A';
                    if (datosGanador) {
                        candidatoNombre = datosGanador.candidato;
                        const votosTotalesZona = item.votos_validos || item.resultados?.VOTOS?.votos;
                        votos = votosTotalesZona || datosGanador.votos;
                        porcentaje = datosGanador.porcentaje;
                    }
                }
                return {
                    id,
                    nombre,
                    candidato: candidatoNombre,
                    partido: partidoNombre,
                    votos: votos.toLocaleString(),
                    porcentaje
                };
            });
        }
    }
};
</script>

<style scoped>
/* ESTILOS DEL VISTA CARRUSEL */
.fondo-ciudad {
    background-image: url('@/assets/img/whitecity.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
}

.limite-ancho {
    max-width: 950px;
    width: 100%;
}

.btn-carrusel-custom {
    background-color: #333;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s;
}

.btn-carrusel-custom:hover {
    background-color: #1dafbf;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    width: 1.2rem;
    height: 1.2rem;
    filter: invert(1);
}

.dot-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
    border: none;
    padding: 0;
}

.dot-indicator.active {
    background-color: #333;
    transform: scale(1.2);
}
</style>