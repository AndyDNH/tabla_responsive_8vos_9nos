<template>
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
        <div v-for="notif in notificaciones" :key="notif.id" class="toast show" role="alert" aria-live="assertive"
            aria-atomic="true">
            <div class="toast-header" :class="getHeaderClass(notif.tipo)">
                <i :class="getIconClass(notif.tipo)" class="me-2"></i>
                <strong class="me-auto">{{ getTitulo(notif.tipo) }}</strong>
                <small>Ahora</small>
                <button type="button" class="btn-close" @click="cerrarNotificacion(notif.id)" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ notif.mensaje }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'NotificacionToast',
    setup() {
        const notificaciones = ref([]);
        let contadorId = 0;

        const mostrar = (mensaje, tipo = 'info', duracion = 5000) => {
            const id = ++contadorId;
            notificaciones.value.push({ id, mensaje, tipo });

            if (duracion > 0) {
                setTimeout(() => {
                    cerrarNotificacion(id);
                }, duracion);
            }
        };

        const cerrarNotificacion = (id) => {
            const index = notificaciones.value.findIndex(n => n.id === id);
            if (index > -1) {
                notificaciones.value.splice(index, 1);
            }
        };

        const getHeaderClass = (tipo) => {
            const clases = {
                'success': 'bg-success text-white',
                'error': 'bg-danger text-white',
                'warning': 'bg-warning text-dark',
                'info': 'bg-info text-white'
            };
            return clases[tipo] || clases.info;
        };

        const getIconClass = (tipo) => {
            const iconos = {
                'success': 'bi bi-check-circle-fill',
                'error': 'bi bi-x-circle-fill',
                'warning': 'bi bi-exclamation-triangle-fill',
                'info': 'bi bi-info-circle-fill'
            };
            return iconos[tipo] || iconos.info;
        };

        const getTitulo = (tipo) => {
            const titulos = {
                'success': 'Éxito',
                'error': 'Error',
                'warning': 'Advertencia',
                'info': 'Información'
            };
            return titulos[tipo] || titulos.info;
        };

        return {
            notificaciones,
            mostrar,
            cerrarNotificacion,
            getHeaderClass,
            getIconClass,
            getTitulo
        };
    }
};
</script>

<style scoped>
.toast {
    min-width: 300px;
    margin-bottom: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-header {
    border-bottom: none;
    font-weight: 500;
}

.toast-header .btn-close {
    filter: brightness(0) invert(1);
}

.toast-header.bg-warning .btn-close {
    filter: none;
}

.toast-body {
    padding: 1rem;
    font-size: 0.95rem;
}

/* Animación de entrada */
.toast {
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Responsive */
@media (max-width: 576px) {
    .toast-container {
        right: 0 !important;
        left: 0 !important;
        padding: 0.5rem !important;
    }

    .toast {
        min-width: 100%;
        width: 100%;
    }
}
</style>
