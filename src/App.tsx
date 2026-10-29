import { useEffect, useRef, useState } from 'react';
import { initWizardChess } from './wizardChessEngine.js';

interface WizardChessWindowAPI {
  toggleUI?: (force?: boolean) => void;
}

export default function App() {
  const initializedRef = useRef(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const getApi = (): WizardChessWindowAPI | undefined =>
    (window as unknown as { wizardChess?: WizardChessWindowAPI }).wizardChess;

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    initWizardChess();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileSheetOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileSheetOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRestoreUI = () => {
    const api = getApi();
    if (api?.toggleUI) {
      api.toggleUI(false);
    } else {
      document.body.classList.remove('cinematic-ui-hidden');
      const btnHide = document.getElementById('btn-hide-ui');
      if (btnHide) btnHide.textContent = 'Hide UI [H]';
    }
  };

  return (
    <>
      <div id="loading-overlay">
        <div className="loader-title">Wizard Chess</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" id="loader-bar"></div>
        </div>
        <div id="loader-text">Summoning Sanctum Architecture &amp; Sculpted Pieces...</div>
      </div>

      <div id="canvas-container"></div>

      <button
        type="button"
        className="hud-btn mobile-only-restore-ui"
        id="btn-mobile-show-ui"
        onClick={handleRestoreUI}
        title="Show HUD Controls"
      >
        Show UI
      </button>

      <div id="hud-top">
        <div className="hud-group" id="hud-left">
          <div className="brand-pill">
            <span className="brand-title">Wizard Chess</span>
          </div>
          <div className="status-pill" id="status-pill">
            <span className="turn-dot" id="turn-dot"></span>
            <span id="turn-text">White to Move</span>
            <span className="mode-badge" id="mode-badge">Vs IA • Escudero</span>
          </div>
          <div className="room-pill hidden" id="room-pill" title="Click para copiar enlace de invitación">
            <span>Sala:</span>
            <span className="room-code-badge" id="hud-room-code">----</span>
            <span className="room-sync-dot" id="hud-room-status">En Vivo</span>
          </div>
        </div>

        <button
          type="button"
          className={`hud-btn mobile-controls-trigger ${mobileSheetOpen ? 'active' : ''}`}
          id="btn-mobile-controls"
          aria-expanded={mobileSheetOpen}
          aria-controls="hud-right"
          onClick={() => setMobileSheetOpen((prev) => !prev)}
        >
          {mobileSheetOpen ? 'Close' : 'Controls'}
        </button>

        <div
          className={`mobile-sheet-backdrop ${mobileSheetOpen ? 'open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setMobileSheetOpen(false);
          }}
          aria-hidden="true"
        ></div>

        <div
          className={`hud-group ${mobileSheetOpen ? 'mobile-sheet-open' : ''}`}
          id="hud-right"
        >
          <div
            className="mobile-sheet-handle-wrap"
            onClick={(e) => {
              e.stopPropagation();
              setMobileSheetOpen(false);
            }}
            aria-hidden="true"
          >
            <div className="mobile-sheet-handle"></div>
          </div>

          <div className="mobile-sheet-header">
            <span className="mobile-sheet-title">Controls &amp; Modes</span>
            <button
              type="button"
              className="mobile-sheet-close"
              id="btn-mobile-sheet-close"
              onClick={(e) => {
                e.stopPropagation();
                setMobileSheetOpen(false);
              }}
              aria-label="Close Controls"
            >
              Close ✕
            </button>
          </div>

          <div className="mobile-sheet-section-label">Game Modes &amp; Learning</div>

          <button
            className="hud-btn primary"
            id="btn-lobby"
            title="Abrir Modos de Juego, Multijugador y Guía para Aprender"
            onClick={() => setMobileSheetOpen(false)}
          >
            ⚔ Modos / Sala
          </button>
          <button
            className="hud-btn"
            id="btn-difficulty"
            title="Cambiar nivel de dificultad de la IA (Aprendiz, Escudero, Caballero, Gran Maestro)"
            onClick={() => setMobileSheetOpen(false)}
          >
            IA: Escudero ★★☆☆
          </button>
          <button
            className="hud-btn coach-action-btn"
            id="btn-hint"
            title="Pedir una pista visual sobre qué pieza mover y por qué"
            onClick={() => setMobileSheetOpen(false)}
          >
            💡 Pista
          </button>
          <button
            className="hud-btn"
            id="btn-undo"
            title="Deshacer la última jugada para practicar sin miedo"
            onClick={() => setMobileSheetOpen(false)}
          >
            ↩ Deshacer
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">Match Actions</div>

          <button
            className="hud-btn"
            id="btn-side-toggle"
            title="Cambiar bando (Blancas / Negras) o Auto-Giro en modo 2 Jugadores"
            onClick={() => setMobileSheetOpen(false)}
          >
            Play as Black
          </button>
          <button
            className="hud-btn"
            id="btn-ai-move"
            title="Dejar que la IA haga el siguiente movimiento inmediatamente"
            onClick={() => setMobileSheetOpen(false)}
          >
            AI Move
          </button>
          <button
            className="hud-btn"
            id="btn-reset"
            title="Reiniciar partida en el altar"
            onClick={() => setMobileSheetOpen(false)}
          >
            New Game
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">
            <span>Camera Views</span>
            <span className="mobile-sheet-section-sub">Tap active view to flip</span>
          </div>

          <button
            className="hud-btn active"
            id="btn-cam-player"
            title="Player Camera (Click again to flip White / Black view)"
          >
            Player Cam
          </button>
          <button
            className="hud-btn"
            id="btn-cam-top"
            title="Overhead Board View (Click again to flip White / Black orientation)"
          >
            Overhead
          </button>
          <button
            className="hud-btn"
            id="btn-cam-side"
            title="Side Profile View (Click again to switch East / West side)"
          >
            Side
          </button>
          <button
            className="hud-btn"
            id="btn-cam-wide"
            title="Wide Cathedral View (Click again to switch North Rose / South Narthex)"
          >
            Cathedral
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">Display &amp; Gestures</div>

          <button
            className="hud-btn"
            id="btn-hide-ui"
            title="Toggle HUD visibility (Shortcut: H)"
            onClick={() => setMobileSheetOpen(false)}
          >
            Hide UI [H]
          </button>

          <div className="mobile-sheet-hint">
            <strong>Touch:</strong> Tap Piece to Move &nbsp;•&nbsp; 1-Finger Drag: Orbit &nbsp;•&nbsp; 2-Finger Drag: Pan &nbsp;•&nbsp; Pinch: Zoom
          </div>
        </div>
      </div>

      {/* Interactive Chess Coach & Piece Guide Banner */}
      <div className="coach-banner hidden" id="coach-banner" role="status" aria-live="polite">
        <div className="coach-banner-content" id="coach-banner-text">
          Selecciona cualquier pieza para ver cómo se mueve o pulsa 💡 Pista para recibir un consejo.
        </div>
        <button
          type="button"
          className="coach-banner-close"
          id="btn-coach-close"
          aria-label="Cerrar guía"
          title="Ocultar consejo"
        >
          ✕
        </button>
      </div>

      <div id="hud-bottom">
        <div className="hint-pill" id="controls-hint">
          <strong>Controles:</strong> Click Pieza: Mover &nbsp;•&nbsp; 💡 Pista: Sugerencia &nbsp;•&nbsp; Click-Izq: Orbitar &nbsp;•&nbsp; Click-Der: Paneo &nbsp;•&nbsp; Rueda: Zoom &nbsp;•&nbsp; H: Ocultar UI
        </div>
        <div className="captured-pill" id="captured-tray"></div>
      </div>

      <div id="checkmate-overlay" role="status" aria-live="polite">
        <div className="checkmate-banner">
          <div className="checkmate-ornament">✦ &nbsp; Sanctum Judgment &nbsp; ✦</div>
          <div className="checkmate-crown" id="checkmate-crown">♔</div>
          <div className="checkmate-title" id="checkmate-title">Checkmate</div>
          <div className="checkmate-rule"></div>
          <div className="checkmate-subtitle" id="checkmate-subtitle">
            White Triumphs • The Black King Has Fallen
          </div>
          <div className="checkmate-actions">
            <button className="checkmate-btn" id="btn-checkmate-stepback">
              ↩ Deshacer Jugada
            </button>
            <button className="checkmate-btn" id="btn-checkmate-replay">
              Replay King Fall
            </button>
            <button className="checkmate-btn" id="btn-checkmate-newgame">
              New Game
            </button>
            <button className="checkmate-btn secondary" id="btn-checkmate-dismiss">
              Dismiss
            </button>
          </div>
        </div>
      </div>

      {/* Modes, Multiplayer & Chess Academy Modal */}
      <div id="lobby-modal" role="dialog" aria-modal="true" aria-labelledby="lobby-modal-title">
        <div className="modal-card">
          <div className="modal-header">
            <div>
              <div className="modal-title" id="lobby-modal-title">Sanctum Chess • Modos y Academia</div>
              <div className="modal-subtitle">1 Jugador con Niveles de IA, 2 Jugadores en Pareja, Salas Online P2P y Guía de Ajedrez</div>
            </div>
            <button type="button" className="modal-close" id="btn-close-lobby" aria-label="Cerrar">
              ✕
            </button>
          </div>

          <div className="modal-tabs">
            <button type="button" className="modal-tab active" id="tab-single">
              🤖 1 Jugador (IA)
            </button>
            <button type="button" className="modal-tab" id="tab-pass">
              💑 2J Mismo Equipo
            </button>
            <button type="button" className="modal-tab" id="tab-multi">
              🌐 Sala Online
            </button>
            <button type="button" className="modal-tab" id="tab-guide">
              📖 Aprender Ajedrez
            </button>
          </div>

          {/* TAB 1: SINGLE PLAYER VS AI WITH DIFFICULTY & LEARNING */}
          <div id="panel-single">
            <div className="form-group">
              <label className="form-label">Elige tu Bando en el Altar</label>
              <div className="side-picker">
                <div className="side-option selected" id="pick-sp-white">
                  <strong>♔ Piezas Blancas</strong>
                  <span>Mueves primero (Alabastro)</span>
                </div>
                <div className="side-option" id="pick-sp-black">
                  <strong>♚ Piezas Negras</strong>
                  <span>La IA abre la partida (Obsidiana)</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Nivel de Dificultad del Guardián IA</label>
              <div className="diff-grid">
                <button type="button" className="diff-card" id="diff-beginner">
                  <div className="diff-stars">★☆☆☆</div>
                  <div className="diff-name">Aprendiz</div>
                  <div className="diff-tag">Ideal para empezar a jugar</div>
                </button>
                <button type="button" className="diff-card selected" id="diff-casual">
                  <div className="diff-stars">★★☆☆</div>
                  <div className="diff-name">Escudero</div>
                  <div className="diff-tag">Partida relajada y equilibrada</div>
                </button>
                <button type="button" className="diff-card" id="diff-tactical">
                  <div className="diff-stars">★★★☆</div>
                  <div className="diff-name">Caballero</div>
                  <div className="diff-tag">Táctico, protege y ataca bien</div>
                </button>
                <button type="button" className="diff-card" id="diff-master">
                  <div className="diff-stars">★★★★</div>
                  <div className="diff-name">Gran Maestro</div>
                  <div className="diff-tag">Calcula jugadas por adelantado</div>
                </button>
              </div>
              <div className="diff-desc-box" id="sp-difficulty-desc">
                Juega de forma natural y equilibrada, ideal para partidas relajadas.
              </div>
            </div>

            <label className="coach-toggle-row" htmlFor="chk-learning-guide">
              <input type="checkbox" id="chk-learning-guide" defaultChecked />
              <div>
                <strong>Activar Guía de Aprendizaje interactiva</strong>
                <span>Muestra cómo se mueve cada pieza al tocarla y explica las pistas paso a paso.</span>
              </div>
            </label>

            <button type="button" className="modal-action-btn" id="btn-start-single">
              Iniciar Partida vs IA
            </button>
          </div>

          {/* TAB 2: 2 PLAYERS LOCAL PASS & PLAY (COUPLE MODE) */}
          <div id="panel-pass" style={{ display: 'none' }}>
            <div className="mode-info-box">
              <div className="mode-info-title">💑 Modo 2 Jugadores en el Mismo Dispositivo</div>
              <p>
                Perfecto para jugar juntos uno al lado del otro en la misma PC, tablet o celular. Ambos bandos son controlados por ustedes y pueden usar el botón <strong>💡 Pista</strong> o <strong>↩ Deshacer</strong> en cualquier momento para aprender mientras juegan.
              </p>
            </div>

            <label className="coach-toggle-row" htmlFor="chk-pass-autoflip">
              <input type="checkbox" id="chk-pass-autoflip" defaultChecked />
              <div>
                <strong>Girar cámara automáticamente en cada turno</strong>
                <span>La cámara rota suavemente hacia quien le toca mover (Blancas o Negras).</span>
              </div>
            </label>

            <button type="button" className="modal-action-btn" id="btn-start-pass">
              Jugar 2 Jugadores (Mismo Dispositivo)
            </button>
          </div>

          {/* TAB 3: ONLINE MULTIPLAYER ROOM (P2P + CROSS-TAB) */}
          <div id="panel-multi" style={{ display: 'none' }}>
            <div className="form-group">
              <label className="form-label">Crear una Nueva Sala Online (Tu Color de Anfitrión)</label>
              <div className="side-picker">
                <div className="side-option selected" id="pick-mp-white">
                  <strong>♔ Anfitrión Blancas</strong>
                  <span>Tu pareja jugará con Negras</span>
                </div>
                <div className="side-option" id="pick-mp-black">
                  <strong>♚ Anfitrión Negras</strong>
                  <span>Tu pareja jugará con Blancas</span>
                </div>
              </div>
              <button type="button" className="modal-action-btn" id="btn-create-room" style={{ marginTop: '10px' }}>
                Crear Sala y Generar Código
              </button>

              <div className="room-code-box" id="room-created-panel" style={{ display: 'none' }}>
                <div className="room-code-hint">
                  Comparte este código o enlace con tu novia para que entre desde su celular o PC:
                </div>
                <div className="room-code-display" id="modal-room-code">----</div>
                <div className="room-share-actions">
                  <button type="button" className="hud-btn" id="btn-copy-code">
                    Copiar Código
                  </button>
                  <button type="button" className="hud-btn primary" id="btn-copy-link">
                    Copiar Link de Invitación
                  </button>
                  <button type="button" className="hud-btn" id="btn-enter-created-room">
                    Entrar al Tablero
                  </button>
                </div>
              </div>
            </div>

            <div className="or-divider">O ÚNETE A UNA SALA EXISTENTE</div>

            <div className="form-group">
              <label className="form-label">Ingresa el Código de 4 Letras</label>
              <div className="join-row">
                <input
                  type="text"
                  className="room-input"
                  id="input-room-code"
                  maxLength={4}
                  placeholder="ABCD"
                />
                <button
                  type="button"
                  className="modal-action-btn"
                  id="btn-join-room"
                  style={{ marginTop: 0, width: 'auto', padding: '0 22px' }}
                >
                  Unirse a Sala
                </button>
              </div>
              <div id="mp-status-msg" className="mp-status-msg">
                Conecta dos dispositivos distintos por internet (P2P WebRTC) o dos pestañas del navegador en tiempo real.
              </div>
            </div>
          </div>

          {/* TAB 4: INTERACTIVE CHESS LEARNING GUIDE */}
          <div id="panel-guide" style={{ display: 'none' }}>
            <div className="guide-intro">
              <strong>Guía Rápida para Aprender Ajedrez:</strong> En el tablero 3D, los anillos <span className="guide-badge-blue">Azules</span> indican a dónde puede caminar tu pieza, y los anillos <span className="guide-badge-red">Rojos</span> indican qué piezas rivales puedes capturar.
            </div>
            <div className="guide-grid">
              <div className="guide-piece-card">
                <div className="guide-piece-icon">♙</div>
                <div>
                  <div className="guide-piece-title">Peón (1 pto)</div>
                  <div className="guide-piece-desc">Avanza 1 casilla hacia adelante (o 2 en su primer turno). Captura en diagonal. Al llegar al final se convierte en Reina.</div>
                </div>
              </div>
              <div className="guide-piece-card">
                <div className="guide-piece-icon">♘</div>
                <div>
                  <div className="guide-piece-title">Caballo (3 ptos)</div>
                  <div className="guide-piece-desc">Salta en forma de &ldquo;L&rdquo; (2 casillas en una dirección y 1 al costado). Es la única pieza que salta sobre otras.</div>
                </div>
              </div>
              <div className="guide-piece-card">
                <div className="guide-piece-icon">♗</div>
                <div>
                  <div className="guide-piece-title">Alfil (3 ptos)</div>
                  <div className="guide-piece-desc">Se desliza en diagonal tantas casillas libres como quiera, siempre por su mismo color.</div>
                </div>
              </div>
              <div className="guide-piece-card">
                <div className="guide-piece-icon">♖</div>
                <div>
                  <div className="guide-piece-title">Torre (5 ptos)</div>
                  <div className="guide-piece-desc">Avanza en línea recta horizontal o verticalmente. También participa en el Enroque con el Rey.</div>
                </div>
              </div>
              <div className="guide-piece-card">
                <div className="guide-piece-icon">♕</div>
                <div>
                  <div className="guide-piece-title">Reina / Dama (9 ptos)</div>
                  <div className="guide-piece-desc">La pieza más poderosa: combina el movimiento recto de la Torre y el diagonal del Alfil.</div>
                </div>
              </div>
              <div className="guide-piece-card">
                <div className="guide-piece-icon">♔</div>
                <div>
                  <div className="guide-piece-title">Rey (Invaluable)</div>
                  <div className="guide-piece-desc">Se mueve 1 casilla en cualquier dirección. Si está amenazado es Jaque; si no tiene escape es Jaque Mate.</div>
                </div>
              </div>
            </div>
            <div className="guide-tips-footer">
              💡 <strong>Consejo para jugar juntos:</strong> Durante la partida puedes pulsar el botón <strong>💡 Pista</strong> arriba a la derecha para que el juego ilumine en verde turquesa la mejor jugada recomendada y te explique por qué.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


