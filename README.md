# English Tutor · Unit 1

Plataforma personal de estudio de inglés C1, nivel 11. HTML, CSS y JavaScript, con la dirección visual académica moderna: blanco, azul tinta y celeste.

## Contenido

- Guía de estudio en ocho bloques.
- 108 ejercicios con corrección explicada: elegir, completar, corregir errores, ordenar y clasificar.
- 70 fichas de vocabulario con significado, ejemplo y síntesis de voz opcional.
- Repaso de errores, taller de escritura y speaking, plan semanal y material PDF.
- Progreso y borradores en localStorage; exportación/importación del progreso.

## Desarrollo local

Requiere Node.js para las comprobaciones y Python 3 para el servidor local. No hay dependencias de npm que instalar.

```sh
npm run dev
```

Abre http://localhost:4173. Para comprobar la app:

```sh
npm test
npm run build
```

El build valida JavaScript y ejecuta las comprobaciones. Los archivos publicables ya están en `dist/`.

## Desplegar en Vercel

1. Importa `DevelTwist/english-tutor` en Vercel.
2. Usa la rama `main` y deja **Root Directory** en la raíz del repositorio (`./`).
3. Elige **Framework Preset: Other** si Vercel pide una selección.
4. `vercel.json` configura **Build Command: npm run build**, omite la instalación de dependencias y establece **Output Directory: dist**.
5. No se necesitan variables de entorno, base de datos ni servicios externos.

La navegación usa fragmentos (`/#home`, `/#guide/continuous`), por lo que no necesita reglas de reescritura. Solo se publica `dist/`; la documentación y los archivos de pruebas quedan fuera de los archivos servidos.

La autenticación de ChatGPT de la versión alojada en Sites pertenece a aquel hosting. Esta versión estática no incluye autenticación propia. El progreso se conserva por origen del navegador; para moverlo al nuevo dominio, exporta el JSON desde Mi repaso e impórtalo allí.

## Estructura

```text
dist/               App y recursos publicables
qa.cjs              Verificaciones de contenido, rutas y progreso
vercel.json         Configuración de despliegue
BRIEF-VISUAL.md     Dirección y tokens visuales
QA.md               Registro de comprobaciones
```

## Fuentes y límites

Contenido derivado de las guías y prácticas de la unidad 1 disponibles en el proyecto de estudio. Los audios y vídeos oficiales no están incluidos; las tareas que dependen de ellos están señaladas. La revisión de escritura usa reglas locales y es orientativa, no una evaluación completa por IA.

Manrope se aloja localmente. Su licencia está en `dist/FONT-LICENSE.txt`. La licencia original del repositorio se conserva en `LICENSE`.
