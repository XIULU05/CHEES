# ♟️ Wizard Chess 3D — Gothic Cathedral Edition

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> 🇪🇸 **[Leer en Español](#-descripción-español)** | 🇺🇸 **[Read in English](#-overview-english)**

---

## 🇪🇸 Descripción (Español)

**Wizard Chess 3D** es una experiencia interactiva de ajedrez tridimensional en tiempo real inspirada en el icónico ajedrez mágico de piedra. Desarrollado con **Three.js (WebGL)**, **Shaders GLSL personalizados** y **React + TypeScript**, sitúa la partida sobre un altar de obsidiana en el corazón de una catedral gótica iluminada por antorchas volumétricas y vitrales.

Cada una de las **32 piezas esculpidas** cuenta con su propio esqueleto (`SkinnedMesh`), animaciones orgánicas de respiración en reposo (*Idle*), desplazamiento con colisiones físicas en el tablero (*Move*) y secuencias cinemáticas de combate cuerpo a cuerpo (*Attack*) que culminan con la fractura y destrucción en fragmentos de piedra de la pieza capturada.

### ✨ Características Principales

- **🏛️ Arquitectura Gótica y Shaders GLSL en Tiempo Real**:
  - Catedral completa con bóvedas de crucería, rosetón norte, tríptico ámbar sur y columnas con detección de colisión sólida para la cámara.
  - Braseros gemelos con fuego volumétrico animado mediante shaders GLSL de tres capas y leños incandescentes.
  - Iluminación PBR (Physically Based Rendering) con entorno PMREM, mapeo de tonos `ACESFilmic` y sombras suaves.
- **⚔️ Piezas Articuladas y Combate Cinemático**:
  - 6 arquetipos esculpidos y animados (Peón, Torre, Caballo, Alfil, Reina y Rey) en mármol antiguo y obsidiana forjada con detalles en oro y acero.
  - Trayectorias concretas anti-colisión: los caballos saltan o rodean obstáculos y las piezas adyacentes ceden el paso sutilmente al paso diagonal.
  - Cámara de duelo automática con curva de Bézier continua ($C^\infty$) durante las capturas, sincronizada al milisegundo con el golpe del arma y la explosión de escombros con física de rebote.
  - Secuencia especial de **Jaque Mate (*Sanctum Judgment*)** con caída dramática del Rey derrotado y opción de repetición instantánea.
- **🧠 Motor de Ajedrez Completo + IA Táctica**:
  - Validación completa de movimientos legales, filtrado de jaque, enroque animado simultáneo (Rey + Torre) y coronación automática de peones.
  - IA táctica integrada para jugar en solitario con evaluación posicional, control del centro, avance de peones y cálculo de material.
- **🎥 Sistema de 4 Cámaras + Cámara Libre (`WASD`)**:
  - **Player Cam**: Vista desde la perspectiva de Blancas o Negras.
  - **Overhead**: Vista cenital táctica del tablero.
  - **Side**: Vista de perfil Este / Oeste sobre el altar.
  - **Cathedral**: Planos generales del Rosetón Norte y el Nártex Sur.
  - Navegación libre tipo videojuego con teclado (`WASD` + `R/F` + flechas) y soporte táctil completo para dispositivos móviles.

---

### 🎮 Controles

| Acción | Escritorio (Ratón y Teclado) | Móvil / Pantalla Táctil |
| :--- | :--- | :--- |
| **Seleccionar / Mover pieza** | Clic izquierdo sobre pieza y casilla destino | Tocar pieza y casilla destino |
| **Orbitar cámara** | Arrastrar con clic izquierdo | Arrastrar con 1 dedo |
| **Desplazar vista (Pan)** | Arrastrar con clic derecho | Arrastrar con 2 dedos |
| **Zoom** | Rueda del ratón (Scroll) | Pellizcar con 2 dedos (Pinch) |
| **Vuelo libre de cámara** | `W` `A` `S` `D` (mover) + `R` / `F` (subir/bajar) | — |
| **Rotar vista libre** | Flechas `↑` `↓` `←` `→` | — |
| **Ocultar / Mostrar interfaz (Modo Cine)** | Tecla `H` | Botón `Hide UI` en el menú `Controls` |

---

### 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd wizard-chess-3d
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre `http://localhost:3000` en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🇺🇸 Overview (English)

**Wizard Chess 3D** is a real-time interactive 3D chess web application built with **Three.js (WebGL)**, **custom GLSL shaders**, and **React + TypeScript**. Set atop a carved obsidian altar inside a torchlit Gothic cathedral, it brings all 32 sculpted stone chess pieces to life with skeletal animations, physical board pathfinding, and cinematic melee capture sequences.

### ✨ Key Features

- **🏛️ Real-Time Gothic Cathedral & Custom GLSL Shaders**:
  - Full-height vaulted nave, stained-glass North Rose Window, warm South Narthex triptych, and solid architectural column collision bounds.
  - Twin fire cauldrons driven by multi-layered procedural GLSL flame shaders, glowing ember beds, and dynamic flickering point lights.
  - Custom PBR stone realism shaders with raking relief, proceduralPMREM environment lighting, and ACES Filmic tone mapping.
- **⚔️ Rigged Stone Statues & Cinematic Combat**:
  - 6 distinct rigged piece archetypes (Pawn, Rook, Knight, Bishop, Queen, King) rendered in aged ivory marble, dark obsidian, forged steel, and gold trim.
  - Staggered organic idle breathing, collision-aware board movement (Knights vault over or skirt around blockers; bystanders subtly yield during diagonal slides), and synchronized melee weapon strikes.
  - Smooth $C^\infty$ quadratic Bézier duel camera that glides into close-up action on captures, followed by 3D stone shard physics that bounce off intact pieces on the board.
  - Dedicated **Sanctum Judgment Checkmate** sequence featuring a dramatic King collapse and instant replay.
- **🧠 Complete Chess Rules & Tactical AI**:
  - Full legal move generation with check validation, simultaneous castling choreography, and automatic pawn promotion.
  - Built-in single-player tactical AI evaluating material balance, center control, check threats, and square safety.
- **📱 Responsive Desktop & Mobile HUD**:
  - 4 dual-sided camera presets (*Player Cam, Overhead, Side, Cathedral*), free-fly `WASD + R/F` camera navigation, cinematic UI toggle (`H`), and a responsive mobile bottom-sheet control drawer.

---

### 🛠️ Tech Stack

- **Frontend Framework:** React 19, TypeScript
- **3D Rendering Engine:** Three.js (`WebGLRenderer`, `GLTFLoader`, `SkeletonUtils`, `OrbitControls`)
- **Shaders & Visual Effects:** Custom GLSL Vertex & Fragment Shaders (Volumetric Fire, Charred Embers, Cathedral Stone Relief)
- **Build Tooling:** Vite 6
