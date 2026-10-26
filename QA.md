# QA de la revisión de UI

## Diagnóstico y corrección
- Inicio anterior: portada grande y poco orientada a la siguiente acción. Ahora recomienda el primer bloque aún no estudiado.
- Jerarquía tipográfica: se unifica Manrope/Georgia y se aumenta el cuerpo de la guía a 15–16px.
- Móvil: se sustituye la navegación superior por barra inferior y diálogo nativo para todas las secciones.
- Búsqueda: se actualizan resultados sin reconstruir el input ni perder el foco.
- Feedback: las pistas y soluciones dejan de sustituir una corrección ya mostrada.
- Filtros: el tipo de ejercicio también filtra la lista de errores.
- Estado: la ruta vacía activa Inicio; el taller admite enlaces a cada tarea; los estados elegidos exponen aria-pressed.
- Accesibilidad: el salto al contenido conserva la ruta; el diálogo atrapa el foco y se cierra al navegar; el foco de las fichas se conserva tras revelar/marcar.

## Pruebas
- node --check dist/app.js: correcto.
- node qa.cjs: 108 claves, 70 fichas, 18 rutas, normalización, conteo de palabras y recuperación de errores: correcto.
- Navegador: respuesta correcta, explicación y actualización del contador de sesión verificadas; pista posterior no borra el feedback.
- Navegador: búsqueda de heirloom devuelve una ficha y mantiene el input enfocado. Revelar muestra traducción/ejemplo y conserva el foco en Ocultar.
- Navegador móvil: Más abre el diálogo con foco en Cerrar; navegar a Guía cierra el diálogo y enfoca el contenido.
- Capturas revisadas en viewports de iframe 1440, 768 y 390px. Documento y main sin desbordamiento horizontal en las vistas medidas. Las tablas mantienen scroll dentro de su contenedor.
- Contraste de diez pares principales calculado >=4.5:1 tras oscurecer el texto secundario y el texto de la etiqueta del curso.
- Reglas web-design-guidelines descargadas. Labels, roles nativos, foco, aria-live, selected/pressed, safe area, fuente local y reduced-motion revisados.

## Límites
La revisión no es una certificación WCAG completa. No se evaluaron todas las combinaciones de tecnologías de asistencia, zoom y navegadores. El hosting mantiene el acceso privado; la comprobación visual se hizo con la misma fuente local para evitar intervenir en la sesión de autenticación del usuario. Audio oficial y vídeo siguen pendientes.


## Actualización: académica moderna
Cambio visual elegido por el usuario. Paleta blanca, azul tinta y celeste; encabezados Manrope y portada rectangular. No cambian el banco de ejercicios ni la persistencia.

| Par | Colores | Contraste calculado |
| --- | --- | --- |
| Texto principal | #152b46 / #ffffff | 14.33:1 |
| Texto secundario | #52657d / #f8fafd | 5.71:1 |
| Botón | #ffffff / #245bb5 | 6.48:1 |
| Seleccionado | #245bb5 / #deebfc | 5.37:1 |
| Texto en celeste | #52657d / #eaf2fc | 5.29:1 |
| Tinta en portada | #ffffff / #17395f | 11.75:1 |
| Ayuda | #3f5878 / #eaf2fc | 6.46:1 |
| Éxito | #276045 / #edf7f1 | 6.74:1 |
| Error | #a24425 / #faf0e9 | 5.52:1 |
| Campo: borde | #7e94b1 / #ffffff | 3.11:1 |

Revisión visual del tema académico: inicio a 1440px, guía a 768px y práctica a 390px. En las tres vistas, documento y main midieron 0px de desbordamiento horizontal. Se conservan foco, navegación móvil, estados y reduced-motion. Fuente local y diez pares de contraste comprobados.
