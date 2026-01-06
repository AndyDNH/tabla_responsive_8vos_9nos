<template>
    <div class="fondo-ciudad d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div class="container-fluid w-100 p-0">

            <div id="carruselResultados" class="carousel carousel-dark slide w-100" data-bs-ride="false">
                <div class="carousel-inner">

                    <div class="carousel-item active">
                        <div class="d-flex justify-content-center align-items-center w-100">
                            <div class="col-11 col-md-10 col-lg-8 col-xl-7 limite-ancho mx-auto">

                                <SidebarFilter :provincias="dataProvincias" :cantones="cantonesFiltrados"
                                    :partidos="listaPartidos" v-model:vuelta="filtros.vuelta"
                                    v-model:provincia="filtros.provincia" v-model:canton="filtros.canton"
                                    v-model:partido="filtros.partido" @reset-canton="filtros.canton = ''" />

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

import rawProvincias from '@/assets/año/datos/presidentes/provincias.json';
import rawCantones from '@/assets/año/datos/presidentes/cantones.json';
import rawParroquias from '@/assets/año/datos/presidentes/parroquias.json';


export default {
    name: "VistaCarrusel",

    components: {
        TablaGenerica,
        SidebarFilter
    },


    data() {
        return {

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

    // 4. COMPUTED (Lógica de negocio)
    computed: {

        // Extracción dinámica de partidos
        listaPartidos() {
            const partidosSet = new Set();

            // Nota el uso de "this." para acceder a la data
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

        // Filtro de cantones para el dropdown
        cantonesFiltrados() {
            if (!this.filtros.provincia) return [];
            return this.dataCantones.filter(c => c.CODPRO === this.filtros.provincia);
        },

        // Título dinámico
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

        // Procesamiento y Normalización de datos (El cerebro)
        datosProcesados() {
            let dataFuente = [];

            // 1. Selección de Fuente
            if (this.filtros.canton) {
                dataFuente = this.dataParroquias.filter(p => p.CODCAN === this.filtros.canton);
            } else if (this.filtros.provincia) {
                dataFuente = this.dataCantones.filter(c => c.CODPRO === this.filtros.provincia);
            } else {
                dataFuente = this.dataProvincias;
            }

            // 2. Normalización (Map)
            return dataFuente.map(item => {
                const id = item.CODPRO || item.CODCAN || item.CODPAR;
                const nombre = item.PROVINCIA || item.CANTON || item.PARROQUIA;

                let votos = 0;
                let porcentaje = 0;
                let candidatoNombre = '';
                let partidoNombre = '';

                if (this.filtros.partido) {
                    // Lógica por Partido
                    const datosPartido = item.resultados?.[this.filtros.partido];
                    if (datosPartido) {
                        votos = Number(datosPartido.votos);
                        porcentaje = datosPartido.porcentaje;
                        candidatoNombre = datosPartido.candidato;
                        partidoNombre = this.filtros.partido;
                    }
                } else {
                    // Lógica General (Ganador)
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
/* Los estilos se mantienen exactamente igual */
.fondo-ciudad {
    background-image: url('@/assets/img/city.jpg');
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