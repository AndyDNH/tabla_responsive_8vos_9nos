<template>
    <div class="contenedor-tabla-componente">
        <div class="d-flex justify-content-center mb-4 mt-2">
            <h1 class="titulo-general shadow-sm">{{ titulo }}</h1>
        </div>

        <div class="text-start">
            <button v-if="urlArchivoDescarga" @click="descargarArchivo"
                class="btn-barra-descarga d-inline-flex align-items-center mb-4 shadow-sm"
                style="min-width: 250px; max-width: 45%;" title="Clic para descargar">
                <span class="texto-barra text-truncate me-2 flex-grow-1">
                    Descargar Reporte Actual
                </span>
                <span class="icono-descarga ms-auto">
                    <i class="bi bi-download"></i> ⬇
                </span>
            </button>
        </div>

        <div class="tabla-wrapper table-responsive">
            <table class="table table-custom">
                <thead>
                    <tr>
                        <th v-for="col in columnasConfiguradas" :key="col.key">
                            {{ col.titulo }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(fila, index) in datosPaginados" :key="fila.id || index">
                        <td v-for="col in columnasConfiguradas" :key="col.key">
                            <template v-if="col.key === 'porcentaje'">
                                <span class="fw-bold">{{ fila[col.key] }}%</span>
                            </template>
                            <template v-else>
                                {{ fila[col.key] }}
                            </template>
                        </td>
                    </tr>

                    <tr v-if="datos.length === 0">
                        <td :colspan="columnasConfiguradas.length" class="text-center py-3">
                            No hay datos disponibles para los filtros seleccionados.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="footer-tabla container-fluid mt-2">
            <div class="row align-items-center">
                <div class="col-3 text-start ps-0">
                    <span class="fuente-texto"><strong>Fuente:</strong> CNE</span>
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <div class="paginacion-numeros">
                        <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1"
                            class="btn-pag-nav">◀</button>
                        <span class="btn-pag-numero active">{{ paginaActual }}</span>
                        <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas"
                            class="btn-pag-nav">▶</button>
                    </div>
                </div>
                <div class="col-3 text-end pe-0 small text-muted">
                    Total: {{ datos.length }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../styles/EstilosGenerales.css";
import { useNotificacion } from '@/composables/useNotificacion';

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
            default: "TABLA DE RESULTADOS"
        },
        urlArchivoDescarga: {
            type: String,
            default: ""
        },
        filtros: {
            type: Object,
            default: () => ({ provincia: '', canton: '', partido: '' })
        }
    },

    setup() {
        const notif = useNotificacion();
        return { notif };
    },

    data() {
        return {
            paginaActual: 1,
            itemsPorPagina: 8
        };
    },

    watch: {
        datos() {
            this.paginaActual = 1;
        }
    },

    computed: {
        columnasConfiguradas() {
            let tituloJurisdiccion = 'Provincia';
            if (this.filtros.canton) tituloJurisdiccion = 'Parroquia';
            else if (this.filtros.provincia) tituloJurisdiccion = 'Cantón';

            const colJurisdiccion = { key: 'nombre', titulo: tituloJurisdiccion };
            const colCandidato = { key: 'candidato', titulo: 'Candidato' };
            const colPorcentaje = { key: 'porcentaje', titulo: 'Porcentaje' };
            const colVotos = { key: 'votos', titulo: 'Votos' };

            const colPartido = {
                key: 'partido',
                titulo: this.filtros.partido ? 'Partido Seleccionado' : 'Partido Ganador'
            };

            if (this.filtros.partido) {
                return [colPartido, colCandidato, colVotos, colPorcentaje, colJurisdiccion];
            } else {
                return [colJurisdiccion, colCandidato, colPartido, colVotos, colPorcentaje];
            }
        },

        datosPaginados() {
            const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
            const fin = inicio + this.itemsPorPagina;
            return this.datos.slice(inicio, fin);
        },

        totalPaginas() {
            return Math.ceil(this.datos.length / this.itemsPorPagina);
        }
    },

    methods: {
        formatearTitulo(texto) {
            return texto ? texto.replace(/_/g, " ") : "";
        },

        cambiarPagina(page) {
            if (page >= 1 && page <= this.totalPaginas) {
                this.paginaActual = page;
            } else {
                this.notif.advertencia('No hay más páginas disponibles');
            }
        },

        async descargarArchivo() {
            if (!this.urlArchivoDescarga) {
                this.notif.error('No hay archivo disponible para descargar');
                return;
            }

            try {
                this.notif.info('Iniciando descarga...');

                // Crear un enlace temporal y hacer clic en él
                const link = document.createElement('a');
                link.href = this.urlArchivoDescarga;
                link.download = 'Resultados.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    this.notif.exito('Descarga iniciada correctamente');
                }, 500);

            } catch (error) {
                console.error('Error al descargar archivo:', error);
                this.notif.error('Error al descargar el archivo: ' + error.message);
            }
        }
    }
};
</script>
