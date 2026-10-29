# Plan de Restauración 100% Original + Preparación para GitHub

## 1. Objetivo General
Restaurar **Wizard Chess 3D** al 100% de su versión original limpia, eliminando por completo las herramientas experimentales de carga de archivos `.GLB` externos, cachés en IndexedDB, deformaciones de malla por shader y modos de combate personalizados, dejando intactas las estatuas góticas originales, su iluminación de catedral, sus animaciones orgánicas nativas y un rendimiento óptimo. Además, crear un archivo `README.md` profesional y bilingüe (Español / Inglés) listo para lucir en tu portafolio de GitHub.

---

## 2. Cambios en la Interfaz y Experiencia (`src/App.tsx` y `src/styles.css`)
- **Eliminación del Gestor de Modelos `.GLB`**:
  - Quitar el botón `⚔️ Modelos 3D (.GLB)` de la barra superior de controles (`#hud-right`) y del menú móvil.
  - Eliminar por completo el modal `Gestor de Figuras 3D y Combate Anime` y todos sus estados asociados (`modelsModalOpen`, `pieceConfigs`, `animeCombat`, `loadingSlot`, `statusBanner`).
- **HUD Original Limpio**:
  - Conservar únicamente los controles originales del juego: cambio de bando (*Play as Black / Play as White*), movimiento de IA (*AI Move*), nueva partida (*New Game*), las 4 vistas de cámara (*Player Cam, Overhead, Side, Cathedral*) y ocultar interfaz (*Hide UI [H]*).
- **Limpieza de Estilos (`src/styles.css`)**:
  - Remover las clases CSS añadidas para el modal de carga `.GLB`, tarjetas de ranuras y botones de prueba de captura, manteniendo intacto el diseño gótico dorado original.

---

## 3. Restauración del Motor 3D y Animaciones (`src/wizardChessEngine.js`)
- **Piezas y Animaciones 100% Originales**:
  - Eliminar el cargador de piezas personalizadas (`customPieceTemplates`, `customPieceConfigs`, almacenamiento en `IndexedDB` `wizard_chess_custom_glb_v1` y `MeshoptDecoder` para `.glb` externos).
  - Limpiar cualquier dato residual guardado en el navegador (`IndexedDB` / `localStorage`) al iniciar para garantizar que siempre carguen las 32 piezas esculpidas originales.
  - Eliminar el shader de deformación procedural (`attachOrganicHumanoidShader`) y los efectos de combate anime (`animeCombatMode`, cortes de katana y energía maldita), restaurando la secuencia de combate, destrucción en fragmentos de piedra y caída del Rey 100% original.
- **Rendimiento Nativo**:
  - Al no procesar mallas externas de 600k vértices ni texturas pesadas en memoria, el consumo de RAM y GPU volverá a ser ligero, estable y fluido como en la versión original.

---

## 4. Documentación Profesional para Portafolio (`README.md`)
- Crear un archivo `README.md` en la raíz del proyecto estructurado para GitHub en **Español e Inglés**, que incluya:
  - **Descripción del Proyecto**: Presentación visual y técnica de *Wizard Chess 3D*, destacando la arquitectura gótica procedural en Three.js / WebGL, iluminación dinámica y motor de ajedrez con IA.
  - **Características Principales (Features)**: Tablero y catedral 3D en tiempo real, piezas esculpidas con animaciones de combate y destrucción física, 4 cámaras cinemáticas + cámara libre (`WASD`), soporte táctil móvil y motor de IA integrado.
  - **Tecnologías Utilizadas (Tech Stack)**: React 19, TypeScript, Three.js (WebGL, Post-Processing UnrealBloom, Shaders GLSL), Chess.js y Vite.
  - **Guía de Instalación y Ejecución Local (`npm install`, `npm run dev`, `npm run build`)** y tabla de controles de teclado/ratón/táctil.
