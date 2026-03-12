import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete = () => {} }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [done, setDone] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; duration: number; delay: number }[]>([]);
  const [lines, setLines] = useState<{ x: number; y: number; w: number; h: number; opacity: number }[]>([]);
  const [pulseRing, setPulseRing] = useState(0);

  useEffect(() => {
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: i * 0.05,
    }));
    setParticles(initialParticles);
  }, []);

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

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseRing(prev => (prev + 1) % 3);
    }, 600);
    return () => clearInterval(pulseInterval);
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
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 50%, #ffffff 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: '"Courier New", Courier, monospace',
          }}
        >
          <motion.div
            animate={{ opacity: [0.06, 0.1, 0.06] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: `radial-gradient(circle, ${BRAND} 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                x: [particle.x + '%', (particle.x + Math.random() * 20 - 10) + '%'],
                y: [particle.y + '%', (particle.y - Math.random() * 30) + '%'],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                width: particle.size,
                height: particle.size,
                borderRadius: '50%',
                background: BRAND,
                pointerEvents: 'none',
              }}
            />
          ))}

          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(12,86,112,0.025) 0px, rgba(12,86,112,0.025) 1px, transparent 1px, transparent 4px)',
          }} />

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

          {[
            { top: 16, left: 16 },
            { top: 16, right: 16 },
            { bottom: 16, left: 16 },
            { bottom: 16, right: 16 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              animate={{
                scale: pulseRing === i % 3 ? [1, 1.5, 1] : 1,
                opacity: pulseRing === i % 3 ? [0.3, 0, 0.3] : 0.3,
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                position: 'absolute',
                ...pos,
                width: 8,
                height: 8,
                borderRadius: '50%',
                border: `2px solid ${BRAND}`,
              }}
            />
          ))}

          {['CC', 'v2.0', '2025', 'INIT'].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              style={{
                position: 'absolute',
                ...[{ top: 28, left: 32 }, { top: 28, right: 32 }, { bottom: 28, left: 32 }, { bottom: 28, right: 32 }][i],
                fontSize: 10, letterSpacing: '0.3em',
                color: BRAND, fontWeight: 700,
              }}
            >
              {text}
            </motion.div>
          ))}

          {[
            { top: 20, left: 20, rotate: 0 },
            { top: 20, right: 20, rotate: 90 },
            { bottom: 20, right: 20, rotate: 180 },
            { bottom: 20, left: 20, rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', ...pos, width: 24, height: 24 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: pos.rotate + (progress > 50 ? 360 : 0),
              }}
              transition={{
                opacity: { delay: 0.1 + i * 0.08 },
                scale: { delay: 0.1 + i * 0.08 },
                rotate: { duration: 2, ease: 'easeInOut' },
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
                <path d="M0 24 L0 0 L24 0" stroke={BRAND} strokeWidth="2" opacity="0.5" />
              </svg>
            </motion.div>
          ))}

          <motion.div
            style={{ position: 'relative', zIndex: 12, textAlign: 'left', width: 480, maxWidth: '90vw', padding: '0 16px' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: 10, letterSpacing: '0.4em', color: BRAND, textTransform: 'uppercase' }}
              >
                SYS.BOOT
              </motion.span>
              <span style={{ fontSize: 10, letterSpacing: '0.2em', color: BRAND, opacity: 0.5 }}>
                {Array.from({ length: filled }, () => '■').join('')}
                {Array.from({ length: segments - filled }, () => '□').join('')}
              </span>
            </div>

            <div style={{ position: 'relative', lineHeight: 1, marginBottom: 20 }}>
              <motion.div
                animate={
                  glitch
                    ? { x: [0, -5, 4, -2, 0], skewX: [0, -3, 2, 0] }
                    : {
                        textShadow: [
                          `0 0 20px ${BRAND}40`,
                          `0 0 30px ${BRAND}60`,
                          `0 0 20px ${BRAND}40`,
                        ],
                      }
                }
                transition={glitch ? { duration: 0.15 } : { duration: 2, repeat: Infinity }}
                style={{
                  fontSize: 'clamp(80px, 18vw, 160px)',
                  fontWeight: 900,
                  color: BRAND,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                  lineHeight: 1,
                }}
              >
                {displayNum}
              </motion.div>

              {glitch && (
                <>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    fontSize: 'clamp(80px, 18vw, 160px)', fontWeight: 900,
                    color: 'rgba(12,86,112,0.5)', letterSpacing: '-0.04em', lineHeight: 1,
                    transform: 'translate(5px, -3px)',
                    userSelect: 'none', pointerEvents: 'none',
                  }}>{displayNum}</div>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    fontSize: 'clamp(80px, 18vw, 160px)', fontWeight: 900,
                    color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.04em', lineHeight: 1,
                    transform: 'translate(-5px, 3px)',
                    userSelect: 'none', pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                  }}>{displayNum}</div>
                </>
              )}

              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  fontSize: 'clamp(20px, 4vw, 42px)', fontWeight: 700,
                  color: BRAND,
                  position: 'absolute', right: -4, bottom: 'clamp(8px, 2vw, 14px)',
                }}
              >
                %
              </motion.span>
            </div>

            <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
              {Array.from({ length: segments }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    background: i < filled
                      ? (i === filled - 1 ? BRAND : BRAND)
                      : BRAND_LIGHT,
                    scaleY: i < filled ? [0.8, 1.1, 1] : 0.55,
                    boxShadow: i === filled - 1 ? [
                      `0 0 5px ${BRAND}`,
                      `0 0 15px ${BRAND}`,
                      `0 0 5px ${BRAND}`
                    ] : 'none',
                  }}
                  transition={{
                    background: { duration: 0.15 },
                    scaleY: { duration: 0.3, delay: i * 0.02 },
                    boxShadow: { duration: 0.5, repeat: Infinity },
                  }}
                  style={{ flex: 1, height: 18, transformOrigin: 'bottom', border: `1px solid ${BRAND_MID}`, borderRadius: 2 }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div style={{
                  fontSize: 'clamp(18px, 4vw, 30px)', fontWeight: 900,
                  color: BRAND, letterSpacing: '0.1em',
                  textTransform: 'uppercase', lineHeight: 1.1,
                }}>
                  CODE<br />
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: `2px ${BRAND}`,
                    }}
                  >
                    CRAFTER
                  </motion.span>
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
                    <motion.div
                      key={label}
                      animate={{
                        color: active ? BRAND : BRAND_MID,
                        x: active ? [0, 5, 0] : 0,
                      }}
                      transition={{
                        color: { duration: 0.3 },
                        x: { duration: 0.3 },
                      }}
                      style={{
                        fontSize: 9, letterSpacing: '0.35em',
                        fontWeight: active ? 700 : 400,
                        lineHeight: 1.9,
                      }}
                    >
                      {active ? '▶' : '·'} {label}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 2, background: BRAND, marginTop: 20, transformOrigin: 'left', opacity: 0.25 }}
            />
            <motion.div
              animate={{
                scaleX: progress / 100,
                boxShadow: progress > 50 ? `0 0 10px ${BRAND}` : 'none',
              }}
              style={{ height: 2, background: BRAND, marginTop: 3, transformOrigin: 'left' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              width: 60,
              height: 60,
              display: 'none',
            }}
            className="hidden sm:block"
          >
            <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke={BRAND_LIGHT}
                strokeWidth="3"
              />
              <motion.circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke={BRAND}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 163.36' }}
                animate={{ strokeDasharray: `${(progress / 100) * 163.36} 163.36` }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
