<template>
    <div class="vista-con-manejo-errores">
        <div v-if="cargando" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3">Cargando datos...</p>
        </div>

        <div v-else-if="!datosDisponibles" class="alert alert-warning text-center">
            <i class="bi bi-exclamation-triangle"></i>
            No hay datos disponibles en este momento
        </div>

        <div v-else>
            <!-- Tu contenido aquí -->
            <h2>Datos Cargados Exitosamente</h2>
            <p>Total de registros: {{ datos.length }}</p>
        </div>
    </div>
</template>

<script>
import { useNotificacion } from '@/composables/useNotificacion';
import { useServicioDatos } from '@/services/ServicioDatos';

export default {
    name: 'EjemploManejoErrores',
    
    setup() {
        const notif = useNotificacion();
        const servicioDatos = useServicioDatos();
        
        return { notif, servicioDatos };
    },

    data() {
        return {
            datos: [],
            cargando: false,
            datosDisponibles: false
        };
    },

    async mounted() {
        await this.cargarDatosIniciales();
    },

    methods: {
        /**
         * Carga datos con manejo completo de errores
         */
        async cargarDatosIniciales() {
            this.cargando = true;

            try {
                // Opción 1: Cargar JSON local
                const provincias = await import('@/assets/año/datos/presidentes/provincias.json');
                
                if (!provincias || !provincias.default || provincias.default.length === 0) {
                    throw new Error('Los datos están vacíos o no tienen el formato correcto');
                }

                this.datos = provincias.default;
                this.datosDisponibles = true;
                this.notif.exito('Datos cargados correctamente');

            } catch (error) {
                console.error('Error al cargar datos:', error);
                this.datosDisponibles = false;

                // Manejo específico según el tipo de error
                if (error.message.includes('Cannot find module')) {
                    this.notif.error('Archivo de datos no encontrado');
                } else if (error.message.includes('JSON')) {
                    this.notif.error('Error al procesar los datos: formato inválido');
                } else {
                    this.notif.error(`Error al cargar datos: ${error.message}`);
                }
            } finally {
                this.cargando = false;
            }
        },

        /**
         * Ejemplo de validación de filtros
         */
        validarFiltros(filtros) {
            if (!filtros.provincia && !filtros.canton) {
                this.notif.advertencia('Debes seleccionar al menos un filtro');
                return false;
            }

            if (filtros.canton && !filtros.provincia) {
                this.notif.error('Selecciona primero una provincia');
                return false;
            }

            return true;
        },

        /**
         * Ejemplo de operación con confirmación
         */
        async eliminarDato(id) {
            // En lugar de confirm(), usar una notificación
            this.notif.advertencia('Esta acción eliminará el registro. Haz clic de nuevo para confirmar', 0);
            
            // Implementar lógica de confirmación
            // Por ahora solo mostramos el mensaje
        },

        /**
         * Ejemplo de exportación de datos
         */
        async exportarDatos() {
            if (!this.datos || this.datos.length === 0) {
                this.notif.advertencia('No hay datos para exportar');
                return;
            }

            try {
                this.notif.info('Preparando exportación...');
                
                // Simular exportación
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                this.notif.exito('Datos exportados correctamente');
            } catch (error) {
                this.notif.error('Error al exportar datos: ' + error.message);
            }
        },

        /**
         * Ejemplo de guardado con validación
         */
        async guardarCambios(datos) {
            // Validaciones
            if (!datos || Object.keys(datos).length === 0) {
                this.notif.error('No hay datos para guardar');
                return false;
            }

            if (!datos.nombre || datos.nombre.trim() === '') {
                this.notif.error('El nombre es requerido');
                return false;
            }

            try {
                this.notif.info('Guardando cambios...');
                
                // Simular guardado
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                this.notif.exito('Cambios guardados correctamente');
                return true;

            } catch (error) {
                this.notif.error('Error al guardar: ' + error.message);
                return false;
            }
        },

        /**
         * Ejemplo de petición HTTP con manejo de errores
         */
        async obtenerDatosAPI() {
            try {
                this.cargando = true;
                this.notif.info('Conectando con el servidor...');

                const response = await fetch('https://api.ejemplo.com/datos');
                
                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
                }

                const datos = await response.json();
                
                if (!datos || datos.length === 0) {
                    this.notif.advertencia('No se encontraron datos');
                    return [];
                }

                this.notif.exito(`${datos.length} registros cargados`);
                return datos;

            } catch (error) {
                // Manejo específico de errores de red
                if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
                    this.notif.error('Sin conexión a internet. Verifica tu conexión');
                } else if (error.message.includes('timeout')) {
                    this.notif.error('La solicitud tardó demasiado. Intenta de nuevo');
                } else if (error.message.includes('500')) {
                    this.notif.error('Error en el servidor. Intenta más tarde');
                } else if (error.message.includes('404')) {
                    this.notif.error('Datos no encontrados');
                } else {
                    this.notif.error('Error: ' + error.message);
                }
                
                return [];
            } finally {
                this.cargando = false;
            }
        }
    }
};
</script>

<style scoped>
.vista-con-manejo-errores {
    padding: 2rem;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>
