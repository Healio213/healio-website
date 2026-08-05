import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';

const VALID_VARIANTS = new Set(['ambulant', 'zahn', 'stationaer']);
const END_HOLD_MS = 4000;

const outcomeIconPosition = {
  ambulant: '0%',
  zahn: '50%',
  stationaer: '100%',
};

// Gemessen am Dreamina-Film: Sie läuft von links nach rechts, steht ab etwa
// 5,7 s auf dem Podest und hebt ab etwa 7,7 s die Faust. Das Jubelbild bleibt
// danach bis zum Neustart bei knapp 10 s sichtbar.
const rewardParticles = [
  { x: '-74px', y: '-64px', tone: 'gold', shape: 'star' },
  { x: '-30px', y: '-98px', tone: 'mint', shape: 'dot' },
  { x: '24px', y: '-104px', tone: 'gold', shape: 'star' },
  { x: '76px', y: '-68px', tone: 'violet', shape: 'bar' },
  { x: '92px', y: '-12px', tone: 'gold', shape: 'dot' },
  { x: '64px', y: '34px', tone: 'mint', shape: 'star' },
  { x: '-64px', y: '28px', tone: 'violet', shape: 'bar' },
  { x: '-96px', y: '-14px', tone: 'gold', shape: 'dot' },
];

/**
 * Der Gang ueber die Bruecke laeuft als kurzer Film. Die Textkarten liegen als
 * echtes HTML darueber, damit sie uebersetzbar bleiben, je Tarif wechseln und
 * von Suchmaschinen gelesen werden koennen.
 */
const IkkSwitch3DScene = ({ variant = 'ambulant' }) => {
  const { t } = useTranslation('ambulant');
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const lastVideoTimeRef = useRef(0);
  const restartTimerRef = useRef(null);
  const isInViewRef = useRef(false);
  // Jeder Neustart des Films zaehlt hoch und setzt damit die Einblendungen
  // der Karten zurueck, weil React die Ebene neu aufbaut.
  const [runKey, setRunKey] = useState(0);
  const [staticView, setStaticView] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const activeVariant = VALID_VARIANTS.has(variant) ? variant : 'ambulant';
  const variantKey = `ikkWechsel.threeD.variants.${activeVariant}`;

  useEffect(() => {
    const scene = sceneRef.current;
    const video = videoRef.current;
    if (!scene || !video) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStaticView(true);
      setIsInView(true);
      return undefined;
    }

    // Film und HTML-Einblendungen pausieren gemeinsam ausserhalb des
    // sichtbaren Bereichs. Beim nativen Video-Loop wird die Overlay-Ebene neu
    // aufgebaut, damit Karten und Belohnung in jedem Durchlauf synchron sind.
    const play = () => {
      const started = video.play();
      if (started && typeof started.catch === 'function') started.catch(() => {});
    };

    const clearRestartTimer = () => {
      if (restartTimerRef.current) {
        window.clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
      }
    };

    const onPlay = () => {
      if (video.currentTime < 0.25) setRunKey((n) => n + 1);
    };

    const onTimeUpdate = () => {
      const currentTime = video.currentTime;
      if (currentTime + 1 < lastVideoTimeRef.current) {
        setRunKey((n) => n + 1);
      }
      lastVideoTimeRef.current = currentTime;
    };

    // Am Ziel bleibt das Erfolgsbild bewusst stehen. Erst nach vier Sekunden
    // beginnt der nächste Durchlauf – die Belohnungsanimation läuft während
    // dieser Pause weiter und bekommt dadurch einen echten Abschluss.
    const onEnded = () => {
      clearRestartTimer();
      restartTimerRef.current = window.setTimeout(() => {
        lastVideoTimeRef.current = 0;
        video.currentTime = 0;
        if (isInViewRef.current) play();
      }, END_HOLD_MS);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !video.ended) play();
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(scene);

    const rect = scene.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) play();

    return () => {
      clearRestartTimer();
      observer.disconnect();
      video.removeEventListener('play', onPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <figure
      ref={sceneRef}
      data-variant={activeVariant}
      className="ikk-clay-journey"
      role="img"
      aria-label={t(`${variantKey}.ariaLabel`)}
    >
      <video
        ref={videoRef}
        className="ikk-clay-journey__film"
        poster={staticView ? '/videos/ikk-bridge-walk-poster.jpg?v=dreamina-1' : '/videos/ikk-bridge-walk-start-poster.jpg?v=dreamina-1'}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/videos/ikk-bridge-walk.webm?v=dreamina-1" type="video/webm" />
        <source src="/videos/ikk-bridge-walk.mp4?v=dreamina-1" type="video/mp4" />
      </video>

      <div
        key={runKey}
        className={`ikk-clay-journey__overlay ${staticView ? 'is-static' : ''} ${isInView ? '' : 'is-paused'}`}
      >
        <div className="ikk-clay-journey__fund ikk-clay-journey__fund--source">
          <small>{t('ikkWechsel.threeD.sourceKicker')}</small>
          <strong>{t('ikkWechsel.threeD.sourceFund')}</strong>
        </div>

        <div className="ikk-clay-journey__outcome">
          <div
            className="ikk-clay-journey__outcome-icon"
            style={{ backgroundPositionX: outcomeIconPosition[activeVariant] }}
            aria-hidden="true"
          />
          <div className="ikk-clay-journey__outcome-copy">
            <small>{t('ikkWechsel.threeD.flowLabel')}</small>
            <strong>{t(`${variantKey}.product`)}</strong>
            <span>{t(`${variantKey}.resultValue`)}</span>
            <p>{t(`${variantKey}.resultLabel`)}</p>
          </div>
        </div>

        {/* Belohnung im Moment der Ankunft */}
        <div className="ikk-clay-journey__reward" aria-hidden="true">
          <span className="ikk-clay-journey__reward-halo" />
          <span className="ikk-clay-journey__reward-ring" />
          {rewardParticles.map((p, index) => (
            <span
              key={`${p.x}-${p.y}`}
              className={`ikk-clay-journey__particle is-${p.tone} is-${p.shape}`}
              style={{ '--i': index, '--bx': p.x, '--by': p.y }}
            />
          ))}
        </div>

        <div className="ikk-clay-journey__fund ikk-clay-journey__fund--destination">
          <small>{t('ikkWechsel.threeD.destinationKicker')}</small>
          <strong>{t('ikkWechsel.threeD.destinationFund')}</strong>
          <span>{t('ikkWechsel.threeD.bonusValue')} {t('ikkWechsel.threeD.bonusLabel')}</span>
        </div>

        <div className="ikk-clay-journey__continuity">
          <span className="ikk-clay-journey__continuity-icon" aria-hidden="true">
            <ShieldCheck />
          </span>
          <span>
            <strong>{t('ikkWechsel.threeD.continuity')}</strong>
            <small>{t('ikkWechsel.threeD.continuitySub')}</small>
          </span>
        </div>
      </div>

      <style>{`
        .ikk-clay-journey {
          position: relative;
          isolation: isolate;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border: 1px solid rgba(204, 195, 229, 0.82);
          border-radius: 2rem;
          background: #fffcf5;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 24px 60px rgba(69, 53, 108, .12);
          color: #211a3e;
        }

        .ikk-clay-journey__film {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* --- Karten ------------------------------------------------------ */

        /* Die Ebene wird bei jedem Filmstart neu aufgebaut, dadurch laufen die
           Einblendungen synchron zum Film:
             0,4 s  Start-Karte
             1,0 s  Ergebniskarte, sie ist daran vorbei
             4,4 s  Hinweiskarte, sie ist daran vorbei
             5,7 s  IKK-Karte am Ziel
             7,7 s  Belohnung, die Faust geht hoch                           */
        .ikk-clay-journey__overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
        }

        .ikk-clay-journey__overlay.is-paused .ikk-clay-journey__fund,
        .ikk-clay-journey__overlay.is-paused .ikk-clay-journey__outcome,
        .ikk-clay-journey__overlay.is-paused .ikk-clay-journey__continuity,
        .ikk-clay-journey__overlay.is-paused .ikk-clay-journey__reward-halo,
        .ikk-clay-journey__overlay.is-paused .ikk-clay-journey__reward-ring,
        .ikk-clay-journey__overlay.is-paused .ikk-clay-journey__particle {
          animation-play-state: paused;
        }

        .ikk-clay-journey__overlay.is-static .ikk-clay-journey__fund,
        .ikk-clay-journey__overlay.is-static .ikk-clay-journey__outcome,
        .ikk-clay-journey__overlay.is-static .ikk-clay-journey__continuity {
          opacity: 1;
          animation: none;
        }

        .ikk-clay-journey__overlay.is-static .ikk-clay-journey__reward {
          display: none;
        }

        @keyframes ikk-card-in {
          from { opacity: 0; transform: translateY(10px) scale(.96); }
          to   { opacity: 1; transform: none; }
        }

        @keyframes ikk-fund-glow {
          0%   { box-shadow: 0 14px 34px rgba(69,53,108,.14); }
          35%  { box-shadow: 0 0 0 7px rgba(247,210,102,.34), 0 18px 42px rgba(91,151,113,.3); }
          100% { box-shadow: 0 14px 34px rgba(69,53,108,.14); }
        }

        .ikk-clay-journey__continuity {
          position: absolute;
          /* Freies Feld zwischen Ergebniskarte (endet bei 37 %) und der
             erhobenen Faust der Figur (ab etwa 71 %). */
          z-index: 3;
          top: 5%;
          left: 39.5%;
          display: flex;
          align-items: center;
          gap: .55rem;
          width: 30%;
          padding: .62rem .9rem;
          border: 1px solid rgba(255,255,255,.94);
          border-radius: 1.1rem;
          background: rgba(255,255,255,.86);
          box-shadow: 0 12px 30px rgba(69,53,108,.12);
          backdrop-filter: blur(12px);
          opacity: 0;
          animation: ikk-card-in .55s cubic-bezier(.16,1,.3,1) 4.4s forwards;
        }

        .ikk-clay-journey__continuity-icon {
          display: grid;
          flex: 0 0 auto;
          width: 2.25rem;
          height: 2.25rem;
          place-items: center;
          border-radius: .8rem;
          color: #3d8f69;
          background: linear-gradient(145deg, #dff4e8, #a9d7bd);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 6px 12px rgba(61,143,105,.18);
        }

        .ikk-clay-journey__continuity-icon svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        .ikk-clay-journey__continuity strong,
        .ikk-clay-journey__continuity small {
          display: block;
          line-height: 1.15;
        }

        .ikk-clay-journey__continuity strong {
          font-size: clamp(.72rem, 1.25vw, .9rem);
          font-weight: 900;
        }

        .ikk-clay-journey__continuity small {
          margin-top: .18rem;
          color: #6d6883;
          font-size: clamp(.58rem, .95vw, .7rem);
          font-weight: 700;
        }

        .ikk-clay-journey__fund {
          position: absolute;
          z-index: 3;
          bottom: 4.5%;
          min-width: 17%;
          padding: .65rem .85rem;
          border: 1px solid rgba(255,255,255,.96);
          border-radius: 1rem;
          background: rgba(255,255,255,.86);
          box-shadow: 0 14px 34px rgba(69,53,108,.14);
          backdrop-filter: blur(10px);
        }

        .ikk-clay-journey__fund--source {
          left: 3.5%;
          text-align: left;
          opacity: 0;
          animation: ikk-card-in .55s cubic-bezier(.16,1,.3,1) .4s forwards;
        }

        .ikk-clay-journey__fund--destination {
          right: 3.5%;
          text-align: right;
          opacity: 0;
          animation:
            ikk-card-in .55s cubic-bezier(.16,1,.3,1) 5.65s forwards,
            ikk-fund-glow 1.95s ease-out 8.02s 3;
        }

        .ikk-clay-journey__fund small,
        .ikk-clay-journey__fund strong,
        .ikk-clay-journey__fund span {
          display: block;
          line-height: 1.15;
        }

        .ikk-clay-journey__fund small {
          color: #756d8d;
          font-size: clamp(.55rem, 1vw, .7rem);
          font-weight: 800;
          letter-spacing: .09em;
          text-transform: uppercase;
        }

        .ikk-clay-journey__fund strong {
          margin-top: .23rem;
          font-size: clamp(.78rem, 1.55vw, 1.05rem);
          font-weight: 900;
        }

        .ikk-clay-journey__fund span {
          margin-top: .28rem;
          color: #347a59;
          font-size: clamp(.62rem, 1.1vw, .78rem);
          font-weight: 900;
        }

        .ikk-clay-journey__outcome {
          position: absolute;
          z-index: 3;
          top: 6%;
          left: 3.5%;
          display: grid;
          width: min(34%, 340px);
          grid-template-columns: minmax(56px, 30%) 1fr;
          align-items: center;
          gap: .75rem;
          padding: .75rem .85rem;
          border: 1px solid rgba(255,255,255,.96);
          border-radius: 1.3rem;
          background: rgba(255,255,255,.9);
          box-shadow: 0 18px 44px rgba(69,53,108,.16);
          backdrop-filter: blur(14px);
          opacity: 0;
          animation: ikk-card-in .55s cubic-bezier(.16,1,.3,1) 2.6s forwards;
        }

        /* --- Belohnung bei der Ankunft ------------------------------------ */

        .ikk-clay-journey__reward {
          position: absolute;
          left: 78.5%;
          top: 18.5%;
          width: 1px;
          height: 1px;
          pointer-events: none;
        }

        .ikk-clay-journey__reward-halo,
        .ikk-clay-journey__reward-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          opacity: 0;
          transform: translate(-50%, -50%) scale(.45);
        }

        .ikk-clay-journey__reward-halo {
          width: clamp(96px, 15vw, 190px);
          aspect-ratio: 1;
          background: radial-gradient(circle, rgba(255,239,158,.8) 0 12%, rgba(188,230,207,.45) 34%, rgba(200,181,239,.2) 58%, transparent 72%);
          filter: blur(2px);
          mix-blend-mode: multiply;
          animation: ikk-reward-halo 1.95s cubic-bezier(.16,1,.3,1) 8.02s 3;
        }

        .ikk-clay-journey__reward-ring {
          width: clamp(74px, 11vw, 140px);
          aspect-ratio: 1;
          border: 5px solid rgba(246, 202, 87, .66);
          box-shadow: 0 0 0 8px rgba(183, 226, 202, .2), inset 0 0 18px rgba(255, 239, 158, .45);
          animation: ikk-reward-ring 1.95s cubic-bezier(.16,1,.3,1) 8.04s 3;
        }

        .ikk-clay-journey__particle {
          position: absolute;
          left: 0;
          top: 0;
          width: 11px;
          height: 11px;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0) rotate(0deg);
          animation: ikk-reward-burst 1.8s cubic-bezier(.16,1,.3,1) calc(8.08s + var(--i) * .055s) 3;
        }

        .ikk-clay-journey__particle.is-dot {
          border-radius: 50%;
          box-shadow: inset 0 2px 2px rgba(255,255,255,.65), 0 5px 10px rgba(69,53,108,.15);
        }

        .ikk-clay-journey__particle.is-bar {
          width: 8px;
          height: 20px;
          border-radius: 999px;
          box-shadow: inset 0 2px 2px rgba(255,255,255,.55), 0 5px 10px rgba(69,53,108,.12);
        }

        .ikk-clay-journey__particle.is-star {
          width: 15px;
          height: 15px;
          clip-path: polygon(50% 0, 60% 38%, 100% 50%, 60% 62%, 50% 100%, 40% 62%, 0 50%, 40% 38%);
          filter: drop-shadow(0 4px 5px rgba(121, 82, 28, .14));
        }

        .ikk-clay-journey__particle.is-gold { background: linear-gradient(145deg, #fff2aa, #e7aa3d); }
        .ikk-clay-journey__particle.is-mint { background: linear-gradient(145deg, #dcf4e7, #68bd92); }
        .ikk-clay-journey__particle.is-violet { background: linear-gradient(145deg, #eee4ff, #a684dc); }

        @keyframes ikk-reward-halo {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(.42); }
          18%  { opacity: .85; transform: translate(-50%, -50%) scale(.85); }
          42%  { opacity: .5;  transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: .28; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes ikk-reward-ring {
          0%   { opacity: 0;   transform: translate(-50%, -50%) scale(.38); }
          30%  { opacity: .85; transform: translate(-50%, -50%) scale(.75); }
          100% { opacity: 0;   transform: translate(-50%, -50%) scale(1.5); }
        }

        @keyframes ikk-reward-burst {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(0deg); }
          14%  { opacity: 1; transform: translate(-50%, -50%) scale(.45) rotate(0deg); }
          62%  { opacity: 1; transform: translate(var(--bx), var(--by)) scale(1) rotate(115deg); }
          100% { opacity: .34; transform: translate(var(--bx), var(--by)) scale(.76) rotate(190deg); }
        }

        .ikk-clay-journey__outcome-icon {
          width: 100%;
          aspect-ratio: 1;
          background-image: url('/images/ikk-switch/ikk-outcome-icons-v1.webp');
          background-repeat: no-repeat;
          background-size: 300% 100%;
          filter: drop-shadow(0 8px 10px rgba(69,53,108,.12));
        }

        .ikk-clay-journey__outcome-copy small,
        .ikk-clay-journey__outcome-copy strong,
        .ikk-clay-journey__outcome-copy span,
        .ikk-clay-journey__outcome-copy p {
          display: block;
          margin: 0;
          line-height: 1.18;
        }

        .ikk-clay-journey__outcome-copy {
          min-width: 0;
        }

        .ikk-clay-journey__outcome-copy strong,
        .ikk-clay-journey__outcome-copy span,
        .ikk-clay-journey__outcome-copy p {
          overflow-wrap: anywhere;
          hyphens: auto;
        }

        .ikk-clay-journey__outcome-copy small {
          color: #347a59;
          font-size: clamp(.52rem, .95vw, .66rem);
          font-weight: 900;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .ikk-clay-journey__outcome-copy strong {
          margin-top: .22rem;
          color: #211a3e;
          font-size: clamp(.72rem, 1.3vw, .95rem);
          font-weight: 900;
        }

        .ikk-clay-journey__outcome-copy span {
          margin-top: .33rem;
          color: #6d47a8;
          font-size: clamp(.82rem, 1.6vw, 1.2rem);
          font-weight: 950;
        }

        .ikk-clay-journey__outcome-copy p {
          margin-top: .2rem;
          color: #6b6680;
          font-size: clamp(.58rem, 1.05vw, .72rem);
          font-weight: 700;
        }

        /* --- Mobil ------------------------------------------------------- */

        @media (max-width: 639px) {
          .ikk-clay-journey {
            aspect-ratio: 4 / 5;
            border-radius: 1.55rem;
          }

          /* Der komplette 16:9-Film bleibt sichtbar. Die Textkarten nutzen die
             ruhigen Flaechen darueber und darunter, statt die Figur seitlich
             aus dem Film zu schneiden. */
          .ikk-clay-journey__film {
            inset: 27% 0 auto;
            height: 45%;
            object-fit: contain;
            object-position: center;
          }

          .ikk-clay-journey__continuity {
            top: 2.5%;
            right: auto;
            left: 4%;
            width: 92%;
            padding: .55rem .7rem;
          }

          .ikk-clay-journey__continuity-icon {
            width: 2rem;
            height: 2rem;
          }

          .ikk-clay-journey__fund {
            min-width: 40%;
            padding: .52rem .62rem;
            border-radius: .85rem;
          }

          .ikk-clay-journey__fund--source {
            top: 15%;
            bottom: auto;
            left: 4%;
            text-align: left;
          }

          .ikk-clay-journey__fund--destination {
            top: 15%;
            bottom: auto;
            right: 4%;
            text-align: right;
          }

          .ikk-clay-journey__outcome {
            top: auto;
            left: 4%;
            bottom: 3%;
            width: 92%;
            grid-template-columns: minmax(62px, 22%) 1fr;
            gap: .58rem;
            padding: .62rem .68rem;
            border-radius: 1.05rem;
          }

          .ikk-clay-journey__reward {
            left: 78.5%;
            top: 34.5%;
          }

          .ikk-clay-journey__reward-halo { width: 88px; }
          .ikk-clay-journey__reward-ring { width: 70px; }

          .ikk-clay-journey__particle {
            animation-name: ikk-reward-burst-mobile;
          }

          @keyframes ikk-reward-burst-mobile {
            0%   { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(0deg); }
            14%  { opacity: 1; transform: translate(-50%, -50%) scale(.4) rotate(0deg); }
            62%  { opacity: 1; transform: translate(calc(var(--bx) * .58), calc(var(--by) * .58)) scale(.84) rotate(110deg); }
            100% { opacity: .34; transform: translate(calc(var(--bx) * .58), calc(var(--by) * .58)) scale(.64) rotate(175deg); }
          }

          .ikk-clay-journey__outcome-copy small { font-size: .56rem; }
          .ikk-clay-journey__outcome-copy strong { font-size: .82rem; }
          .ikk-clay-journey__outcome-copy span { font-size: clamp(.9rem, 4vw, 1.05rem); }
          .ikk-clay-journey__outcome-copy p { font-size: .65rem; }
        }

        @media (max-width: 374px) {
          .ikk-clay-journey__film {
            inset: 34% 0 auto;
            height: 40%;
          }

          .ikk-clay-journey__continuity {
            top: 2%;
            left: 2%;
            width: 96%;
            gap: .38rem;
            padding: .4rem .48rem;
          }

          .ikk-clay-journey__continuity-icon {
            width: 1.65rem;
            height: 1.65rem;
          }

          .ikk-clay-journey__continuity-icon svg {
            width: 1rem;
            height: 1rem;
          }

          .ikk-clay-journey__continuity strong { font-size: .6rem; }
          .ikk-clay-journey__continuity small { font-size: .5rem; }

          .ikk-clay-journey__fund {
            top: 19%;
            min-width: 42%;
            max-width: 44%;
            padding: .4rem .44rem;
          }

          .ikk-clay-journey__fund--source { left: 2%; }
          .ikk-clay-journey__fund--destination {
            right: 2%;
            max-width: 46%;
          }
          .ikk-clay-journey__fund small {
            font-size: .42rem;
            letter-spacing: .04em;
          }
          .ikk-clay-journey__fund strong { font-size: .66rem; }
          .ikk-clay-journey__fund span { font-size: .48rem; }

          .ikk-clay-journey__outcome {
            left: 2%;
            bottom: 2%;
            width: 96%;
            grid-template-columns: minmax(42px, 19%) 1fr;
            gap: .38rem;
            padding: .48rem .52rem;
          }

          .ikk-clay-journey__outcome-copy small { font-size: .48rem; }
          .ikk-clay-journey__outcome-copy strong { font-size: .68rem; }
          .ikk-clay-journey__outcome-copy span { font-size: .78rem; }
          .ikk-clay-journey__outcome-copy p { font-size: .55rem; }

          .ikk-clay-journey__reward {
            left: 78.5%;
            top: 40.5%;
          }
        }
      `}</style>
    </figure>
  );
};

export default IkkSwitch3DScene;
