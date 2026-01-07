// Composable para manejar notificaciones globalmente
import { getCurrentInstance } from 'vue';

let instanciaNotificacion = null;

export function registrarNotificacion(instancia) {
    instanciaNotificacion = instancia;
}

export function useNotificacion() {
    // Si estamos dentro de un componente Vue, intentar obtener la instancia del root
    const instance = getCurrentInstance();
    const notif = instance?.appContext.config.globalProperties.$notificacion || instanciaNotificacion;

    if (!notif) {
        console.warn('Sistema de notificaciones no inicializado');
        return {
            exito: (msg) => console.log('✓', msg),
            error: (msg) => console.error('✗', msg),
            advertencia: (msg) => console.warn('⚠', msg),
            info: (msg) => console.info('ℹ', msg)
        };
    }

    return {
        /**
         * Muestra una notificación de éxito
         * @param {string} mensaje - Mensaje a mostrar
         * @param {number} duracion - Duración en ms (0 = permanente)
         */
        exito: (mensaje, duracion = 5000) => {
            notif.mostrar(mensaje, 'success', duracion);
        },

        /**
         * Muestra una notificación de error
         * @param {string} mensaje - Mensaje a mostrar
         * @param {number} duracion - Duración en ms (0 = permanente)
         */
        error: (mensaje, duracion = 7000) => {
            notif.mostrar(mensaje, 'error', duracion);
        },

        /**
         * Muestra una notificación de advertencia
         * @param {string} mensaje - Mensaje a mostrar
         * @param {number} duracion - Duración en ms (0 = permanente)
         */
        advertencia: (mensaje, duracion = 6000) => {
            notif.mostrar(mensaje, 'warning', duracion);
        },

        /**
         * Muestra una notificación informativa
         * @param {string} mensaje - Mensaje a mostrar
         * @param {number} duracion - Duración en ms (0 = permanente)
         */
        info: (mensaje, duracion = 5000) => {
            notif.mostrar(mensaje, 'info', duracion);
        }
    };
}
