<template>
    <div class="ejemplo-notificaciones p-4">
        <h2 class="mb-4">Ejemplos de Notificaciones</h2>
        
        <div class="row g-3">
            <div class="col-md-6">
                <button @click="mostrarExito" class="btn btn-success w-100">
                    Notificación de Éxito
                </button>
            </div>
            
            <div class="col-md-6">
                <button @click="mostrarError" class="btn btn-danger w-100">
                    Notificación de Error
                </button>
            </div>
            
            <div class="col-md-6">
                <button @click="mostrarAdvertencia" class="btn btn-warning w-100">
                    Notificación de Advertencia
                </button>
            </div>
            
            <div class="col-md-6">
                <button @click="mostrarInfo" class="btn btn-info w-100 text-white">
                    Notificación Informativa
                </button>
            </div>
            
            <div class="col-12">
                <button @click="simularCargaDatos" class="btn btn-primary w-100">
                    Simular Carga de Datos (con manejo de errores)
                </button>
            </div>
        </div>

        <div class="mt-4 p-3 bg-light rounded">
            <h5>Código de ejemplo:</h5>
            <pre><code>import { useNotificacion } from '@/composables/useNotificacion';

const notif = useNotificacion();

// Uso básico
notif.exito('¡Datos guardados!');
notif.error('Error al cargar');
notif.advertencia('Acción no permitida');
notif.info('Procesando...');

// Con duración personalizada
notif.exito('Mensaje rápido', 2000);
notif.error('Error crítico', 0); // No se cierra automáticamente</code></pre>
        </div>
    </div>
</template>

<script>
import { useNotificacion } from '@/composables/useNotificacion';

export default {
    name: 'EjemploNotificaciones',
    setup() {
        const notif = useNotificacion();

        const mostrarExito = () => {
            notif.exito('¡Operación completada exitosamente!');
        };

        const mostrarError = () => {
            notif.error('Ocurrió un error al procesar la solicitud');
        };

        const mostrarAdvertencia = () => {
            notif.advertencia('Esta acción requiere confirmación');
        };

        const mostrarInfo = () => {
            notif.info('Los datos se están procesando, por favor espere...');
        };

        const simularCargaDatos = async () => {
            notif.info('Cargando datos...', 2000);
            
            // Simular una petición que puede fallar
            setTimeout(() => {
                const exito = Math.random() > 0.5;
                
                if (exito) {
                    notif.exito('¡Datos cargados correctamente!');
                } else {
                    notif.error('Error: No se pudieron cargar los datos del servidor');
                }
            }, 2000);
        };

        return {
            mostrarExito,
            mostrarError,
            mostrarAdvertencia,
            mostrarInfo,
            simularCargaDatos
        };
    }
};
</script>

<style scoped>
.ejemplo-notificaciones {
    max-width: 800px;
    margin: 2rem auto;
}

pre {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
}

code {
    font-size: 0.9rem;
    color: #333;
}
</style>
