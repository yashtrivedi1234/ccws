import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete = () => {} }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [done, setDone] = useState(false);
  const [lines, setLines] = useState<{ x: number; y: number; w: number; h: number; opacity: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 800);
          setTimeout(() => onComplete(), 1400);
          return 100;
        }
        return Math.min(prev + Math.random() * 3 + 0.5, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150 + Math.random() * 200);
    };
    const id = setInterval(trigger, 1400 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setLines(
        Array.from({ length: 5 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          w: 10 + Math.random() * 40,
          h: 0.5 + Math.random() * 2,
          opacity: 0.04 + Math.random() * 0.08,
        }))
      );
    }, 90);
    return () => clearInterval(id);
  }, []);

  const segments = 20;
  const filled = Math.floor((progress / 100) * segments);
  const displayNum = Math.floor(progress).toString().padStart(3, '0');
  const BRAND = 'rgb(12,86,112)';
  const BRAND_LIGHT = 'rgba(12,86,112,0.12)';
  const BRAND_MID = 'rgba(12,86,112,0.35)';

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: '#ffffff',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: '"Courier New", Courier, monospace',
          }}
        >
          {/* Dot grid background */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `radial-gradient(circle, ${BRAND} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.08,
          }} />

          {/* Scanlines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(12,86,112,0.025) 0px, rgba(12,86,112,0.025) 1px, transparent 1px, transparent 4px)',
          }} />

          {/* Noise lines */}
          {lines.map((l, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${l.x}%`, top: `${l.y}%`,
              width: `${l.w}%`, height: `${l.h}px`,
              background: BRAND,
              opacity: l.opacity,
              pointerEvents: 'none', zIndex: 3,
            }} />
          ))}

          {/* Corner labels */}
          {['CC', 'v2.0', '2025', 'INIT'].map((text, i) => (
            <div key={i} style={{
              position: 'absolute',
              ...[{ top: 28, left: 32 }, { top: 28, right: 32 }, { bottom: 28, left: 32 }, { bottom: 28, right: 32 }][i],
              fontSize: 10, letterSpacing: '0.3em',
              color: BRAND, opacity: 0.4, fontWeight: 700,
            }}>{text}</div>
          ))}

          {/* Corner brackets */}
          {[
            { top: 20, left: 20, rotate: 0 },
            { top: 20, right: 20, rotate: 90 },
            { bottom: 20, right: 20, rotate: 180 },
            { bottom: 20, left: 20, rotate: 270 },
          ].map((pos, i) => (
            <motion.div key={i} style={{ position: 'absolute', ...pos, width: 24, height: 24 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <svg viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${pos.rotate}deg)`, width: 24, height: 24 }}>
                <path d="M0 24 L0 0 L24 0" stroke={BRAND} strokeWidth="2" opacity="0.5" />
              </svg>
            </motion.div>
          ))}

          {/* Main content */}
          <motion.div
            style={{ position: 'relative', zIndex: 12, textAlign: 'left', width: 480, maxWidth: '90vw' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top label row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.4em', color: BRAND, opacity: 0.6, textTransform: 'uppercase' }}>SYS.BOOT</span>
              <span style={{ fontSize: 10, letterSpacing: '0.2em', color: BRAND, opacity: 0.5 }}>
                {Array.from({ length: filled }, () => '■').join('')}
                {Array.from({ length: segments - filled }, () => '□').join('')}
              </span>
            </div>

            {/* Giant glitchy number */}
            <div style={{ position: 'relative', lineHeight: 1, marginBottom: 20 }}>
              <motion.div
                animate={glitch ? { x: [0, -5, 4, -2, 0], skewX: [0, -3, 2, 0] } : { x: 0, skewX: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontSize: 'clamp(90px, 20vw, 160px)',
                  fontWeight: 900,
                  color: BRAND,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                  lineHeight: 1,
                }}
              >
                {displayNum}
              </motion.div>

              {/* Glitch splits — brand tint + white */}
              {glitch && (
                <>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    fontSize: 'clamp(90px, 20vw, 160px)', fontWeight: 900,
                    color: 'rgba(12,86,112,0.5)', letterSpacing: '-0.04em', lineHeight: 1,
                    transform: 'translate(5px, -3px)',
                    userSelect: 'none', pointerEvents: 'none',
                  }}>{displayNum}</div>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    fontSize: 'clamp(90px, 20vw, 160px)', fontWeight: 900,
                    color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.04em', lineHeight: 1,
                    transform: 'translate(-5px, 3px)',
                    userSelect: 'none', pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                  }}>{displayNum}</div>
                </>
              )}

              <span style={{
                fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700,
                color: BRAND, opacity: 0.5,
                position: 'absolute', right: -4, bottom: 14,
              }}>%</span>
            </div>

            {/* Segmented bar */}
            <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
              {Array.from({ length: segments }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    background: i < filled
                      ? (i === filled - 1 ? '#ffffff' : BRAND)
                      : BRAND_LIGHT,
                    scaleY: i < filled ? 1 : 0.55,
                    boxShadow: i === filled - 1 ? `0 0 10px ${BRAND}` : 'none',
                  }}
                  transition={{ duration: 0.15 }}
                  style={{ flex: 1, height: 18, transformOrigin: 'bottom', border: `1px solid ${BRAND_MID}` }}
                />
              ))}
            </div>

            {/* Title + status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div style={{
                  fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 900,
                  color: BRAND, letterSpacing: '0.1em',
                  textTransform: 'uppercase', lineHeight: 1.1,
                }}>
                  CODE<br />
                  <span style={{
                    color: 'transparent',
                    WebkitTextStroke: `2px ${BRAND}`,
                  }}>CRAFTER</span>
                </div>
              </motion.div>

              <div style={{ textAlign: 'right' }}>
                {[
                  { label: 'MODULES', threshold: 30 },
                  { label: 'ASSETS', threshold: 55 },
                  { label: 'RUNTIME', threshold: 80 },
                  { label: 'READY', threshold: 100 },
                ].map(({ label, threshold }) => {
                  const active = progress >= threshold;
                  return (
                    <div key={label} style={{
                      fontSize: 9, letterSpacing: '0.35em',
                      color: active ? BRAND : BRAND_MID,
                      fontWeight: active ? 700 : 400,
                      lineHeight: 1.9,
                      transition: 'color 0.3s ease',
                    }}>
                      {active ? '▶' : '·'} {label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom rules */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 2, background: BRAND, marginTop: 20, transformOrigin: 'left', opacity: 0.25 }}
            />
            <motion.div
              animate={{ scaleX: progress / 100 }}
              style={{ height: 2, background: BRAND, marginTop: 3, transformOrigin: 'left' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;