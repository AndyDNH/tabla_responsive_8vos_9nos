# 📚 Guía Completa de Manejo de Errores

## 🎯 Sistema Implementado

Hemos implementado un sistema profesional de notificaciones tipo **Toast** que reemplaza completamente el uso de `alert()`.

## 📁 Archivos Creados

```
src/
├── components/
│   ├── NotificacionToast.vue        # Componente de notificaciones
│   ├── EjemploNotificaciones.vue    # Ejemplos interactivos
│   └── TablaGenericaMejorada.vue    # Tabla con manejo de errores
├── composables/
│   └── useNotificacion.js           # Composable para usar notificaciones
├── services/
│   └── ServicioDatos.js             # Servicio con manejo de errores
└── views/
    └── EjemploManejoErrores.vue     # Ejemplos de patrones de manejo
```

---

## 🚀 Uso Rápido

### 1. En cualquier componente:

```javascript
import { useNotificacion } from '@/composables/useNotificacion';

export default {
    setup() {
        const notif = useNotificacion();
        
        // Usar en funciones
        const guardar = () => {
            notif.exito('¡Guardado exitosamente!');
        };
        
        return { notif, guardar };
    }
}
```

### 2. En métodos (Options API):

```javascript
import { useNotificacion } from '@/composables/useNotificacion';

export default {
    methods: {
        async cargarDatos() {
            const notif = useNotificacion();
            
            try {
                const datos = await this.obtenerDatos();
                notif.exito('Datos cargados');
            } catch (error) {
                notif.error('Error al cargar: ' + error.message);
            }
        }
    }
}
```

---

## 📋 Tipos de Notificaciones

### ✅ Éxito (Verde)
```javascript
notif.exito('Operación completada');
notif.exito('Guardado correctamente', 3000); // 3 segundos
```
**Usar para:** Operaciones exitosas, confirmaciones, acciones completadas

### ❌ Error (Rojo)
```javascript
notif.error('Error al cargar datos');
notif.error('Error crítico', 0); // Permanente
```
**Usar para:** Errores, fallos de operación, problemas técnicos

### ⚠️ Advertencia (Amarillo)
```javascript
notif.advertencia('Acción no permitida');
notif.advertencia('Confirma antes de continuar');
```
**Usar para:** Advertencias, validaciones, confirmaciones

### ℹ️ Info (Azul)
```javascript
notif.info('Procesando...');
notif.info('Conectando con el servidor...');
```
**Usar para:** Información general, estado de procesos

---

## 🎨 Patrones Comunes

### 1. Carga de Datos
```javascript
async cargarDatos() {
    const notif = useNotificacion();
    
    try {
        this.cargando = true;
        notif.info('Cargando datos...');
        
        const datos = await fetch('/api/datos');
        
        if (!datos || datos.length === 0) {
            notif.advertencia('No hay datos disponibles');
            return;
        }
        
        this.datos = datos;
        notif.exito('Datos cargados correctamente');
        
    } catch (error) {
        console.error(error);
        notif.error('Error al cargar: ' + error.message);
    } finally {
        this.cargando = false;
    }
}
```

### 2. Validación de Formularios
```javascript
validarFormulario(datos) {
    const notif = useNotificacion();
    
    if (!datos.nombre || datos.nombre.trim() === '') {
        notif.error('El nombre es requerido');
        return false;
    }
    
    if (!datos.email || !datos.email.includes('@')) {
        notif.error('Email inválido');
        return false;
    }
    
    if (datos.edad < 18) {
        notif.advertencia('Debes ser mayor de edad');
        return false;
    }
    
    return true;
}
```

### 3. Guardado con Confirmación
```javascript
async guardar(datos) {
    const notif = useNotificacion();
    
    if (!this.validarFormulario(datos)) {
        return;
    }
    
    try {
        notif.info('Guardando cambios...');
        
        await this.api.guardar(datos);
        
        notif.exito('Cambios guardados correctamente');
        this.$router.push('/lista');
        
    } catch (error) {
        notif.error('Error al guardar: ' + error.message);
    }
}
```

### 4. Peticiones HTTP
```javascript
async obtenerDatosAPI() {
    const notif = useNotificacion();
    
    try {
        notif.info('Conectando...');
        
        const response = await fetch('https://api.ejemplo.com/datos');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const datos = await response.json();
        notif.exito('Datos obtenidos');
        return datos;
        
    } catch (error) {
        if (error.message.includes('NetworkError')) {
            notif.error('Sin conexión a internet');
        } else if (error.message.includes('500')) {
            notif.error('Error del servidor');
        } else if (error.message.includes('404')) {
            notif.error('Datos no encontrados');
        } else {
            notif.error('Error: ' + error.message);
        }
        return [];
    }
}
```

### 5. Descarga de Archivos
```javascript
async descargar() {
    const notif = useNotificacion();
    
    if (!this.archivoDisponible) {
        notif.advertencia('No hay archivo para descargar');
        return;
    }
    
    try {
        notif.info('Iniciando descarga...');
        
        const link = document.createElement('a');
        link.href = this.urlArchivo;
        link.download = 'datos.xlsx';
        link.click();
        
        notif.exito('Descarga iniciada');
    } catch (error) {
        notif.error('Error al descargar: ' + error.message);
    }
}
```

### 6. Filtros y Búsqueda
```javascript
aplicarFiltros(filtros) {
    const notif = useNotificacion();
    
    if (!filtros.provincia && !filtros.canton) {
        notif.advertencia('Selecciona al menos un filtro');
        return;
    }
    
    const resultados = this.buscar(filtros);
    
    if (resultados.length === 0) {
        notif.info('No se encontraron resultados');
    } else {
        notif.exito(`${resultados.length} resultados encontrados`);
    }
    
    this.resultados = resultados;
}
```

### 7. Operaciones Asíncronas
```javascript
async procesarMultiple() {
    const notif = useNotificacion();
    
    try {
        notif.info('Procesando elementos...', 0);
        
        for (let i = 0; i < this.items.length; i++) {
            await this.procesarItem(this.items[i]);
            
            // Actualizar progreso
            if ((i + 1) % 10 === 0) {
                notif.info(`Procesados ${i + 1} de ${this.items.length}`, 2000);
            }
        }
        
        notif.exito('Todos los elementos procesados');
        
    } catch (error) {
        notif.error('Error en el procesamiento: ' + error.message);
    }
}
```

---

## 🔧 Configuración Avanzada

### Duración Personalizada
```javascript
notif.exito('Mensaje rápido', 2000);     // 2 segundos
notif.error('Error crítico', 0);          // No se cierra automáticamente
notif.advertencia('Importante', 10000);   // 10 segundos
```

### Múltiples Notificaciones
```javascript
// Se apilan automáticamente
notif.info('Iniciando proceso 1...');
notif.info('Iniciando proceso 2...');
notif.info('Iniciando proceso 3...');
```

---

## 📱 Características

✅ **Responsive** - Se adapta a móviles automáticamente  
✅ **Sin dependencias** - Solo usa Bootstrap (ya instalado)  
✅ **Animaciones** - Transiciones suaves  
✅ **Apilable** - Múltiples notificaciones simultáneas  
✅ **Accesible** - Incluye aria-labels  
✅ **Personalizable** - Fácil de modificar colores y estilos  

---

## 🎓 Mejores Prácticas

### ✅ HACER
- Usar notificaciones para feedback al usuario
- Mensajes claros y concisos
- Diferenciar tipos según el contexto
- Manejar errores en bloques try-catch
- Mostrar el estado de operaciones largas

### ❌ NO HACER
- Usar `alert()`, `confirm()` o `prompt()`
- Mensajes técnicos que el usuario no entiende
- Notificaciones para cada acción menor
- Ignorar errores silenciosamente
- Mensajes genéricos como "Error"

---

## 📖 Ejemplos en el Proyecto

1. **[EjemploNotificaciones.vue](src/components/EjemploNotificaciones.vue)**  
   Botones interactivos para probar todas las notificaciones

2. **[TablaGenericaMejorada.vue](src/components/TablaGenericaMejorada.vue)**  
   Ejemplo de tabla con manejo de errores en descarga

3. **[EjemploManejoErrores.vue](src/views/EjemploManejoErrores.vue)**  
   Patrones completos de manejo de errores

4. **[ServicioDatos.js](src/services/ServicioDatos.js)**  
   Servicio reutilizable con manejo centralizado

---

## 🐛 Debugging

Si las notificaciones no aparecen:

1. Verifica que `NotificacionToast` esté en App.vue
2. Revisa la consola por errores
3. Asegúrate de importar `useNotificacion` correctamente
4. Verifica que Bootstrap Icons esté cargado en index.html

---

## 📞 Soporte

Para más ayuda, revisa los componentes de ejemplo o consulta la documentación de Vue 3.

**¡Ahora tienes un sistema profesional de notificaciones! 🎉**
