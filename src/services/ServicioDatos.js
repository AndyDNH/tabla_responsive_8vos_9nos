import { useNotificacion } from '@/composables/useNotificacion';

/**
 * Servicio para cargar datos JSON con manejo de errores
 */
export class ServicioDatos {
    constructor() {
        this.notif = useNotificacion();
    }

    /**
     * Carga un archivo JSON con manejo de errores
     * @param {string} ruta - Ruta al archivo JSON
     * @param {string} nombreDato - Nombre descriptivo del dato
     * @returns {Promise<any>} - Datos cargados o null si falla
     */
    async cargarJSON(ruta, nombreDato = 'datos') {
        try {
            const response = await fetch(ruta);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const datos = await response.json();
            
            if (!datos || (Array.isArray(datos) && datos.length === 0)) {
                this.notif.advertencia(`No hay ${nombreDato} disponibles`);
                return [];
            }
            
            return datos;
            
        } catch (error) {
            console.error(`Error al cargar ${nombreDato}:`, error);
            this.notif.error(`No se pudieron cargar ${nombreDato}: ${error.message}`);
            return null;
        }
    }

    /**
     * Valida que los datos requeridos estén presentes
     * @param {any} datos - Datos a validar
     * @param {string} nombreDato - Nombre del dato para el mensaje
     * @returns {boolean} - true si los datos son válidos
     */
    validarDatos(datos, nombreDato = 'los datos') {
        if (!datos) {
            this.notif.error(`${nombreDato} no están disponibles`);
            return false;
        }
        
        if (Array.isArray(datos) && datos.length === 0) {
            this.notif.advertencia(`No hay ${nombreDato} para mostrar`);
            return false;
        }
        
        return true;
    }

    /**
     * Maneja errores de forma centralizada
     * @param {Error} error - Error a manejar
     * @param {string} contexto - Contexto donde ocurrió el error
     */
    manejarError(error, contexto = 'la operación') {
        console.error(`Error en ${contexto}:`, error);
        
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            this.notif.error('Error de conexión. Verifica tu conexión a internet');
        } else if (error.message.includes('JSON')) {
            this.notif.error('Error al procesar los datos. Formato inválido');
        } else {
            this.notif.error(`Error en ${contexto}: ${error.message}`);
        }
    }

    /**
     * Ejecuta una operación con manejo automático de errores
     * @param {Function} operacion - Función async a ejecutar
     * @param {string} mensajeExito - Mensaje si la operación es exitosa
     * @param {string} contexto - Contexto de la operación
     */
    async ejecutarConManejo(operacion, mensajeExito, contexto) {
        try {
            const resultado = await operacion();
            
            if (mensajeExito) {
                this.notif.exito(mensajeExito);
            }
            
            return resultado;
        } catch (error) {
            this.manejarError(error, contexto);
            return null;
        }
    }
}

/**
 * Hook para usar el servicio de datos en componentes
 */
export function useServicioDatos() {
    return new ServicioDatos();
}
