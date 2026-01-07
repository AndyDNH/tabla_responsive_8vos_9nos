# Sistema de Notificaciones

Este proyecto usa un sistema de notificaciones tipo Toast en lugar de `alert()`.

## 🚀 Uso Básico

### En cualquier componente:

```javascript
import { useNotificacion } from '@/composables/useNotificacion';

export default {
    setup() {
        const notif = useNotificacion();

        // Notificación de éxito
        notif.exito('¡Operación completada exitosamente!');

        // Notificación de error
        notif.error('Ocurrió un error al cargar los datos');

        // Notificación de advertencia
        notif.advertencia('Esta acción no se puede deshacer');

        // Notificación informativa
        notif.info('Los datos se están cargando...');

        return { notif };
    }
}
```

### En métodos de Options API:

```javascript
export default {
    methods: {
        async cargarDatos() {
            const notif = useNotificacion();
            
            try {
                // Código que puede fallar
                const datos = await fetch('/api/datos');
                notif.exito('Datos cargados correctamente');
            } catch (error) {
                notif.error('Error al cargar datos: ' + error.message);
            }
        }
    }
}
```

## 📋 Tipos de Notificación

- **`exito(mensaje, duracion)`** - Verde, para operaciones exitosas
- **`error(mensaje, duracion)`** - Rojo, para errores
- **`advertencia(mensaje, duracion)`** - Amarillo, para advertencias
- **`info(mensaje, duracion)`** - Azul, para información general

## ⏱️ Duración

Por defecto:
- Éxito: 5 segundos
- Error: 7 segundos
- Advertencia: 6 segundos
- Info: 5 segundos

Duración personalizada:
```javascript
notif.exito('Mensaje', 3000); // 3 segundos
notif.error('Error crítico', 0); // Permanente (no se cierra automáticamente)
```

## 🎨 Personalización

Edita [NotificacionToast.vue](src/components/NotificacionToast.vue) para cambiar colores, posición, animaciones, etc.

## 📱 Responsive

Las notificaciones se adaptan automáticamente a dispositivos móviles ocupando todo el ancho en pantallas pequeñas.
